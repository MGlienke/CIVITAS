# CIVITAS — UC-004 — Incorporar Organizações Institucionais à Estrutura Estatal

**Template de referência:** CIV-UC-TPL v1.0  
**Versão da narrativa:** **0.3 — homologada; ratificação expressa em 26/11/2026**  
**Situação:** narrativa v0.3 expressamente ratificada pelo autor em 26/11/2026, após regularização documental  
**Nota terminológica:** a seção 5.1 reproduz a narrativa v0.3 previamente apresentada; a denominação histórica **Gestor de Entidade** em um parágrafo corresponde ao papel atualmente denominado **Gestor da Organização Institucional (GOI)**, conforme harmonização posterior dos UC-001, UC-002 e UC-005.

> **Controle de versão e de sentido:** o texto da seção 5.1 conserva integralmente a redação da narrativa v0.3 discutida, sem alterar retroativamente seus termos. As seções complementares relacionam as decisões de instanciação progressiva, limites de autoridade e remissões aos UC-001 a UC-006. Nenhuma decomposição funcional é presumida.

## Identificação

| Campo | Valor |
|---|---|
| Código do caso de uso | UC-CIV-004 |
| Título | Incorporar Organizações Institucionais à Estrutura Estatal |
| Versão | 0.3 |
| Situação | Narrativa v0.3 homologada; ratificação expressa registrada |
| Data | 2026-11-26 |
| Responsável pela validação | Autor do projeto CIVITAS |
| Histórico | Narrativas preliminares v0.1 e v0.2 discutidas; v0.3 consolidada e registrada; autor confirmou expressamente que a redação previamente discutida estava homologada (26/11/2026) |
| Dependências | UC-001 (EOT), UC-002 (ENT/ENI), UC-003 (Ontologia de Referência) |
| Entrega para | UC-005 (habilitação de organização como cliente) |

## 1. Propósito

Constituir progressivamente a estrutura estatal concreta, começando pela instância raiz do tipo **Estado**, e incorporar outras Organizações Institucionais necessárias, sem confundir existência e representação institucional com sua habilitação como clientes CIVITAS.

## 2. Contexto

A plataforma dispõe de Ontologia de Referência única e de modelos EOT/ENT importados e verificados. A primeira Organização Institucional instanciada é a do Estado brasileiro (quando esse for o Estado modelado). A partir dela, o Administrador poderá constituir somente os elementos intermediários indispensáveis para incorporar a organização pretendida, mesmo que esta seja a primeira futura cliente.

## 3. Participantes

- **Administrador da Plataforma:** participante principal; constitui instância raiz e organizações necessárias, indica fundamentos normativos, revisa propostas de IA e mantém organizações de referência não clientes.
- **Organizações Institucionais incorporadas:** elementos concretos da estrutura estatal, que poderão ou não se tornar clientes da plataforma.
- **Gestor da Organização Institucional (GOI):** papel futuro, designado na habilitação do cliente (UC-005), que responderá pela organização interna, sem administrar os modelos tipológicos nem a identidade e as relações da estrutura estatal de referência.

## 4. Pré-condições

EOT e ENT correspondentes elaboradas e importadas em conjunto, verificadas quanto à conformidade e à compatibilidade semântica com a Ontologia de Referência, e disponibilizadas para instanciação.

## 5. Narrativa principal

### 5.1 Narrativa v0.3 — texto consolidado original

A Plataforma CIVITAS deverá permitir que o Administrador da Plataforma constitua progressivamente a estrutura organizacional concreta de um Estado, utilizando uma Estrutura Organizacional Tipológica (EOT) e sua correspondente Estrutura Normativa Tipológica (ENT), previamente importadas, verificadas e disponibilizadas para utilização.

A constituição da estrutura estatal deverá começar pela instanciação do tipo raiz Estado, previsto na EOT. Para essa primeira Organização Institucional, o Administrador deverá identificar o Estado a ser representado e indicar seu fundamento normativo constitutivo, permitindo à plataforma estabelecer sua identidade institucional e sua correspondente Estrutura Normativa Instanciada (ENI).

A instanciação deverá considerar a Ontologia de Referência do Estado Digital, incorporando as definições constitutivas e as determinações institucionais aplicáveis ao Estado, preservando aquelas cuja determinação ou realização compete às organizações que venham a ser incorporadas posteriormente.

A partir da instância do Estado, o Administrador poderá incorporar progressivamente outras Organizações Institucionais, selecionando seus tipos na EOT, identificando suas posições e relações institucionais e indicando os fundamentos normativos correspondentes, conforme as exigências estabelecidas pela ENT.

