import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {indexarReferenciaV20,validarParContraReferenciaV20} from '../src/referencia-v20.js';

const path=fileURLToPath(new URL('../referencias/ontologia_v20_extracao_t6.json',import.meta.url));
const source=JSON.parse(readFileSync(path,'utf8'));
const pacote=()=>({
 formato:'CIVITAS-T6-LAB-1',ambiente:'SIMULADO',
 eot:{id:'EOT-T6-EXEMPLO',versao:'1',tipo_raiz:'t_estado',referencia_ontologia:'v20',
  tipos:[
   {id:'t_estado',conceito_ref:'CON-005',exige_fundamentacao:true},
   {id:'t_ente',conceito_ref:'CON-010',exige_fundamentacao:true},
   {id:'t_administracao',conceito_ref:'CON-011',exige_fundamentacao:true},
   {id:'t_entidade',conceito_ref:'CON-012',exige_fundamentacao:true}
  ],
  relacoes:[
   {id:'r1',origem:'t_estado',destino:'t_ente',predicado:'organiza-se em',exige_fundamentacao:true},
   {id:'r2',origem:'t_ente',destino:'t_administracao',predicado:'organiza-se por meio de',exige_fundamentacao:true},
   {id:'r3',origem:'t_administracao',destino:'t_entidade',predicado:'compreende',exige_fundamentacao:true}
  ]},
 ent:{id:'ENT-T6-EXEMPLO',versao:'1',eot_id:'EOT-T6-EXEMPLO',eot_versao:'1',referencia_ontologia:'v20',
  exigencias:[
   {id:'e1',alvo:'tipo:t_estado',tipo_documento:'tipo_normativo_abstrato_1'},
   {id:'e2',alvo:'tipo:t_ente',tipo_documento:'tipo_normativo_abstrato_2'},
   {id:'e3',alvo:'tipo:t_administracao',tipo_documento:'tipo_normativo_abstrato_3'},
   {id:'e4',alvo:'tipo:t_entidade',tipo_documento:'tipo_normativo_abstrato_4'},
   {id:'e5',alvo:'relacao:r1',tipo_documento:'tipo_normativo_abstrato_5'},
   {id:'e6',alvo:'relacao:r2',tipo_documento:'tipo_normativo_abstrato_6'},
   {id:'e7',alvo:'relacao:r3',tipo_documento:'tipo_normativo_abstrato_7'}
  ]}
});
const validate=(p=pacote(),s=source)=>validarParContraReferenciaV20(p,s);
const has=(r,c)=>r.diagnosticos.some(x=>x.codigo===c);
test('T6-01: catálogo derivado v20 tem 158 conceitos sem ambiguidade',()=>{
 const idx=indexarReferenciaV20(source);
 assert.equal(idx.contagens.conceitos,158);assert.equal(idx.contagens.relacoes,247);
 assert.equal(idx.porCodigo.get('CON-005').identificador,'estado');
 assert.equal(idx.porCodigo.get('CON-012').identificador,'entidade_publica');
});
test('T6-02: referência de Estado e triplas documentais v20 válida',()=>{
 assert.equal(validate().conforme,true);
 assert.equal(validate().afirmacao_limitada,'CORRESPONDENCIA_REFERENCIAL_NAO_VALIDADE_INSTITUCIONAL');
});
test('T6-03: conceitos inexistentes são bloqueados',()=>{
 const p=pacote();p.eot.tipos[1].conceito_ref='CON-999';assert.ok(has(validate(p),'T6E010'));
});
test('T6-04: ligação entre tipos conhecida mas tripla não consta da rede',()=>{
 const p=pacote();p.eot.relacoes[0].destino='t_entidade';assert.ok(has(validate(p),'T6E015'));
});
test('T6-05: operador da relação divergente bloqueia',()=>{
 const p=pacote();p.eot.relacoes[0].predicado='causa';assert.ok(has(validate(p),'T6E015'));
});
test('T6-06: raiz não é Estado da v20 bloqueia',()=>{
 const p=pacote();p.eot.tipo_raiz='t_entidade';assert.ok(has(validate(p),'T6E011'));
});
test('T6-07: ENT deve corresponder à identificação e versão da EOT',()=>{
 const p=pacote();p.ent.eot_versao='2';assert.ok(has(validate(p),'T6E006'));
});
test('T6-08: exigência para vínculo ausente bloqueia',()=>{
 const p=pacote();p.ent.exigencias.pop();assert.ok(has(validate(p),'T6E019'));
});
test('T6-09: alvo de exigência não existe bloqueia',()=>{
 const p=pacote();p.ent.exigencias[0].alvo='tipo:falso';assert.ok(has(validate(p),'T6E018'));
});
test('T6-10: outra versão de ontologia não entra sem revisão',()=>{
 const p=pacote();p.eot.referencia_ontologia='v21';assert.ok(has(validate(p),'T6E006'));
});
test('T6-11: ambiente REAL não é suportado',()=>{
 const p=pacote();p.ambiente='REAL';assert.ok(has(validate(p),'T6E005'));
});
test('T6-12: adulteração da extração com duplicação de conceito é recusada',()=>{
 const s=structuredClone(source);s.conceitos.push({...s.conceitos[0]});
 assert.equal(validate(pacote(),s).conforme,false);
});
test('T6-13: relações do catálogo devem apontar para conceitos existentes',()=>{
 const s=structuredClone(source);s.relacoes[0].destino='CONCEITO INVENTADO';
 assert.equal(validate(pacote(),s).conforme,false);
});
test('T6-14: sem catálogo v20 não há inferência a partir de nome de arquivo',()=>{
 assert.equal(validate(pacote(),null).conforme,false);
});
test('T6-15: v20 não contém permissão para declarar validade jurídica ou Marco A',()=>{
 const v=validate();assert.equal(v.conforme,true);
 assert.ok(!('marco_a_autorizado' in v));
 assert.ok(!('fundamentacao_juridica_validada' in v));
});
test('T6-16: identificador textual oficial da rede também é aceito',()=>{
 const p=pacote();p.eot.tipos[1].conceito_ref='ente_federativo';
 assert.equal(validate(p).conforme,true);
});
