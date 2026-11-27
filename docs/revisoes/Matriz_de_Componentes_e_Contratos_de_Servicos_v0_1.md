# CIVITAS — Matriz de Componentes e Contratos de Serviços

**Versão:** 0.1 — **HOMOLOGADA pelo autor em 26/11/2026**  
**Data:** 26/11/2026  
**Baseline:** CIVITAS — Mapa de Domínios e Módulos v0.5 (MAP-011 / MAP-012), decorrente da v0.4.  
**Rastreabilidade:** JRN-CIV-001 a 006, UC-CIV-001 a 015 e Matriz de Dependências e Sequenciamento de Implementação v0.1.  
**Escopo da homologação:** responsabilidades, contratos lógicos candidatos, rastreabilidade e critérios preliminares. Contratos técnicos finais, códigos SRV definitivos, APIs e decisões DSP-01 a DSP-07 continuam sujeitos à especificação modular.  
**Nota:** os identificadores `CS-01`…`CS-21` são IDs editoriais temporários desta matriz, **não** IDs `SRV-MODULO-999` homologados nem endpoints ou contratos técnicos definitivos.

## 1. Regras de decomposição

1. **Responsabilidade proprietária única por dado ou ato:** cada módulo mantém seus registros, competências e regras; outros módulos consomem serviços.
2. **Validade por design:** fatos institucionalmente válidos dependem de competências, fundamentos, identidade, verificações e regras de realização pertinentes. Uma resposta técnica de sucesso não cria legitimidade jurídica ausente.
3. **Separação de identidades:** Pessoa/IDUP pertence a C101-PES; credenciais C e S pertencem a C102-CDI, com validações de C103-IEA; registro funcional pertence ao novo C313-QDP.
4. **Estruturas:** A107-EOB mantém estrutura organizacional de base e verifica condições ontológicas de realização; C302-EOR materializa a organização concreta, cargos e funções; C313-QDP referencia essas estruturas.
5. **Documentos:** C301-RDI cuida de gestão documental, custódia, referência e preservação; C313-QDP não guarda cópias documentais como fonte primária; C312-PAA integra publicação de atos, não a substitui.
6. **ASoT/historicidade:** E301-ASO identifica fontes autoritativas; E302-HIS preserva evolução/estados; E303-RVA fica fora da implementação inicial salvo necessidade comprovada.
7. **Todos os módulos:** incorporar logging/auditoria D101, métricas D103, monitoramento D102, controles pertinentes de D104 e integrações/eventos quando aplicáveis.
8. **B1, B2, B3 e E4:** domínios existentes, mas sem módulos especificados; não atribuir códigos inexistentes.

## 2. Matriz de componentes × Casos de Uso

| UC | Principal | Apoios relevantes | Saída integrada |
|---|---|---|---|
| UC-001 | A107-EOB | A103-GEP, A108-BDN | Estruturas Organizacionais Tipológicas |
| UC-002 | A108-BDN | A107-EOB, C309-NEC | Estruturas Normativas Tipológicas e fundamentos |
| UC-003 | A107-EOB | A108-BDN, E301-ASO | Ontologia e verificação das condições ontológicas |
| UC-004 | A103-GEP | A107-EOB, A108-BDN | Organização institucional incorporada |
| UC-005 | A102-GDC / A103-GEP | C101-PES, C103-IEA | Cliente e GOI habilitados |
| UC-006 | A103-GEP | A107-EOB, C302-EOR, C309-NEC | Condições CM-01–CM-04 e Marco A |
| UC-007 | C101-PES | C103-IEA, C102-CDI | IDUP e Credencial C mediante acreditação |
| UC-008 | C103-IEA | C101-PES, C102-CDI, C309-NEC, C313-QDP | Acreditação privada por agente competente |
| UC-009 | A103-GEP / C309-NEC | C101-PES, C103-IEA, C302-EOR | Sistema Estruturante e responsável habilitados |
| UC-010 | C302-EOR | A107-EOB, C309-NEC, A108-BDN | Estrutura concreta e competências |
| UC-011 | C302-EOR | C309-NEC, A108-BDN | Cargos e funções |
| UC-012 | **C313-QDP** | C302-EOR, C301-RDI, C309-NEC, C602-ISS | Registros funcionais iniciais fundamentados |
| UC-013 | C301-RDI | C302-EOR, C309-NEC, C103-IEA | Arquivo Público habilitado |
| UC-014 | C301-RDI | C312-PAA, C602-ISS, E302-HIS | Documento ou referência registrada |
| UC-015 | C313-QDP + C101-PES + C102-CDI | C103-IEA, C309-NEC | IDUP associado ao registro e Credencial S |

