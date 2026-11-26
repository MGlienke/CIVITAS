# CIVITAS — UC-001 — Constituir e Utilizar Estruturas Organizacionais Tipológicas

**Template de referência:** CIV-UC-TPL v1.0

## Identificação

| Campo | Valor |
|---|---|
| Código do caso de uso | UC-001 (identificador adotado na homologação; identificador no catálogo: UC-CIV-001) |
| Título | Constituir e Utilizar Estruturas Organizacionais Tipológicas |
| Versão da narrativa | **0.5 — homologada** |
| Versão da transposição para o template | **1.0 — consolidação documental, sujeita à conferência** |
| Situação | **Narrativa homologada; demais seções organizadas para conferência, sem homologação adicional implícita** |
| Data da consolidação | 2026-11-26 |
| Participante responsável pela validação | Autor / responsável pela definição funcional da CIVITAS |
| Decisão vinculada | Homologação explícita da narrativa UC-001 v0.5 |
| Modelo organizacional inicial | Modelo Tipológico da Organização do Estado Brasileiro — MT-BR v0.1, em elaboração; decisões MT-BR-001 a MT-BR-005 aprovadas posteriormente, não integrantes da narrativa homologada |

> **Controle de homologação:** o texto integral da seção **5. Narrativa principal — texto canônico** reproduz a versão 0.5 aprovada, sem reformulação. As demais seções organizam informações dessa narrativa ou identificam pendências; sua redação complementar não deve ser considerada automaticamente homologada.

## 1. Propósito

Permitir que a Plataforma CIVITAS represente diferentes organizações estatais a partir de modelos tipológicos próprios, preservando a coerência entre o Metamodelo Organizacional nativo, os tipos organizacionais importados e as instâncias concretas posteriormente constituídas.

*Origem: síntese estritamente derivada da narrativa v0.5; consolidação sujeita à conferência.*

## 2. Contexto

A Plataforma CIVITAS deve contemplar organizações institucionais de diferentes Estados, como Brasil e Paraguai, sem embutir um único esquema nacional na própria plataforma. Para isso, o metamodelo é nativo e comum, enquanto os modelos tipológicos são elaborados externamente, importados e empregados para instanciar estruturas organizacionais concretas.

O primeiro modelo tipológico a ser elaborado externamente é o Modelo Tipológico da Organização do Estado Brasileiro (MT-BR); a sua definição normativa e tipológica é um **artefato distinto** deste caso de uso.

*Origem: narrativa v0.5 e decisões conceituais subsequentes. A menção ao MT-BR é contextual e não altera a narrativa homologada.*

## 3. Participantes

- **Participante principal:** Administrador da Plataforma CIVITAS.
- **Outros participantes:** elaborador externo do modelo tipológico, enquanto papel externo à plataforma; identificação, atribuições e fluxos de interação específicos **a definir**.
- **Responsabilidades acordadas:** o Administrador importa modelos tipológicos, escolhe o modelo a utilizar, cria uma instância do tipo raiz Estado e constitui progressivamente os demais elementos da organização.

## 4. Pré-condições

1. A plataforma dispõe de um **Metamodelo Organizacional nativo**.
2. Para importar, existe um modelo tipológico elaborado externamente segundo esse metamodelo.
3. Para iniciar a instanciação, existe um modelo tipológico importado, validado e disponível para seleção.

*Explicitação de condições implícitas na narrativa v0.5; conferir no fechamento documental.*

## 5. Narrativa principal

### 5.1 Texto canônico — UC-001 v0.5 (homologado integralmente)

A Plataforma CIVITAS deverá dispor de um Metamodelo Organizacional nativo, que estabeleça os elementos, as relações e as regras gerais necessários para representar diferentes estruturas organizacionais de Estados.

A partir desse metamodelo, poderão ser elaborados externamente modelos tipológicos de organização estatal, destinados a representar os tipos de elementos institucionais e as relações que caracterizam a organização de determinado Estado, sem conter suas instâncias concretas.

O Administrador da Plataforma poderá importar esses modelos tipológicos, que deverão ser verificados quanto à conformidade com o metamodelo nativo e disponibilizados para utilização.

