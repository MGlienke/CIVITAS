# CIVITAS — A107-EOB — Núcleo Node.js/TypeScript v0.2.0

**Estado:** implementação técnica validada em banco isolado; cenários de integração INT-001 a INT-004 homologados e automatizados. **Não liberada para produção nem habilitada a emitir autorização institucional.**

**Serviço:** SRV-A107-003 — Verificar Condições Ontológicas de Realização.
**Fundamentos:** DEC-A107-001 a DEC-A107-007; regras do Marco A, condições CM-01 a CM-04, 23 requisitos (5 + 6 + 6 + 6).

## Capacidades implementadas

- Carregamento de regras Markdown e JSON compilado com manifesto e integridade SHA-256; regras publicadas são imutáveis.
- Avaliação conservadora dos requisitos e composição das quatro condições; sem fontes reais, `INDETERMINADA` e `VERIFICACAO_PENDENTE`.
- Orquestração de verificação com porta de autorização (`src/service.ts`) ainda dependente de implementação institucional confiável.
- Adaptador PostgreSQL (`src/postgres.ts`) com persistência em transação única, idempotência por organização/principal/solicitação, bloqueio consultivo transacional, registros de condição/requisito e outbox.
- Ferramentas demonstrativas `demo` (somente memória) e `pg-demo` (teste explícito; principal simulado).
- Migração SQL inicial em `db/migrations/001_a107_schema.sql`, **não reaplicável** em schema já instalado.

## Instalação e validação local

Requer Node.js 24 e npm. Na raiz de `plataforma/a107-eob`:

```powershell
npm ci
npm run build
npm test
npm run demo
```

`npm test` executa os **seis testes automatizados locais**, sem dependência de PostgreSQL. A publicação de um pacote de regras não ocorre automaticamente no build.

## Integração PostgreSQL reproduzível

A suíte `tests/integration-postgres.mjs` verifica:
- **INT-001:** gravação de execução, verificação, quatro condições, 23 requisitos e evento outbox;
- **INT-002:** repetição idempotente e rejeição `A107E0005` para parâmetros divergentes;
- **INT-003:** falha artificial após INSERT na outbox, antes do COMMIT, com ROLLBACK completo;
- **INT-004:** duas chamadas concorrentes resultam em uma execução, verificação e outbox.

**Pré-condições:** PostgreSQL com schema a107 instalado; pacote MARCO_A já publicado em procedimento controlado; `DATABASE_URL` apontando exclusivamente para banco `civitas_a107_teste`, usuário `civitas_a107_teste`, host local `localhost`/`127.0.0.1`. A suíte verifica esses parâmetros e exige `A107_TEST_INTEGRATION=SIM`. Ela **grava registros novos** com identificadores únicos, mantidos para auditoria; não apaga os anteriores.

```powershell
# Defina DATABASE_URL somente na sessao local, sem registra-la em arquivos versionados.
$env:A107_TEST_INTEGRATION = "SIM"
try {
    npm run test:integration
} finally {
    Remove-Item Env:A107_TEST_INTEGRATION -ErrorAction SilentlyContinue
}
```

**Evidência da rodada aprovada:** `eb85eaa0-0696-416b-aaba-5bde22bb7ca3`; quatro cenários aprovados. Relatório em `docs/revisoes/A107-INT-005_Consolidacao_e_Versionamento_v0_2.md` na raiz do repositório.

## Integração contínua — GitHub Actions

O workflow `.github/workflows/a107-eob-ci.yml`, localizado na raiz do repositório, executa `npm ci`, `npm run build` e `npm test` em alterações pertinentes ao A107-EOB. **Não executa `test:integration`**, pois este depende do banco local isolado e do pacote previamente publicado. Uma execução local aprovada não deve ser confundida com o resultado de um check do GitHub Actions.

## Segurança, limites e pendências

1. **Sem fontes institucionais reais integradas.** Não há adaptadores efetivos para os contratos de evidência dos módulos associados. Ausência de fonte mantém o resultado indeterminado; não é prova de descumprimento.
2. **Sem autenticação/autorização institucional efetiva.** `pg-demo` utiliza principal simulado e flags explícitas, exclusivamente em desenvolvimento. A porta `AuthorizationPort` exige integração com infraestrutura confiável.
3. **Avaliação semântica especializada incompleta.** Os operadores `corresponde`, `relacionado_a`, `fundamentado_em`, `vigente_em`, `reconhecido_por`, `satisfaz`, `precede`, e os compositores `para_cada`, `algum` e `nenhum` ainda demandam verificadores jurídicos/ontológicos. O operador `existe` admite demonstração elementar, não autorização do Marco A.
4. **Sem fluxo operacional de produção.** APIs HTTP, validação integral em runtime de contratos externos, worker diário, despacho efetivo da outbox, LOG/MET/MON completos e testes de carga permanecem pendentes.
5. **Regras controladas.** `scripts/compile_rules.py` recompila regras com Python/PyYAML apenas sob controle de publicação; não executar recompilação indiscriminada em deploy. A publicação de regras exige processo/papel autorizado, separado do operador comum.
6. **Banco e arquivos sensíveis.** Não versionar senhas, `.env`, dumps, `node_modules` ou `dist`. A migração SQL não deve ser reaplicada em schema a107 já existente. Nenhum resultado simulado constitui autorização institucional.

## Estrutura

- `src/contracts.ts`, `src/invariants.ts` — contratos e invariantes.
- `src/rule-loader.ts`, `rules/` — carregamento, validação de manifesto e regras.
- `src/engine.ts`, `src/service.ts` — avaliação conservadora e orquestração.
- `src/postgres.ts`, `src/ports.ts` — adaptador SQL e portas.
- `src/cli-demo.ts`, `src/pg-runner.ts` — demonstrações de desenvolvimento.
- `tests/*.test.ts` — testes locais; `tests/integration-postgres.mjs` — integração PostgreSQL.
- `db/migrations/` — SQL de instalação inicial.
- `scripts/compile_rules.py` — preparação controlada de regras.

**Escopo da homologação:** infraestrutura de persistência, idempotência sequencial, atomicidade e concorrência limitada a duas solicitações; nenhuma homologação de evidências institucionais ou liberação para produção.
