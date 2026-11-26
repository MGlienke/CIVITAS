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
| **JRN-CIV-002 — Registro e Acreditação de Pessoas** | Registro de Pessoas e Cadeia de Confiança | [UC-007](../casos-de-uso/UC-CIV-007_Registrar_Pessoa_por_Acreditacao_Publica_na_CIVITAS_v0_1.md), [UC-008](../casos-de-uso/UC-CIV-008_Acreditar_Privadamente_uma_Pessoa_na_CIVITAS_v0_1.md) | Pessoa pública ou privadamente acreditada (conforme condições) | Em composição; UC-007 e UC-008 homologados |
| [JRN-CIV-003](./JRN-CIV-003_Constituicao_e_Habilitacao_dos_Sistemas_Estruturantes_v0_1.md) | Constituição e Habilitação dos Sistemas Estruturantes | [UC-009](../casos-de-uso/UC-CIV-009_Habilitar_e_Vincular_Sistemas_Estruturantes_a_Organizacao_Institucional_v0_1.md) | Quatro sistemas habilitados, vinculados e com responsáveis legitimados | **v0.1 — especificação concluída e homologada em 26/11/2026** |
| **JRN-CIV-004 — Estrutura Organizacional** | Constituição e administração da Estrutura Organizacional | A definir | Estrutura administrativa detalhada segundo condições a definir | Planejamento; ainda não homologada |

## Convenção

- Identificador: `JRN-CIV-NNN`.
- Arquivo: `JRN-CIV-NNN_Titulo_vM_m.md`.
- Toda jornada explicita versão e situação de aprovação, casos de uso referenciados, fronteira de escopo e marcos de conclusão.
- Novas versões preservam a rastreabilidade da narrativa homologada e dos casos de uso vinculados.

> **Atenção:** o Marco A não representa a conclusão da estrutura administrativa completa nem a autorização para prestação de serviços públicos. As capacidades e os serviços posteriores estarão sujeitos a suas próprias condições ontológicas de realização e verificação.
