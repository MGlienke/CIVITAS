import test from 'node:test';
import assert from 'node:assert/strict';
import {generateKeyPairSync,sign,randomUUID} from 'node:crypto';
import {PublicadorSimuladoPostgres} from '../src/pg-simulacao.js';
import {PublicacaoControladaT3,VerificadorAtestadosT3,T3_AUDIENCIA_LAB} from '../src/confianca-t3.js';
import {hashComandoT2} from '../src/pg-simulacao.js';

const enabled = process.env.A103_T2_TEST_ONLY==='1' && !!process.env.A103_T2_DATABASE_URL;
const token=(payload,privateKey,kid)=>{
 const encoded=Buffer.from(JSON.stringify(payload)).toString('base64url');
 return {kid,payload:encoded,signature:sign(null,Buffer.from(encoded),privateKey).toString('base64url')};
};

test('T3-PG: atestados de teste autorizam somente comando firmado; rejeição não escreve', {skip:!enabled}, async()=>{
 const {default:pg}=await import('pg');
 const pool=new pg.Pool({connectionString:process.env.A103_T2_DATABASE_URL,max:3});
 try{
  const keyAuth=generateKeyPairSync('ed25519'),keyOrigin=generateKeyPairSync('ed25519');
  const checker=new VerificadorAtestadosT3({authorities:{
   't3-auth':{kind:'autorizacao',issuer:'IDENTIDADE_TEST_ONLY',publicKey:keyAuth.publicKey},
   't3-origin':{kind:'proveniencia',issuer:'ORIGEM_TEST_ONLY',publicKey:keyOrigin.publicKey}
  }});
  const guard=new PublicacaoControladaT3({publicador:new PublicadorSimuladoPostgres(pool),verificador:checker});
  const id=randomUUID(), nome='T3-TESTE-'+id;
  const c={solicitacao_id:id,correlation_id:id,ambiente:'SIMULADO',nome,
   origem_referencial:'procedimento-t3-simulado',provas:[{id:'referencia-test-only',custodiante:'C301-RDI'}]};
  const now=Date.now();
  const base={aud:T3_AUDIENCIA_LAB,simulacao:true,sub:'T3_TEST_PRINCIPAL',jti:randomUUID(),
   nbf:now-1000,exp:now+60000,command_hash:hashComandoT2(c),purpose:'CS04_T3_TEST'};
  const auth={...base,kind:'autorizacao',iss:'IDENTIDADE_TEST_ONLY',action:'publicar_simulacao',resource:'NOVA_ORGANIZACAO'};
  const prov={...base,kind:'proveniencia',iss:'ORIGEM_TEST_ONLY',procedure:'ORIGEM_DE_TESTE',
   origem_referencial:c.origem_referencial,provas_hash:hashComandoT2(c.provas)};
  const attestations={atestado_autorizacao:token(auth,keyAuth.privateKey,'t3-auth'),
   atestado_proveniencia:token(prov,keyOrigin.privateKey,'t3-origin')};
  await assert.rejects(guard.publicar(c,{...attestations,atestado_proveniencia:token({...prov,provas_hash:'falso'},keyOrigin.privateKey,'t3-origin')}),{code:'A103T3E0001'});
  const before=await pool.query('SELECT count(*)::int AS n FROM a103.organizacoes WHERE nome_referencia=$1',[nome]);
  assert.equal(before.rows[0].n,0);
  const result=await guard.publicar(c,attestations);
  assert.equal(result.ambiente,'SIMULADO'); assert.equal(result.marco_a_autorizado,false);
  assert.deepEqual(await guard.publicar(c,attestations),result);
  const after=await pool.query('SELECT count(*)::int AS n FROM a103.versoes_registro WHERE registro_id=$1',[result.registro_id]);
  assert.equal(after.rows[0].n,1);
 }finally{await pool.end();}
});
