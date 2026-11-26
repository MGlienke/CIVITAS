# CIVITAS — UC-012 — Realizar a Carga Inicial dos Registros de Agentes Públicos

**Template:** CIV-UC-TPL v1.0  
**Versão da narrativa:** 0.1 — homologada em 26/11/2026  
**Situação:** narrativa funcional homologada pelo autor  
**Jornada:** JRN-CIV-005 — Constituição e Administração de Pessoal (em composição)  
**Limite:** carga e verificação de registros funcionais com dados de identificação, lotação e fundamentação documental; sem criação automática de Pessoas/IDUP ou emissão de credenciais.

> **Controle de homologação:** a seção 5.1 registra a narrativa funcional revista e aprovada pelo autor. A necessidade de uma jornada arquivística mínima paralela foi identificada após essa narrativa e será especificada separadamente, sem alterar retroativamente as condições homologadas deste caso de uso.

## Identificação

| Campo | Valor |
|---|---|
| Código | UC-CIV-012 |
| Título | Realizar a Carga Inicial dos Registros de Agentes Públicos |
| Versão | 0.1 |
| Situação | Homologada |
| Data | 2026-11-26 |
| Jornada | JRN-CIV-005 (em composição) |
| Dependências | UC-009 (Pessoal habilitado e responsável legitimado); UC-010 (órgãos e unidades); UC-011 (cargos e funções) |
| Interface posterior | Reconhecimento de vínculo entre Pessoa acreditada/IDUP e registro funcional; credencial de Agente Público |
| Dependência transversal a detalhar | Capacidade mínima de Arquivos Públicos para registrar e referenciar evidências documentais |

## 1. Propósito

Permitir que o responsável legitimado pelo Sistema Estruturante de Pessoal realize a carga inicial dos registros administrativos de Agentes Públicos da Organização Institucional, com dados identificadores, vínculos funcionais, cargos, funções, lotações, fundamentos jurídicos e documentos comprobatórios.

O resultado não se confunde com a acreditação da identidade da Pessoa na CIVITAS nem constitui automaticamente sua credencial de Cidadão ou de Agente Público.

## 2. Contexto

A estrutura organizacional, os cargos e as funções estão representados na CIVITAS pelos UC-010 e UC-011. O Sistema Estruturante de Pessoal foi habilitado e teve seu responsável legitimado conforme o UC-009.

A organização possui registros administrativos de seus Agentes Públicos, que poderão ser importados ainda que os titulares não tenham se registrado ou se acreditado como Pessoas na CIVITAS. Posteriormente, a Pessoa se identificará e se acreditará no âmbito da JRN-002, obterá IDUP e poderá solicitar a vinculação a seu registro funcional, mediante procedimento próprio.

Os documentos de nomeação, posse, designação e publicidade oficial possuem relevância de evidência institucional e exigirão referência a capacidade arquivística apropriada, sem que sua mera importação substitua a verificação dos atos.

## 3. Participantes

| Participante | Responsabilidade |
|---|---|
| Responsável pelo Sistema Estruturante de Pessoal | Conduzir, revisar, sanear e homologar a carga inicial |
| Organização Institucional / fonte administrativa | Fornecer registros funcionais e documentos de origem com identificação e fundamento |
| CIVITAS | Importar, confrontar com a estrutura, verificar consistência, registrar vínculos de dados e rastreabilidade |
| Sistema de Arquivos Públicos (capacidade mínima a especificar) | Disponibilizar registro/referência de documentos comprobatórios, preservando responsabilidades arquivísticas aplicáveis |

## 4. Pré-condições

- Sistema Estruturante de Pessoal habilitado para a organização, com responsável legitimado.
- Órgãos, unidades, cargos e funções pertinentes representados na CIVITAS.
- Fonte administrativa de registros funcionais identificável e submetida ao procedimento de verificação/homologação correspondente.
- Documentos ou referências documentais pertinentes à investidura, à lotação e à publicidade oficial, conforme a natureza dos vínculos.

## 5. Narrativa principal

### 5.1 Narrativa canônica homologada — UC-012 v0.1

A Plataforma CIVITAS deverá permitir que o responsável legitimado pelo Sistema Estruturante de Pessoal realize a carga inicial dos registros administrativos dos Agentes Públicos vinculados à Organização Institucional.

A carga deverá utilizar informações provenientes dos registros funcionais mantidos pela organização, contemplando os dados necessários à identificação administrativa de cada Agente Público, seus vínculos funcionais, cargos, funções e respectivas lotações.

Para cada registro funcional, a CIVITAS deverá permitir a incorporação de elementos de identificação pessoal, incluindo nome completo, CPF, documentos de identificação aplicáveis e, quando necessários, atributos complementares que permitam estabelecer posteriormente a correspondência entre o registro administrativo e a identidade acreditada da Pessoa.

A carga deverá incorporar também os **fundamentos jurídicos do vínculo funcional**, incluindo os atos de nomeação, termos de posse, atos de designação ou outros instrumentos pertinentes à situação institucional do Agente Público.

Quando houver publicação oficial correspondente, a CIVITAS deverá registrar sua identificação e referência no Diário Oficial competente, permitindo a vinculação às evidências documentais que fundamentam ou comprovam o ato. A plataforma deverá observar a exigência e os efeitos jurídicos da publicidade conforme a natureza do vínculo e a legislação aplicável.

Os documentos e suas referências deverão ser associados aos respectivos registros funcionais, preservando a origem, a autenticidade verificável, a rastreabilidade e as condições necessárias à sua recuperação e verificação.

A CIVITAS deverá permitir que os registros funcionais sejam associados aos órgãos, unidades, cargos e funções anteriormente constituídos pelo Sistema Estruturante de Estrutura Organizacional, preservando suas identidades e fundamentos institucionais.

