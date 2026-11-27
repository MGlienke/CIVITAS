/**
 * Erro tipado de acesso negado durante consulta institucional.
 * Não representa ausência de evidência nem um resultado ontológico.
 * A tradução para HTTP/API depende da camada de transporte (ainda não definida).
 */
export class A107AcessoNegado extends Error {
  readonly codigo = 'A107E0002' as const;
  constructor(descricao = 'acesso a evidência institucional não autorizado') {
    super(`A107E0002: ${descricao}`);
    this.name = 'A107AcessoNegado';
  }
}
