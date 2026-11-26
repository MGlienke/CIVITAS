# CIVITAS — UC-CIV-015 — Vincular Pessoa a Registro Funcional e Emitir Credencial de Agente Público

**Versão:** 0.1 — homologada em 26/11/2026  
**Situação:** narrativa funcional homologada pelo autor  
**Jornada:** JRN-CIV-005 — Constituição e Administração de Pessoal (em composição)  
**Limite:** correspondência entre Pessoa já acreditada (IDUP/Credencial C) e registro funcional do UC-012, com emissão de Credencial S. Não cria Pessoa, nem cargos, funções ou competências.

## 1. Propósito

Permitir que uma Pessoa previamente registrada e acreditada na CIVITAS, titular de uma Credencial de tipo C, solicite o reconhecimento de seu vínculo com uma Organização Institucional, mediante conferência de seus dados pessoais com um registro funcional previamente constituído pelo Sistema Estruturante de Pessoal.

Confirmada a correspondência, a CIVITAS deverá associar o registro funcional à Pessoa identificada pelo IDUP e emitir uma Credencial de tipo S, representativa de sua condição de Agente Público naquela Organização Institucional.

## 2. Contexto

Na Jornada 2, a Pessoa ingressou na CIVITAS mediante acreditação pública ou privada, passando a possuir um IDUP e uma Credencial de tipo C.

Na Jornada 5, o Sistema Estruturante de Pessoal realizou a carga inicial dos registros funcionais por meio do UC-012. Esses registros contêm dados de identificação pessoal, cargos, funções, lotações e os fundamentos documentais correspondentes.

Entretanto, os registros funcionais ainda não estão necessariamente associados às Pessoas do Diretório de Pessoas.

O UC-015 estabelecerá essa associação, permitindo que uma Pessoa reconheça e utilize sua condição institucional de Agente Público.

## 3. Participantes

| Participante | Responsabilidade |
|---|---|
| Pessoa — titular da Credencial C | Solicitar o reconhecimento de seu vínculo funcional |
| CIVITAS | Localizar o registro funcional, conferir a identidade, estabelecer o vínculo e emitir a Credencial S |
| Sistema Estruturante de Pessoal | Disponibilizar os registros funcionais e suas informações de identificação e situação institucional |
| Organização Institucional | Responder pela origem, correção e fundamentação dos registros funcionais |

## 4. Pré-condições

A Pessoa deverá estar registrada e acreditada na CIVITAS, possuir IDUP e Credencial C válida.

A Organização Institucional deverá possuir o Sistema Estruturante de Pessoal habilitado e registros funcionais previamente constituídos, conforme o UC-012.

O registro funcional deverá conter os elementos identificadores necessários à correspondência com a Pessoa e os fundamentos jurídicos pertinentes à sua situação institucional.

## 5. Narrativa principal

### 5.1 Narrativa canônica homologada — UC-015 v0.1

A Plataforma CIVITAS deverá permitir que uma Pessoa previamente identificada e acreditada na plataforma, titular de uma Credencial de tipo C, solicite o reconhecimento de seu vínculo funcional com uma Organização Institucional.

A solicitação deverá ser realizada pela Pessoa mediante sua Credencial C, permitindo à CIVITAS identificar de maneira inequívoca o respectivo IDUP.

A plataforma deverá consultar os registros funcionais previamente constituídos pelo Sistema Estruturante de Pessoal da Organização Institucional, buscando aqueles cujos elementos de identificação pessoal correspondam aos dados da Pessoa solicitante.

A CIVITAS deverá verificar a correspondência entre os dados pessoais associados ao IDUP e os elementos identificadores constantes do registro funcional, considerando inicialmente o CPF ou outro identificador aplicável e, quando necessário, atributos complementares de identificação.

A plataforma deverá verificar se o registro funcional identificado possui fundamentação documental e situação institucional compatíveis com o reconhecimento solicitado.

Quando os elementos disponíveis forem suficientes para estabelecer a correspondência entre a Pessoa e o titular do registro funcional, a CIVITAS deverá permitir a confirmação da vinculação.

Nos casos de divergência, insuficiência de informações ou impossibilidade de estabelecer correspondência inequívoca, a plataforma não deverá realizar a vinculação automaticamente, encaminhando a situação para o procedimento de verificação competente.

Confirmada a correspondência, a CIVITAS deverá estabelecer a associação entre o IDUP da Pessoa e o registro funcional existente, preservando a identidade e a historicidade de ambos.