A incorporação de uma Organização Institucional não exigirá a constituição antecipada de toda a estrutura estatal. A plataforma deverá identificar os elementos e relações institucionais indispensáveis à sua correta representação, permitindo que o Administrador constitua progressivamente apenas as organizações intermediárias necessárias.

A incorporação somente poderá ser concluída quando os elementos e relações indispensáveis à representação institucional estiverem constituídos e devidamente fundamentados, respeitando as competências, os vínculos e as restrições previstos nos modelos de referência, sem pressupor relações hierárquicas onde elas não existirem.

Para cada Organização Institucional incorporada, a plataforma deverá constituir sua Estrutura Normativa Instanciada e aplicar as definições e determinações ontológicas pertinentes, preservando a correspondência entre sua identidade institucional, seu tipo organizacional, seus fundamentos normativos e as determinações aplicáveis.

A identificação das organizações, de suas relações institucionais e de seus fundamentos normativos poderá ser assistida por inteligência artificial, que deverá produzir propostas justificadas e verificáveis, submetidas à revisão e aprovação do Administrador da Plataforma.

A plataforma não deverá permitir a constituição de organizações ou relações institucionais incompatíveis com os modelos tipológicos, com a Ontologia de Referência ou desprovidas de fundamentação normativa suficiente, devendo identificar as inconsistências e pendências encontradas durante o processo.

As Organizações Institucionais incorporadas exclusivamente como referências necessárias à representação da estrutura estatal, sem que sejam habilitadas como clientes da CIVITAS, permanecerão sob responsabilidade do Administrador da Plataforma, incluindo a manutenção de sua identidade, posição institucional, fundamentação normativa e determinações ontológicas aplicáveis.

A posterior habilitação de uma Organização Institucional como cliente da CIVITAS não modificará sua identidade institucional nem eliminará a responsabilidade do Administrador da Plataforma pela estrutura estatal de referência. Ao Gestor de Entidade serão atribuídas as responsabilidades pela constituição, administração e evolução da organização interna do cliente, nos limites de suas competências e autorizações.

A incorporação de uma Organização Institucional não implicará automaticamente sua habilitação como cliente nem sua autorização para iniciar operações na plataforma. Esses procedimentos ocorrerão separadamente, observando as responsabilidades administrativas, os fundamentos normativos e a realização das condições ontológicas aplicáveis.

Dessa forma, a CIVITAS permitirá constituir progressivamente a estrutura institucional de diferentes Estados, iniciando pela instância raiz e incorporando as organizações necessárias às suas relações institucionais e à utilização da plataforma, preservando a coerência organizacional, normativa e ontológica, a integridade referencial e a historicidade das organizações representadas.

### 5.2 Delimitações decorrentes das decisões posteriores

A designação **Gestor de Entidade** na narrativa original (seção 5.1) é terminologia histórica; a designação atual homologada é **Gestor da Organização Institucional (GOI)**. Essa alteração nominal não modifica a distribuição de responsabilidades.

A organização incorporada no UC-004 ainda não é cliente por essa razão, nem possui autorização de operação administrativa inicial. O cliente é habilitado no UC-005 e preparado no UC-006 para o **Marco A**, mediante realização das condições CM-01 a CM-04. A conclusão do UC-004 não exige realização antecipada de todas as condições dos futuros âmbitos operacionais.

A **instância raiz Estado** é uma organização institucional concreta do tipo previsto na EOT; **Entidade Pública** é conceito ontológico específico, não sinônimo genérico de Organização Institucional.

## 6. Situações alternativas

| ID | Situação | Tratamento |
|---|---|---|
| ALT-UC004-01 | Instância raiz Estado ainda inexistente | Constituir a instância raiz e seu fundamento antes de incorporar demais organizações |
| ALT-UC004-02 | Organização intermediária indispensável não instanciada | Instanciá-la progressivamente com fundamento e relações antes de concluir a incorporação pretendida |
| ALT-UC004-03 | Relação institucional prevista não configura hierarquia | Representar o vínculo efetivo segundo EOT, ENT, Ontologia e fundamento jurídico |
| ALT-UC004-04 | Incompatibilidade tipológica, semântica ou insuficiência normativa | Registrar pendência e impedir a constituição como elemento válido até saneamento |
| ALT-UC004-05 | Organização incorporada não se torna cliente | Manutenção da instância sob responsabilidade do Administrador da Plataforma |

## 7. Pós-condições

