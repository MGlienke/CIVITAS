import { createHash } from 'node:crypto';
import type { ComandoVerificacao, ContextoAutenticado, ResultadoVerificacao } from './contracts.js';
import type { ResultadoAvaliacao } from './engine.js';
import type { PacoteCarregado } from './rule-loader.js';
import type { SqlPool,SqlClient } from './ports.js';

export const hashPedido=(c:ComandoVerificacao, principal:string,hashPacote:string):string=>createHash('sha256').update(JSON.stringify({solicitacao_id:c.solicitacao_id,organizacao_id:c.organizacao_id,
  ambito_id:c.ambito_id,referencia_temporal:new Date(c.referencia_temporal).toISOString(),conhecimento_ate:new Date(c.conhecimento_ate).toISOString(),
  motivo:c.motivo,principal_id:principal,pacote:hashPacote})).digest('hex');

export class IdempotencyConflict extends Error {constructor(){super('A107E0005: solicitacao_id reutilizado com parâmetros divergentes')}}
export class InProgress extends Error {constructor(){super('A107S0001: solicitação existente em processamento')}}

export class PostgresVerificationRepository {
  constructor(private readonly pool:SqlPool){}
  async persistir(comando:ComandoVerificacao, contexto:ContextoAutenticado, pacote:PacoteCarregado, avaliacao:ResultadoAvaliacao):Promise<ResultadoVerificacao>{
    const client=await this.pool.connect();const payload=hashPedido(comando,contexto.principal_id,pacote.pacote.hash_sha256);
    try{
      await client.query('BEGIN');
      // Serializa a operação por organização/principal/solicitação sem lock externo.
      await client.query('SELECT pg_advisory_xact_lock(hashtextextended($1,0))',[`${comando.organizacao_id}|${contexto.principal_id}|${comando.solicitacao_id}`]);
      const existing=await client.query<{pedido_hash_sha256:string,status:string,id:string}>(
        'SELECT id,pedido_hash_sha256,status FROM a107.execucoes WHERE organizacao_id=$1 AND principal_id=$2 AND solicitacao_id=$3',
        [comando.organizacao_id,contexto.principal_id,comando.solicitacao_id]);
      if(existing.rows.length){
        const x=existing.rows[0];if(x.pedido_hash_sha256!==payload)throw new IdempotencyConflict();
        if(x.status!=='CONCLUIDA')throw new InProgress();
        const stored=await client.query<{resultado:ResultadoVerificacao}>(
          'SELECT resultado FROM a107.verificacoes WHERE execucao_id=$1',[x.id]);
        if(!stored.rows[0]?.resultado)throw new Error('A107E0006: resultado concluído não recuperável');
        await client.query('COMMIT');return stored.rows[0].resultado;
      }
      const rp=await client.query<{id:string;hash_sha256:string}>(
        'SELECT id,hash_sha256 FROM a107.pacotes_regras WHERE codigo=$1 AND versao=$2',
        [pacote.pacote.id,pacote.pacote.versao]);
      if(!rp.rows.length)throw new Error('A107E0003: pacote não registrado; publicar pacote controladamente antes de executar');
      if(rp.rows[0].hash_sha256!==pacote.pacote.hash_sha256)throw new Error('A107E0003: pacote publicado incompatível com arquivos');
      const execution=await client.query<{id:string}>(`INSERT INTO a107.execucoes
       (solicitacao_id,organizacao_id,principal_id,ambito_id,correlation_id,pedido_hash_sha256,referencia_temporal,conhecimento_ate,pacote_regras_id,motivo,status)
       VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,'AVALIANDO') RETURNING id`,
       [comando.solicitacao_id,comando.organizacao_id,contexto.principal_id,'MARCO_A',comando.correlation_id,payload,
        comando.referencia_temporal,comando.conhecimento_ate,rp.rows[0].id,comando.motivo]);
      const execId=execution.rows[0].id;
      const result=avaliacao.resultado;
      const verification=await client.query<{id:string}>(`INSERT INTO a107.verificacoes
       (id,execucao_id,pacote_regras_id,organizacao_id,ambito_id,referencia_temporal,conhecimento_ate,estado,elegibilidade,resultado,integridade_sha256)
       VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING id`,
       [result.verificacao_id,execId,rp.rows[0].id,comando.organizacao_id,'MARCO_A',comando.referencia_temporal,comando.conhecimento_ate,result.estado,result.elegibilidade,
        JSON.stringify(result),createHash('sha256').update(JSON.stringify(result)).digest('hex')]);
      const id=verification.rows[0].id;
      for(const c of result.condicoes){
        const inserted=await client.query<{id:string}>(`INSERT INTO a107.resultados_condicao(verificacao_id,condicao_id,estado,justificativa,diagnostico)
         VALUES($1,$2,$3,$4,$5) RETURNING id`,[id,c.condicao_id,c.estado,c.justificativa,'{}']);
        for(const req of c.requisitos){
          const ins=await client.query<{id:string}>(`INSERT INTO a107.resultados_requisito
           (resultado_condicao_id,requisito_id,operador,propriedade_id,estado,justificativa,parametros,diagnostico)
           VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id`,
           [inserted.rows[0].id,req.requisito_id,req.operador,req.propriedade_id,req.estado,req.justificativa,JSON.stringify(req.parametros),JSON.stringify({avisos:req.diagnosticos})]);
          for(const ev of req.evidencias){
            await client.query(`INSERT INTO a107.referencias_evidencia
             (resultado_requisito_id,evidencia_id,modulo_fonte,referencia_externa,versao_fonte,hash_sha256,ocorrido_em,registrado_em_fonte,metadados)
             VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
             [ins.rows[0].id,ev.evidencia_id,ev.custodiante_modulo.split('-')[0],ev.referencia_documental_ou_registro,ev.versao??null,ev.hash_sha256??null,
              ev.ocorrido_em??null,ev.registrado_em??null,'{}']);
          }
        }
      }
      for(const {consulta,resposta} of avaliacao.consultas){
        await client.query(`INSERT INTO a107.consultas_fonte
         (execucao_id,consulta_id,correlation_id,modulo_fonte,requisito_id,status_consulta,referencia_temporal,conhecimento_ate,snapshot_fonte,versao_fonte,cobertura,diagnostico)
         VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
         [execId,consulta.consulta_id,consulta.correlation_id,resposta.fonte_modulo.split('-')[0],consulta.requisito_id,resposta.status_consulta,
          consulta.referencia_temporal,consulta.conhecimento_ate,resposta.temporalidade.snapshot_fonte??null,resposta.temporalidade.versao_fonte??null,
          JSON.stringify(resposta.cobertura),JSON.stringify({avisos:resposta.diagnosticos})]);
      }
      await client.query(`INSERT INTO a107.outbox(verificacao_id,evento_tipo,evento_versao,correlation_id,payload)
       VALUES($1,'VERIFICACAO_CONCLUIDA',1,$2,$3)`,[id,comando.correlation_id,JSON.stringify({verificacao_id:id,estado:result.estado,elegibilidade:result.elegibilidade})]);
      await client.query(`UPDATE a107.execucoes SET status='CONCLUIDA',encerrado_em=clock_timestamp(),atualizado_em=clock_timestamp()
       WHERE id=$1`,[execId]);
      await client.query('COMMIT');return result;
    }catch(e){await client.query('ROLLBACK');throw e;}finally{client.release?.()}
  }
  async publicarPacote(p:PacoteCarregado):Promise<void>{
    // Uso exclusivo por ferramenta de deploy com papel autorizado; nunca disponibilizar via endpoint administrativo.
    const client=await this.pool.connect();try{
      await client.query('BEGIN');
      const r=await client.query<{hash_sha256:string}>(`SELECT hash_sha256 FROM a107.pacotes_regras WHERE codigo=$1 AND versao=$2`,[p.pacote.id,p.pacote.versao]);
      if(r.rows.length){if(r.rows[0].hash_sha256!==p.pacote.hash_sha256)throw new Error('A107E0003: versão publicada com conteúdo diferente');}
      else await client.query(`INSERT INTO a107.pacotes_regras(codigo,versao,hash_sha256,manifesto,esquema_versao)
       VALUES($1,$2,$3,$4,$5)`,[p.pacote.id,p.pacote.versao,p.pacote.hash_sha256,JSON.stringify(p.manifesto),p.pacote.esquema_versao]);
      await client.query('COMMIT');
    }catch(e){await client.query('ROLLBACK');throw e}finally{client.release?.()}
  }
}
