# A107-EOB — Modelo Físico PostgreSQL v0.1

**Situação:** **HOMOLOGADA v0.1 pelo autor em 26/11/2026 — NÃO EXECUTADA**  
**Data:** 26/11/2026  
**Base:** DEC-A107-007 homologada; SRV-A107-003; CM-01–04; DEC-A107-001 a 006.

## Objetivo

Modelo físico homologado para primeira migração no banco `civitas_plataforma` e schema independente `a107`, sem alterações no schema `c105`. A proposta adota PostgreSQL 18 e UUIDs, interfaces com módulos proprietários por referências externas (sem FKs SQL cruzadas).

## Artefatos

- `001_a107_schema.sql` — migração física v0.1, disponibilizada em pacote ZIP da conversa de elaboração; **o SQL ainda não foi adicionado ao repositório nem executado no banco**.
- `README.md` — pressupostos, execução futura e pendências, no mesmo pacote.

## Inventário técnico

| Item | Quantidade |
|---|---:|
| Tabelas | 10 |
| Índices secundários | 8 |
| Triggers | 10 |

As tabelas são: `pacotes_regras`, `execucoes`, `verificacoes`, `resultados_condicao`, `resultados_requisito`, `referencias_evidencia`, `consultas_fonte`, `outbox`, `impactos_pendentes` e `execucoes_rotina`.

## Decisões incorporadas

- Resultados concluídos e evidências em regime **append-only**, preservando historicidade.
- Trigger de fechamento que confere existência das quatro condições CM-01–CM-04 e os 23 requisitos (5+6+6+6), coerência com dados da execução e agregação dos resultados.
- Idempotência por organização, principal e solicitação; hash do pedido; controle de conflito pela aplicação.
- `referencia_temporal` e `conhecimento_ate` como atributos distintos, além das versões/snapshots das fontes.
- Transação local PostgreSQL, referências de evidências de outros módulos, tabela de outbox e registros da reavaliação diária.
- A verificação pode produzir elegibilidade, mas **não autoriza** o Marco A.

## Limitações e condições para execução

A inspeção estrutural da migração e a contagem dos elementos passaram, mas **não houve validação de execução em PostgreSQL real**. Antes de homologar/executar: testar em banco de desenvolvimento, confirmar privilégios SQL, a trilha mínima de auditoria durável e os contratos de fontes; definir hash canônico, retenção, bloqueio de alterações em resultados e cobertura dos testes de concorrência, migração e rollback. A migração é executada uma vez sob gerenciador de migrações.

**Próxima ação:** incorporar os arquivos SQL ao repositório e executar testes controlados no PostgreSQL de desenvolvimento, validando DDL e gatilhos antes de qualquer implantação operacional.

## Registro de homologação

Em 26/11/2026, o autor declarou expressamente **“aprovado”** para o modelo físico PostgreSQL A107-EOB v0.1, incluindo dez tabelas, índices, gatilhos de proteção histórica e a validação de fechamento das quatro condições e 23 requisitos. A homologação **aprova o desenho e o script de migração como baseline**, mas não equivale à execução da migração ou à aprovação de testes de banco. O SQL e README continuam disponíveis no pacote de artefatos da conversa; sua incorporação física ao GitHub permanece pendente.
