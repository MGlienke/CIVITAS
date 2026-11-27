import test from 'node:test';
import assert from 'node:assert/strict';
import {validarPacoteTipologico,CatalogoModelosLab} from '../src/modelos.js';

const ontology={ambiente:'SIMULADO',versao:'ONTO-LAB-1',conceitos:['Estado','EntidadePublica'],relacoes:['integra']};
const pair=()=>({
 formato:'CIVITAS-T5-LAB-1',ambiente:'SIMULADO',
 eot:{id:'EOT-LAB',versao:'1',ontologia_versao:'ONTO-LAB-1',tipo_raiz:'Estado',
  tipos:[{id:'Estado',conceito:'Estado',exige_fundamentacao:true},
   {id:'Entidade',conceito:'EntidadePublica',exige_fundamentacao:true}],
  relacoes:[{id:'rel1',origem:'Estado',destino:'Entidade',relacao:'integra',exige_fundamentacao:true}]},
 ent:{id:'ENT-LAB',versao:'1',eot_id:'EOT-LAB',eot_versao:'1',ontologia_versao:'ONTO-LAB-1',
  exigencias:[{id:'n1',alvo:'tipo:Estado',tipo_documento:'Constituicao'},
   {id:'n2',alvo:'tipo:Entidade',tipo_documento:'AtoConstitutivo'},
   {id:'n3',alvo:'relacao:rel1',tipo_documento:'BaseRelacional'}]}
});
const report=(p=pair(),o=ontology)=>validarPacoteTipologico(p,o);
const has=(r,code)=>r.diagnosticos.some(x=>x.code===code);

test('T5-01: importa par EOT ENT completo sem instâncias concretas',()=>assert.equal(report().conforme,true));
test('T5-02: não aceita apenas EOT sem ENT',()=>{let p=pair();delete p.ent;assert.equal(report(p).conforme,false);});
test('T5-03: versão ENT/EOT incompatível bloqueia',()=>{let p=pair();p.ent.eot_versao='2';assert.ok(has(report(p),'T5E004'));});
test('T5-04: mudança da versão ontológica bloqueia',()=>{let p=pair();p.ent.ontologia_versao='OUTRA';assert.ok(has(report(p),'T5E005'));});
test('T5-05: tipo não conhecido bloqueia',()=>{let p=pair();p.eot.tipos[1].conceito='NaoExiste';assert.ok(has(report(p),'T5E009'));});
test('T5-06: relação não reconhecida bloqueia',()=>{let p=pair();p.eot.relacoes[0].relacao='imaginaria';assert.ok(has(report(p),'T5E015'));});
test('T5-07: relação para tipo inexistente bloqueia',()=>{let p=pair();p.eot.relacoes[0].destino='x';assert.ok(has(report(p),'T5E014'));});
test('T5-08: requisito normativo obrigatório não pode faltar',()=>{let p=pair();p.ent.exigencias.pop();assert.ok(has(report(p),'T5E019'));});
test('T5-09: exigência normativa não referenciada é rejeitada',()=>{let p=pair();p.ent.exigencias[0].alvo='tipo:Desconhecido';assert.ok(has(report(p),'T5E018'));});
test('T5-10: modelos reais não são aceitos na porta simulada',()=>{let p=pair();p.ambiente='REAL';assert.ok(has(report(p),'T5E001'));});
test('T5-11: duplicação de tipos é rejeitada',()=>{let p=pair();p.eot.tipos.push({...p.eot.tipos[0]});assert.ok(has(report(p),'T5E008'));});
test('T5-12: indisponível até validar e disponibilizar',()=>{
 const c=new CatalogoModelosLab(ontology);assert.equal(c.obter('EOT-LAB','1'),null);
 assert.equal(c.importar(pair()).estado,'VALIDADO');assert.equal(c.obter('EOT-LAB','1').estado,'VALIDADO');
 assert.equal(c.disponibilizar('EOT-LAB','1'),true);assert.equal(c.obter('EOT-LAB','1').estado,'DISPONIVEL');
});
test('T5-13: mesma versão e mesmo conteúdo idempotente',()=>{
 const c=new CatalogoModelosLab(ontology);const x=c.importar(pair()),y=c.importar(pair());
 assert.equal(x.hash,y.hash);assert.equal(y.estado,'VALIDADO');
});
test('T5-14: mesma versão com conteúdo modificado causa conflito',()=>{
 const c=new CatalogoModelosLab(ontology);c.importar(pair());const p=pair();p.ent.exigencias[0].tipo_documento='Outro';
 assert.equal(c.importar(p).estado,'CONFLITO');
});
test('T5-15: modelo vinculado a instância não pode ser desativado',()=>{
 const c=new CatalogoModelosLab(ontology);c.importar(pair());c.disponibilizar('EOT-LAB','1');
 assert.equal(c.vincularInstanciaSimulada('EOT-LAB','1'),true);
 assert.equal(c.desativar('EOT-LAB','1'),false);
 assert.equal(c.obter('EOT-LAB','1').vinculos_simulados,1);
});
test('T5-16: modelo vazio admite desativação sem exclusão histórica',()=>{
 const c=new CatalogoModelosLab(ontology);c.importar(pair());c.disponibilizar('EOT-LAB','1');
 assert.equal(c.desativar('EOT-LAB','1'),true);
 assert.equal(c.obter('EOT-LAB','1').estado,'DESATIVADO');
});
test('T5-17: versão nova é independente, requer nova verificação',()=>{
 const c=new CatalogoModelosLab(ontology);c.importar(pair());c.disponibilizar('EOT-LAB','1');
 const p=pair();p.eot.versao='2';p.ent.eot_versao='2';p.ent.versao='2';
 assert.equal(c.importar(p).estado,'VALIDADO');
 assert.equal(c.obter('EOT-LAB','2').estado,'VALIDADO');
});
test('T5-18: alterações externas não modificam catálogo',()=>{
 const c=new CatalogoModelosLab(ontology);let p=pair();c.importar(p);
 p.eot.tipos[0].conceito='Fraude';
 let saved=c.obter('EOT-LAB','1');assert.equal(saved.pacote.eot.tipos[0].conceito,'Estado');
 saved.pacote.eot.tipos[0].conceito='Outra';
 assert.equal(c.obter('EOT-LAB','1').pacote.eot.tipos[0].conceito,'Estado');
});
test('T5-19: hash canônico é independente da ordem de chaves em JSON',()=>{
 const p=pair(),q=structuredClone(p);
 q.ent={exigencias:q.ent.exigencias,ontologia_versao:q.ent.ontologia_versao,eot_versao:q.ent.eot_versao,eot_id:q.ent.eot_id,versao:q.ent.versao,id:q.ent.id};
 assert.equal(report(p).hash,report(q).hash);
});
test('T5-20: sem estrutura tipológica válida não há publicação',()=>{
 const c=new CatalogoModelosLab(ontology),p=pair();p.eot.tipo_raiz='Inexistente';
 assert.equal(c.importar(p).estado,'REJEITADO');
 assert.equal(c.disponibilizar('EOT-LAB','1'),false);
});
