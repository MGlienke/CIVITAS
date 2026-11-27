# A103-GEP T2 — PostgreSQL exclusivamente SIMULADO

**Status: implementação candidata. Migração e teste de banco ainda NÃO executados/homologados.**

O T2 contém um script SQL **manual** para banco DEV, nove tabelas no schema `a103`, publicador transacional (BEGIN/COMMIT/ROLLBACK), proteção de histórico, outbox, versionamento, idempotência e falhas injetáveis.

**Não** é serviço A103 institucional real, não autentica Pessoas, não implementa CE-01 real, não reconstrói historicidade bitemporal completa e **não autoriza Marco A**. A ESP-A103-CS04-002 (PR #7) permanece proposta. O T2 apenas demonstra, com simulação, a viabilidade de certas decisões.

## Testes locais sem PostgreSQL

```powershell
cd C:\CIVITAS\CIVITAS-repo\plataforma\a103-gep
npm install
npm test
```

O comando mantém os 12 testes T1 e acrescenta 3 testes unitários T2. O teste PostgreSQL é registrado como `SKIP` quando não se configura banco; **SKIP não significa validação PostgreSQL**.

## Ensaio no PostgreSQL (DEV isolado)

Pré-condições: Node >=22, PostgreSQL em **banco de desenvolvimento separado**, usuário autorizado e schema `a103` inexistente. **Não execute o SQL no banco operacional nem se já houver um schema a103.**

1. Aplique uma única vez `db/migrations/001_a103_t2_simulacao.sql` por `psql` ou seu gerenciador de migrações em **BANCO_DEV**. A execução é manual, não ocorre pelo `npm test`.
2. No PowerShell, sem compartilhar credenciais, defina:

```powershell
$env:A103_T2_TEST_ONLY = '1'
$env:A103_T2_DATABASE_URL = 'postgresql://USUARIO:SENHA@127.0.0.1:5432/BANCO_DEV'
npm run test:pg
```

3. Confira que **T2-PG está aprovado, não SKIP**. O teste cria registros SIMULADOS de teste (sem remoção automática) e exercita publicação, rollback de falha injetada, outbox, idempotência, retificação, proteção histórica e concorrência.

Ao terminar:

```powershell
Remove-Item Env:A103_T2_TEST_ONLY
Remove-Item Env:A103_T2_DATABASE_URL
```

## Controles e limitações

- O publicador só permite `ambiente: SIMULADO`, ativação `A103_T2_TEST_ONLY=1` e um principal **simulado**.
- Essa ativação **não é autenticação, autorização ou aprovação institucional**; não conceder acesso ao serviço em rede.
- Não cruza FKs entre módulos e não altera a base do A107-EOB nem `c105`.
- As tabelas de T2 **não implementam ainda** todo o fluxo de propostas, snapshots e histórico de consultas desenhado pela ESP-A103-CS04-002.
- A função de retenção, resolução probatória externa e autorização real são entregas posteriores.
- Para considerar T2 validado, são necessários testes reais de banco, revisão do SQL, privilégios, migrações e rollback, sem tratar os dados de teste como institucionais.
