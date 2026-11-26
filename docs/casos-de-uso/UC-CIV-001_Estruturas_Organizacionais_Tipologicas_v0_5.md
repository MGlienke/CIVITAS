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

**Situações candidatas à discussão, exceto ALT-02, cuja regra foi homologada na Q-03.** Os demais comportamentos permanecem em aberto.

| ID | Condição / variação | Comportamento esperado | Situação |
|---|---|---|---|
| ALT-01 | Modelo importado incompatível com o metamodelo nativo | A definir (rejeição, relatório de inconsistências e correção externa) | Em aberto |
| ALT-02 | Solicitação de substituição de modelo tipológico | Proibida enquanto existirem instâncias concretas; somente modelo vazio poderá ser desativado e, depois, substituído por nova versão submetida à verificação Q-02 | **Homologada na Q-03** |
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
| REG-08 | Critérios técnicos de conformidade e formatos de importação. | Técnica/operacional | Não definidos | A definir |
| REG-09 | Modelo tipológico com uma ou mais instâncias concretas vinculadas não pode ser alterado, desativado ou substituído. | Integridade referencial | Decisão Q-03 | Homologada |
| REG-10 | Modelo tipológico vazio, para fins de substituição, é aquele sem nenhuma estrutura organizacional concreta vinculada à sua identificação e versão, independentemente dos tipos e relações que o compõem. | Regra conceitual | Decisão Q-03 | Homologada |
| REG-11 | Substituição por nova versão requer desativação prévia da versão anterior, permitida apenas quando vazia. | Versionamento / integridade | Decisão Q-03 | Homologada |
| REG-12 | Nova versão importada deve passar pela verificação de conformidade da Q-02 antes de ser disponibilizada. | Conformidade | Decisões Q-02 e Q-03 | Homologada |
| REG-13 | Distinguir o fundamento normativo constitutivo do Estado/Entidade Pública de sua organização administrativa interna evolutiva. | Institucional / normativa | Decisão Q-04 e observação homologatória | Homologada como princípio conceitual |
| REG-14 | A substituição do modelo constitutivo depende de alteração do fundamento normativo constitutivo pertinente, além das condições de integridade da Q-03. | Integridade / normativa | Decisão Q-04 e observação homologatória | Homologada como diretriz; critérios jurídicos específicos a detalhar |
| REG-15 | Mudanças na estrutura organizacional interna de Estado, Entidade Pública ou Órgão não implicam necessariamente substituição do tipo ou perda de identidade institucional. | Historicidade / organização | Decisão Q-04 | Homologada |
| REG-16 | A exclusão de uma estrutura concreta para esvaziamento do modelo só será admitida quando não comprometer dados ou relações institucionais sujeitos a preservação; condições detalhadas a definir. | Integridade / historicidade | Decisão Q-04 | Homologada com detalhamento pendente |
| REG-17 | A instauração de uma estrutura concreta de Estado deverá partir de modelo tipológico selecionado e da Constituição indicada pelo Administrador. | Constitucional / institucional | Decisão Q-05 | Homologada |
| REG-18 | A IA somente poderá propor elementos e relações cuja identificação e posição institucional possam ser justificadas por fundamento normativo identificável; lacunas não autorizam elementos presumidos. | Verdade administrativa / verificabilidade | Decisão Q-05 e observação do autor | Homologada |
| REG-19 | A proposta assistida por IA deverá apresentar elementos, relações e os fundamentos normativos usados para justificá-los, para revisão, correção e complementação pelo Administrador. | Rastreabilidade / revisão | Decisão Q-05 | Homologada |
| REG-20 | A estrutura inicial será constituída após aprovação do Administrador e preservará a correspondência entre instâncias, tipos e fundamentos normativos. | Governança / rastreabilidade | Decisão Q-05 | Homologada |
| REG-21 | A elaboração inicial observará os estados Em preparação, Aprovada e Constituída; o detalhamento posterior poderá ser progressivo sem alterar o fundamento constitutivo. | Ciclo de vida | Decisão Q-05 | Homologada |
| REG-22 | A CIVITAS distingue os papéis de Administrador da Plataforma e Gestor de Entidade, com responsabilidades institucionais diferentes. | Governança / autorização | Decisão Q-06 | Homologada |
| REG-23 | Importação e conformidade de modelos tipológicos, constituição inicial do Estado e gestão do CRM/habilitação de clientes são responsabilidades do Administrador da Plataforma. | Governança / CRM | Decisão Q-06 | Homologada |
| REG-24 | Cada cliente da plataforma deverá possuir um Gestor de Entidade, autorizado a constituir e manter a estrutura organizacional interna de sua respectiva Entidade Pública. | Governança / organização | Decisão Q-06 | Homologada |
| REG-25 | O Gestor de Entidade atua no âmbito institucional autorizado, sem administrar os modelos tipológicos gerais ou os demais clientes da CIVITAS. | Autorização / segregação de funções | Decisão Q-06 | Homologada |
| REG-26 | A existência jurídica/institucional de uma Entidade Pública é independente de sua habilitação como cliente CIVITAS. | Distinção institucional | Decisão Q-06 | Homologada |

