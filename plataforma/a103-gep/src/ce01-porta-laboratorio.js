/**
 * T4: adaptador de consulta A103 para uma demonstração CE-01/A107.
 * SOMENTE LABORATÓRIO, com referências SIMULADAS. NÃO é uma fonte CE-01
 * institucional real, NÃO pode compor verificações operacionais do Marco A.
 *
 * A interface é intencionalmente compatível em forma com PortaIdentidadeA103.
 * A autoridade C103-IEA está AUSENTE: verificador de acesso deve ser injetado
 * pelo harness de teste e NÃO pode ser tomado como credencial pública.
 */
import { createHash } from 'node:crypto';
import { hashComandoT2 } from './pg-simulacao.js';

const str = value => typeof value === 'string' && value.trim().length > 0;
const valido = d => str(d) && Number.isFinite(Date.parse(d));
const snapshot = obj => 'A103-T4-LAB:' + createHash('sha256').update(JSON.stringify(obj)).digest('hex');
const bloqueado = () => process.env.A103_T4_LAB_ONLY !== '1' || process.env.A103_T2_TEST_ONLY !== '1';

export class PortaIdentidadeA103Laboratorio {
  constructor(pool, verificarAcesso) {
    if (!pool?.connect || typeof verificarAcesso !== 'function') throw new TypeError('pool e guarda de acesso obrigatórios');
    this.pool = pool;
    this.verificarAcesso = verificarAcesso;
  }

  async consultarIdentidadeInstitucional(consulta, contexto) {
    // A proteção contra execução fora do laboratório antecede acesso e SQL.
    if (bloqueado()) return { status: 'NAO_AUTORIZADA' };
    if (!consulta || !contexto || !str(consulta.organizacao_id) ||
        consulta.requisito_id !== 'CM01-R01' || consulta.propriedade_id !== 'identidade_institucional' ||
        consulta.sujeito?.tipo !== 'OrganizacaoInstitucional' ||
        consulta.sujeito?.referencia !== consulta.organizacao_id ||
        !str(consulta.contexto_autorizacao) ||
        consulta.contexto_autorizacao !== contexto.autorizacao_contextual_id ||
        !valido(consulta.referencia_temporal) || !valido(consulta.conhecimento_ate) ||
        Date.parse(consulta.conhecimento_ate) > Date.now()) return {status:'ERRO'};
    try {
      if (await this.verificarAcesso(consulta, contexto) !== true) return {status:'NAO_AUTORIZADA'};
    } catch {
      return {status:'NAO_AUTORIZADA'};
    }

    let client;
    try {
      client = await this.pool.connect();
      // Os snapshots são locais a esta consulta; a versão historicamente publicada
      // é determinada pela data de conhecimento. Não afirmar vigência retroativa.
      await client.query('BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ READ ONLY');
      const org = await client.query(
        'SELECT organizacao_id,registro_id,ambiente FROM a103.organizacoes WHERE organizacao_id=$1',
        [consulta.organizacao_id]);
      if (!org.rows.length) {
        await client.query('COMMIT');
        return {status:'NAO_LOCALIZADO',consulta_completa:false};
      }
      if (org.rows[0].ambiente !== 'SIMULADO') {
        await client.query('ROLLBACK');
        return {status:'ERRO'};
      }
      const records = await client.query(`
        SELECT v.registro_id,v.versao_registro,v.registrado_em,m.manifesto_id,m.hash_sha256
          FROM a103.versoes_registro v
          JOIN a103.manifestos_probatorios m
            ON m.registro_id=v.registro_id AND m.versao_registro=v.versao_registro
         WHERE v.registro_id=$1 AND v.registrado_em<=$2 AND v.ambiente='SIMULADO'
           AND m.ambiente='SIMULADO'
         ORDER BY v.versao_registro DESC LIMIT 1`,
        [org.rows[0].registro_id,consulta.conhecimento_ate]);
      if (!records.rows.length) {
        await client.query('COMMIT');
        return {status:'NAO_LOCALIZADO',consulta_completa:false};
      }
      const r=records.rows[0];
      const itens=await client.query(`
        SELECT p.referencia_externa AS id,p.custodiante_modulo AS custodiante,
               p.essencial,p.ambiente
          FROM a103.itens_manifesto i
          JOIN a103.referencias_probatorias p ON p.evidencia_id=i.evidencia_id
         WHERE i.manifesto_id=$1 ORDER BY i.ordem`,[r.manifesto_id]);
      // Este contrato de laboratório demonstra apenas a existência técnica
      // do REGISTRO a partir do momento de sua publicação, não sua existência
      // jurídica pretérita. Consultas ao passado anterior à publicação são inconclusivas.
      if (Date.parse(consulta.referencia_temporal)<new Date(r.registrado_em).getTime()) {
        await client.query('COMMIT');
        return {status:'NAO_LOCALIZADO',consulta_completa:false};
      }
      if (!itens.rows.length || itens.rows.some(p=>p.ambiente!=='SIMULADO' || !str(p.id) || !str(p.custodiante))) {
        await client.query('COMMIT');
        return {status:'INDISPONIVEL'};
      }
      const expected=hashComandoT2({
        organizacao_id:org.rows[0].organizacao_id,
        registro_id:r.registro_id,versao:Number(r.versao_registro),
        itens:itens.rows.map(({id,custodiante})=>({id,custodiante}))
      });
      if (expected!==r.hash_sha256.trim()) {
        await client.query('COMMIT');
        return {status:'ERRO'};
      }
      const captured=snapshot({
        organizacao_id:org.rows[0].organizacao_id,
        registro_id:r.registro_id,versao:r.versao_registro,
        manifesto:r.manifesto_id,hash:r.hash_sha256.trim()
      });
      await client.query('COMMIT');
      return {status:'ENCONTRADO',registro:{
        organizacao_id:org.rows[0].organizacao_id,
        registro_id:r.registro_id,
        versao_registro:String(r.versao_registro),
        referencia_evidencia:'simulacao:'+r.manifesto_id,
        evidencia_id:r.manifesto_id,
        registrado_em:new Date(r.registrado_em).toISOString(),
        referencia_temporal:consulta.referencia_temporal,
        conhecimento_ate:consulta.conhecimento_ate,
        snapshot_fonte:captured,
        fonte_autoritativa:'A103-GEP',
        consulta_completa:true
      }};
    } catch {
      if (client) await client.query('ROLLBACK').catch(()=>{});
      return {status:'INDISPONIVEL'};
    } finally {
      client?.release();
    }
  }
}
