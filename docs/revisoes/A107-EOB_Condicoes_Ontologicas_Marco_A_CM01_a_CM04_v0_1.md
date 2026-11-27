# A107-EOB — Especificação Integrada das Condições Ontológicas CM-01 a CM-04

**Versão:** 0.1  
**Estado:** **HOMOLOGADA** pelo autor em 26/11/2026  
**Incremento:** INC-001 — Constituição e Habilitação Inicial de Organização Institucional  
**Serviço-alvo:** `SRV-A107-003` — Verificar Condições Ontológicas de Realização (contrato técnico ainda a detalhar)  
**Fundamentos:** DEC-A107-001; DEC-A107-002; UC-CIV-001, 003, 004, 005 e 006; Mapa v0.5; Matriz de Componentes e Serviços v0.1; template CIV-ESP-TPL v0.4.

## 1. Princípios de verificação

A ontologia define conceitos, propriedades, relações e determinações; a realização institucional constitui elementos, relações e atos concretos; a verificação examina evidências fornecidas por módulos proprietários para determinar se cada condição exigível no âmbito avaliado está satisfeita.

A verificação do A107-EOB é **distinta da autorização técnica do Marco A**. A autorização é ato específico do Administrador da Plataforma. O atendimento de Marco A não implica habilitação de sistemas estruturantes ou serviços públicos.

Cada condição deve preservar: sujeito, propriedades/relações ontológicas, fontes, operadores, evidências, versões e resultado individual. Os identificadores internos `CM01-R01` etc. são IDs de rastreabilidade desta especificação; a incorporação no schema definitivo deve observar governança de IDs do template.

## 2. Condições e requisitos

### CM-01 — Identidade Institucional

**Regra:** verificar que a Organização Institucional foi instanciada na estrutura estatal e está corretamente identificada, posicionada e normativamente fundamentada, respeitando EOT, ENT, ENI e Ontologia.

| ID | Propriedade/relação | Operador | Fonte |
|---|---|---|---|
| CM01-R01 | Identidade institucional constituída | `existe` | A103-GEP |
| CM01-R02 | Correspondência ao tipo admitido pela EOT | `corresponde` | A107-EOB |
| CM01-R03 | Posição e relações institucionais necessárias | `relacionado_a` | A103-GEP / A107-EOB |
| CM01-R04 | Fundamento jurídico constitutivo | `fundamentado_em` | A108-BDN |
| CM01-R05 | Correspondência à ENT/ENI e determinações aplicáveis | `corresponde` | A108-BDN / A107-EOB |

**Composição:** `todos`. Não exigir toda a estrutura estatal antecipadamente: apenas cadeia mínima, tipos e relações necessários para a representação. Uma relação incompatível ou fundamento insuficiente impede atendimento.

### CM-02 — Estrutura Organizacional Inicial

**Regra:** verificar o primeiro nível da organização determinado pelo instrumento normativo aplicável, sua constituição fundamentada e a revisão/homologação pelo GOI competente.

| ID | Propriedade/relação | Operador | Fonte |
|---|---|---|---|
| CM02-R01 | Norma de organização administrativa identificada | `existe` | A108-BDN |
| CM02-R02 | Aplicabilidade e vigência temporal da norma | `vigente_em` | A108-BDN |
| CM02-R03 | Estrutura de primeiro nível constituída | `existe` | C302-EOR |
| CM02-R04 | Correspondência de órgãos/unidades às determinações normativas | `corresponde` | C302-EOR / C309-NEC |
| CM02-R05 | Relações organizacionais compatíveis com modelo | `relacionado_a` | C302-EOR / A107-EOB |
| CM02-R06 | Estrutura revisada e homologada pelo GOI autorizado | `reconhecido_por` | Registro de decisão institucional / C103-IEA |

**Composição:** `todos`, com verificação da **completude do primeiro nível exigível**, sem número fixo de órgãos/unidades. A revisão humana é necessária, inclusive quando a proposta original for assistida por IA. Preservar identidade/competência do GOI e versão homologada.

### CM-03 — Competências Institucionais

**Regra:** verificar composição progressiva e rastreável das competências aplicáveis desde o Estado até a organização, com titulares, categorias, condições de exercício, limites e fundamentos normativos.

