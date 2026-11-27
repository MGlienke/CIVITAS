import test from 'node:test';
import assert from 'node:assert/strict';
import {generateKeyPairSync,sign,randomUUID} from 'node:crypto';
import {PublicacaoControladaT3,VerificadorAtestadosT3,T3_AUDIENCIA_LAB} from '../src/confianca-t3.js';
import {hashComandoT2} from '../src/pg-simulacao.js';

const keys = ()=>generateKeyPairSync('ed25519');
const signed = (claims,priv,kid) => {
 const payload=Buffer.from(JSON.stringify(claims)).toString('base64url');
 return {kid,payload,signature:sign(null,Buffer.from(payload,'utf8'),priv).toString('base64url')};
};
const now=Date.now();
function fixture({publicador={publicar: async()=>({estado:'PUBLICADA',ambiente:'SIMULADO'})}}={}) {
 const auth=keys(),prov=keys();
 const verificador=new VerificadorAtestadosT3({authorities:{
  auth:{issuer:'IDENTIDADE_TEST_ONLY',kind:'autorizacao',publicKey:auth.publicKey},
  prov:{issuer:'ORIGEM_TEST_ONLY',kind:'proveniencia',publicKey:prov.publicKey}
 }});
 const comando={solicitacao_id:randomUUID(),correlation_id:randomUUID(),ambiente:'SIMULADO',
  nome:'Organização Teste',origem_referencial:'referencia-simulada',provas:[{id:'evidencia-simulada',custodiante:'C301-RDI'}]};
 const common={aud:T3_AUDIENCIA_LAB,simulacao:true,nbf:now-1000,exp:now+60000,jti:randomUUID(),sub:'TESTER'};
 const authorization={...common,kind:'autorizacao',iss:'IDENTIDADE_TEST_ONLY',
  action:'publicar_simulacao',purpose:'CS04_T3_TEST',resource:'NOVA_ORGANIZACAO',
  command_hash:hashComandoT2(comando)};
 const provenance={...common,kind:'proveniencia',iss:'ORIGEM_TEST_ONLY',
  purpose:'CS04_T3_TEST',procedure:'ORIGEM_DE_TESTE',
  origem_referencial:comando.origem_referencial,provas_hash:hashComandoT2(comando.provas),
  command_hash:hashComandoT2(comando)};
 const token=(a=authorization,p=provenance)=>({
  atestado_autorizacao:signed(a,auth.privateKey,'auth'),
  atestado_proveniencia:signed(p,prov.privateKey,'prov')
 });
 const guard=new PublicacaoControladaT3({publicador,verificador,now:()=>now});
 return {guard,comando,token,authorization,provenance,auth,prov};
}
const publish=async(f,opts=f.token())=>f.guard.publicar(f.comando,opts);
const rejected=async(p)=>assert.rejects(p,{code:'A103T3E0001'});

