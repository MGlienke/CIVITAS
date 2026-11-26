# CIVITAS — UC-007 — Registrar Pessoa por Acreditação Pública na CIVITAS

**Template:** CIV-UC-TPL v1.0  
**Versão da narrativa:** 0.1 — homologada em 26/11/2026  
**Situação:** narrativa principal homologada pelo autor  
**Jornada de referência:** JRN-CIV-002 — Registro e Acreditação de Pessoas (em composição)  
**Limite:** ingresso por acreditação pública e registro de Pessoa-raiz; acreditação privada será objeto de caso posterior

> **Controle de homologação:** a seção 5.1 registra a narrativa principal aprovada pelo autor. Seções auxiliares consolidam o contexto e as delimitações já discutidos. Pontos de implementação e política ainda não decididos permanecem expressamente abertos.

## Identificação

| Campo | Valor |
|---|---|
| Código | UC-CIV-007 |
| Título | Registrar Pessoa por Acreditação Pública na CIVITAS |
| Versão | 0.1 |
| Situação | Narrativa principal homologada |
| Data | 2026-11-26 |
| Jornada | JRN-CIV-002 |
| Referências institucionais | UC-005, UC-006 (GOI e Mandatário como aplicações posteriores da identificação de Pessoas) |

## 1. Propósito

Permitir que uma Pessoa ingresse na Plataforma CIVITAS mediante identificação e autenticação por uma fonte de acreditação pública reconhecida, constituindo sua identidade na plataforma e estabelecendo um vínculo verificável com a origem pública de sua acreditação.

O registro da Pessoa deverá resultar em sua identificação única na CIVITAS e em sua incorporação ao **Catálogo de Raízes de Confiança**, tornando-a uma Pessoa publicamente acreditada, apta a participar das funcionalidades e relações da plataforma segundo as autorizações que lhe forem atribuídas.

## 2. Contexto

A CIVITAS estabelece uma Cadeia Geral de Confiança que permite reconhecer Pessoas e propagar acreditações privadas em seu ambiente operacional.

A cadeia tem origem em acreditações públicas externas, cuja validade é reconhecida pela plataforma. Inicialmente, a CIVITAS admitirá duas fontes:

- **ICP-Brasil**, mediante apresentação e validação de certificado digital pertencente à respectiva infraestrutura de certificação.
- **gov.br**, mediante autenticação da Pessoa e obtenção dos elementos de identificação e confiança disponibilizados pelo serviço.

O **Catálogo de Raízes de Confiança CIVITAS** constitui o ponto de ligação entre essas fontes externas e as Pessoas publicamente acreditadas que passam a integrar a plataforma.

Cada Pessoa registrada no catálogo poderá constituir uma raiz para cadeias privadas de acreditação, observadas as regras específicas de propagação de confiança que serão estabelecidas posteriormente.

## 3. Participantes

| Participante | Responsabilidade |
|---|---|
| Pessoa | Solicita ingresso na CIVITAS e utiliza uma fonte pública de acreditação |
| Fonte de Acreditação Pública | Autentica ou fornece meios verificáveis de identificação da Pessoa |
| CIVITAS | Verifica a acreditação, identifica ou registra a Pessoa e estabelece sua identidade única |
| Catálogo de Raízes de Confiança | Registra o vínculo entre Pessoa, fonte pública e evidências da acreditação |

O Administrador da Plataforma não precisa realizar manualmente o registro de cada Pessoa. O ingresso poderá ocorrer diretamente pela própria Pessoa, mediante os mecanismos públicos de acreditação admitidos.

## 4. Pré-condições

A CIVITAS deverá dispor de mecanismos de integração e verificação das fontes públicas de acreditação aceitas, bem como do Catálogo de Raízes de Confiança e do serviço de identificação única de Pessoas.

A Pessoa deverá possuir meios válidos de identificação por uma das fontes públicas admitidas.

## 5. Narrativa principal

### 5.1 Narrativa canônica homologada — UC-007 v0.1

A Plataforma CIVITAS deverá permitir que uma Pessoa solicite seu registro mediante identificação e autenticação por uma fonte de acreditação pública reconhecida pela plataforma.

Inicialmente, serão admitidos como mecanismos de acreditação pública os certificados digitais emitidos no âmbito da ICP-Brasil e a autenticação realizada por meio da plataforma gov.br.

Ao iniciar seu ingresso, a Pessoa deverá selecionar um dos mecanismos disponíveis e realizar o procedimento de identificação e autenticação correspondente, observadas as condições próprias da fonte pública utilizada.

A CIVITAS deverá verificar o resultado desse procedimento, reconhecendo a identidade apresentada e a validade da acreditação pública, conforme os critérios estabelecidos para a respectiva fonte.

Concluída a verificação, a plataforma deverá consultar seu Diretório de Pessoas para determinar se a Pessoa identificada já possui registro na CIVITAS.

Caso a Pessoa ainda não esteja registrada, a CIVITAS deverá constituir sua identidade única, atribuindo-lhe um **Identificador Digital Único da Pessoa (IDUP)** e registrando os atributos de identificação necessários à sua individualização na plataforma.

