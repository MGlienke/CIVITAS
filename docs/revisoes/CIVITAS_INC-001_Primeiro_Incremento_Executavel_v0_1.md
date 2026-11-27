# CIVITAS — INC-001 — Primeiro Incremento Executável: Constituição e Habilitação Inicial de Organização Institucional

**Versão:** 0.1 — **HOMOLOGADA pelo autor em 26/11/2026**  
**Referências:** Mapa de Domínios e Módulos v0.5 (homologado), Matriz de Dependências v0.1, Matriz de Componentes e Contratos de Serviços v0.1 (homologada), UC-CIV-001 a 007 (conforme aplicáveis).  
**Marco de aceite:** autorização técnica do Marco A por Administrador da Plataforma, após verificar CM-01 a CM-04.  
**Situação:** escopo funcional e critérios de aceitação homologados. A implementação do INC-001 ainda não ocorreu.

## 1. Objetivo e resultado observável

Entregar um fluxo executável, persistente e auditável em que o Administrador da Plataforma e os participantes legitimados possam incorporar uma Organização Institucional à estrutura estatal, habilitá-la como cliente, designar GOI, preparar as condições institucionais CM-01 a CM-04, reconhecer o Mandatário, convalidar ou regularizar a atuação do Gestor, verificar as condições ontológicas pertinentes ao **âmbito da operação administrativa inicial** e autorizar tecnicamente o Marco A.

O incremento não equivale à implantação integral dos 54 módulos. A realização da ontologia é avaliada **por âmbito de operação**; a autorização do Marco A não habilita automaticamente sistemas estruturantes ou serviços públicos.

## 2. Casos de Uso do incremento

| UC | Participação |
|---|---|
| UC-001 | Constituir/utilizar EOT de referência necessárias ao cenário |
| UC-002 | Constituir/utilizar ENT e fundamentos pertinentes |
| UC-003 | Aplicar ontologia e verificar condições de realização por âmbito |
| UC-004 | Incorporar organização institucional à estrutura estatal |
| UC-005 | Habilitar cliente, designar GOI e registrar relação contratual pertinente |
| UC-006 | Constituir organização inicial CM-01 a CM-04, reconhecer Mandatário e autorizar Marco A |
| UC-007 | Disponibilizar acreditação pública para Pessoas participantes, incluindo GOI e Mandatário |

**Fora do escopo:** UC-008 (acreditação privada), UC-009 a 015, implantação integral dos Sistemas Estruturantes, carga de Pessoal, credencial S, Arquivo Público plenamente operacional, prestação de serviços públicos, recebimento definitivo/faturamento automatizados.

## 3. Condições CM-01 a CM-04

| Condição | Regra funcional de aceite |
|---|---|
| CM-01 — Identidade institucional | Organização instanciada e fundamento jurídico constitutivo identificado, com modelo e posição institucional |
| CM-02 — Estrutura organizacional inicial | Norma de organização administrativa e órgãos/unidades de primeiro nível identificados, aprovados e fundamentados; proposta assistida por IA sujeita a revisão/homologação do GOI |
| CM-03 — Competências institucionais | Competências compostas progressivamente desde o Estado até a organização, categorias e condições de exercício, titulares e rastreabilidade normativa |
| CM-04 — Autoridade institucional | Mandatário como posição institucional ocupada por Pessoa no papel de Agente Público, investidura verificada pelo Administrador, GOI convalidado pelo Mandatário ou desbloqueado excepcionalmente pelo Administrador mediante fundamento e histórico; não equiparar desbloqueio à convalidação |

## 4. Componentes mínimos e serviços lógicos

| Módulo (baseline v0.5) | Responsabilidade efetiva neste incremento | Contratos lógicos candidatos |
|---|---|---|
| **A107-EOB** | Modelos organizacionais de base, compatibilidade ontológica e motor de verificação CM-01–04 | CS-01, CS-02 |
| **A108-BDN** | Estruturas normativas tipológicas, referências normativas e verificação de vigência/procedência | CS-03 |
| **A103-GEP** | Identidade institucional, incorporação, situação de organização e governança do Marco A | CS-04, CS-05 (parte institucional) |
| **A102-GDC** | Habilitação do cliente e relação contratual, sem presumir atos contratuais da Administração | CS-05 (parte cliente) |
| **C101-PES** | Pessoa e IDUP; identificação de GOI e Mandatário como Pessoas já acreditadas | CS-06 |
| **C103-IEA** | Acreditação pública, cadeia de confiança, autenticação e autorização contextual | CS-06, CS-08 |
| **C102-CDI** | Credencial C e estado de credencial | CS-07 |
| **C302-EOR** | Representação administrativa inicial de órgãos/unidades de primeiro nível; competência não se presume só da estrutura | CS-10 (recorte mínimo) |
| **C309-NEC** | Referências de competências institucionais para CM-03 | CS-03/CS-10, interface de competências |
| **A201-CIA, A202-MIA, A203-AIA** | Assistência por IA à proposta da estrutura inicial e fundamentação, sempre com validação humana | Contrato de assistência a detalhar, sem criar atribuição jurídica à IA |
| **E301-ASO, E302-HIS** | Fontes autoritativas, proveniência, versionamento e reconstrução de estados do fluxo | CS-20 (histórico) |
| **D101-RAS, D102-OBS, D103-MET, D104-ACI** | Auditoria, monitoramento, métricas e conformidade pertinentes às operações | CS-20 (auditoria), contratos específicos a detalhar |
| **E101-EVT, E102-PUB, E103-ENT e E201-INT** | Eventos e integração apenas onde necessários à consistência do fluxo | CS-21 se aplicável |
| **B1/B2/B3** | Interfaces de usuário/gestor/administrador como consumidores de serviços | Domínios existentes; não criar novos códigos de módulo sem aprovação |