## 3. Matriz inicial de contratos lógicos

Cada linha descreve uma *operação lógica candidata*: não implica um microserviço, API isolada, endpoint único, topologia, transação distribuída nem numeração definitiva.

| ID temporário | Operação lógica | Proprietário primário | Entradas mínimas | Saídas e verificações | UCs | Incremento |
|---|---|---|---|---|---|---|
| CS-01 | Administrar Estrutura Organizacional de Base | A107-EOB | tipo de estrutura, versão, fundamentos, proposta de relações | modelo identificado/versionado, conformidade semântica | 001–004 | I1 |
| CS-02 | Verificar Condições Ontológicas de Realização | **A107-EOB** | âmbito operacional, entidade/instância, requisitos, evidências | condições satisfeitas/pendentes e justificativas; separação Marco A/futuros âmbitos | 003–006, 009–015 | I1–I2 |
| CS-03 | Consultar Fundamentação Normativa | A108-BDN | norma/identificador, versão, intervalo temporal | referência, vigência, proveniência e relações de fundamento | 002, 004–006, 009–014 | I1 |
| CS-04 | Constituir Organização Institucional | A103-GEP | modelo, ente, evidências e atos | identidade institucional e vínculos estruturais | 004 | I1 |
| CS-05 | Habilitar Cliente/Registrar Marco A | A102-GDC e A103-GEP (fronteira a detalhar) | organização, GOI, Mandatário, CM-01–04 e decisões autorizadas | habilitação, autorizações técnicas e evidências separadas de atos contratuais | 005–006 | I2 |
| CS-06 | Acreditar e Identificar Pessoa | C101-PES / C103-IEA | identificadores, evidência de acreditação pública | IDUP, estado de acreditação, cadeia verificável | 007 | I2 |
| CS-07 | Emitir ou Consultar Credencial C | C102-CDI | IDUP, acreditação verificada, atributos | credencial C, situação e registro de emissão | 007 | I2 |
| CS-08 | Verificar Acreditação, Competência e Autorização | C103-IEA | identidade, ação, contexto, vínculo, competência/fundamento | decisão de autorização contextual justificada | 005–015 | I2–I6 |
| CS-09 | Habilitar Sistema Estruturante | A103-GEP / C309-NEC (fronteira a detalhar) | entidade, sistema, unidade, responsável legitimado | sistema habilitado e vínculos válidos | 009 | I3 |
| CS-10 | Constituir Unidade e Competência | C302-EOR / C309-NEC | entidade, unidade, estrutura, fundamentos e atributos | unidade/órgão e competências registrados | 010, 013 | I3 |
| CS-11 | Constituir Cargo ou Função | C302-EOR | unidade, cargo/função, atribuições, quantitativos e atos | cargo/função referenciáveis e fundamentados | 011–012 | I3 |
| CS-12 | Habilitar Arquivo Público | C301-RDI | organização, unidade arquivística, responsável, recursos/condições | condição arquivística e de custódia habilitada | 013 | I4 |
| CS-13 | Registrar Documento ou Referência | C301-RDI | documento ou referência, procedência, custodiante, classificação pertinente | identificador persistente, integridade e referência verificável | 014, 012 | I4 |
| CS-14 | Consultar Documento e Custódia | C301-RDI | identificador, identidade/autorizações, contexto | metadados, localização e acesso controlado; eventos de consulta | 012, 014–015 | I4 |
| CS-15 | Importar e Homologar Quadro de Pessoal | **C313-QDP** | dados funcionais, estrutura C302, evidências C301, responsável autorizado | registro funcional validado, histórico de carga e pendências | 012 | I5 |
| CS-16 | Consultar Registro Funcional Correspondente | **C313-QDP** | identificadores pessoais associados ao IDUP, organização | candidatos, situação e informações para conferência; sem criar nova Pessoa | 015 | I5 |
| CS-17 | Reconhecer Vinculação de IDUP ao Registro Funcional | **C313-QDP**, com vínculo de Pessoa em C101-PES | IDUP, registro, correspondência verificada, autorização/contexto | associação persistente, idempotência, trilha e prevenção de conflito | 015 | I5 |
| CS-18 | Emitir Credencial S | **C102-CDI** | IDUP, vínculo funcional reconhecido por C313, organização, verificação C103 | Credencial S associada ao vínculo, sem alterar C; não cria competência | 015 | I5 |
| CS-19 | Acreditar Pessoa Privadamente | **C103-IEA** | Agente Público, competência específica, dados/evidências da Pessoa | acreditação em cadeia de confiança e resultado verificável | 008 | I6 |
| CS-20 | Registrar Proveniência, Histórico e Auditoria | E302-HIS / D101-RAS | ato, estado anterior/posterior, autor/serviço, contexto, timestamp e correlação | eventos/histórico e trilha sem supressão indevida | Todos | Transversal |
| CS-21 | Publicar e Consumir Eventos Institucionais | E101-EVT, E102-PUB, E103-ENT | eventos versionados e autorizados, identificador de correlação | evento publicado/entregue com idempotência e recuperação | Integrações pertinentes | Transversal |

