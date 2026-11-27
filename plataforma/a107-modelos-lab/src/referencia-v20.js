/**
 * T6 — Verificação de referências de EOT/ENT contra extração factual da
 * Ontologia CIVITAS v20 (seções 3 e 5). NÃO constitui EOT/ENT homologadas,
 * nem realiza interpretação jurídica/ontológica substantiva.
 *
 * As relações da rede v20 são evidência de correspondência textual SEMÂNTICA,
 * não tipos organizacionais autorizados. O pacote de laboratório só pode
 * ser disponibilizado em ambiente SIMULADO.
 */
import {createHash} from 'node:crypto';

const own = (v,k)=>Object.prototype.hasOwnProperty.call(v,k);
const object=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
const valid=s=>typeof s==='string'&&s.trim().length>0&&s.length<=180;
const norm=s=>String(s).normalize('NFC').trim().toLocaleUpperCase('pt-BR');
const diagnostic=(codigo,descricao)=>({codigo,descricao});
const sha=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');

/** Indexa apenas os identificadores e relações que constam na fonte derivada. */
export function indexarReferenciaV20(snapshot) {
 if(!object(snapshot)||snapshot.versao_fonte!=='v20'||
   snapshot.identificador!=='CIVITAS-ONTOLOGIA-V20-DERIVADO-T6'||
   !Array.isArray(snapshot.conceitos)||!Array.isArray(snapshot.relacoes))
   throw new Error('T6E001: referência v20 ausente/incompatível');
 const code=new Map(),identifier=new Map(),names=new Set();
 for(const c of snapshot.conceitos){
  if(!object(c)||!/^CON-\d{3}$/.test(c.codigo)||!valid(c.nome)||!valid(c.identificador)||
    code.has(c.codigo)||identifier.has(c.identificador)||names.has(norm(c.nome)))
    throw new Error('T6E002: conceitos ambíguos ou inválidos');
  const ref={codigo:c.codigo,nome:c.nome,identificador:c.identificador};
  code.set(c.codigo,ref);identifier.set(c.identificador,ref);names.add(norm(c.nome));
 }
 const triples=new Set();
 for(const r of snapshot.relacoes){
  if(!object(r)||![r.origem,r.predicado,r.destino].every(valid)||
     !names.has(norm(r.origem))||!names.has(norm(r.destino)))
    throw new Error('T6E003: relação com referência desconhecida');
  const key=[norm(r.origem),norm(r.predicado),norm(r.destino)].join('|');
  if(triples.has(key))throw new Error('T6E004: relação duplicada');
  triples.add(key);
 }
 return {porCodigo:code,porIdentificador:identifier,triplas:triples,contagens:{
   conceitos:code.size,relacoes:triples.size
 },versao:'v20',digest_extracao:sha(snapshot)};
}

/**
 * Requisitos do pacote T6:
 * - entradas em SIMULADO
 * - EOT/ENT importadas conjuntamente e amarradas à mesma versão da fonte;
 * - conceito_ref em cada tipo: código CON-xxx ou identificador oficial;
 * - relações entre tipos devem corresponder a triplas da REDE, sem
 *   presumir que correspondência textual justifique organização jurídica;
 * - ENT contém exigências abstratas para todos os elementos/relações marcados.
 */
