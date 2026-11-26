# CIVITAS — UC-008 — Acreditar Privadamente uma Pessoa na CIVITAS

**Template:** CIV-UC-TPL v1.0  
**Versão da narrativa:** 0.1 — homologada em 26/11/2026  
**Situação:** narrativa funcional homologada pelo autor  
**Jornada:** JRN-CIV-002 — Registro e Acreditação de Pessoas (em composição)  
**Dependência principal:** UC-CIV-007 — Registro de Pessoa por Acreditação Pública

> **Controle de homologação:** a narrativa da seção 5.1 incorpora as decisões sobre acreditação privada exclusiva por Agente Público legitimado, verificação procedimental, rastreabilidade à raiz pública e verificação documental presencial ordinária, com possibilidade de meios alternativos juridicamente fundamentados e autorizados pelo poder público. Políticas técnicas ainda não definidas não são presumidas como homologadas.

## Identificação

| Campo | Valor |
|---|---|
| Código do caso de uso | UC-CIV-008 |
| Título | Acreditar Privadamente uma Pessoa na CIVITAS |
| Versão | 0.1 |
| Situação | Homologado |
| Data | 2026-11-26 |
| Jornada de referência | JRN-CIV-002 |
| Dependências | UC-007; Diretório de Pessoas; Catálogo de Raízes de Confiança; participação e legitimidade do Agente Público |

## 1. Propósito

Permitir que uma Pessoa seja acreditada **privadamente na CIVITAS**, mediante procedimento de identificação e reconhecimento realizado **exclusivamente por Agente Público legitimado**, com evidências registradas e cadeia de confiança verificável até uma fonte de acreditação pública reconhecida pela plataforma.

## 2. Contexto e fundamento

A Cadeia Geral de Confiança CIVITAS tem como âncoras acreditações públicas reconhecidas, inicialmente ICP-Brasil e gov.br, ligadas a Pessoas-raiz por meio do Catálogo de Raízes de Confiança.

A acreditação privada não equivale à acreditação pública: sua validade é interna à CIVITAS e deriva da regularidade dos sucessivos atos de reconhecimento. A presunção relativa (*juris tantum*) associada a atos oficiais de agentes públicos não autoriza tratar qualquer declaração privada de servidor como ato formal legítimo. Por isso, a condição de Agente Público é necessária, mas não suficiente: deve haver **legitimidade e competência para realizar o procedimento de acreditação** no exercício de atribuições pertinentes.

## 3. Participantes

| Participante | Responsabilidade |
|---|---|
| Pessoa interessada | Apresenta-se para identificação e fornece os elementos exigidos pelo procedimento |
| Agente Público acreditador | Executa verificação de identidade, declara formalmente o reconhecimento e responde pelo ato dentro de suas atribuições |
| CIVITAS | Verifica a legitimidade do acreditador, sua cadeia de confiança, a regularidade do procedimento e registra a acreditação |
| Diretório de Pessoas | Identifica a Pessoa existente ou registra identidade única, com IDUP |
| Catálogo de Raízes de Confiança | Permite localizar a origem pública que sustenta a cadeia do acreditador e, por extensão, da acreditação privada |

## 4. Pré-condições

- O Agente Público acreditador deve possuir identidade registrada na CIVITAS e cadeia de confiança verificável até o Catálogo de Raízes de Confiança.
- Sua participação institucional como Agente Público e sua competência para praticar o ato de acreditação devem estar legitimadas e verificáveis.
- Deve existir procedimento de identificação e reconhecimento aplicável, com regras de verificação e evidências pertinentes.
- A plataforma deve dispor de meios de identificar ou registrar a Pessoa destinatária e preservar a rastreabilidade das relações de acreditação.

## 5. Narrativa principal

### 5.1 Narrativa canônica homologada — UC-008 v0.1

A Plataforma CIVITAS deverá permitir que uma Pessoa seja acreditada privadamente por um **Agente Público legitimado** para realizar procedimentos de identificação e reconhecimento de Pessoas, estabelecendo um vínculo de confiança válido no âmbito da plataforma.

A realização da acreditação privada deverá exigir que o Agente Público acreditador esteja devidamente identificado na CIVITAS, possua participação institucional legitimada e disponha de uma cadeia de confiança verificável até o Catálogo de Raízes de Confiança CIVITAS.

A acreditação deverá decorrer de **procedimento de verificação da identidade** da Pessoa interessada, realizado pelo Agente Público. O **procedimento ordinário será a verificação documental presencial**. Outros procedimentos ou soluções técnicas poderão ser admitidos posteriormente, **desde que possuam fundamentação e autorização do poder público competente**, com garantias de identificação e verificabilidade pertinentes. O mero emprego de recurso tecnológico não dispensa essa fundamentação e autorização.

O Agente Público deverá declarar formalmente o resultado da verificação realizada, identificando a Pessoa acreditada e registrando as informações e evidências que fundamentam o reconhecimento.

A CIVITAS deverá verificar a legitimidade do acreditador, sua competência para realizar o procedimento e a integridade de sua cadeia de confiança antes de admitir o registro da nova acreditação.

Quando a Pessoa acreditada ainda não possuir identidade registrada na CIVITAS, a plataforma deverá constituir seu registro no Diretório de Pessoas, atribuindo-lhe um **Identificador Digital Único da Pessoa (IDUP)**. Quando já existir registro, deverá preservar a identidade e o identificador anteriormente estabelecidos, evitando duplicidades.