> As regras vinculadas à narrativa expressam requisitos de domínio e comportamento. Ainda não representam contratos técnicos nem serviços identificados.

## 9. Questões em aberto

| ID | Questão | Alternativas / implicações | Decisão / situação |
|---|---|---|---|
| Q-01 | Como modelos tipológicos são empacotados e transportados para importação? | Formatos, intercâmbio e compatibilidade | Em aberto; etapa de especificação |
| Q-02 | Como se verifica e comunica a conformidade de um modelo? | Capacidade específica de verificação, serviço de conformidade, interface administrativa e relatório associado ao modelo e à versão | **Homologada — decisão Q-02 (26/11/2026); detalhamento técnico pendente** |
| Q-03 | Como coexistem versões diferentes de um modelo utilizado? | Substituição apenas após desativação de modelo vazio; modelos com instâncias vinculadas são protegidos contra alteração, desativação e substituição | **Homologada — decisão Q-03 (26/11/2026)** |
| Q-04 | Como tratar mudanças de modelo quando já existem instâncias? | Proteger o modelo tipológico enquanto houver instâncias; admitir esvaziamento/exclusão de estrutura concreta sob condições de preservação; distinguir alteração constitutiva normativa de evolução da organização interna | **Homologada — decisão Q-04 (26/11/2026), com observação constitutiva do autor** |
| Q-05 | Quais estados de elaboração de uma estrutura concreta serão admitidos? | Instanciação do Estado assistida por IA com referência constitucional, proposta rastreável, revisão pelo Administrador e estados Em preparação / Aprovada / Constituída | **Homologada — decisão Q-05 (26/11/2026), com vedação de elementos sem justificativa normativa** |
| Q-06 | Qual o escopo de permissões do Administrador e de eventuais outros participantes? | Papéis separados de Administrador da Plataforma e Gestor de Entidade; CRM e habilitação de clientes sob o Administrador; gestão da estrutura interna sob o Gestor autorizado | **Homologada — decisão Q-06 (26/11/2026)** |
| Q-07 | Como o MT-BR deverá materializar os tipos, relações e restrições aprovados? | Artefato conceitual separado; matriz tipológica própria | Em elaboração; fora da homologação UC-001 v0.5 |

### Decisão homologada — Q-02: verificação e comunicação da conformidade

**Situação:** Redação integral homologada pelo autor em 26/11/2026. A decisão complementa o UC-001 sem modificar sua narrativa canônica v0.5.

A Plataforma CIVITAS deverá dispor de uma capacidade específica para verificar a conformidade dos modelos tipológicos importados em relação ao Metamodelo Organizacional nativo.

Essa capacidade será disponibilizada por meio de um serviço de verificação de conformidade, responsável por examinar os elementos, as relações e as restrições presentes no modelo importado, identificando eventuais inconsistências, incompatibilidades ou omissões.

O Administrador da Plataforma deverá dispor de uma interface que permita solicitar a verificação, acompanhar seus resultados, consultar as inconsistências identificadas e repetir a verificação após as correções necessárias.

A plataforma deverá registrar os resultados das verificações, preservando sua associação com o modelo tipológico e sua respectiva versão.

Somente modelos cuja conformidade tenha sido aprovada poderão ser disponibilizados para instanciação.

**Delimitação:** a necessidade de um serviço específico e de uma interface administrativa está homologada. A decisão sobre adotar um microserviço independente permanece para a decomposição técnica. A distinção entre conformidade estrutural e validação jurídica/normativa foi recomendada para análise futura, não homologada como parte da redação Q-02.