Caso a Pessoa já esteja registrada, a CIVITAS deverá preservar sua identidade existente e seu IDUP, evitando a criação de registros duplicados. A nova acreditação pública poderá ser vinculada à mesma Pessoa, ampliando os fundamentos verificáveis de sua identidade.

Após identificar ou registrar a Pessoa, a CIVITAS deverá incorporar ao **Catálogo de Raízes de Confiança** o vínculo entre a Pessoa, a fonte pública utilizada e as informações e evidências necessárias à verificação da origem de sua acreditação.

O catálogo deverá permitir que a CIVITAS identifique a fonte pública responsável pela acreditação, o mecanismo empregado, a Pessoa correspondente e as condições de validade e verificabilidade do reconhecimento realizado.

Uma Pessoa poderá possuir múltiplos fundamentos públicos de acreditação, provenientes de uma ou mais fontes reconhecidas, sem que isso implique a constituição de múltiplas identidades na CIVITAS.

A Pessoa registrada mediante acreditação pública passará a integrar o conjunto de **Pessoas-raiz da Cadeia Geral de Confiança CIVITAS**, podendo constituir uma origem verificável para posteriores acreditações privadas, nos termos das regras específicas aplicáveis à propagação da confiança.

O registro e a acreditação pública da Pessoa não lhe atribuirão, automaticamente, competências institucionais, posições, papéis ou autorizações administrativas. Tais condições dependerão dos procedimentos próprios de cada funcionalidade ou relação institucional.

A CIVITAS deverá preservar a rastreabilidade e a historicidade das operações de identificação, verificação, registro e acreditação, permitindo reconstruir os fundamentos pelos quais determinada Pessoa foi reconhecida como integrante da Cadeia Geral de Confiança.

Concluído o procedimento, a Pessoa estará registrada na CIVITAS, identificada por seu IDUP e vinculada a pelo menos uma acreditação pública reconhecida no Catálogo de Raízes de Confiança.

## 6. Situações alternativas

| Situação | Comportamento esperado |
|---|---|
| Acreditação pública inválida ou não verificável | Não concluir o ingresso com base nessa acreditação |
| Pessoa já registrada | Preservar o IDUP e vincular a nova acreditação quando válida |
| Pessoa possui acreditação ICP-Brasil e gov.br | Permitir múltiplos vínculos públicos para uma única identidade |
| Identidade apresentada entra em conflito com registro existente | Suspender a vinculação automática e exigir tratamento da divergência |
| Fonte pública temporariamente indisponível | Não presumir resultado positivo; permitir nova tentativa |
| Acreditação anteriormente válida expira ou é revogada | Preservar o histórico e tratar sua situação atual conforme política de validade a definir |

## 7. Pós-condições

1. A Pessoa possui registro único no Diretório de Pessoas, identificado por IDUP.
2. Existe pelo menos um fundamento de acreditação pública associado a essa identidade.
3. O Catálogo de Raízes de Confiança registra a conexão entre a Pessoa, a fonte pública e as evidências de reconhecimento.
4. A Pessoa está apta a receber autorizações e participar de relações na CIVITAS, observadas suas regras próprias.
5. Sua acreditação pode ser utilizada como origem verificável de uma futura cadeia privada de confiança.

## 8. Delimitações e questões posteriores

- **Propagação privada:** não define como uma Pessoa pode acreditar outra, nem os limites e efeitos dessa propagação; assunto da continuação da JRN-CIV-002.
- **Autorização institucional:** ser Pessoa-raiz não implica ser GOI ou Mandatário, nem confere competência institucional.
- **Políticas das fontes:** nível mínimo do gov.br, validação e revogação de certificados, periodicidade de revalidação e efeitos de expiração exigem especificação posterior.
- **Privacidade:** preservar evidências necessárias sem armazenamento indevido de credenciais ou segredos de autenticação.
- **Ontologia:** registrar a representação da Pessoa na CIVITAS não equivale à criação ontológica da própria Pessoa.

## 9. Rastreabilidade

- **JRN-CIV-002 (em composição):** este é o primeiro Caso de Uso da jornada.
- **UC-005:** designação inicial do GOI pelo Administrador exige uma Pessoa previamente acreditada publicamente na CIVITAS, segundo a decisão conceitual subsequente à Jornada 1.
- **UC-006:** a identificação e acreditação pública do Mandatário não substituem os fundamentos jurídicos e atos de investidura; após indicação pelo GOI, aplica-se o bloqueio imediato, homologação pelo Administrador e convalidação do GOI pelo Mandatário.
- **Evolução posterior:** acreditação privada e reconstrução da cadeia até o Catálogo de Raízes serão especificadas em caso(s) de uso subsequente(s).

**Registro de homologação (26/11/2026):** o autor determinou: “Vamos homologar essa primeira narrativa do UC 007 e vamos avançar”. A narrativa da seção 5.1 está homologada; não se presume aprovação antecipada das regras ainda abertas.