## 4. Quatro contratos prioritários detalhados para especificação

### CS-02 — Verificar Condições Ontológicas de Realização (A107-EOB)

- **Objetivo:** permitir verificar um âmbito específico de operação contra condições ontológicas, sem tratar a verificação do Marco A como autorização indiscriminada de outros âmbitos.
- **Entrada lógica:** tipo do âmbito; identidade da Organização Institucional; referências às instâncias/estruturas; conjunto de condições aplicáveis; fundamentos e evidências; versão da ontologia.
- **Saída lógica:** condições satisfeitas, não satisfeitas ou pendentes; justificativas/evidências; versão de regras usada; resultado de verificação.
- **Invariantes:** avaliação técnica não substitui ato decisório da autoridade competente; evidências insuficientes não equivalem a aprovação; versionamento e historicidade preservados.
- **Dependências:** A108-BDN, A103-GEP, E302-HIS, D101-RAS; outros domínios conforme âmbito.
- **Testes mínimos:** condições integralmente atendidas; uma condição ausente; fundamento inválido; regra evoluída; autorização de Marco A sem habilitação indevida de serviços posteriores.

### CS-15 — Importar e Homologar Quadro de Pessoal (C313-QDP)

- **Objetivo:** constituir registros funcionais iniciais independentemente da criação/acreditação digital de Pessoas.
- **Entrada lógica:** identificadores administrativos, dados pessoais de conferência, órgão/unidade, cargo/função, lotação, atos jurídicos e referências C301-RDI.
- **Saída lógica:** identificador do registro funcional, situação de validação/homologação, referências estruturais e documentais, relatório de divergências.
- **Invariantes:** não criar Pessoa/IDUP nem emitir Credencial S; não criar cargo/função que inexista em C302; não substituir documentos; não homologar vínculo sem fundamentos pertinentes.
- **Dependências:** C302-EOR, C309-NEC, C301-RDI, E302-HIS, C602-ISS (quando importação externa).
- **Testes mínimos:** carga válida; cargo inexistente; lotação incompatível; documento indisponível; registro duplicado; reprocessamento idempotente; importação anterior ao registro da Pessoa na CIVITAS.

### CS-17 — Reconhecer Vinculação de IDUP ao Registro Funcional (C313-QDP/C101-PES)

- **Objetivo:** confirmar correspondência da Pessoa já acreditada ao registro funcional administrativo.
- **Entrada lógica:** IDUP com Credencial C válida, organização, registro funcional candidato, dados verificáveis da Pessoa.
- **Saída lógica:** vínculo confirmado ou rejeitado/pendente com motivos, referência de associação e histórico.
- **Invariantes:** não duplicar Pessoa; não associar registro a IDUP diverso sem processo competente; associação não cria competência jurídica; vínculos distintos podem coexistir se admissíveis.
- **Dependências:** C101-PES, C103-IEA, C313-QDP, E302-HIS e D101-RAS.
- **Testes mínimos:** correspondência inequívoca; divergência; mesmo registro já associado ao mesmo IDUP (idempotência); associado a outro IDUP; situação funcional incompatível; múltiplos vínculos lícitos.