export function validarParContraReferenciaV20(pacote,snapshot) {
 const diagnosticos=[],add=(c,m)=>diagnosticos.push(diagnostic(c,m));
 let index;
 try{index=indexarReferenciaV20(snapshot);}
 catch(e){return {conforme:false,diagnosticos:[diagnostic('T6E001',String(e))],referencia:null};}
 const base={fonte:'CIVITAS - Rede Ontologica - v20.md',versao:'v20',
   digest_extracao:index.digest_extracao,...index.contagens};
 if(!object(pacote)||pacote.ambiente!=='SIMULADO'||pacote.formato!=='CIVITAS-T6-LAB-1'||
    !object(pacote.eot)||!object(pacote.ent)){
  add('T6E005','Intercâmbio incompleto ou não simulado');
  return {conforme:false,diagnosticos,referencia:base};
 }
 const {eot,ent}=pacote;
 if(![eot.id,eot.versao,eot.tipo_raiz,ent.id,ent.versao,ent.eot_id,ent.eot_versao].every(valid)||
    eot.referencia_ontologia!=='v20'||ent.referencia_ontologia!=='v20'||
    eot.id!==ent.eot_id||eot.versao!==ent.eot_versao){
  add('T6E006','Identificação/versões de EOT, ENT e referência v20 inconsistentes');
  return {conforme:false,diagnosticos,referencia:base};
 }
 if(!Array.isArray(eot.tipos)||!Array.isArray(eot.relacoes)||!Array.isArray(ent.exigencias)){
  add('T6E007','Tipos, relações e exigências ausentes');
  return {conforme:false,diagnosticos,referencia:base};
 }
 const tipos=new Map(), relacoes=new Set();
 for(const t of eot.tipos){
  if(!object(t)||!valid(t.id)||!valid(t.conceito_ref)||typeof t.exige_fundamentacao!=='boolean'){
   add('T6E008','Tipo inválido');continue;
  }
  if(tipos.has(t.id)){add('T6E009','Tipo duplicado');continue;}
  const ref=index.porCodigo.get(t.conceito_ref)||index.porIdentificador.get(t.conceito_ref);
  if(!ref)add('T6E010','Conceito não consta da rede v20: '+t.conceito_ref);
  tipos.set(t.id,{...t,ref});
 }
 if(!tipos.has(eot.tipo_raiz)||tipos.get(eot.tipo_raiz)?.ref?.identificador!=='estado')
   add('T6E011','Tipo raiz deve referenciar Estado (CON-005) da fonte v20');
 for(const r of eot.relacoes){
  if(!object(r)||![r.id,r.origem,r.destino,r.predicado].every(valid)||
    typeof r.exige_fundamentacao!=='boolean'){add('T6E012','Relação inválida');continue;}
  if(relacoes.has(r.id)){add('T6E013','Relação duplicada');continue;}
  relacoes.add(r.id);
  const a=tipos.get(r.origem)?.ref,b=tipos.get(r.destino)?.ref;
  if(!a||!b){add('T6E014','Tipo de origem/destino desconhecido');continue;}
  if(!index.triplas.has([norm(a.nome),norm(r.predicado),norm(b.nome)].join('|')))
    add('T6E015','Tripla não encontrada na rede v20');
 }
 const required=new Set([
  ...[...tipos.values()].filter(t=>t.exige_fundamentacao).map(t=>'tipo:'+t.id),
  ...eot.relacoes.filter(r=>r.exige_fundamentacao===true).map(r=>'relacao:'+r.id)
 ]);
 const fulfilled=new Set();
 for(const e of ent.exigencias){
  if(!object(e)||![e.id,e.alvo,e.tipo_documento].every(valid)){add('T6E016','Exigência inválida');continue;}
  if(fulfilled.has(e.alvo))add('T6E017','Exigência duplicada no alvo');
  fulfilled.add(e.alvo);
  if(e.alvo.startsWith('tipo:')&&!tipos.has(e.alvo.slice(5)) ||
     e.alvo.startsWith('relacao:')&&!relacoes.has(e.alvo.slice(8)) ||
     !e.alvo.startsWith('tipo:')&&!e.alvo.startsWith('relacao:'))
     add('T6E018','Exigência sem alvo tipológico');
 }
 for(const req of required)if(!fulfilled.has(req))add('T6E019','Exigência normativa ausente: '+req);
 if(!tipos.size)add('T6E020','EOT sem tipos');
 return {conforme:diagnosticos.length===0,diagnosticos,referencia:base,
   afirmacao_limitada:'CORRESPONDENCIA_REFERENCIAL_NAO_VALIDADE_INSTITUCIONAL'};
}
