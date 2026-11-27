/**
 * T3 — Fronteira de confiança exclusivamente de LABORATÓRIO.
 * Verificação Ed25519 de atestados com chaves públicas injetadas; política deny-by-default.
 * NÃO emite credenciais, NÃO implementa C103-IEA, NÃO reconhece Pessoa, competência
 * institucional ou provas documentais reais. Nenhuma chave privada é armazenada aqui.
 */
import { verify as verifySignature } from 'node:crypto';
import { hashComandoT2 } from './pg-simulacao.js';

const AUD = 'A103-GEP-T3-LAB';
const ACTION = 'publicar_simulacao';
const MAX_TTL_MS = 5 * 60 * 1000;
const MAX_TOKEN_BYTES = 8192;
const deny = () => { const e = new Error('A103T3E0001: acesso ou proveniência não demonstrados'); e.code = 'A103T3E0001'; throw e; };
const nonempty = x => typeof x === 'string' && x.trim().length > 0 && x.length <= 512;
const plain = x => x !== null && typeof x === 'object' && !Array.isArray(x);
const b64pattern = /^[A-Za-z0-9_-]+$/;

/** Verificador fechado: não permite seleção de algoritmo pelo atestado. */
export class VerificadorAtestadosT3 {
  #authorities;
  constructor({ authorities = {} } = {}) {
    this.#authorities = new Map();
    for (const [kid, descriptor] of Object.entries(authorities)) {
      if (!nonempty(kid) || !plain(descriptor) || !nonempty(descriptor.issuer) ||
          !['autorizacao','proveniencia'].includes(descriptor.kind) || !descriptor.publicKey) throw new TypeError('descritor de autoridade inválido');
      this.#authorities.set(kid, Object.freeze({issuer:descriptor.issuer,kind:descriptor.kind,publicKey:descriptor.publicKey}));
    }
  }
  verificar(token, kind, now = Date.now()) {
    if (!plain(token) || Object.keys(token).sort().join('|') !== 'kid|payload|signature' ||
        !nonempty(token.kid) || typeof token.payload !== 'string' || !token.payload.length ||
        typeof token.signature !== 'string' || token.signature.length > 256 || !token.signature.length ||
        token.payload.length > MAX_TOKEN_BYTES || !b64pattern.test(token.payload) || !b64pattern.test(token.signature)) deny();
    const authority = this.#authorities.get(token.kid);
    if (!authority || authority.kind !== kind) deny();
    try {
      const bytes = Buffer.from(token.payload,'base64url');
      if (bytes.toString('base64url') !== token.payload) deny();
      const sig = Buffer.from(token.signature,'base64url');
      if (sig.length !== 64 || sig.toString('base64url') !== token.signature ||
          !verifySignature(null,Buffer.from(token.payload,'utf8'),authority.publicKey,sig)) deny();
      const claims = JSON.parse(bytes.toString('utf8'));
      if (!plain(claims) || claims.iss !== authority.issuer || claims.kind !== kind ||
          claims.aud !== AUD || claims.simulacao !== true || !nonempty(claims.sub) ||
          !nonempty(claims.jti) || !Number.isSafeInteger(claims.nbf) ||
          !Number.isSafeInteger(claims.exp) || claims.exp <= claims.nbf ||
          claims.exp - claims.nbf > MAX_TTL_MS || now < claims.nbf || now >= claims.exp) deny();
      return claims;
    } catch { deny(); }
  }
}

/**
 * Guarda adicional em torno do publicador T2. T2 continua explicitamente simulado;
 * sem esta guarda o adaptador T2 só pode ser invocado como laboratório (env TEST_ONLY).
 * Atestrado de autenticação e atestado da origem são independentes e vinculados
 * ao hash canônico do mesmo comando. Não confiar em principal no corpo do comando.
 */
export class PublicacaoControladaT3 {
  constructor({ publicador, verificador, now = () => Date.now() }) {
    if (!publicador?.publicar || !(verificador instanceof VerificadorAtestadosT3)) throw new TypeError('dependências T3 inválidas');
    this.publicador = publicador;
    this.verificador = verificador;
    this.now = now;
  }
  async publicar(comando,{atestado_autorizacao,atestado_proveniencia}={}) {
    if (process.env.A103_T2_TEST_ONLY !== '1' || !plain(comando) ||
        comando.ambiente !== 'SIMULADO' || !nonempty(comando.solicitacao_id) ||
        !nonempty(comando.origem_referencial) || !Array.isArray(comando.provas) ||
        !comando.provas.length) deny();
    const hash = hashComandoT2(comando);
    const now = this.now();
    const a=this.verificador.verificar(atestado_autorizacao,'autorizacao',now);
    const p=this.verificador.verificar(atestado_proveniencia,'proveniencia',now);
    if (a.action !== ACTION || a.command_hash !== hash || !nonempty(a.purpose) ||
        a.purpose !== 'CS04_T3_TEST' || a.resource !== (comando.organizacao_id ?? 'NOVA_ORGANIZACAO') ||
        p.command_hash !== hash || p.origem_referencial !== comando.origem_referencial ||
        p.provas_hash !== hashComandoT2(comando.provas) ||
        p.procedure !== 'ORIGEM_DE_TESTE' || p.purpose !== 'CS04_T3_TEST') deny();
    // ATENÇÃO: estas assinaturas demonstram apenas a origem das fixtures do laboratório.
    // Não atestam a autenticidade documental/autoridade pública das fontes declaradas.
    return this.publicador.publicar(comando,{principal_simulado:a.sub,permitir_simulacao:true});
  }
}

export const T3_AUDIENCIA_LAB = AUD;
