# CIVITAS — A107-EOB — Núcleo Node.js/TypeScript v0.2.0

**Situação atual (v0.2.0):** implementação e integração técnica com PostgreSQL em banco de teste homologadas nos cenários INT-001 a INT-004; **não liberada para produção**. Os adaptadores institucionais, a autenticação real e as verificações jurídico-ontológicas especializadas ainda não foram implantados.

## Testes de integração reproduzíveis — A107-INT-005

A suíte `tests/integration-postgres.mjs` utiliza o PostgreSQL real e cobre:
- INT-001: persistência da verificação, 4 condições, 23 requisitos e outbox;
- INT-002: repetição idempotente e erro `A107E0005` em pedido divergente;
- INT-003: falha artificial depois do INSERT da outbox, antes do COMMIT, com ROLLBACK;
- INT-004: duas chamadas concorrentes com identificador idêntico e apenas uma gravação.

**Proteção obrigatória:** executar somente com `DATABASE_URL` apontando para `127.0.0.1`/`localhost`, usuário `civitas_a107_teste`, banco `civitas_a107_teste`, esquema previamente instalado e pacote `MARCO_A` já publicado por processo controlado. A suíte exige também `A107_TEST_INTEGRATION=SIM`. Ela cria identificadores exclusivos a cada rodada, **grava dados de teste que permanecem no banco** para auditoria, e não apaga nem altera registros antigos.

```powershell
cd C:\CIVITAS\CIVITAS-repo\plataforma\a107-eob
# Configurar DATABASE_URL com a credencial de teste nesta sessao; nunca salvar senha no repositorio
$env:A107_TEST_INTEGRATION = "SIM"
npm run test:integration
Remove-Item Env:A107_TEST_INTEGRATION -ErrorAction SilentlyContinue
```

Os seis testes locais permanecem disponíveis em `npm test`, sem PostgreSQL. O relatório histórico da homologação manual está em `docs/revisoes/A107-INT-005_Consolidacao_e_Versionamento_v0_2.md` na raiz do repositório.

---

## Notas históricas da implementação inicial v0.1

O conteúdo abaixo registra o estado inicial do serviço **antes** dos testes reais de integração; referências a integrações PostgreSQL pendentes devem ser lidas como histórico, não como estado atual.

**Estado:** primeira implementação técnica para desenvolvimento/testes, **não homologada nem implantada**.  
**Base:** SRV-A107-003, DEC-A107-001..007 e PostgreSQL `civitas_plataforma.a107` (modelo físico v0.1 homologado e 5 testes manuais de banco aprovados pelo usuário).  
**O que foi implementado:** carregador e validador estrutural com SHA-256 de Markdown/YAML e JSON compilado, composição determinística `todos` para CM-01..04, avaliação conservadora, contratos existentes, serviço orquestrador, adaptador transacional PostgreSQL, publicação controlada de pacote e testes unitários com cliente SQL simulado.

## Segurança e limites

1. **Não há módulos institucionais conectados**, nem autenticação/autorizações reais C103-IEA. As condições sem fonte são `INDETERMINADA`, nunca `NAO_ATENDIDA` por silêncio. O teste local não concede Marco A.
2. A verificação inicial **não implementa juridicamente** `corresponde`, `relacionado_a`, `fundamentado_em`, `vigente_em`, `reconhecido_por`, `satisfaz`, `precede` ou a avaliação completa de `para_cada`, `algum` e `nenhum`: estes permanecem indeterminados sem verificadores especializados. `existe` admite apenas demonstração elementar por evidência identificada, versão e procedência; não basta para concluir o Marco A.
3. **Sem conexão PostgreSQL real neste ambiente de preparação.** A operação de persistência foi testada com cliente SQL simulado (ordem dos 23 INSERTs, outbox antes do fechamento, COMMIT/ROLLBACK). A integração real deverá ser validada no ambiente do usuário.
4. O serviço `VerificarCondicoesService` exige uma porta `AuthorizationPort` real; nenhum principal autodeclarado em payload deve ser considerado autenticação. O `pg-runner` foi incluído **exclusivamente para desenvolvimento** e pode operar com principal simulado, sob flags explícitas.
5. Arquivos `.md` homologados não são interpretados via execução de código. O script de build `scripts/compile_rules.py` gera arquivos JSON e manifesto com hashes; o runtime rejeita alterações nos `.md`, `.json` e manifesto. **A publicação de pacotes é uma atividade de deploy controlada**, nunca uma ação de GOI ou Administrador da Plataforma.
6. A persistência real depende de `pg`, instalada em um ambiente com acesso ao npm, e de autorização adequada na base PostgreSQL.
7. `src/postgres.ts` não modifica os schemas já instalados. Chama operações SQL parametrizadas em `a107`, sem tocar em `c105`.

