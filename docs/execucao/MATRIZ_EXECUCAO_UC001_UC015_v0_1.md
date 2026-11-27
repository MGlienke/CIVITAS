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
| T2 | Persistência A103 isolada | Migração/rollback, publicação atômica, concorrência e outbox testados em desenvolvimento | ESP-A103-CS04-002 (PR #7) ainda não homologada |
| T3 | Segurança e origem legítima | Contexto de autorização institucional verificado, sem vazamento em negação | Mock não vale como autenticação real |
| T4 | Integração A103-CE01-A107 | CM01-R01 avaliada com origem real e prova recuperável | Não implica CM-01 completa nem Marco A |
| T5 | Implementar fontes EOT/ENT e demais condições | UC-001 a 003 avaliáveis; CM-01 com provas completas | Preservar fonte e fundamento |
| T6 | Fluxo UC-005/006 e Marco A | Ato de autorização separado e verificável | Depende UC-007, CM-01 a CM-04 e decisão competente |

## Regras de segurança e governança

1. Execução em branches com testes, sem alterar tags, hashes ou regras homologadas.
2. Decisões internas de engenharia compatíveis com o aprovado podem avançar; mudanças de semântica jurídica/ontológica, responsabilidade institucional, autoridade decisória, dados reais, implantação ou produção exigem aprovação.
3. Dados simulados jamais serão apresentados ou aceitos como evidência real; falta de evidência não se converte em prova negativa.
4. Cada relatório deve indicar **UC afetado, efetivamente executado, testes, limites e próximos bloqueios**.
5. O PR #7 e seu inventário físico permanecem **proposta, não homologação por inferência**.

**Estado geral:** nenhum dos UC-001 a UC-015 foi demonstrado completo ponta a ponta. A107-EOB possui componente parcial testado; A103-GEP possui especificações homologadas e protótipo isolado a validar sem constituição institucional real.
