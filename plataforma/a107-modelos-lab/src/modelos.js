/**
 * T5 — Intercâmbio EOT/ENT de LABORATÓRIO, sem modelos institucionais reais.
 * UC-001: EOT; UC-002: ENT; UC-003: compatibilidade semântica preliminar.
 * Não constitui EOT/ENT brasileira, não interpreta normas ou altera ontologia.
 * O vocabulário nativo aqui é apenas uma FIXTURE assinada como LAB, NÃO a Ontologia CIVITAS.
 */
import {createHash} from 'node:crypto';

const valid = s => typeof s==='string' && s.length>0 && s.length<=160 && /^[\p{L}\p{N}_.:-]+$/u.test(s);
const obj = v => v!==null && typeof v==='object' && !Array.isArray(v);
const canon = v => JSON.stringify(v, (_k,x) => obj(x) ? Object.fromEntries(Object.entries(x).sort(([a],[b])=>a.localeCompare(b))) : x);
const sha = v => createHash('sha256').update(canon(v)).digest('hex');
const diagnostic = (code,message) => ({code,message});
const keys = (v,expected) => obj(v) && Object.keys(v).sort().join('|')===expected.slice().sort().join('|');

export function validarPacoteTipologico(pacote,ontologiaLab) {
  const d=[];
  const add=(c,m)=>d.push(diagnostic(c,m));
  if(!keys(pacote,['formato','ambiente','eot','ent']) || pacote.formato!=='CIVITAS-T5-LAB-1' ||
     pacote.ambiente!=='SIMULADO') {
    add('T5E001','Envelope de intercâmbio não reconhecido ou ambiente não simulado');
    return {conforme:false,diagnosticos:d,hash:null};
  }
  const {eot,ent}=pacote;
  if(!obj(eot)||!obj(ent) || !valid(eot.id)||!valid(eot.versao)||!valid(ent.id)||!valid(ent.versao) ||
     !valid(eot.ontologia_versao)||!valid(ent.ontologia_versao) ||
     !valid(ent.eot_id)||!valid(ent.eot_versao)) {
    add('T5E002','Identificadores e versões do par EOT/ENT obrigatórios');
    return {conforme:false,diagnosticos:d,hash:null};
  }
  if(!obj(ontologiaLab)||ontologiaLab.ambiente!=='SIMULADO'||
      !valid(ontologiaLab.versao)||!Array.isArray(ontologiaLab.conceitos)||
      !Array.isArray(ontologiaLab.relacoes)) {
    add('T5E003','Ontologia de laboratório não registrada');
    return {conforme:false,diagnosticos:d,hash:null};
  }
  if(ent.eot_id!==eot.id || ent.eot_versao!==eot.versao) add('T5E004','ENT não corresponde à EOT e versão importadas conjuntamente');
  if(eot.ontologia_versao!==ontologiaLab.versao || ent.ontologia_versao!==ontologiaLab.versao)
    add('T5E005','Versão semântica do par difere da fixture de referência');
  if(!Array.isArray(eot.tipos) || !Array.isArray(eot.relacoes) || !Array.isArray(ent.exigencias) ||
     !valid(eot.tipo_raiz)) {
    add('T5E006','Estrutura de EOT/ENT incompleta');
    return {conforme:false,diagnosticos:d,hash:null};
  }
  const concepts=new Set(ontologiaLab.conceitos);
  const relationships=new Set(ontologiaLab.relacoes);
  const types=new Set(),rels=new Set(),required=[];
  for(const t of eot.tipos) {
    if(!keys(t,['id','conceito','exige_fundamentacao']) || !valid(t.id) || !valid(t.conceito) ||
       typeof t.exige_fundamentacao!=='boolean') {add('T5E007','Tipo malformado');continue;}
    if(types.has(t.id)) add('T5E008','Tipo duplicado');
    types.add(t.id);
    if(!concepts.has(t.conceito)) add('T5E009','Conceito não reconhecido pela fixture ontológica');
    if(t.exige_fundamentacao) required.push('tipo:'+t.id);
  }
  if(!types.has(eot.tipo_raiz)) add('T5E010','Tipo raiz não identificado');
  if(!eot.tipos.some(t=>t.id===eot.tipo_raiz && t.conceito==='Estado')) add('T5E011','Raiz da EOT de laboratório deve representar Estado');
  for(const r of eot.relacoes) {
    if(!keys(r,['id','origem','destino','relacao','exige_fundamentacao']) ||
       !valid(r.id)||!valid(r.origem)||!valid(r.destino)||!valid(r.relacao) ||
       typeof r.exige_fundamentacao!=='boolean') {add('T5E012','Relação malformada');continue;}
    if(rels.has(r.id)) add('T5E013','Relação duplicada');
    rels.add(r.id);
    if(!types.has(r.origem)||!types.has(r.destino)) add('T5E014','Relação aponta para tipo inexistente');
    if(!relationships.has(r.relacao)) add('T5E015','Relação ausente da fixture ontológica');
    if(r.exige_fundamentacao) required.push('relacao:'+r.id);
  }
  const explained=new Map();
  for(const e of ent.exigencias) {
    if(!keys(e,['id','alvo','tipo_documento']) || !valid(e.id)||!valid(e.alvo)||!valid(e.tipo_documento)) {
      add('T5E016','Exigência normativa malformada');continue;
    }
    if(explained.has(e.alvo)) add('T5E017','Exigências duplicadas para o mesmo alvo');
    explained.set(e.alvo,e);
    if(!/^tipo:|^relacao:/.test(e.alvo) ||
       (e.alvo.startsWith('tipo:')&&!types.has(e.alvo.slice(5)))||
       (e.alvo.startsWith('relacao:')&&!rels.has(e.alvo.slice(8))))
      add('T5E018','Exigência normativa sem correspondência organizacional');
  }
  for(const target of required) if(!explained.has(target))
    add('T5E019','Elemento/relação sem exigência normativa tipológica: '+target);
  if(eot.tipos.length===0) add('T5E020','EOT vazia');
  // A referência ontológica é apenas um catálogo de termos permitidos em testes.
  // Compatibilidade semântica substantiva e fundamentação normativa ainda não existem.
  return {conforme:d.length===0,diagnosticos:d,hash:sha(pacote)};
}