### Decisão homologada — Q-03: controle de versões e substituição de modelos tipológicos

**Situação:** Redação integral homologada pelo autor em 26/11/2026. Complementa o UC-001 sem modificar a narrativa canônica v0.5.

A Plataforma CIVITAS deverá preservar a integridade referencial entre os modelos tipológicos de estruturas organizacionais e as estruturas concretas constituídas a partir deles.

Um modelo tipológico que já tenha sido utilizado para constituir uma estrutura organizacional concreta não poderá ser substituído, alterado ou desativado enquanto existirem instâncias vinculadas a ele.

A substituição de um modelo tipológico por uma nova versão somente será permitida quando a versão anterior estiver desativada. Para que a desativação seja autorizada, o modelo deverá estar vazio, isto é, **não poderá possuir qualquer estrutura organizacional concreta constituída a partir dele**.

Dessa forma, a plataforma não precisará examinar individualmente outras vinculações ou dependências para autorizar a substituição. A existência de instâncias organizacionais será a condição determinante para impedir a desativação e a substituição.

A nova versão deverá ser importada e submetida ao processo de verificação de conformidade estabelecido na Q-02 antes de ser disponibilizada para utilização.

**Definição homologada — Modelo tipológico vazio:** modelo que não possui nenhuma estrutura organizacional concreta vinculada à sua identificação e versão, independentemente da quantidade de tipos e relações que contenha.

**Consequência registrada:** uma versão já utilizada para instanciar uma estrutura concreta permanece protegida contra substituição enquanto houver essa vinculação; eventuais estratégias futuras de evolução não foram definidas nesta decisão.

### Decisão homologada — Q-04: estabilidade constitutiva e evolução organizacional

**Situação:** Redação aprovada pelo autor em 26/11/2026, expressamente condicionada à observação sobre fundamento constitucional/normativo constitutivo. Complementa as decisões Q-02 e Q-03 sem modificar a narrativa canônica UC-001 v0.5.

A Plataforma CIVITAS deverá distinguir a evolução das estruturas organizacionais concretas da evolução dos modelos tipológicos utilizados para constituí-las.

Os modelos tipológicos estarão sujeitos às regras de integridade referencial estabelecidas na Q-03, não podendo ser alterados, desativados ou substituídos enquanto possuírem instâncias vinculadas.

O Administrador poderá excluir uma estrutura organizacional concreta instanciada, incluindo os elementos que a compõem, desde que essa exclusão seja admissível e não comprometa informações ou relações institucionais que devam ser preservadas. Uma vez eliminadas todas as instâncias vinculadas ao modelo tipológico, este será considerado vazio e poderá ser desativado e substituído, conforme a Q-03.

A evolução da organização interna de uma Entidade Pública ou de um Órgão Público será tratada separadamente. Suas estruturas organizacionais concretas poderão ser criadas, modificadas e reorganizadas ao longo do tempo, respeitando as regras institucionais e os fundamentos normativos aplicáveis.

Dessa forma, a estabilidade do modelo tipológico não impedirá a evolução das estruturas administrativas concretas constituídas no âmbito das Entidades Públicas e dos Órgãos.

#### Observação constitutiva adicional do autor — integrante da homologação

O modelo tipológico de organização de um Estado tem fundamento na respectiva Constituição. Sua substituição corresponde a uma alteração do fundamento constitucional que define o modelo, **não** a uma reorganização ordinária de órgãos e unidades. Uma instância de organização estatal só deve ser eliminada se tal exclusão for admissível em face de sua existência e de sua integridade institucional, não como artifício para substituir o modelo tipológico.

Por analogia, a existência e a identidade de uma Entidade Pública decorrem de seu **fundamento normativo constitutivo**. Sua substituição ou extinção depende de alteração jurídica constitutiva pertinente; a reorganização interna da Entidade Pública ou de um Órgão não representa, por si, sua extinção ou substituição.

A CIVITAS deverá, portanto, preservar a distinção entre **(a) alteração ou extinção constitutiva, (b) permanência da identidade institucional e (c) evolução histórica da estrutura interna**.

