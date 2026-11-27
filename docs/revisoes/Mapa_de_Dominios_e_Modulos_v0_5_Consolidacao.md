# CIVITAS — Mapa de Domínios e Módulos v0.5 — Consolidação

**Situação:** **HOMOLOGADO pelo autor em 26/11/2026** — baseline arquitetural vigente da versão v0.5.  
**Fonte principal:** arquivo Excel `CIVITAS_Mapa_Dominios_e_Modulos_v0_5.xlsx` registrado na Biblioteca CIVITAS, derivado do mapa v0.4.  
**Alterações em relação à v0.4:** exclusivamente MAP-011 e MAP-012, além da atualização de contagens e referências descritivas pertinentes.

## 1. Inventário consolidado

| Grupo | Domínios | Módulos identificados | Domínios pendentes de decomposição |
|---|---:|---:|---|
| A — Coordenação e Administração | 2 | 13 | — |
| B — Aplicativos | 3 | 0 | B1, B2, B3 |
| C — Serviços Centrais | 6 | 28 | — |
| D — Conformidade | 1 | 4 | — |
| E — Serviços Transversais | 4 | 9 | E4 |
| **Total** | **16** | **54** | **4** |

### MAP-011 — A107-EOB

- Código anterior: `A107-EOC` — Estrutura Organizacional da Cidadania.
- Código atual: **`A107-EOB` — Estrutura Organizacional de Base**.
- Responsabilidade consolidada: referências/estruturas organizacionais de base e **motor de verificação das condições ontológicas de realização**.
- Domínio: A1 — Administração Central.
- Distinguir de `C302-EOR`, proprietário da estrutura organizacional concreta da entidade.

### MAP-012 — C313-QDP

- Novo código: **`C313-QDP` — Quadro de Pessoal**.
- Domínio: C3 — Entidade Pública.
- Responsabilidade: registros funcionais de Agentes Públicos, associações a cargos, funções e lotações, e fundamentos jurídico-documentais.
- Proprietário lógico do procedimento de **UC-CIV-012 — Realizar Carga Inicial dos Registros de Agentes Públicos**.
- Atua com `C101-PES` e `C102-CDI` na vinculação de IDUP a registro funcional e emissão de Credencial S em UC-CIV-015, preservando as responsabilidades próprias.
- Dependências principais: `C302-EOR`, `C301-RDI`, `C309-NEC`, `C101-PES`, `C102-CDI`, `C103-IEA` e `E302-HIS`.
- **Não** constitui cargos/funções, **não** cria Pessoas/IDUP e **não** guarda cópias primárias dos documentos sob custódia arquivística.

## 2. Preservação de decisões anteriores

- C106-PRE substituiu C999-PRE.
- C311-GEP pertence ao domínio C3.
- E4 é o domínio Barramento de Dados; módulos ainda a detalhar.
- C301-RDI mantém responsabilidade de gestão documental, SIGAD/RDC-Arq, custódia e preservação, observada a distinção entre essas capacidades.
- C103-IEA mantém a cadeia de confiança.
- E301-ASO / E302-HIS e E303-RVA preservam a separação entre fonte autoritativa, historicidade e reconstrução da Verdade Administrativa.
- C105-MSG permanece em especificação e implementação parcial; não foi alterado por MAP-011/MAP-012.
- Template de especificação modular e padrões LOG/MET/MON permanecem aplicáveis.

## 3. Controle de alterações

| Data | Decisão | Efeito |
|---|---|---|
| 26/11/2026 | MAP-011 | Renomeação de A107-EOC para A107-EOB e alocação do motor de verificação ontológica |
| 26/11/2026 | MAP-012 | Inclusão do C313-QDP, elevando módulos de 53 a 54 |

**Nota:** esta consolidação Markdown é um resumo controlado. O inventário completo de 54 módulos e os campos de acompanhamento continuam na planilha Excel da Biblioteca, versão v0.5. A [Matriz de Componentes e Contratos de Serviços v0.1](./Matriz_de_Componentes_e_Contratos_de_Servicos_v0_1.md) é proposta de implementação, ainda não homologada.

## 4. Homologação formal

Em 26/11/2026 o autor declarou expressamente homologado o **Mapa de Domínios e Módulos v0.5**, com **16 domínios, 54 módulos**, incluindo **MAP-011 (A107-EOB)** e **MAP-012 (C313-QDP)**. A homologação aprova o inventário e suas responsabilidades arquiteturais, **não** a implementação de todos os módulos nem a **Matriz de Componentes e Contratos de Serviços v0.1**, que permanecerá em revisão.
