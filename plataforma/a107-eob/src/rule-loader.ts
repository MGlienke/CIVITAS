import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import type { Operador, PacoteRegras, CondicaoId } from './contracts.js';

export interface RegraRequisito { id: string; propriedade: string; operador: Operador; fonte: string; parametros?: Record<string, unknown> }
export interface RegraCondicao { id: CondicaoId; requisitos: RegraRequisito[]; composicao: { operador: 'todos'; requisitos: string[] }; nao_aplicabilidade: 'proibida' }
export interface PacoteCarregado { pacote: PacoteRegras; condicoes: RegraCondicao[]; manifesto: Record<string, unknown> }
const sha = (buf: Buffer | string): string => createHash('sha256').update(buf).digest('hex');
const ids = ['CM-01','CM-02','CM-03','CM-04'] as const;
const ops = new Set(['existe','corresponde','relacionado_a','fundamentado_em','vigente_em','reconhecido_por','satisfaz','precede']);
export async function carregarRegras(diretorio: string): Promise<PacoteCarregado> {
  const manifest = JSON.parse(await readFile(join(diretorio,'manifest.json'),'utf8')) as {
    codigo: string; versao: string; esquema_versao: string; hash_sha256: string;
    arquivos: Array<{id: string; markdown: string; json: string; sha256: string;json_sha256:string}>;
  };
  const { hash_sha256, ...semHash } = manifest;
  const canonical = JSON.stringify({
    arquivos: semHash.arquivos.map(x=>({id:x.id,json:x.json,json_sha256:x.json_sha256,markdown:x.markdown,sha256:x.sha256})),
    codigo: semHash.codigo, esquema_versao: semHash.esquema_versao, versao: semHash.versao
  });
  if (sha(canonical)!==hash_sha256) throw new Error('A107E0003: hash do manifesto divergente');
  if(manifest.codigo!=='MARCO_A'||manifest.arquivos.length!==5) throw new Error('A107E0003: manifesto incompleto');
  const regras: RegraCondicao[]=[];
  for(const id of [...ids,'MARCO_A']) {
    const file=manifest.arquivos.find(f=>f.id===id);
    if(!file||sha(await readFile(join(diretorio,file.markdown)))!==file.sha256) throw new Error(`A107E0003: hash de ${id} divergente`);
    const jsonText=await readFile(join(diretorio,file.json),'utf8');
    if(sha(jsonText)!==file.json_sha256)throw new Error(`A107E0003: JSON compilado de ${id} alterado`);
    const parsed=JSON.parse(jsonText) as Record<string, unknown>;
    if(parsed.id!==id || parsed.situacao!=='HOMOLOGADA') throw new Error('A107E0003: regra não publicada');
    if(id==='MARCO_A') {
      if(JSON.stringify((parsed.composicao as {requisitos:string[]}).requisitos)!==JSON.stringify(ids))throw new Error('A107E0003: composição MARCO_A inválida');
      continue;
    }
    const rule=parsed as unknown as RegraCondicao;
    const expected = id==='CM-01'?5:6;
    if(rule.requisitos.length!==expected||rule.composicao.operador!=='todos'||rule.nao_aplicabilidade!=='proibida')throw new Error('A107E0003: condição incompleta');
    const reqIds=rule.requisitos.map(r=>r.id);
    if(new Set(reqIds).size!==expected||JSON.stringify(reqIds)!==JSON.stringify(rule.composicao.requisitos))throw new Error('A107E0003: requisitos divergentes');
    for(let i=0;i<expected;i++){
      const r=rule.requisitos[i];
      if(r.id!==`CM0${ids.indexOf(id as CondicaoId)+1}-R0${i+1}`||!ops.has(r.operador)||!r.propriedade||!r.fonte)throw new Error('A107E0004: requisito/operador inválido');
    }
    regras.push(rule);
  }
  return {pacote:{id:'MARCO_A',versao:manifest.versao,hash_sha256:manifest.hash_sha256,esquema_versao:manifest.esquema_versao},condicoes:regras,manifesto:manifest as unknown as Record<string, unknown>};
}
