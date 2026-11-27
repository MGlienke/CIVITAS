# CIVITAS — A107-EOB — A107-INT-005 — Consolidação e Versionamento

**Estado:** INT-001 a INT-004 homologados manualmente e reproduzidos com suíte de integração v0.2.0; integração à `main` e tag ainda pendentes.
**Ambiente validado:** Windows PowerShell, Node.js v24.19.0, PostgreSQL 18.6 em Docker, banco isolado `civitas_a107_teste`.
**Serviço:** SRV-A107-003 — Verificar Condições Ontológicas de Realização.
**Referências:** DEC-A107-001 a DEC-A107-007; implementação inicial Node.js/TypeScript v0.1.

## 1. Escopo validado

O pacote de regras `MARCO_A` possui CM-01 a CM-04, totalizando 23 requisitos (5, 6, 6 e 6). Sem fontes institucionais reais, o resultado permanece `INDETERMINADA` e a elegibilidade `VERIFICACAO_PENDENTE`. Nenhum resultado simulado autoriza ato institucional.

| Marco | Evidência observada | Resultado |
| --- | --- | --- |
| A107-INT-001 | Persistência de 1 pacote, 1 execução, 1 verificação, 4 condições, 23 requisitos e 1 evento outbox; verificação `b3dc7322-1191-4e4d-b436-871f10070072` | Aprovado |
| A107-INT-002.1 | Repetição do pedido com referência temporal original e hash idêntico retorna o mesmo `verificacao_id`; sem duplicações | Aprovado |
| A107-INT-002.2 | Mesmo `solicitacao_id` com parâmetros divergentes provoca `A107E0005`; contagens invariantes | Aprovado |
| A107-INT-003.1 | Falha controlada após inserção da outbox, antes do COMMIT, provoca ROLLBACK; nova solicitação `TESTE-A107-INT003-001` com zero registros | Aprovado |
| A107-INT-004 | Duas chamadas simultâneas, com mesmo pedido, retornam `02b91acc-253f-4c46-9655-80f393612813`; apenas 1 execução, 1 verificação e 1 outbox persistidos | Aprovado |

Após restauração do `src/postgres.ts` original, `npm run build` terminou sem erro e `npm test` apresentou **6 testes aprovados e 0 falhas**. Esses seis testes locais não cobrem automaticamente todos os cenários de integração acima, executados de forma controlada e manual.

## 2. Evidências adicionais

- Pedido inicial da solicitação `TESTE-A107-INT001-001`: hash SHA-256 `fa234a1eedfbfbb500dad703d73ca6aab68a10e20477b1ee57799a0cf84a6752`, recomputado e conferido com o valor armazenado.
- Referência temporal original: `2026-11-27T02:07:39.028Z`.
- Proteção da operação por `pg_advisory_xact_lock` e recuperação idempotente de resultado persistido, demonstradas no cenário concorrente de duas chamadas.
- Teste de falha de outbox: comprovada ausência de registros parciais após rollback.
- O código de injeção de falha do INT-003 foi restaurado a partir de backup; a variável `A107_TEST_FAIL_AFTER_OUTBOX` foi retirada do ambiente de teste.

## 3. Limites da homologação

Esta homologação é **técnica e parcial**. Não prova funcionamento de adaptadores institucionais de evidências, autenticação real, autorização contextual institucional, semântica normativa completa, APIs HTTP, worker diário, publicação/consumo externo da outbox, testes de carga ou isolamento sob concorrência elevada. O banco `civitas_plataforma` não foi alvo dos testes de integração descritos.

## 4. Preparação para versionamento

**Versão declarada nos fontes:** v0.2.0. Código publicado na branch `feature/a107-eob-v0.2.0` (commits `a630526` e `e46725f`); revisão, integração à `main` e criação de tag ainda pendentes.

Publicar em diretório próprio, por exemplo `plataforma/a107-eob/`, os seguintes itens de `C:\CIVITAS\a107-eob`:
- `src/`, `tests/`, `rules/`, `scripts/` e demais arquivos de configuração necessários à compilação;
- `package.json`, `package-lock.json`, `tsconfig.json` e `README.md`;
- arquivo de ignore para `node_modules/`, `dist/`, `.env*` e backups;
- testes reproduzíveis de integração em banco isolado, com proteções contra execução em produção.

Não versionar `DATABASE_URL`, senhas, backups `*.bak*`, `node_modules/`, `dist/`, dumps ou dados reais. Conferir alterações, executar `npm ci`, `npm run build`, `npm test` e revisar segredos antes do commit/tag.

## 5. Pendências do A107-INT-005

1. [x] Incorporar os testes manuais de INT-001 a INT-004 à suíte reproduzível de integração.
2. [x] Transferir os fontes locais para uma branch de versionamento no GitHub.
3. [ ] Revisar o conteúdo, conferir limpeza da branch, validar alterações em revisão antes da integração à `main`.
4. [ ] Publicar tag da versão somente após revisão e aceite.
5. [x] Preservar a condição `INDETERMINADA`/`VERIFICACAO_PENDENTE` na ausência de fontes institucionais.

**Critério de encerramento do INT-005:** fontes e testes versionados, documentação consistente, build/testes em clone limpo e identificação inequívoca de limites operacionais.

## 6. Execução da suíte automatizada (evidência posterior)

**Resultado informado da execução de `npm run test:integration`: 4 cenários aprovados, compilação TypeScript sem erros.**

- **INT-001:** verificação persistida `14610d83-a450-4d9b-8fc3-09e7514ec900`.
- **INT-002:** replay retornou a mesma verificação `14610d83-a450-4d9b-8fc3-09e7514ec900`; conflito de parâmetros divergentes foi rejeitado.
- **INT-003:** falha após INSERT da outbox levou a rollback; solicitação `TESTE-A107-INT005-eb85eaa0-0696-416b-aaba-5bde22bb7ca3-ROLLBACK` ficou com **0 registros**.
- **INT-004:** duas chamadas simultâneas retornaram a verificação `49c3b07b-4307-4d7b-a928-6a3869222a56`, persistida uma única vez.
- **Rodada:** `eb85eaa0-0696-416b-aaba-5bde22bb7ca3`.
- **Limpeza:** variável `A107_TEST_INTEGRATION` removida após teste; os dados de teste persistidos foram preservados para auditoria.

Arquivos da suíte: `plataforma/a107-eob/tests/integration-postgres.mjs` e script `test:integration` em `package.json`. A suíte é habilitada explicitamente, só aceita credenciais e banco de teste locais, e não publica pacotes de regras.

**Resultado:** homologação técnica reproduzível dos quatro cenários; pendente revisão final, integração à `main` e tag. Não equivale à homologação de fontes institucionais reais nem à liberação para produção.
