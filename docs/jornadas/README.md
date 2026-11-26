# Jornadas da Plataforma CIVITAS

Este diretório reúne as **Jornadas (JRN)**, o primeiro nível de organização do comportamento da CIVITAS. Cada jornada descreve um percurso integrado, orientado a um resultado institucional ou operacional verificável, e referencia os **Casos de Uso (UC)** que o realizam.

## Hierarquia documental

1. **Jornada (JRN):** objetivo, participantes, ponto de partida, sequência de casos de uso, dependências, produtos, pontos de controle e critério de conclusão.
2. **Caso de Uso (UC-CIV):** narrativa funcional, participantes, pré-condições, regras, situações alternativas e pós-condições.
3. **Detalhamento posterior:** decomposição funcional, serviços, componentes, regras técnicas, testes e evidências. Não é presumido por esta documentação.

As jornadas **não duplicam** nem substituem as narrativas canônicas dos casos de uso. Dependências não implicam execução rigidamente linear quando houver atividades preparatórias compatíveis em paralelo.

## Catálogo

| Jornada | Nome | Casos de uso | Marco final | Situação |
|---|---|---|---|---|
| [JRN-CIV-001](./JRN-CIV-001_Preparacao_da_Plataforma_e_Habilitacao_da_Primeira_Organizacao_Institucional_v0_1.md) | Preparação da Plataforma e Habilitação da Primeira Organização Institucional | UC-001 a UC-006 | Marco A — autorização da operação administrativa inicial | v0.1 — homologada em 26/11/2026 |
| [JRN-CIV-002](./JRN-CIV-002_Registro_e_Acreditacao_de_Pessoas_v0_1.md) | Registro e Acreditação de Pessoas | [UC-007](../casos-de-uso/UC-CIV-007_Registrar_Pessoa_por_Acreditacao_Publica_na_CIVITAS_v0_1.md), [UC-008](../casos-de-uso/UC-CIV-008_Acreditar_Privadamente_uma_Pessoa_na_CIVITAS_v0_1.md) | Pessoa registrada por acreditação pública ou privada, com cadeia verificável até raiz pública | **v0.1 — especificação concluída e homologada em 26/11/2026** |
| [JRN-CIV-003](./JRN-CIV-003_Constituicao_e_Habilitacao_dos_Sistemas_Estruturantes_v0_1.md) | Constituição e Habilitação dos Sistemas Estruturantes | [UC-009](../casos-de-uso/UC-CIV-009_Habilitar_e_Vincular_Sistemas_Estruturantes_a_Organizacao_Institucional_v0_1.md) | Quatro sistemas habilitados, vinculados e com responsáveis legitimados | **v0.1 — especificação concluída e homologada em 26/11/2026** |
| [JRN-CIV-004](./JRN-CIV-004_Constituicao_e_Administracao_da_Estrutura_Organizacional_v0_1.md) | Constituição e Administração da Estrutura Organizacional | [UC-010](../casos-de-uso/UC-CIV-010_Constituir_e_Manter_a_Estrutura_Organizacional_da_Organizacao_Institucional_v0_1.md), [UC-011](../casos-de-uso/UC-CIV-011_Constituir_e_Manter_Cargos_e_Funcoes_da_Organizacao_Institucional_v0_1.md) | Estrutura, organograma, cargos e funções fundamentados e disponíveis ao Sistema de Pessoal | **v0.1 — especificação concluída e homologada em 26/11/2026** |

| **JRN-CIV-005 — Constituição e Administração de Pessoal** | Carga inicial e reconhecimento posterior de vínculos funcionais | [UC-012](../casos-de-uso/UC-CIV-012_Realizar_Carga_Inicial_dos_Registros_de_Agentes_Publicos_v0_1.md); demais UC a definir | Registros funcionais fundamentados e reconhecimento posterior de Pessoas | **Em composição; UC-012 homologado** |
| [JRN-CIV-006](./JRN-CIV-006_Constituicao_e_Operacao_Inicial_do_Arquivo_Publico_v0_1.md) | Constituição e Operação Inicial do Arquivo Público | [UC-013](../casos-de-uso/UC-CIV-013_Constituir_e_Habilitar_o_Arquivo_Publico_da_Organizacao_Institucional_v0_1.md), [UC-014](../casos-de-uso/UC-CIV-014_Registrar_e_Arquivar_Documentos_no_Arquivo_Publico_v0_1.md) | Capacidade arquivística inicial disponível para registro, guarda e referências documentais | **v0.1 — especificação concluída e homologada em 26/11/2026** |

## Convenção

- Identificador: `JRN-CIV-NNN`.
- Arquivo: `JRN-CIV-NNN_Titulo_vM_m.md`.
- Toda jornada explicita versão e situação de aprovação, casos de uso referenciados, fronteira de escopo e marcos de conclusão.
- Novas versões preservam a rastreabilidade da narrativa homologada e dos casos de uso vinculados.

> **Atenção:** o Marco A não representa a conclusão da estrutura administrativa completa nem a autorização para prestação de serviços públicos. As capacidades e os serviços posteriores estarão sujeitos a suas próprias condições ontológicas de realização e verificação.
