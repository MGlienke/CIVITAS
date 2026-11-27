# CIVITAS — A107-EOB — Implementação inicial Node.js/TypeScript v0.1

**Situação:** primeira implementação técnica gerada, testada localmente, **não homologada** e **não executada contra o PostgreSQL real**.  
**Data:** 27/11/2026.  
**Decisões de referência:** DEC-A107-001 a DEC-A107-007, SRV-A107-003, condições CM-01 a CM-04 e modelo físico PostgreSQL v0.1.

## Entrega

O pacote `CIVITAS_A107_EOB_Servico_NodeTS_v0_1.zip` foi disponibilizado como artefato da conversa; **seu código ainda não foi incorporado fisicamente ao repositório GitHub**.

O projeto contém:
- `src/contracts.ts` e `src/invariants.ts` — contratos e verificações estruturais anteriores;
- `src/rule-loader.ts` — carregamento do pacote com hash SHA-256 dos cinco Markdown e respectivos JSON compilados, manifestação e validação de requisitos;
- `src/engine.ts` — avaliação conservadora de evidências, composição determinística de CM-01–04, resultado do Marco A;
- `src/service.ts` — orquestração do SRV-A107-003 com porta de autenticação;
- `src/postgres.ts` e `src/ports.ts` — transação local e persistência com chave de idempotência, 23 requisitos e outbox;
- `src/cli-demo.ts` — demonstração offline (sem SQL);
- `src/pg-runner.ts` — execução de demonstração de desenvolvimento com flags explícitas;
- `rules/*.md`, `rules/*.json`, `rules/manifest.json` — cinco condições e composição homologadas, compilação controlada;
- `tests/` — testes locais, `scripts/compile_rules.py`, configuração TS e README.

## Testes realizados

**TypeScript compilado com sucesso. Seis testes locais aprovados:**
1. Regras homologadas carregam quatro condições e 23 requisitos, com checagens de hashes.
2. Sem fornecedores reais, resultado `INDETERMINADA` e `VERIFICACAO_PENDENTE`, não autorização.
3. Chave de idempotência tem hash estável, alterando com parâmetros divergentes.
4. Pacote inclui hashes de integridade.
5. Cliente SQL simulado verifica persistência dos 23 requisitos, evento na outbox e `COMMIT` ao final.
6. Cliente SQL simulado rejeita a outbox e provoca `ROLLBACK`, sem `COMMIT`.

A demonstração executada localmente retornou CM-01..04 = `INDETERMINADA`, `MARCO_A` = `VERIFICACAO_PENDENTE`, sem gravação no banco.

## Limites

- O motor é **inicial**: operadores que demandam fundamentação normativa/ontológica, legitimidade, temporalidade jurídica e completude exigem verificadores especializados ainda não desenvolvidos. Não apresentar `ATENDIDA` para tais exigências sem prova.
- Não há adaptadores reais de A103, A108, C302, C309, C101, C103, E3 e D1.
- Não há integração SQL real executada neste pacote, autenticação efetiva via C103, APIs HTTP, publicação efetiva de eventos, worker diário ou testes de implantação.
- A biblioteca `pg` precisa ser instalada no ambiente do usuário; não estava disponível no ambiente de construção offline.
- O pacote ainda depende de **homologação do código e testes reais** antes de considerar SRV-A107-003 operacional.

## Próxima etapa

Transferir pacote para `C:\CIVITAS\a107-eob`, executar `npm install`, `npm test` e `npm run demo` sem banco; depois integrar e testar `pg` em banco de desenvolvimento, roles/grants, publicação controlada das regras, idempotência e transação outbox.