Ao iniciar a constituição de uma organização estatal, o Administrador selecionará um dos modelos tipológicos disponíveis e criará uma instância de seu tipo raiz Estado. A partir dessa instância, poderá incorporar progressivamente os demais elementos de sua organização, respeitando os tipos, relações e restrições estabelecidos no modelo adotado.

A plataforma deverá preservar a identificação do modelo tipológico e de sua versão, mantendo a correspondência entre os elementos concretos e os tipos utilizados em sua constituição.

Dessa forma, a CIVITAS permitirá representar diferentes organizações estatais, preservando a coerência estrutural de suas instâncias e a independência entre o metamodelo comum, os modelos tipológicos e as organizações concretas.

### 5.2 Sequência descritiva derivada (para conferência; não é nova narrativa homologada)

1. Um modelo tipológico de organização estatal é elaborado externamente segundo o Metamodelo Organizacional CIVITAS.
2. O Administrador importa o modelo para a plataforma.
3. A plataforma verifica sua conformidade com o metamodelo nativo.
4. O modelo considerado conforme é disponibilizado para utilização.
5. O Administrador seleciona o modelo tipológico a utilizar.
6. O Administrador cria a instância de seu tipo raiz Estado.
7. O Administrador constitui progressivamente outros elementos organizacionais, conforme os tipos, relações e restrições do modelo adotado.
8. A plataforma preserva o identificador e a versão do modelo, bem como a correspondência entre os tipos e os elementos concretos.

## 6. Situações alternativas

**A definir.** As situações abaixo são *questões candidatas à discussão*, não comportamentos aprovados.

| ID | Condição / variação | Comportamento esperado | Situação |
|---|---|---|---|
| ALT-01 | Modelo importado incompatível com o metamodelo nativo | A definir (rejeição, relatório de inconsistências e correção externa) | Em aberto |
| ALT-02 | Nova versão de modelo já utilizado para instanciação | A definir (convivência de versões, migração, preservação histórica) | Em aberto |
| ALT-03 | Tentativa de instanciar relação não admitida pelo modelo | A definir (impedimento, justificativa e tratamento) | Em aberto |
| ALT-04 | Interrupção antes de completar a organização concreta | A definir (persistência de estrutura parcial e regras de retomada) | Em aberto |

## 7. Pós-condições

**Resultados expressamente decorrentes da narrativa:**

- Após importação conforme: um modelo tipológico é disponibilizado para utilização.
- Após instauração da organização: existe uma instância-raiz Estado e, conforme a atuação do Administrador, elementos institucionais progressivamente constituídos.
- A estrutura concreta mantém a identificação do modelo e de sua versão e a correspondência entre suas instâncias e os respectivos tipos.

**Resultados de erro, cancelamento ou reversão:** a definir.

## 8. Regras e restrições

| ID | Regra ou restrição | Natureza | Origem / fundamento | Situação |
|---|---|---|---|---|
| REG-01 | O Metamodelo Organizacional é nativo da Plataforma CIVITAS, comum aos modelos tipológicos. | Conceitual | UC-001 v0.5 e escolha aprovada da alternativa A | Acordada |
| REG-02 | Modelos tipológicos são elaborados externamente e não contêm instâncias concretas. | Conceitual | UC-001 v0.5 | Acordada |
| REG-03 | O modelo importado deve ser verificado quanto à conformidade com o metamodelo nativo antes de ser disponibilizado. | Funcional/conceitual | UC-001 v0.5 | Acordada |
| REG-04 | A constituição de uma organização começa pela instanciação de seu tipo raiz Estado. | Organizacional | UC-001 v0.5 | Acordada |
| REG-05 | As instâncias subsequentes respeitam tipos, relações e restrições do modelo adotado. | Organizacional | UC-001 v0.5 | Acordada |
| REG-06 | Identificação e versão do modelo, e correspondência tipo–instância, devem ser preservadas. | Rastreabilidade | UC-001 v0.5 | Acordada |
| REG-07 | O modelo brasileiro deve preservar as especializações e relações estabelecidas em MT-BR-001 a MT-BR-005. | Referência para modelo específico | Decisões conceituais MT-BR-001 a MT-BR-005 | Aprovada no MT-BR; não altera o UC-001 |
| REG-08 | Critérios técnicos de conformidade, formatos de importação e política de versionamento. | Técnica/operacional | Não definidos | A definir |

