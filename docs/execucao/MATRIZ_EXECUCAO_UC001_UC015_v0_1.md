# CIVITAS — Matriz Executiva UC-CIV-001 a UC-CIV-015

**Versão:** 0.1 — acompanhamento técnico, 27/11/2026. **Não altera narrativas homologadas.**
**Fontes:** narrativas UC-CIV-001…015, Matriz de Dependências e Matriz de Componentes e Serviços v0.1, A107-EOB v0.3.0, ESP/DEC A103 homologadas até CS04-001.
**Leitura:** a execução parcial de um componente **não** comprova conclusão do Caso de Uso.

| UC | Resultado esperado | Situação verificada | Dependência / próximo resultado concreto |
|---|---|---|---|
| 001 | EOT constituídas, importadas, validadas e utilizadas | Narrativa homologada; gestão/importação EOT não implementada fim a fim | Importação e versionamento EOT; A107 |
| 002 | ENT/ENI, correspondência normativa e fundamentos | Narrativa homologada; A108-BDN sem serviço executável | Fonte normativa, normas e correspondência à EOT |
| 003 | Ontologia de Referência e verificação de realização | Motor A107-EOB v0.3.0 com 19 testes; implementação parcial do UC | Completar suporte semântico e fontes para os requisitos |
| 004 | Organização incorporada à estrutura estatal | ESP-A103-CE01-001, DAT-001, DEC-001 e CS04-001 homologados; **A103 não operacional** | Identidade, registro e publicação em serviço proprietário com evidência legítima; depende de UC-001–003 |
| 005 | Organização habilitada como cliente e GOI designado | Narrativa homologada; fluxo A102/A103 pendente | CS-05, C101/C103 e **UC-007** para identidade de Pessoa |
| 006 | CM-01 a CM-04 cumpridas e Marco A autorizado por ato competente | Regras A107 e contrato simulado CE-01 para CM01-R01; **sem autorização real** | UC-005, UC-007, A103/A108/C302/C309 e ato distinto do Administrador |
| 007 | Pessoa acreditada publicamente, IDUP e raiz de confiança | Narrativa/planejamento, sem serviço implementado neste ciclo | Contratos C101-PES, C102-CDI e C103-IEA |
| 008 | Acreditação privada por agente competente | Narrativa/planejamento | UC-007 e competência pública verificável |
| 009 | Sistemas Estruturantes habilitados | Narrativa/planejamento | UC-006, identidade/legitimidade de responsáveis |
| 010 | Estrutura concreta e competências | Narrativa/planejamento | UC-006, UC-009, C302-EOR/C309-NEC |
| 011 | Cargos e funções fundamentados | Narrativa/planejamento | UC-010 |
| 012 | Registros funcionais importados e documentados | Narrativa/planejamento | UC-009–011; UC-013/014 para conclusão documental |
| 013 | Arquivo Público habilitado | Narrativa/planejamento | UC-009/010, C301-RDI |
| 014 | Documentos referenciáveis, custodiados e recuperáveis | Narrativa/planejamento | UC-013, C301-RDI |
| 015 | IDUP ligado a registro funcional, Credencial S | Narrativa/planejamento | UC-007/008 e UC-012, C313/C101/C102 |

## Sequenciamento

- **I1 (UC-001 a UC-004):** modelos organizacionais e normativos, ontologia e incorporação institucional.
- **I2 (UC-007, UC-005 e UC-006):** Pessoas, cliente/GOI, CM-01 a CM-04 e autorização de Marco A. **UC-007 é dependência funcional do GOI/Mandatário**, não pode ser omitido.
- **I3 (UC-009 a UC-011):** sistemas, estrutura, cargos e funções.
- **I4 (UC-013 e UC-014):** arquivo e documentos.
- **I5 (UC-012 e UC-015):** registros funcionais e Credencial S.
- **I6 (UC-008):** acreditação privada com agente competente e raiz pública de confiança.

## Plano de avanço autônomo e critérios