| ID | Propriedade/relação | Operador | Fonte |
|---|---|---|---|
| CM03-R01 | Competências identificadas | `existe` | C309-NEC |
| CM03-R02 | Competências vinculadas aos titulares | `relacionado_a` | C309-NEC |
| CM03-R03 | Fundamentos pertinentes a cada competência | `fundamentado_em` | C309-NEC / A108-BDN |
| CM03-R04 | Cadeia de determinações institucionais | `relacionado_a` | A103-GEP / C309-NEC |
| CM03-R05 | Vigência dos fundamentos na referência temporal | `vigente_em` | A108-BDN |
| CM03-R06 | Condições e limites de exercício representados | `corresponde` | C309-NEC / A107-EOB |

**Composição:** `todos` aplicado ao conjunto **completo** de competências exigíveis, conforme universo derivado das determinações normativas/ontológicas pertinentes. Verificar somente competências cadastradas **não comprova** inexistência de omissões. O universo exigível deve ser fundamentado; se não puder ser determinado, a avaliação é **indeterminada**.

### CM-04 — Autoridade Institucional

**Regra:** verificar a posição de Mandatário, a Pessoa ocupante e sua investidura, o reconhecimento pelo Administrador, a regularização do GOI e a ordem válida dos atos.

| ID | Propriedade/relação | Operador | Fonte |
|---|---|---|---|
| CM04-R01 | Posição Institucional de Mandatário identificada | `existe` | A103-GEP / C309-NEC |
| CM04-R02 | Pessoa identificada como ocupante | `relacionado_a` | C101-PES / A103-GEP |
| CM04-R03 | Investidura fundamentada | `fundamentado_em` | A108-BDN / registros institucionais |
| CM04-R04 | Reconhecimento pelo Administrador | `reconhecido_por` | A103-GEP / auditoria |
| CM04-R05 | GOI regularizado por via válida | `satisfaz` | A103-GEP / C103-IEA |
| CM04-R06 | Sequência de submissão, bloqueio, reconhecimento e regularização | `precede` e verificação temporal composta | A103-GEP / E302-HIS |

**Composição:** `todos` nos requisitos gerais, com subcomposição `algum` para **duas vias legítimas de regularização do GOI**: (a) convalidação ordinária pelo Mandatário já reconhecido; (b) desbloqueio excepcional expresso, motivado e rastreável pelo Administrador. A segunda hipótese não se confunde com convalidação nem cria competência jurídica.

**Regra temporal crítica:** a submissão da designação do Mandatário provoca bloqueio **imediato** do GOI; o reconhecimento pelo Administrador precede a convalidação ordinária do GOI. O desbloqueio excepcional não permite presumir reconhecimento jurídico inexistente do Mandatário. O GOI não pode unilateralmente modificar o Mandatário reconhecido.

## 3. Dependências entre condições

| Condição | Dependência lógica | Independência de consulta |
|---|---|---|
| CM-01 | EOT, ENT, identidade/posição e fundamento de constituição | Pode ser avaliada isoladamente |
| CM-02 | Identidade institucional de CM-01; primeiro nível concreto e norma de organização | Consultas paralelizáveis; verificar correspondência à mesma organização |
| CM-03 | Identidade de CM-01; determinações progressivas e estrutura aplicável | Consultas paralelizáveis com reconciliação |
| CM-04 | Organização habilitada, Pessoas e histórico dos atos do Mandatário/GOI | Pode ser avaliada isoladamente, mantendo contexto |

Dependências de resultado devem ser explicitadas; paralelismo de consultas não dispensa coerência do resultado consolidado.

## 4. Composição e estados

Estados: **atendida**, **não atendida**, **indeterminada**, **não aplicável**.

Regras de agregação do operador `todos`:
- Todos os requisitos obrigatórios atendidos → **atendida**.
- Existe descumprimento objetivamente demonstrado de requisito obrigatório → **não atendida**.
- Não há descumprimento demonstrado, mas falta evidência, fonte não respondeu, há contradição não resolvida ou universo exigível não é conhecido → **indeterminada**.
- `não aplicável` somente com justificativa válida conforme âmbito e regra; caso contrário, **indeterminada** com inconsistência.
- CM-01 a CM-04 são **obrigatórias para o Marco A** e **não podem ser dispensadas** pelo mecanismo genérico de não aplicabilidade.
- Exclusão geral que torne todas as condições não aplicáveis não autoriza o âmbito.