> As regras vinculadas à narrativa expressam requisitos de domínio e comportamento. Ainda não representam contratos técnicos nem serviços identificados.

## 9. Questões em aberto

| ID | Questão | Alternativas / implicações | Decisão / situação |
|---|---|---|---|
| Q-01 | Como modelos tipológicos são empacotados e transportados para importação? | Formatos, intercâmbio e compatibilidade | Em aberto; etapa de especificação |
| Q-02 | Como se verifica e comunica a conformidade de um modelo? | Capacidade específica de verificação, serviço de conformidade, interface administrativa e relatório associado ao modelo e à versão | **Homologada — decisão Q-02 (26/11/2026); detalhamento técnico pendente** |
| Q-03 | Como coexistem versões diferentes de um modelo utilizado? | Evolução, compatibilidade e histórico | Em aberto |
| Q-04 | Como tratar mudanças de modelo quando já existem instâncias? | Migração, permanência da versão anterior, validação | Em aberto |
| Q-05 | Quais estados de elaboração de uma estrutura concreta serão admitidos? | Estruturas parciais, revisão e publicação | Em aberto |
| Q-06 | Qual o escopo de permissões do Administrador e de eventuais outros participantes? | Autorização e responsabilidades | Em aberto |
| Q-07 | Como o MT-BR deverá materializar os tipos, relações e restrições aprovados? | Artefato conceitual separado; matriz tipológica própria | Em elaboração; fora da homologação UC-001 v0.5 |

### Decisão homologada — Q-02: verificação e comunicação da conformidade

**Situação:** Redação integral homologada pelo autor em 26/11/2026. A decisão complementa o UC-001 sem modificar sua narrativa canônica v0.5.

A Plataforma CIVITAS deverá dispor de uma capacidade específica para verificar a conformidade dos modelos tipológicos importados em relação ao Metamodelo Organizacional nativo.

Essa capacidade será disponibilizada por meio de um serviço de verificação de conformidade, responsável por examinar os elementos, as relações e as restrições presentes no modelo importado, identificando eventuais inconsistências, incompatibilidades ou omissões.

O Administrador da Plataforma deverá dispor de uma interface que permita solicitar a verificação, acompanhar seus resultados, consultar as inconsistências identificadas e repetir a verificação após as correções necessárias.

A plataforma deverá registrar os resultados das verificações, preservando sua associação com o modelo tipológico e sua respectiva versão.

Somente modelos cuja conformidade tenha sido aprovada poderão ser disponibilizados para instanciação.

**Delimitação:** a necessidade de um serviço específico e de uma interface administrativa está homologada. A decisão sobre adotar um microserviço independente permanece para a decomposição técnica. A distinção entre conformidade estrutural e validação jurídica/normativa foi recomendada para análise futura, não homologada como parte da redação Q-02.

---

## Rastreabilidade e controle de mudanças

| Registro | Situação |
|---|---|
| UC-001 v0.5 — narrativa | **Homologada pelo autor** |
| CIV-UC-TPL v1.0 | **Template homologado** |
| Transposição documental para as nove seções | **Preparada; revisão formal do detalhamento complementar pendente** |
| MT-BR-001 a MT-BR-005 | **Decisões conceituais aprovadas; pertencem ao modelo brasileiro específico** |
| Q-02 — Verificação e comunicação da conformidade | **Redação funcional homologada; serviço específico e interface administrativa requeridos** |
| Decomposição funcional e especificação dos serviços derivados | **Não iniciadas por este documento** |

**Atenção:** o fato de este documento ter sido salvo em repositório não constitui, por si só, homologação das novas formulações complementares. Qualquer alteração da narrativa canônica exige uma nova versão e aprovação explícita.