| Ordem | Entrega | Critério verificável | Restrição |
|---|---|---|---|
| T0 | Matriz e rastreabilidade por UC | Estado/entregas/pendências explícitos | Nenhum UC concluído sem prova ponta a ponta |
| T1 | Protótipo A103 em memória e testes | Propostas, identidade, versionamento, idempotência, retificações e registros marcados SIMULADO | Não é CS-04 institucional real |
| T2 | **Laboratório de persistência A103 — código integrado à main; PostgreSQL CI aprovado** | PostgreSQL 18 temporário, migração, rollback, atomicidade, idempotência, versões e outbox testados em CI (PR #9) | **Somente SIMULADO**; sem execução no banco local, sem fonte/autoridade real; ESP-A103-CS04-002 (PR #7) continua não homologada |
| T3 | **Fronteira de confiança A103 — laboratório simulado validado** | Duplo atestado Ed25519 com separação de papéis, hash do comando, escopo, audiência, tempo e negação antes de persistir; CI Linux, Windows e PostgreSQL aprovada (PR #11) | **Não é autorização/origem institucional real**, falta C103-IEA, UC-007, identidade/competência jurídica, revogação, proteção do perímetro e cadeia de custódia |
| T4 | **Integração A103 → CE-01 → A107 implementada em laboratório (PR #13)** | **34 testes A103 + 19 testes A107**, sem falhas/ignorados em PostgreSQL 18 de CI; CM01-R01 atendida **apenas com fonte SIMULADA** | Fonte/autoridade/custódia reais e C103-IEA/UC-007 ausentes; CM-01 completa/Marco A não autorizados |
| T5 | Implementar fontes EOT/ENT e demais condições | UC-001 a 003 avaliáveis; CM-01 com provas completas | Preservar fonte e fundamento |
| T6 | Fluxo UC-005/006 e Marco A | Ato de autorização separado e verificável | Depende UC-007, CM-01 a CM-04 e decisão competente |

## Regras de segurança e governança

1. Execução em branches com testes, sem alterar tags, hashes ou regras homologadas.
2. Decisões internas de engenharia compatíveis com o aprovado podem avançar; mudanças de semântica jurídica/ontológica, responsabilidade institucional, autoridade decisória, dados reais, implantação ou produção exigem aprovação.
3. Dados simulados jamais serão apresentados ou aceitos como evidência real; falta de evidência não se converte em prova negativa.
4. Cada relatório deve indicar **UC afetado, efetivamente executado, testes, limites e próximos bloqueios**.
5. O PR #7 e seu inventário físico permanecem **proposta, não homologação por inferência**.

**Estado geral:** nenhum dos UC-001 a UC-015 foi demonstrado completo ponta a ponta. A107-EOB possui componente parcial testado; A103-GEP possui T1 em memória e T2/T3 simulados com integração PostgreSQL e verificações criptográficas de laboratório, sem constituição institucional real nem controle C103-IEA.


## Registro de execução T2 — 27/11/2026

- **UC relacionado:** UC-CIV-004, recorte técnico de CS-04, sem conclusão do caso de uso.
- **Entrega:** `plataforma/a103-gep/db/migrations/001_a103_t2_simulacao.sql` e `src/pg-simulacao.js`; migração propositalmente manual e restrita a laboratório.
- **Validação:** PR #9 integrado à `main`, commit `7a93194`; PostgreSQL 18 real em GitHub Actions temporário — [integração aprovada](https://github.com/MGlienke/CIVITAS/actions/runs/45937101878). Testes sem banco em Linux e Windows — [aprovados](https://github.com/MGlienke/CIVITAS/actions/runs/45937101811).
- **O que permanece ausente:** proposta/revisão de constituição institucional real, autorização C103-IEA, custódia documental e normas autoritativas externas, snapshot bitemporal completo, CE-01 com fonte real, Marco A e implantação no PostgreSQL local.
- **Delimitação:** PR #7 mantém situação documental de proposta; T2 não valida juridicamente registros nem representa autorização para produção.


## Registro de execução T3 — 27/11/2026

- **UC relacionado:** UC-CIV-004, recorte de CS-04; reflexos futuros em UC-005/006 e dependência de UC-007. Nenhum UC encerrado.
- **Entrega:** `src/confianca-t3.js` e testes unitários/integrados no diretório `plataforma/a103-gep`, com dois atestados Ed25519 independentes de laboratório: autorização da operação e procedência das referências. Identidade extraída do atestado verificado, sem confiar em campo de principal no comando.
- **Validação:** PR #11 integrado à `main`, commit `4fcd00d`. [Linux/Windows aprovados](https://github.com/MGlienke/CIVITAS/actions/runs/45937605993) e [PostgreSQL 18 temporário aprovado](https://github.com/MGlienke/CIVITAS/actions/runs/45937606045).
- **Critérios verificados:** assinatura inválida, emissor/papel incorreto, expiração, audiência ou escopo divergente, alteração do comando/prova, negativa antes de consultar o banco, aceitação de atestado duplo válido **somente em SIMULADO**, e idempotência no PostgreSQL de teste.
- **Bloqueios para T3 real:** serviço de identidade C103-IEA, acreditação pública/IDUP (UC-007), autoridade/competência jurídica, canais autenticados e segregação de privilégios, revogação e replay distribuído, custódia e validade das referências institucionais. O T2 pode ser chamado diretamente no laboratório e **não é uma fronteira segura de produção**.
- **Sem mudança de baseline:** PR #7 é proposta não homologada, A107 v0.3.0 permanece intacto, e nenhum dado simulado é prova real ou autorização de Marco A.


## Registro de execução T4 — 27/11/2026

- **UC relacionado:** UC-CIV-004, fluxo técnico de laboratório de registro publicado → consulta A103 → CE-01 → avaliação A107; também recorte CM01-R01 de UC-CIV-006, **não** conclusão de nenhum dos dois UC.
- **Entrega:** `plataforma/a103-gep/src/ce01-porta-laboratorio.js` + `tests/integration-ce01-a107-t4.test.js`; usa o `AdaptadorCe01A103` e o motor de regras A107 **sem modificação de seu código**.
- **Validação efetiva:** PR #13 integrado à `main`, commit `c0b1e10`. [PostgreSQL 18 + testes A103 34/34, testes A107 19/19, sem SKIP](https://github.com/MGlienke/CIVITAS/actions/runs/45938522091); Linux e Windows [aprovados](https://github.com/MGlienke/CIVITAS/actions/runs/45938522025); regressão T2/T3 PostgreSQL [aprovada](https://github.com/MGlienke/CIVITAS/actions/runs/45938522003).
- **Resultado do laboratório:** fato/manifesto SIMULADOS permitiram `CM01-R01 = ATENDIDA` **apenas no harness de teste**; resultado agregado `INDETERMINADA`, elegibilidade `VERIFICACAO_PENDENTE`. O resultado **não foi persistido no A107** e não autoriza Marco A.
- **Negativas:** ausência de identidade não gera prova negativa; consulta anterior à publicação não demonstra existência pretérita; acesso negado provoca `A107E0002`; não há autenticação institucional real.
- **Próximo trabalho (T5):** fontes EOT/ENT/ontologia e dependências institucionais reais, sem afirmar autenticidade de uma prova de laboratório. PR #7 continua proposta técnica não homologada.
