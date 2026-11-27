import test from 'node:test';
import assert from 'node:assert/strict';
import { RegistroSimuladoA103 } from '../src/prototipo-registro.js';

const entrada = (id, nome = 'Organização Exemplo') => ({
  solicitacao_id: id, nome, origem_referencial: 'procedimento-simulado-001',
  provas: [{ id: 'evidencia-simulada', custodiante: 'C301-RDI' }]
});
const esperarErro = (fn, code) => assert.throws(fn, e => e.code === code);

test('01: proposta não publica nem cria organização', () => {
  const s = new RegistroSimuladoA103(); const p = s.preparar(entrada('a'));
  assert.equal(p.estado, 'PROPOSTA'); assert.equal(s.contarOrganizacoes(), 0);
});
test('02: proposta duplicada é idempotente', () => {
  const s = new RegistroSimuladoA103(); const a=s.preparar(entrada('a')); const b=s.preparar(entrada('a'));
  assert.equal(a.proposta_id, b.proposta_id);
});
test('03: divergência de idempotência recusa comando', () => {
  const s = new RegistroSimuladoA103(); s.preparar(entrada('a'));
  esperarErro(() => s.preparar(entrada('a','Outra')), 'IDEMPOTENCIA_DIVERGENTE');
});
test('04: sem autorização simulada não publica', () => {
  const s = new RegistroSimuladoA103(); const p=s.preparar(entrada('a')); s.examinar(p.proposta_id);
  esperarErro(() => s.publicar(p.proposta_id), 'NAO_AUTORIZADA'); assert.equal(s.contarOrganizacoes(),0);
});
test('05: sem provas deve sanear', () => {
  const s = new RegistroSimuladoA103(); const p=s.preparar({...entrada('a'), provas: []});
  assert.equal(s.examinar(p.proposta_id).estado, 'PENDENTE_SANEAMENTO');
});
test('06: publicação gera versão e manifesto explicitamente simulados', () => {
  const s = new RegistroSimuladoA103(); const p=s.preparar(entrada('a')); s.examinar(p.proposta_id);
  const x=s.publicar(p.proposta_id,{permitir_publicacao_simulada:true});
  assert.equal(x.ambiente,'SIMULADO'); assert.equal(x.marco_a_autorizado,false);
  assert.match(x.referencia_evidencia,/^simulacao:/); assert.equal(s.obterEventos().length,1);
});
test('07: publicação repetida não duplica efeitos', () => {
  const s = new RegistroSimuladoA103(); const p=s.preparar(entrada('a')); s.examinar(p.proposta_id);
  const x=s.publicar(p.proposta_id,{permitir_publicacao_simulada:true});
  const y=s.publicar(p.proposta_id,{permitir_publicacao_simulada:true});
  assert.deepEqual(x,y); assert.equal(s.contarOrganizacoes(),1); assert.equal(s.obterEventos().length,1);
});
test('08: nome igual requer resolução contextual, não deduplicação automática', () => {
  const s = new RegistroSimuladoA103(); const p=s.preparar(entrada('a')); s.examinar(p.proposta_id);
  s.publicar(p.proposta_id,{permitir_publicacao_simulada:true});
  const q=s.preparar(entrada('b'));
  assert.equal(s.examinar(q.proposta_id).diagnostico,'IDENTIDADE_POTENCIALMENTE_DUPLICADA');
});
test('09: retificação preserva identidade e versões anteriores', () => {
  const s = new RegistroSimuladoA103(); const p=s.preparar(entrada('a')); s.examinar(p.proposta_id);
  const x=s.publicar(p.proposta_id,{permitir_publicacao_simulada:true});
  const q=s.preparar({...entrada('b','Nome alterado'), organizacao_id:x.organizacao_id, versao_base:1});
  s.examinar(q.proposta_id); const y=s.publicar(q.proposta_id,{permitir_publicacao_simulada:true});
  assert.equal(y.organizacao_id,x.organizacao_id); assert.equal(y.registro_id,x.registro_id);
  assert.equal(y.versao_registro,'2'); assert.equal(s.contarOrganizacoes(),1);
});
test('10: versão-base concorrente bloqueia a segunda publicação', () => {
  const s = new RegistroSimuladoA103(); const p=s.preparar(entrada('a')); s.examinar(p.proposta_id);
  const x=s.publicar(p.proposta_id,{permitir_publicacao_simulada:true});
  const q=s.preparar({...entrada('b','Nome 2'),organizacao_id:x.organizacao_id,versao_base:1});
  const z=s.preparar({...entrada('c','Nome 3'),organizacao_id:x.organizacao_id,versao_base:1});
  s.examinar(q.proposta_id); s.examinar(z.proposta_id);
  s.publicar(q.proposta_id,{permitir_publicacao_simulada:true});
  esperarErro(() => s.publicar(z.proposta_id,{permitir_publicacao_simulada:true}),'VERSAO_CONCORRENTE');
});
test('11: consulta a organização inexistente não prova inexistência institucional', () => {
  const s = new RegistroSimuladoA103();
  assert.deepEqual(s.consultarSimulacao('id-inexistente',new Date().toISOString()),
    {estado:'NAO_LOCALIZADO',universo_completo:false,simulacao:true});
});
test('12: consulta simulada não equivale ao CE-01 institucional', () => {
  const s = new RegistroSimuladoA103(); const p=s.preparar(entrada('a')); s.examinar(p.proposta_id);
  const x=s.publicar(p.proposta_id,{permitir_publicacao_simulada:true});
  const y=s.consultarSimulacao(x.organizacao_id,new Date(Date.now()+2000).toISOString());
  assert.equal(y.estado,'REGISTRO_SIMULADO'); assert.equal(y.simulacao,true);
  assert.equal(y.versao.manifesto.custodiante,'A103-GEP');
  assert.equal(y.versao.manifesto.itens[0].custodiante,'C301-RDI');
});