A ausência de informação **não prova** inexistência, e a qualidade/proveniência das evidências deve ser considerada antes da consolidação. Para `algum` e `nenhum`, as regras de quatro estados, prova de alternativas exaustivas e prova de ausência serão detalhadas no contrato formal e testes.

## 5. Evolução do vocabulário — DEC-A107-002

A especificação integrada homologada acrescenta **dois operadores** como extensão da linguagem declarativa:

| Operador | Categoria | Significado |
|---|---|---|
| `precede` | Operador temporal | Verifica que um ato/evento precedeu outro validamente, levando em conta autor, referência temporal, integridade e sequência exigida |
| `para_cada` | Composição sobre coleção | Verifica condições para cada elemento do universo exigível completo, apurado com base nas fontes normativas/ontológicas pertinentes |

A obrigatoriedade de **suficiência probatória** integra a semântica de todos os operadores. Não se pressupõe completude quando apenas o conjunto cadastrado foi consultado.

## 6. Composição do âmbito Marco A (modelo ilustrativo)

```yaml
id: MARCO_A
versao: "1.0"
modulo_verificador: A107-EOB
ambito: OPERACAO_ADMINISTRATIVA_INICIAL
condicoes: [CM-01, CM-02, CM-03, CM-04]
composicao:
  operador: todos
  requisitos: [CM-01, CM-02, CM-03, CM-04]
nao_aplicabilidade: proibida
resultado:
  quando_atendida: ELEGIVEL_PARA_AUTORIZACAO
  quando_nao_atendida: NAO_ELEGIVEL
  quando_indeterminada: VERIFICACAO_PENDENTE
autoridade_decisoria:
  modulo: A103-GEP
  papel: AdministradorDaPlataforma
```

O YAML acima é **modelo de apresentação aprovado conceitualmente**, não schema final homologado. `ELEGIVEL_PARA_AUTORIZACAO` não é autorização; `MARCO_A_AUTORIZADO` depende de ato distinto do Administrador.

## 7. Testes integrados propostos e aceitos como matriz de referência

| ID | Cenário | Resultado exigido |
|---|---|---|
| TST-A107-009 | CM-01–04 atendidas | Elegível para autorização |
| TST-A107-010 | Ausência demonstrada de fundamento constitutivo | Não elegível |
| TST-A107-011 | Primeiro nível sem homologação do GOI | Não elegível |
| TST-A107-012 | Competência obrigatória omitida | Não elegível ou indeterminada conforme evidência |
| TST-A107-013 | GOI bloqueado sem via válida de regularização | Não elegível |
| TST-A107-014 | GOI excepcionalmente desbloqueado sem reconhecimento do Mandatário | CM-04 não atendida; não elegível |
| TST-A107-015 | Evidência indispensável indisponível | Indeterminada; autorização impedida |
| TST-A107-016 | Modelo revisado após verificação | Resultado histórico preservado |
| TST-A107-017 | Quatro condições atendidas sem decisão do Administrador | Marco A continua não autorizado |

**Não declarar execução ou aprovação dos testes:** estes são contratos de comportamento para implementação posterior.

## 8. Próximos artefatos

1. Elaborar cinco arquivos `.md`: quatro condições e a composição `MARCO_A.md`, em YAML validável.
2. Detalhar o contrato `SRV-A107-003`: request, response, política de evidências, consultas a fontes e regras formais da lógica multivalorada.
3. Definir schemas, versionamento, persistência, ocorrências `A107T9999`, eventos e testes automatizados, mantendo o template CIV-ESP-TPL v0.4.
4. Preservar a distinção entre homologação conceitual desta especificação e homologação futura dos contratos técnicos e da implementação.

## 9. Histórico da homologação

Em 26/11/2026, o autor declarou **homologada a especificação integrada CM-01 a CM-04**, incluindo requisitos, relações intercondicionais, extensão dos operadores `precede` e `para_cada` e necessidade de suficiência probatória. Os contratos físicos e esquema YAML definitivo permanecem pendentes.