**Atenção:** a implementação mínima de uma capacidade não exige implementação integral de todos os outros serviços de seu módulo. Contratos específicos e proprietários transacionais serão detalhados no planejamento técnico.

## 5. Pacotes de trabalho sugeridos

**P0 — Contrato mínimo de execução e persistência.** Definir cenário de prova, identificadores, banco/ambientes, autenticação, rastreabilidade, padrões de testes, tratamento de erro e mecanismos de integração. Reutilizar decisões técnicas existentes sem assumir que a implementação de C105-MSG já cobre estes módulos.

**P1 — Fundamento semântico e normativo.** Preparar e testar as estruturas tipológicas e normativas aplicáveis, configuração versionada da ontologia e motor A107-EOB de avaliação de condições por âmbito.

**P2 — Identidade pública.** Acreditação pública mínima de Pessoas participantes, IDUP, Credencial C e verificação contextual de autorização.

**P3 — Organização e cliente.** Incorporar organização, habilitar cliente, designar GOI; registrar primeiro nível estrutural e proposta assistida por IA revisada.

**P4 — Competência e autoridade.** Compor competências normativas, registrar e verificar investidura do Mandatário, bloquear GOI imediatamente após submissão, permitir convalidação ordinária e desbloqueio excepcional motivado.

**P5 — Verificação integrada e Marco A.** Executar A107-EOB sobre CM-01–04; Administrador autoriza tecnicamente após verificação satisfatória; preservar evidências, estados, decisões e histórico.

## 6. Testes de aceitação obrigatórios

| ID | Cenário | Resultado esperado |
|---|---|---|
| AT-01 | Organização corretamente fundamentada + CM-01–04 satisfeitas | Marco A autorizável e autorização técnica registrada pelo Administrador |
| AT-02 | Identidade institucional sem fundamento suficiente | CM-01 pendente; Marco A negado |
| AT-03 | Estrutura de primeiro nível sem revisão/homologação do GOI | CM-02 pendente; Marco A negado |
| AT-04 | Competência sem cadeia normativa verificável | CM-03 pendente; Marco A negado |
| AT-05 | Submissão de designação do Mandatário | Bloqueio imediato do GOI, antes da decisão sobre investidura |
| AT-06 | Mandatário não legitimado | CM-04 pendente; GOI permanece bloqueado no fluxo ordinário |
| AT-07 | Mandatário legitimado, GOI não convalidado | GOI permanece bloqueado no fluxo ordinário |
| AT-08 | Mandatário legitimado e GOI convalidado | GOI regularizado e apto a solicitar autorização, se condições satisfeitas |
| AT-09 | Desbloqueio excepcional do GOI pelo Administrador | Decisão motivada e auditada; não produzir convalidação fictícia nem competência jurídica |
| AT-10 | GOI tenta modificar unilateralmente Mandatário reconhecido | Operação rejeitada e registrada |
| AT-11 | Operação de usuário sem autorização contextual | Acesso negado e auditado |
| AT-12 | Marco A autorizado, sistema estruturante ainda não habilitado | Não declarar sistemas/serviços externos habilitados por inferência |
| AT-13 | Reprocessamento da mesma operação | Sem duplicação indevida de organização, Pessoa ou decisão |
| AT-14 | Mudança de regra/versão normativa após verificação | Preservar versão, resultado, fundamento e histórico anteriores |
| AT-15 | Marco A técnico aprovado, sem recebimento contratual formal | Não considerar recebimento definitivo ou faturamento automaticamente realizados |

## 7. Evidências da entrega

1. Configurações versionadas de modelos e regras aplicadas.
2. Dados persistidos de organização/cliente, Pessoas participantes, órgãos/unidades de primeiro nível e vínculos.
3. Fundamentos normativos e relações de competência.
4. Registros de bloqueio, convalidação, verificação de investidura e autorização.
5. Resultado de avaliação de CM-01–04 por A107-EOB com justificativas.
6. Auditoria, logs, métricas e resultados de testes automatizados.
7. Demonstração reexecutável do fluxo positivo e dos caminhos de impedimento.

## 8. Conclusão e limites

**Marco técnico de entrega:** é possível executar o fluxo institucional de ponta a ponta até a autorização técnica do Marco A, com controle de competência, verificação ontológica, identidade pública, persistência, auditabilidade e testes de negativos.

**Não exigir:** implantação das jornadas 3–6 nem de todos os módulos; credencial S; acreditação privada; serviços públicos digitais; automação de recebimento definitivo e faturamento.

**Não confundir:** a criação deste documento não significa que o incremento foi implementado ou homologado. O projeto detalhado dos contratos `SRV`, topologia de serviços, dados, interfaces e testes permanece etapa seguinte.

## 9. Homologação expressa

Em 26/11/2026 o autor homologou expressamente o **INC-001**, aprovando seu objetivo, recorte de UC-001 a UC-007, pacotes P0–P5 e critérios de aceitação AT-01–AT-15. A partir deste baseline inicia-se a especificação técnica modular, começando pelo A107-EOB. Esta homologação não aprova antecipadamente contratos técnicos ou serviços ainda não especificados.