test('T3-01: negar sem modo teste',async()=>{
 const f=fixture();const prev=process.env.A103_T2_TEST_ONLY;delete process.env.A103_T2_TEST_ONLY;
 try{await rejected(publish(f));}finally{if(prev===undefined)delete process.env.A103_T2_TEST_ONLY;else process.env.A103_T2_TEST_ONLY=prev;}
});
test('T3-02: dupla assinatura confiável habilita apenas simulação',async()=>{
 const f=fixture();const prev=process.env.A103_T2_TEST_ONLY;process.env.A103_T2_TEST_ONLY='1';
 try{assert.equal((await publish(f)).ambiente,'SIMULADO');}finally{if(prev===undefined)delete process.env.A103_T2_TEST_ONLY;else process.env.A103_T2_TEST_ONLY=prev;}
});
test('T3-03: sem atestado nega antes de consultar persistência',async()=>{
 const f=fixture();const prev=process.env.A103_T2_TEST_ONLY;process.env.A103_T2_TEST_ONLY='1';
 try{await rejected(f.guard.publicar(f.comando,{}));}finally{if(prev===undefined)delete process.env.A103_T2_TEST_ONLY;else process.env.A103_T2_TEST_ONLY=prev;}
});
test('T3-04: assinatura adulterada nega',async()=>{
 const f=fixture();const prev=process.env.A103_T2_TEST_ONLY;process.env.A103_T2_TEST_ONLY='1';
 try{const t=f.token();t.atestado_autorizacao.signature=t.atestado_autorizacao.signature.slice(0,-2)+'AA';await rejected(publish(f,t));}
 finally{if(prev===undefined)delete process.env.A103_T2_TEST_ONLY;else process.env.A103_T2_TEST_ONLY=prev;}
});
test('T3-05: emissor ou chave desconhecida nega',async()=>{
 const f=fixture();const prev=process.env.A103_T2_TEST_ONLY;process.env.A103_T2_TEST_ONLY='1';
 try{const t=f.token();t.atestado_autorizacao.kid='unknown';await rejected(publish(f,t));}
 finally{if(prev===undefined)delete process.env.A103_T2_TEST_ONLY;else process.env.A103_T2_TEST_ONLY=prev;}
});
test('T3-06: propósito incorreto nega',async()=>{
 const f=fixture();const prev=process.env.A103_T2_TEST_ONLY;process.env.A103_T2_TEST_ONLY='1';
 try{await rejected(publish(f,f.token({...f.authorization,purpose:'MARCO_A'})));}
 finally{if(prev===undefined)delete process.env.A103_T2_TEST_ONLY;else process.env.A103_T2_TEST_ONLY=prev;}
});
test('T3-07: recurso de organização diferente nega',async()=>{
 const f=fixture();const prev=process.env.A103_T2_TEST_ONLY;process.env.A103_T2_TEST_ONLY='1';
 try{await rejected(publish(f,f.token({...f.authorization,resource:'OUTRA_ORGANIZACAO'})));}
 finally{if(prev===undefined)delete process.env.A103_T2_TEST_ONLY;else process.env.A103_T2_TEST_ONLY=prev;}
});
test('T3-08: token expirado nega',async()=>{
 const f=fixture();const prev=process.env.A103_T2_TEST_ONLY;process.env.A103_T2_TEST_ONLY='1';
 try{await rejected(publish(f,f.token({...f.authorization,nbf:now-30000,exp:now-1})));}
 finally{if(prev===undefined)delete process.env.A103_T2_TEST_ONLY;else process.env.A103_T2_TEST_ONLY=prev;}
});
test('T3-09: token futuro nega',async()=>{
 const f=fixture();const prev=process.env.A103_T2_TEST_ONLY;process.env.A103_T2_TEST_ONLY='1';
 try{await rejected(publish(f,f.token({...f.authorization,nbf:now+10000,exp:now+20000})));}
 finally{if(prev===undefined)delete process.env.A103_T2_TEST_ONLY;else process.env.A103_T2_TEST_ONLY=prev;}
});
test('T3-10: audiência incorreta nega',async()=>{
 const f=fixture();const prev=process.env.A103_T2_TEST_ONLY;process.env.A103_T2_TEST_ONLY='1';
 try{await rejected(publish(f,f.token({...f.authorization,aud:'A107-EOB'})));}
 finally{if(prev===undefined)delete process.env.A103_T2_TEST_ONLY;else process.env.A103_T2_TEST_ONLY=prev;}
});
test('T3-11: troca de origens e provas nega',async()=>{
 const f=fixture();const prev=process.env.A103_T2_TEST_ONLY;process.env.A103_T2_TEST_ONLY='1';
 try{await rejected(publish(f,f.token(f.authorization,{...f.provenance,origem_referencial:'outra'})));}
 finally{if(prev===undefined)delete process.env.A103_T2_TEST_ONLY;else process.env.A103_T2_TEST_ONLY=prev;}
});
test('T3-12: troca de comando depois de assinar nega',async()=>{
 const f=fixture();const prev=process.env.A103_T2_TEST_ONLY;process.env.A103_T2_TEST_ONLY='1';
 try{const t=f.token();f.comando.nome='MUDANÇA';await rejected(publish(f,t));}
 finally{if(prev===undefined)delete process.env.A103_T2_TEST_ONLY;else process.env.A103_T2_TEST_ONLY=prev;}
});
test('T3-13: chave de origem não pode assinar autorização',async()=>{
 const f=fixture();const prev=process.env.A103_T2_TEST_ONLY;process.env.A103_T2_TEST_ONLY='1';
 try{const t=f.token();t.atestado_autorizacao=signed(f.authorization,f.prov.privateKey,'prov');await rejected(publish(f,t));}
 finally{if(prev===undefined)delete process.env.A103_T2_TEST_ONLY;else process.env.A103_T2_TEST_ONLY=prev;}
});
test('T3-14: modo REAL nunca entra por esta fronteira',async()=>{
 const f=fixture();const prev=process.env.A103_T2_TEST_ONLY;process.env.A103_T2_TEST_ONLY='1';
 try{f.comando.ambiente='REAL';await rejected(publish(f));}
 finally{if(prev===undefined)delete process.env.A103_T2_TEST_ONLY;else process.env.A103_T2_TEST_ONLY=prev;}
});
test('T3-15: sem emissor de prova nega',async()=>{
 const f=fixture();const prev=process.env.A103_T2_TEST_ONLY;process.env.A103_T2_TEST_ONLY='1';
 try{const t=f.token();delete t.atestado_proveniencia;await rejected(publish(f,t));}
 finally{if(prev===undefined)delete process.env.A103_T2_TEST_ONLY;else process.env.A103_T2_TEST_ONLY=prev;}
});
test('T3-16: falha na autorização não chama o adaptador persistente',async()=>{
 let count=0;const f=fixture({publicador:{publicar:async()=>{count++;return {};}}});const prev=process.env.A103_T2_TEST_ONLY;process.env.A103_T2_TEST_ONLY='1';
 try{await rejected(publish(f,f.token({...f.authorization,resource:'FORA_DO_ESCOPO'})));assert.equal(count,0);}
 finally{if(prev===undefined)delete process.env.A103_T2_TEST_ONLY;else process.env.A103_T2_TEST_ONLY=prev;}
});