A plataforma deverá então constituir e disponibilizar à Pessoa uma **Credencial de tipo S**, representativa de sua condição de Agente Público da Organização Institucional, vinculada ao respectivo registro funcional.

A Credencial S deverá permitir a identificação da Pessoa, da Organização Institucional e de sua participação institucional, preservando a associação com o cargo, a função, a lotação e os fundamentos jurídicos pertinentes.

A emissão da Credencial S não deverá alterar ou substituir a Credencial C, que permanecerá vinculada à mesma Pessoa e ao mesmo IDUP.

A CIVITAS deverá impedir a constituição de vínculos duplicados ou incompatíveis, preservando a possibilidade de uma mesma Pessoa possuir vínculos funcionais distintos, inclusive com diferentes Organizações Institucionais, quando juridicamente admissíveis.

A plataforma deverá preservar a rastreabilidade e a historicidade da solicitação, das verificações realizadas, da confirmação do vínculo e da emissão da Credencial S.

Concluído o procedimento, a Pessoa deverá dispor de sua Credencial C e da nova Credencial S, podendo utilizar esta última para demonstrar sua condição institucional de Agente Público e acessar as funcionalidades da CIVITAS autorizadas para sua participação institucional.

## 6. Resultado do procedimento

1. Pessoa já identificada e acreditada: IDUP existente e Credencial C.
2. Solicitação de vinculação pela própria Pessoa, com a Credencial C.
3. Localização e conferência do registro funcional pré-existente.
4. Associação confirmada entre IDUP e registro funcional.
5. Constituição de Credencial S vinculada à Organização Institucional e ao registro funcional, preservando a Credencial C.

## 7. Situações alternativas

| Situação | Tratamento |
|---|---|
| Nenhum registro funcional correspondente | Informar que não foi localizado vínculo passível de reconhecimento |
| Dados pessoais divergentes | Não vincular automaticamente; encaminhar para verificação |
| Registro com documentação insuficiente | Exigir saneamento do registro funcional |
| Registro já vinculado ao mesmo IDUP | Evitar duplicação e disponibilizar a credencial existente, conforme sua situação |
| Registro já vinculado a outro IDUP | Bloquear a vinculação automática e exigir apuração |
| Pessoa com mais de um vínculo funcional | Permitir credenciais S correspondentes aos vínculos reconhecidos e juridicamente admissíveis |
| Credencial C inválida ou identidade não acreditada | Não iniciar vinculação até regularização |

## 8. Pós-condições

1. O registro funcional estará associado ao IDUP da Pessoa.
2. A correspondência de identidade terá sido verificada.
3. A Credencial S terá sido emitida e vinculada à Organização Institucional e ao registro funcional.
4. A Credencial C original permanecerá preservada.
5. As evidências e os eventos do procedimento estarão registrados e historicamente verificáveis.

## 9. Distinção entre credencial e autorização

A Credencial S identifica a participação institucional da Pessoa como Agente Público. Sua emissão não cria competências ou atribuições inexistentes juridicamente.

As competências continuam associadas à Organização Institucional, aos órgãos, cargos, funções e respectivos fundamentos. A credencial permite reconhecer a participação da Pessoa e determinar quais funcionalidades e operações ela poderá realizar.

Para o UC-008, a Credencial S isoladamente não autoriza acreditação privada de terceiros: é indispensável competência institucional específica para tal ato.

## 10. Rastreabilidade

| Caso de Uso | Contribuição |
|---|---|
| UC-007 e UC-008 | Identidade acreditada e IDUP da Pessoa |
| UC-010 | Órgãos e unidades da Organização Institucional |
| UC-011 | Cargos e funções |
| UC-012 | Registro funcional, documentação identificadora, investidura e lotação |
| UC-013 e UC-014 | Capacidade arquivística e referências documentais dos fundamentos funcionais |

## 11. Fronteira e homologação

O procedimento permanece simples: a Pessoa solicita vinculação, a CIVITAS confirma correspondência com um registro funcional documentalmente fundamentado e emite Credencial S. Interface, formato técnico das credenciais, mecanismos de autenticação e gestão posterior de alterações funcionais serão detalhados em outras especificações.

**Em 26/11/2026, o autor homologou expressamente o UC-CIV-015 v0.1**, conforme narrativa apresentada para revisão. A JRN-CIV-005 permanece em composição e não é declarada homologada por esta aprovação.