A plataforma deverá verificar a consistência das informações importadas, identificando registros incompletos, duplicados, divergências de identificação, ausência de fundamentos documentais ou incompatibilidades com a estrutura organizacional, os cargos e as funções existentes.

As inconsistências identificadas deverão ser submetidas ao responsável pelo Sistema Estruturante de Pessoal para análise e saneamento, sem que a plataforma presuma informações ou vínculos não demonstrados pelos registros administrativos.

A CIVITAS deverá permitir a constituição dos registros funcionais independentemente da existência de uma Pessoa correspondente no Diretório de Pessoas, não atribuindo automaticamente IDUP nem emitindo credenciais de Cidadão ou de Agente Público em decorrência da carga.

Os registros deverão preservar os elementos de identificação e os fundamentos documentais necessários à posterior associação com a Pessoa correspondente, quando esta ingressar na CIVITAS mediante acreditação pública ou privada e solicitar o reconhecimento de seu vínculo institucional.

Nesse procedimento posterior, a plataforma deverá permitir a comparação dos atributos de identificação da Pessoa com aqueles constantes do registro funcional, bem como a verificação dos fundamentos jurídicos e da situação atual do vínculo, observadas as regras específicas de reconhecimento e vinculação.

A CIVITAS deverá preservar a origem, a responsabilidade, a integridade verificável, a rastreabilidade e a historicidade dos dados e documentos incorporados.

Após a verificação e homologação da carga pelo responsável competente, os registros funcionais ficarão disponíveis para os procedimentos posteriores de vinculação das Pessoas às respectivas participações institucionais.

A existência de um registro funcional importado não deverá ser considerada, isoladamente, prova de que determinada Pessoa acreditada na plataforma seja sua titular, nem autorizar a emissão automática de credenciais de Agente Público.

Concluída a carga inicial, a Organização Institucional disporá de uma base de registros funcionais integrada à sua estrutura administrativa, documentalmente fundamentada e preparada para o reconhecimento posterior dos vínculos das Pessoas que ingressarem na CIVITAS.

## 6. Situações alternativas

| Situação | Tratamento |
|---|---|
| Documento ou fundamento jurídico ausente/insuficiente | Sinalizar pendência e impedir homologação do vínculo sem fundamento |
| Publicação oficial exigida não identificada | Identificar ausência e solicitar saneamento, sem presumir publicidade |
| Identificação documental divergente | Não associar automaticamente a outra identidade ou registro |
| Órgão, cargo, função ou lotação não consta da estrutura | Apontar incompatibilidade, não criar arbitrariamente elementos organizacionais |
| Registros duplicados na origem | Encaminhar para conferência; evitar duplicação de vínculos |
| Pessoa ainda sem IDUP | Manter registro funcional não vinculado a Pessoa acreditada |
| Documento localizado em sistema arquivístico externo | Preservar referência verificável e responsabilidades de custódia sem tratar simples URL como prova suficiente |

## 7. Pós-condições

1. Registros funcionais iniciais importados e homologados conforme seus fundamentos, com dados identificadores e organizacionais.
2. Cargos, funções e lotações relacionados aos elementos da estrutura organizacional existente.
3. Documentos, referências oficiais, fundamentos de investidura e origem administrativa associados aos registros.
4. Registros disponíveis para futura solicitação de reconhecimento de vínculo por Pessoas acreditadas na CIVITAS.
5. Ausência de emissão automática de IDUP ou credenciais por efeito da carga.
6. Evidências, origem, responsabilidade e historicidade preservadas.

## 8. Regras e restrições

| ID | Regra | Situação |
|---|---|---|
| REG-UC012-01 | Carga de registros funcionais não equivale a registro de Pessoa no Diretório CIVITAS. | Homologada |
| REG-UC012-02 | Incluir identificação pessoal suficiente à correspondência futura, como CPF e demais atributos pertinentes. | Homologada |
| REG-UC012-03 | Registrar fundamentos jurídicos de nomeação, posse, designação e referências de publicação oficial, quando pertinentes. | Homologada |
| REG-UC012-04 | Relacionar cargos, funções e lotações somente à estrutura organizacional fundamentada. | Homologada |
| REG-UC012-05 | Verificar duplicações, divergências e ausência de documentação, submetendo pendências ao responsável. | Homologada |
| REG-UC012-06 | Não emitir IDUP nem credencial de Cidadão ou Agente Público pela carga inicial. | Homologada |
| REG-UC012-07 | Preservar origem, autenticidade verificável, rastreabilidade e historicidade dos registros e evidências. | Homologada |
| REG-UC012-08 | A correspondência entre registro funcional e Pessoa acreditada depende de procedimento posterior de reconhecimento. | Homologada |

## 9. Questões para detalhamento posterior

- Requisitos mínimos de identificação complementar, evitando coleta excessiva de dados pessoais.
- Regras específicas de verificação documental e validade de atos de investidura por regime funcional.
- Formatos e mecanismos de carga, manutenção e saneamento de registros.
- Capacidade arquivística mínima transversal: registro, vínculo, localização, integridade, recuperação e custódia dos documentos comprobatórios.
- Procedimento posterior de solicitação e reconhecimento do vínculo funcional e credencial de Agente Público.

## 10. Homologação e rastreabilidade

**Em 26/11/2026, o autor homologou expressamente esta primeira versão do UC-012**, confirmando a necessidade de dados pessoais identificadores e de documentação fundamentadora com nomeação, posse e publicação em Diário Oficial.

A **jornada de Arquivos Públicos, necessária em paralelo** à execução documental do UC-012, deverá ser delineada separadamente. Esta referência não constitui homologação antecipada de seu escopo ou funcionalidades.