### CS-18 — Emitir Credencial S (C102-CDI)

- **Objetivo:** emitir Credencial S para participação institucional confirmada.
- **Entrada lógica:** IDUP, referência da associação funcional confirmada e vigente conforme regras aplicáveis, organização, evidência de verificação.
- **Saída lógica:** identificador da Credencial S, referência à Pessoa e ao registro funcional, estado e histórico de emissão.
- **Invariantes:** Credencial C permanece; S não cria atribuições nem autorização automática de acreditação privada; emissão duplicada para mesmo vínculo deve ser evitada; direitos derivados dependem de verificação contextual.
- **Dependências:** C313-QDP, C101-PES, C102-CDI, C103-IEA e E302-HIS.
- **Testes mínimos:** emissão inicial; solicitação repetida; competência ausente para ação subsequente; vínculo inválido; coexistência de múltiplas credenciais institucionais admissíveis.

## 5. Decisões pendentes da matriz de serviços

| ID | Decisão | Proposta |
|---|---|---|
| DSP-01 | Identificadores formais SRV | Atribuir apenas durante especificação de cada módulo, seguindo template homologado |
| DSP-02 | Proprietário da transação de emissão S | C313 reconhece vínculo; C102 emite credencial; estabelecer contrato de consistência e falhas sem presumir transação distribuída |
| DSP-03 | Fronteira A102/A103 para habilitação de cliente e Marco A | Separar gestão de cliente da representação institucional e da autorização técnica |
| DSP-04 | Fronteira C302/C309 para competências institucionais | C302 representa unidade/cargo/função; C309 fundamenta competência |
| DSP-05 | Granularidade de A107-EOB | Especificar verificações ontológicas como responsabilidade interna do A107, sem duplicar com C302 |
| DSP-06 | Padrões de integração | Definir chamadas síncronas, eventos, consistência, idempotência e tratamento de erros caso a caso |
| DSP-07 | Métricas e monitoramento | Exigir D101/D102/D103 e E302 quando cabíveis em todos os módulos, sem duplicar responsabilidade |

## 6. Ordem sugerida de especificação técnica

1. **A107-EOB (CS-01/02)** — fundamento e verificação de realização.
2. **A103-GEP + A102-GDC + A108-BDN (CS-03/04/05)** — organização/cliente/Marco A.
3. **C101-PES + C103-IEA + C102-CDI (CS-06/07/08)** — Pessoa, acreditação e credenciais.
4. **C302-EOR + C309-NEC (CS-09/10/11)** — estrutura e competências.
5. **C301-RDI (CS-12/13/14)** — arquivos e referências.
6. **C313-QDP (CS-15/16/17)** — carga funcional e vinculação.
7. **C102-CDI (CS-18)** — emissão de Credencial S; e **C103-IEA (CS-19)** — acreditação privada.
8. **D1/E1/E3:** contratos transversais necessários distribuídos pelos incrementos desde o início.

## 7. Estado de revisão

A matriz constitui **matriz de contratos lógicos homologada como baseline de planejamento**, baseada no mapa v0.5. Ainda **não houve homologação individual de contratos técnicos de serviços**, códigos `SRV`, interfaces, APIs, objetos de dados ou detalhes de persistência. A implementação do módulo C105-MSG é linha de trabalho independente já existente; a matriz não altera seu contrato aprovado.

## 8. Homologação da matriz

Em 26/11/2026, o autor confirmou expressamente a **Matriz de Componentes e Contratos de Serviços v0.1** e autorizou a definição do primeiro incremento executável. A homologação consolida a **alocação de responsabilidades e interfaces lógicas previstas**, mas não transforma os IDs temporários CS-01 a CS-21 em identificadores SRV definitivos, não aprova automaticamente APIs ou detalhes técnicos futuros e não considera implementados os módulos. As decisões de detalhamento DSP-01 a DSP-07 serão resolvidas no projeto técnico de cada módulo, sem alterar o mapa de domínios e módulos v0.5 homologado.
