# A107-EOB — Contratos físicos TypeScript e JSON Schema — SRV-A107-003 v0.1

**Estado:** IMPLEMENTAÇÃO INICIAL CONCLUÍDA EM PACOTE — PROPOSTA, NÃO HOMOLOGADA  
**Data:** 27/11/2026  
**Referências homologadas:** DEC-A107-001 a DEC-A107-007, SRV-A107-003, CM-01–CM-04 e modelo físico PostgreSQL v0.1.  
**Integração ao banco:** não realizada nesta entrega.

## Entrega

Pacote `CIVITAS_A107_Contratos_SRV-A107-003_v0_1.zip` disponibilizado na conversa contém **16 arquivos**:

- `src/contracts.ts`: tipos, estados, portas de comando, consulta, persistência, telemetria, autorização e provedor de evidência;
- `src/invariants.ts`: validação de 4 condições/23 requisitos, composição do Marco A, corte temporal, correlação de consultas e prova de completude;
- cinco arquivos `schemas/*.schema.json`, Draft 2020-12: `common`, `verification-command`, `evidence-query`, `evidence-response`, `verification-result`;
- quatro exemplos `examples/*.json` válidos/inválidos, inclusive rejeição de `principal_id` autodeclarado e de `MARCO_A_AUTORIZADO`;
- testes e instruções de execução, `tsconfig.json` e `package.json`.

## Correspondência com PostgreSQL

`execucoes` usa chave única `(organizacao_id, principal_id, solicitacao_id)`. O comando não transporta `principal_id`: o contexto confiável de autenticação o fornece. São distintos os timestamps `referencia_temporal`, `conhecimento_ate` e `executado_em`. O resultado do Marco A usa apenas `ATENDIDA`, `NAO_ATENDIDA` e `INDETERMINADA`; `NAO_APLICAVEL` permanece apenas estado lógico para futuros contextos. O objeto `PacoteRegras` identifica versão e hash; a elegibilidade não equivale a autorização. A porta `concluirComOutbox` exige que a transação local grave resultado e evento conjuntamente.

## Verificações efetivamente executadas

- TypeScript: `tsc --noEmit -p tsconfig.json` — **aprovado**.
- JSON Schema Draft 2020-12: integridade dos cinco esquemas — **aprovada**.
- Fixtures positivos: comando, resposta de evidência e resultado completo com quatro condições e 23 requisitos — **aprovados**.
- Fixtures negativos: principal autodeclarado no corpo e autorização indevida no lugar de elegibilidade — **rejeitados**.
- Validações executadas de invariantes TypeScript: conjunto completo, elegibilidade coerente e prova de completude — **aprovadas**.

## Limites e pontos pendentes

Estes contratos ainda são proposta técnica a homologar. **Não há integração executável com PostgreSQL, APIs dos módulos externos, leitura real das regras, motor completo de operadores, comando SRV-A107-003 operacional nem execução real de verificações.** Os exemplos são artificiais. Os esquemas estruturais isolados não provam pertinência normativa/ontológica, suficiência de evidências, nem coerência temporal cruzada. A capacidade de impedir um fechamento sem evento na outbox continua exigindo transação de aplicação e teste dedicado.

O pacote ZIP ainda precisa ser incorporado como arquivos físicos ao repositório CIVITAS. A homologação eventual deverá abranger o contrato físico sem presumir serviços de fontes já existentes. Após homologação, próximo passo será criar a estrutura Node.js/TypeScript e o adaptador PostgreSQL, com testes de integração e transação real.