A acreditação privada deverá estabelecer uma relação rastreável entre o Agente Público acreditador e a Pessoa acreditada, preservando os fundamentos, as circunstâncias e as evidências do procedimento de reconhecimento.

A plataforma deverá permitir que a cadeia de confiança da Pessoa acreditada seja percorrida sucessivamente até alcançar uma Pessoa-raiz registrada no Catálogo de Raízes de Confiança, identificando, por intermédio desse catálogo, a fonte pública que fundamentou a cadeia.

A Pessoa acreditada privadamente **não adquirirá automaticamente a capacidade de acreditar outras Pessoas**. Essa possibilidade dependerá de sua própria condição de Agente Público, da competência para realizar procedimentos de acreditação e do cumprimento das mesmas exigências aplicáveis aos demais acreditadores.

A CIVITAS deverá preservar a historicidade das acreditações, dos responsáveis por sua realização e das evidências utilizadas, permitindo verificar a origem e a situação da confiança estabelecida, inclusive diante de alterações posteriores.

A acreditação privada produzirá efeitos no âmbito da CIVITAS, não se confundindo com acreditação pública nem atribuindo automaticamente à Pessoa acreditada posições, competências ou autorizações institucionais.

## 6. Situações alternativas

| Situação | Tratamento |
|---|---|
| Acreditador não é Agente Público | Acreditação privada não autorizada |
| Acreditador é Agente Público, mas não possui competência pertinente | Acreditação privada não autorizada |
| Cadeia do acreditador não alcança uma raiz pública verificável | Acreditação privada não concluída |
| Procedimento de verificação ou evidências insuficientes | Acreditação privada não concluída; apontar pendências |
| Solução técnica alternativa sem fundamento ou autorização pública competente | Não admitir como substituta do procedimento ordinário |
| Pessoa interessada já possui IDUP | Preservar registro e IDUP; adicionar o fundamento de acreditação quando válido |
| Conflito na identificação ou indícios de duplicação | Suspender vinculação automática até solução da divergência |
| Elo anterior da cadeia com legitimidade ou competência comprometida | Não presumir validade derivada; encaminhar para verificação e tratamento da cadeia |

## 7. Pós-condições

- A Pessoa acreditada está identificada no Diretório de Pessoas por IDUP, sem duplicação.
- A acreditação privada encontra-se registrada com Agente Público acreditador, procedimento, fundamento, evidências e historicidade.
- A relação de acreditação permite reconstruir o percurso até uma Pessoa-raiz e a correspondente fonte pública.
- Nenhum papel, posição, competência ou autorização institucional é conferido automaticamente pela acreditação privada.

## 8. Regras e restrições

| ID | Regra | Situação |
|---|---|---|
| REG-UC008-01 | Apenas Agente Público legitimado e competente pode acreditar privadamente outra Pessoa. | Homologada |
| REG-UC008-02 | A identidade do acreditador deve possuir cadeia de confiança verificável até o Catálogo de Raízes. | Homologada |
| REG-UC008-03 | Toda acreditação privada exige procedimento de verificação da identidade e registro das evidências. | Homologada |
| REG-UC008-04 | A verificação documental presencial é o procedimento ordinário. Alternativas técnicas exigem fundamento e autorização do poder público competente. | Homologada |
| REG-UC008-05 | A plataforma verifica a legitimidade institucional e a competência do acreditador, além da cadeia de confiança. | Homologada |
| REG-UC008-06 | O registro identifica ou reutiliza IDUP existente; não duplica Pessoas. | Homologada |
| REG-UC008-07 | A cadeia da Pessoa acreditada deve poder ser percorrida até o Catálogo de Raízes e sua origem pública. | Homologada |
| REG-UC008-08 | A Pessoa acreditada não recebe automaticamente faculdade de acreditar terceiros nem competências ou autorizações institucionais. | Homologada |
| REG-UC008-09 | Acreditações, verificações, responsáveis, fundamentos e evidências devem preservar rastreabilidade e historicidade. | Homologada |

## 9. Questões para detalhamento posterior

| ID | Questão | Situação |
|---|---|---|
| Q-01 | Elementos documentais e evidências mínimas para verificação presencial | A especificar |
| Q-02 | Autoridade competente e rito para homologar procedimentos técnicos alternativos | A especificar |
| Q-03 | Critérios de comprovação da atribuição do Agente Público para acreditar | A especificar |
| Q-04 | Tratamento de suspensão, invalidação ou revogação de elos e efeitos sobre cadeias derivadas | A especificar |
| Q-05 | Identificação, retenção e proteção das evidências conforme requisitos arquivísticos e de privacidade | A especificar |

## 10. Rastreabilidade

- **UC-CIV-007 v0.1:** ingresso público e Catálogo de Raízes de Confiança.
- **JRN-CIV-002:** registro e acreditação de Pessoas (jornada ainda em composição).
- **Ontologia da CIVITAS:** Pessoa, Agente Público, participação institucional, competência, evidências e historicidade.
- **Domínio de Arquivos Públicos:** preservação documental e cadeia de custódia das evidências, quando aplicável.
- **Decisão de homologação (26/11/2026):** o autor confirmou exclusividade do Agente Público, verificação obrigatória e rastreabilidade à raiz pública; aprovou a **verificação documental presencial como procedimento ordinário**, admitindo outros meios técnicos **somente quando fundamentados e autorizados pelo poder público**, e determinou a homologação do UC-008.