**Delimitação:** a relação exata entre determinadas alterações constitucionais, a necessidade de nova versão tipológica e a extinção de entes ou entidades exige análise normativa específica. A expressão “somente se a Constituição for mudada” é registrada como a diretriz conceitual aprovada para este modelo, sem afirmar que toda emenda constitucional exija substituição tipológica. A evolução da organização interna e seu controle histórico serão detalhados em casos de uso próprios.

### Decisão homologada — Q-05: instanciação constitucional assistida por IA

**Situação:** Redação e três estados de elaboração aprovados pelo autor em 26/11/2026, com observação adicional expressamente integrada à homologação. Complementa o UC-001 sem modificar a narrativa canônica v0.5.

A constituição de uma instância de Estado na Plataforma CIVITAS deverá estar fundamentada na Constituição que estabelece sua organização institucional.

Para iniciar a instanciação, o Administrador selecionará o modelo tipológico correspondente e indicará a Constituição que fundamenta a organização do Estado a ser representado.

A plataforma deverá disponibilizar um mecanismo de inteligência artificial capaz de analisar a referência normativa indicada e identificar os elementos e as relações institucionais nela estabelecidos, produzindo uma proposta de estrutura organizacional concreta compatível com o modelo tipológico selecionado.

A proposta deverá apresentar os elementos identificados, suas relações institucionais e os fundamentos normativos utilizados para justificá-los, permitindo ao Administrador examinar, corrigir e complementar o resultado.

A estrutura organizacional inicial somente será efetivamente constituída após a aprovação do Administrador, preservando-se a correspondência entre os elementos instanciados, seus tipos organizacionais e os fundamentos normativos que sustentam sua existência e posição institucional.

A instanciação inicial não precisará contemplar todos os detalhes da organização administrativa do Estado, mas deverá representar os elementos institucionais identificados e aprovados a partir da Constituição. O detalhamento posterior ocorrerá progressivamente, conforme a incorporação de Entidades Públicas, órgãos e suas estruturas administrativas.

#### Estados de elaboração homologados

| Estado | Significado |
|---|---|
| Em preparação | A IA está preparando a proposta, ou o Administrador está revisando e complementando os resultados. |
| Aprovada | O Administrador validou a estrutura inicial proposta e seus fundamentos. |
| Constituída | A estrutura aprovada foi instanciada na Plataforma CIVITAS e está disponível para utilização. |

Os estados correspondem ao **processo de constituição inicial da estrutura**. Não se confundem com os estados de vigência, existência jurídica ou evolução posterior de cada organização, que terão tratamento específico.

#### Observação expressa do autor — integrante da homologação

**Nenhum elemento ou relação da estrutura organizacional estatal poderá ser proposto como válido, aprovado ou instanciado sem justificativa normativa identificável.** A IA deverá limitar suas propostas aos elementos cuja existência, classificação e posição institucional possam ser sustentadas pela Constituição indicada ou pelos fundamentos normativos pertinentes. Diante de lacuna, ambiguidade ou insuficiência de fundamento, deverá registrar a ocorrência para exame do Administrador, sem inventar elementos ou vínculos.

A exigência protege a **Verdade Administrativa desde a constituição da estrutura organizacional**, e se aplica igualmente às correções e aos complementos introduzidos pelo Administrador: a aprovação humana não substitui a necessidade de fundamento normativo.

#### Delimitações

- A Constituição indicada é a referência constitutiva principal. O tratamento de normas complementares, fontes e sua vigência será detalhado na especificação, sem relaxar a exigência de fundamento normativo verificável.
- A análise por IA **não** constitui decisão jurídica autônoma. O Administrador revisa, corrige e aprova; não se presume que a IA tenha localizado todos os elementos constitucionais.
- Os critérios de suficiência da fundamentação, níveis de evidência, formatos e contratos técnicos continuam para a fase de especificação funcional.
- O detalhamento gradual da organização não equivale a substituir o modelo tipológico, conforme Q-03 e Q-04.

### Decisão homologada — Q-06: administração da plataforma e gestão das entidades

**Situação:** Redação homologada pelo autor em 26/11/2026. Complementa o UC-001 sem alterar a narrativa canônica v0.5.

A Plataforma CIVITAS deverá distinguir dois papéis administrativos principais: o **Administrador da Plataforma** e o **Gestor de Entidade**.