/** Catálogo imutável de versões aprovadas apenas para TESTE. Sem substituição destrutiva. */
export class CatalogoModelosLab {
  #packages=new Map();
  #usage=new Map();
  constructor(ontologiaLab) {this.ontologia=structuredClone(ontologiaLab);}
  importar(pacote) {
    const result=validarPacoteTipologico(pacote,this.ontologia);
    const eot=pacote?.eot;
    if(!result.conforme) return {estado:'REJEITADO',...result};
    const key=eot.id+'@'+eot.versao;
    const existing=this.#packages.get(key);
    if(existing) {
      if(existing.hash!==result.hash) return {estado:'CONFLITO',conforme:false,diagnosticos:[diagnostic('T5E021','Versão existente com conteúdo diferente')],hash:result.hash};
      return {estado:existing.estado,conforme:true,diagnosticos:[],hash:result.hash};
    }
    this.#packages.set(key,{estado:'VALIDADO',hash:result.hash,pacote:structuredClone(pacote)});
    return {estado:'VALIDADO',...result};
  }
  disponibilizar(id,versao) {
    const key=id+'@'+versao,record=this.#packages.get(key);
    if(!record||record.estado!=='VALIDADO') return false;
    record.estado='DISPONIVEL';return true;
  }
  /** Marcação fictícia de vínculo para proteger a regra de imutabilidade em teste. */
  vincularInstanciaSimulada(id,versao) {
    const key=id+'@'+versao,record=this.#packages.get(key);
    if(!record||record.estado!=='DISPONIVEL') return false;
    this.#usage.set(key,(this.#usage.get(key)??0)+1);return true;
  }
  desativar(id,versao) {
    const key=id+'@'+versao,record=this.#packages.get(key);
    if(!record||record.estado!=='DISPONIVEL'||(this.#usage.get(key)??0)>0) return false;
    record.estado='DESATIVADO';return true;
  }
  obter(id,versao) {
    const record=this.#packages.get(id+'@'+versao);
    return record?structuredClone({...record,vinculos_simulados:this.#usage.get(id+'@'+versao)??0}):null;
  }
}