## Executar localmente no Windows (primeira validação, sem banco)

Descompacte o ZIP em `C:\CIVITAS\a107-eob` e abra o PowerShell:

```powershell
cd C:\CIVITAS\a107-eob
npm install
npm run build
npm test
npm run demo
```

O `npm run demo` apenas lê regras, calcula resultados **INDETERMINADA**, e exibe as quatro condições e 23 requisitos; **não grava nada no PostgreSQL**. O pacote inclui `dist` pré-compilado para permitir um teste rápido com `node dist/src/cli-demo.js` sem instalar dependências, desde que o Node.js esteja instalado.

## Preparar código-fonte das regras

O conteúdo do diretório `rules` foi compilado a partir dos cinco `.md` homologados. Para recompilar é necessário Python e PyYAML:

```powershell
python -m pip install pyyaml
python scripts/compile_rules.py
```

A recompilação deve ocorrer no processo controlado de publicação do pacote e revisar o novo hash; não executar automaticamente a cada serviço.

## Integração futura com PostgreSQL

O adaptador `PostgresVerificationRepository` define `publicarPacote()` e `persistir()`, com transação local única para verificação, quatro condições, 23 requisitos, consultas, referências e evento da outbox. **Nenhuma transação foi enviada ao seu PostgreSQL até aqui.**

Para a validação integrada, primeiro instituir um papel A107 com privilégios mínimos de banco/schema, configurar uma conexão de desenvolvimento de modo seguro e aprovar o roteiro de teste. `src/pg-runner.ts` exige `A107_DEMO_PG=SIM`; por padrão **não persiste verificações**, a menos que `A107_DEMO_PERSIST=SIM`. A publicação física exige uma variável distinta `A107_PUBLISH_PACKAGE=SIM`. A publicação de regras não pode ser concedida ao principal comum do serviço.

## Estrutura

- `src/contracts.ts`, `src/invariants.ts`: contratos homologados no pacote anterior (ainda sujeitos à homologação física).
- `src/rule-loader.ts`: lê o manifesto, confere hashes e prepara 4 condições / 23 requisitos.
- `src/engine.ts`: motor de composição determinística, resposta conservadora, sem autorizações.
- `src/service.ts`: aplicação — chama `AuthorizationPort`, regras, fontes e persistência.
- `src/postgres.ts`: transação única e idempotência por `(organizacao_id, principal_id, solicitacao_id)`.
- `src/ports.ts`: interfaces mínimas de SQL client/pool, para desacoplar `pg`.
- `src/cli-demo.ts`: simulação inteiramente local.
- `src/pg-runner.ts`: demonstração de ligação com PostgreSQL, **restrita a desenvolvimento**.
- `rules/*.md`, `rules/*.json`, `rules/manifest.json`: corpus homogêneo e rastreável.
- `tests/*.test.ts`: testes sem acesso a bancos e sem fornecedores reais.
- `dist/`: transpilado gerado pelo compilador, incluído apenas para conveniência.

## Próximas validações obrigatórias

- Contratos TypeScript e esquemas JSON Schema de todas as entradas/saídas contra a aplicação no runtime; a compilação TypeScript **não substitui** essa validação.
- Integração real com `pg` e esquema `a107` em banco de desenvolvimento, incluindo permissões, transação de sucesso, rollback sob erro, idempotência e outbox.
- Autenticação/autorização C103-IEA e adaptadores reais para os CE-01..CE-12 conforme implementação de cada módulo.
- Verificadores completos para oito operadores e compositores, prova negativa e completude de universos, avaliação temporal CM-04.
- LOG/MET/MON e publicação do evento outbox; teste de comportamento sob concorrência.

**Não aceitar como homologação operacional** os dados simulados nem o resultado do `demo`.