O Administrador da Plataforma será responsável pela administração geral do ambiente CIVITAS, incluindo a gestão dos modelos tipológicos de referência, a constituição inicial das estruturas estatais e a criação das condições necessárias para que Entidades Públicas possam utilizar a plataforma.

Caberá também ao Administrador da Plataforma realizar a gestão dos clientes CIVITAS, por meio de funcionalidades de relacionamento e administração de clientes (CRM), permitindo registrar, habilitar e acompanhar as Entidades Públicas que utilizam os serviços da plataforma.

Cada cliente da Plataforma CIVITAS deverá possuir um **Gestor de Entidade**, responsável pela administração da respectiva organização institucional no ambiente CIVITAS.

Ao Gestor de Entidade caberá constituir, organizar e manter a estrutura organizacional interna da Entidade Pública sob sua responsabilidade, observando seus fundamentos normativos, as competências institucionais e as regras estabelecidas pela plataforma.

A atuação do Gestor de Entidade ficará restrita ao âmbito institucional para o qual estiver autorizado, não abrangendo a administração dos modelos tipológicos gerais nem a gestão de outros clientes da plataforma.

Dessa forma, a CIVITAS separará a governança das estruturas institucionais de referência, a administração comercial e operacional dos clientes e a gestão da organização interna de cada Entidade Pública.

#### Distribuição de responsabilidades homologada

| Responsabilidade | Administrador da Plataforma | Gestor de Entidade |
|---|---|---|
| Administrar os modelos tipológicos | Sim | Não |
| Importar modelos tipológicos | Sim | Não |
| Verificar e aprovar conformidade | Sim, com apoio de serviço especializado | Não |
| Constituir a instância inicial de Estado | Sim | Não |
| Administrar o CRM de clientes | Sim | Não |
| Habilitar Entidades Públicas como clientes | Sim | Não |
| Designar o Gestor de Entidade | Sim, conforme autorização | Não, inicialmente |
| Constituir a organização interna da Entidade Pública | Não, como atividade ordinária | Sim |
| Manter e evoluir a estrutura organizacional interna | Não, como atividade ordinária | Sim |

#### Distinção institucional

A existência jurídica e institucional de uma Entidade Pública **independe de sua condição de cliente da CIVITAS**. O posicionamento institucional na organização do Estado, o relacionamento comercial/operacional com a plataforma e a gestão administrativa interna são fatos relacionados, mas distintos.

**Delimitação:** os papéis correspondem a responsabilidades e contextos de atuação, não necessariamente a categorias de Pessoas distintas. Regras concretas de autorização, delegação, substituição de gestores e representação serão definidas nas especificações funcionais posteriores.

**Referência arquitetural preliminar, sem atribuição de serviços nesta etapa:** A101-ADM, A102-GDC (CRM), A103-GEP, C302-EOR e C103-IEA.

---

## Rastreabilidade e controle de mudanças

| Registro | Situação |
|---|---|
| UC-001 v0.5 — narrativa | **Homologada pelo autor** |
| CIV-UC-TPL v1.0 | **Template homologado** |
| Transposição documental para as nove seções | **Preparada; revisão formal do detalhamento complementar pendente** |
| MT-BR-001 a MT-BR-005 | **Decisões conceituais aprovadas; pertencem ao modelo brasileiro específico** |
| Q-02 — Verificação e comunicação da conformidade | **Redação funcional homologada; serviço específico e interface administrativa requeridos** |
| Q-03 — Versionamento e substituição dos modelos | **Redação e definição de modelo vazio homologadas; substituição somente após desativação de versão sem instâncias vinculadas** |
| Q-04 — Estabilidade constitutiva versus evolução organizacional | **Redação homologada com a observação constitutiva adicional do autor; condições técnicas e jurídicas específicas pendentes** |
| Q-05 — Instanciação constitucional assistida por IA | **Redação e estados homologados; exigência de justificação normativa para cada elemento e relação como proteção da Verdade Administrativa** |
| Q-06 — Separação entre Administrador da Plataforma e Gestor de Entidade | **Redação e responsabilidades homologadas, incluindo CRM e gestão institucional de clientes** |
| Decomposição funcional e especificação dos serviços derivados | **Não iniciadas por este documento** |

**Atenção:** o fato de este documento ter sido salvo em repositório não constitui, por si só, homologação das novas formulações complementares. Qualquer alteração da narrativa canônica exige uma nova versão e aprovação explícita.