A organização está representada na estrutura estatal, com identidade, tipologia, posição, relações, fundamentos normativos (ENI) e determinações ontológicas aplicáveis, preservadas sua integridade referencial e historicidade. Eventual habilitação como cliente e operação administrativa inicial continuam dependentes dos UC-005 e UC-006.

## 8. Regras e restrições

| ID | Regra ou restrição | Origem | Situação |
|---|---|---|---|
| REG-UC004-01 | Instanciação da estrutura estatal começa pelo tipo raiz Estado, com EOT e ENT verificadas e vigentes para utilização. | Consolidação narrativa UC-004 v0.3 | Consolidada |
| REG-UC004-02 | Identidade da instância Estado e das organizações incorporadas exige fundamento normativo e ENI correspondente. | Consolidação narrativa UC-004 v0.3 | Consolidada |
| REG-UC004-03 | Determinações ontológicas são recebidas e aplicadas progressivamente nos âmbitos institucionais competentes. | Consolidação narrativa UC-004 v0.3 | Consolidada |
| REG-UC004-04 | A estrutura estatal pode ser instanciada progressivamente, sem cadastro prévio de organizações não necessárias à incorporação visada. | Consolidação narrativa UC-004 v0.3 | Consolidada |
| REG-UC004-05 | Organizações intermediárias indispensáveis e suas relações devem existir e ser normativamente fundamentadas antes de concluir a incorporação visada. | Consolidação narrativa UC-004 v0.3 | Consolidada |
| REG-UC004-06 | Relações seguem tipologia e fundamento jurídico; não presumir subordinação hierárquica entre organizações juridicamente autônomas. | Consolidação narrativa UC-004 v0.3 | Consolidada |
| REG-UC004-07 | IA pode propor organizações, relações e fundamentos, sujeitos à análise, correção e aprovação pelo Administrador da Plataforma. | Consolidação narrativa UC-004 v0.3 | Consolidada |
| REG-UC004-08 | Organizações e relações sem fundamento suficiente ou semanticamente incompatíveis não podem ser constituídas como válidas. | Consolidação narrativa UC-004 v0.3 | Consolidada |
| REG-UC004-09 | Administrador da Plataforma mantém organizações intermediárias de referência não habilitadas como clientes. | Consolidação narrativa UC-004 v0.3 | Consolidada |
| REG-UC004-10 | Habilitação posterior como cliente não cria identidade institucional nova nem transfere ao GOI a governança da estrutura estatal de referência. | Consolidação narrativa UC-004 v0.3 | Consolidada |
| REG-UC004-11 | Incorporação institucional, habilitação do cliente e autorização de operação administrativa são atos distintos. | Consolidação narrativa UC-004 v0.3 | Consolidada |
| REG-UC004-12 | Incorporação e revisões preservam correspondência organizacional, normativa, ontológica, integridade referencial e historicidade. | Consolidação narrativa UC-004 v0.3 | Consolidada |

## 9. Questões para detalhamento posterior

| ID | Questão | Situação |
|---|---|---|
| Q-01 | Critérios de identificação e singularidade da instância raiz Estado e demais Organizações Institucionais | Detalhamento posterior |
| Q-02 | Documentos e dispositivos constitutivos exigíveis segundo tipo da organização e das relações | Remissão à ENT; detalhamento posterior |
| Q-03 | Critérios de formação da cadeia mínima de organizações intermediárias necessárias | Detalhamento posterior |
| Q-04 | Tratamento de mudanças normativas que afetem instâncias já constituídas | Remissão ao UC-002 Q-04; detalhamento posterior |

## Rastreabilidade

**Ratificação documental expressa (26/11/2026):** durante a conferência final dos UC-001 a UC-006, o autor confirmou que a redação discutida do UC-004 havia sido homologada e autorizou documentar essa condição. Assim, o texto consolidado da seção 5.1 passa a constar como narrativa v0.3 homologada. A atualização altera apenas o registro de status e rastreabilidade, não o conteúdo funcional da narrativa.


| Referência | Relação |
|---|---|
| UC-001 v0.6 | Metamodelo organizacional, EOT e instanciação tipológica |
| UC-002 v0.4 | ENT/ENI e fundamentação normativa |
| UC-003 v0.4 | Ontologia de Referência única, determinações progressivas e integralidade por âmbito operacional |
| UC-005 v0.3 | Habilitação do cliente e designação inicial do GOI |
| UC-006 v0.1 | Constituição mínima CM-01 a CM-04 e Marco A |
| Histórico terminológico | Gestor de Entidade (anterior) → Gestor da Organização Institucional (GOI) |
| Decomposição funcional | Não iniciada |
