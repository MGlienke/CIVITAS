# ESP-A103-DAT-001 — Modelo Lógico de Dados e Artefatos de Identidade Institucional

**Versão:** 0.1 — **HOMOLOGADA pelo autor em 27/11/2026 no escopo lógico e semântico**  
**Data:** 27/11/2026  
**Módulo:** A103-GEP  
**Objeto:** registro proprietário e consulta de evidências de identidade institucional  
**Escopo inicial:** CE-01 / CM01-R01 / INC-001 / Marco A  
**Baseline:** ESP-A103-CE01-001 v0.1, homologada e integrada à main pelo PR #3  
**Consumidor:** ESP-A107-CE01-001 v0.1, A107-EOB v0.3.0  
**Referências:** DEC-A107-004, DEC-A107-005, Mapa de Domínios e Módulos v0.5, Matriz de Componentes e Contratos de Serviços v0.1 (CS-04, CS-05).  
**Natureza:** modelo semântico/lógico de dados e rastreabilidade; **sem DDL, endpoint, tabela, migração ou implementação**.

## 1. Propósito e delimitação

Especificar os dados mínimos sob responsabilidade do A103-GEP necessários para que uma operação proprietária de leitura forneça uma **evidência rastreável de registro de identidade institucional** ao CE-01 do A107-EOB, preservando proveniência, versões e as duas referências temporais.

Não se modela, neste incremento, a integralidade dos processos de constituição institucional (CS-04), relações posicionais (CM01-R03), fundamento normativo (CM01-R04), competência ou autorização do Marco A (CS-05). Não atribuir estado `ATENDIDA` à fonte, nem permitir que registro informacional seja interpretado como autorização institucional.

**Princípio de titularidade:** A103 mantém fatos e versões de sua própria organização institucional; documentos permanecem sob o custodiante competente; A107 armazena somente referências necessárias à verificação; E301-ASO e E302-HIS mantêm responsabilidades transversais sem substituir o A103.

## 2. Identificação dos artefatos

Os códigos abaixo são **propostas editoriais** e devem ser confrontados com o catálogo geral A103 antes de homologação definitiva. Não atribuir IDs de serviço ou de objetos definitivos com base apenas nesta tabela.

| ID candidato | Tipo | Artefato / finalidade |
|---|---|---|
| DAT-A103-001 | Dados | Identidade estável da Organização Institucional |
| DAT-A103-002 | Dados | Versão do Registro de Identidade Institucional |
| DAT-A103-003 | Dados | Referência Probatória vinculada à versão |
| DAT-A103-004 | Dados | Estado/Snapshot recuperável da fonte A103 |
| DAT-A103-005 | Dados | Registro de Consulta e Proveniência |
| INV-A103-001…008 | Invariantes | Restrições semânticas e de temporalidade |
| LOG-A103-001 | Logging | Consulta autorizada/negada, correlação, versão, decisão |
| MET-A103-001 | Métricas | Consultas por estado, completude, divergência e recusa |
| MON-A103-001 | Monitoring | Integridade, indisponibilidade e recuperação histórica |

Os identificadores de invariantes da ESP-A103-CE01-001 (`INV-A103-CE01-001`…008) continuam válidos como **referências candidatas**, e não devem ser renumerados silenciosamente.

## 3. Entidades e atributos lógicos

### 3.1 DAT-A103-001 — Organização Institucional

Representa a identidade de uma instância institucional no espaço de registros do A103.

| Atributo | Obrig. | Semântica |
|---|---|---|
| `organizacao_id` | Sim | Identificador estável, único no âmbito da fonte A103 |
| `registro_inicial_id` | Condicional | Referência ao primeiro registro de incorporação, quando formalmente produzido |
| `situacao_registro` | A definir | Situação informacional do registro, sem equivaler automaticamente a validade jurídica |
| `criado_em` | Sim | Momento do cadastro técnico, não necessariamente início da existência jurídica |

**Restrição:** não duplicar a identidade ontológica como estado de autorização e não associar automaticamente organização a entidade pública, GOI, Mandatário, Pessoa ou estrutura de primeiro nível. Essas relações exigem outros contratos e evidências.

### 3.2 DAT-A103-002 — Versão do Registro de Identidade

Representa cada versão verificável do registro institucional e sua projeção histórica.

| Atributo | Obrig. | Semântica |
|---|---|---|
| `registro_id` | Sim | Identificador estável do fato/registro emitido pelo A103 |
| `organizacao_id` | Sim | Referência a DAT-A103-001 |
| `versao_registro` | Sim | Identificador inequívoco da versão |
| `registrado_em` | Sim | Tempo de conhecimento/registro no A103 |
| `ocorrido_em` | Condicional | Momento do acontecimento ou ato institucional que originou a alteração |
| `vigente_desde` / `vigente_ate` | Condicional | Intervalo de aplicação/efeitos, **quando demonstrável**, distinto do tempo de registro |
| `versao_anterior` | Condicional | Referência à versão precedente |
| `origem_registro` | Sim | Origem/procedimento proprietário do fato |
| `referencia_constituicao` | Condicional | Vínculo ao procedimento/ato que constituiu o registro, sem substituí-lo |
| `estado_integridade` | Sim | Estado da verificação técnica da versão |
| `hash_conteudo` | Condicional | SHA-256 ou mecanismo equivalente sobre representação canonizada, se implementado |

**Invariantes:** versões publicadas para evidência são imutáveis; correções geram novas versões vinculadas. A existência de uma versão cadastrada não prova, isoladamente, legitimidade da constituição. O registro `registrado_em` deve ser preservado como dado histórico, não reescrito para simular ocorrência pretérita.

### 3.3 DAT-A103-003 — Referência Probatória

Identifica a prova informacional/registral vinculada à versão do fato.

| Atributo | Obrig. | Semântica |
|---|---|---|
| `evidencia_id` | Sim | Identificador único da referência |
| `registro_id` + `versao_registro` | Sim | Vínculo exato à versão que fundamenta o fato informado |
| `referencia_evidencia` | Sim | URI/ID lógico autorizado, não SQL ou caminho interno arbitrário |
| `custodiante_modulo` | Sim | Módulo responsável pela origem/custódia da prova |
| `tipo_referencia` | Sim | Registro próprio A103 ou referência documental sob custodiante externo |
| `versao_referencia` | Condicional | Versão do objeto referenciado |
| `hash_evidencia` | Condicional | Hash de conteúdo/manifesto quando disponível |
| `escopo_afirmacao` | Sim | O que exatamente essa evidência suporta; neste recorte, identificação da existência de registro |

O custodiador efetivo pode ser A103 quando a prova é o próprio registro ou C301-RDI/algum custodiante competente para documento externo. O A103 **não declara ser custodiante de documento alheio** só porque expõe sua referência.

### 3.4 DAT-A103-004 — Estado ou Snapshot da Fonte

Permite identificar a projeção histórica utilizada em uma consulta sem pressupor snapshot global transacional.

| Atributo | Obrig. | Semântica |
|---|---|---|
| `snapshot_fonte` | Sim | Identificador estável do estado consultado |
| `organizacao_id` | Sim | Escopo institucional |
| `referencia_temporal` | Sim | Instante da realidade institucional examinado |
| `conhecimento_ate` | Sim | Limite da informação incluída |
| `registro_id` + `versao_registro` | Condicional | Registro selecionado para resposta `ENCONTRADO` |
| `criterio_selecao_versao` | Sim | Critério reprodutível de reconstrução histórica |
| `completude_consulta` | Sim | Completude da consulta pontual, **não** do universo normativo/ontológico |
| `diagnosticos` | Condicional | Inconsistência, ambiguidade ou lacuna de histórico |
| `integridade_snapshot` | Condicional | Hash/prova do estado reconstruído, quando implementado |

O identificador de snapshot não pode ser um texto arbitrário que a fonte não consiga reconstruir/auditar. Se o histórico necessário não estiver disponível, não devolver resultado `ENCONTRADO` com `consulta_completa = true` como se houvesse reconstrução demonstrada.

### 3.5 DAT-A103-005 — Registro de Consulta e Proveniência

Registro de observabilidade e responsabilização sem criar efeito jurídico sobre a organização.

| Atributo | Obrig. | Semântica |
|---|---|---|
| `consulta_id` / `correlation_id` | Sim | Correlação ponta a ponta |
| `principal_referencial` | Sim | Referência minimizada à identidade autenticada |
| `contexto_autorizacao_id` | Sim | Referência ao contexto validado, sem expor segredo |
| `organizacao_id` | Sim | Escopo da consulta |
| `consultado_em` | Sim | Instante da execução |
| `decisao_acesso` | Sim | Permitida/negada, sem registrar dados secretos |
| `status_resposta` | Sim | Encontrado/não localizado/indisponível/erro etc. |
| `snapshot_fonte` | Condicional | Versão da fonte utilizada |
| `diagnostico_tecnico` | Condicional | Código seguro, sem vazamento de existência à parte não autorizada |

Uma consulta negada deve gerar registro seguro de auditoria quando a infraestrutura permitir, mas nunca gerar fato ou resposta que revele a existência do registro protegido.

## 4. Relações e cardinalidades propostas

| Origem | Relação | Destino | Cardinalidade lógica |
|---|---|---|---|
| Organização | possui versões do registro | Versão de Identidade | 1 : 0..N |
| Versão de Identidade | está respaldada por | Referência Probatória | 1 : 1..N para evidência utilizável |
| Versão de Identidade | pode suceder | Versão precedente | 0..1 predecessora por versão na cadeia linear; ramificações/conflitos a disciplinar |
| Estado/Snapshot | seleciona | Versão do Registro | 1 : 0..1 no recorte pontual CE-01; múltiplas candidatas devem ser tratadas como divergência |
| Consulta | refere-se a | Organização | N : 1 |
| Consulta | utiliza | Estado/Snapshot | 0..1 para resposta conclusiva |

**Observação:** as cardinalidades são candidatas, não instruções DDL. Exigir monotonicidade e critérios para correções históricas e ramificações antes de publicar migrações.

## 5. Dupla referência temporal

A fonte deverá distinguir:
- `referencia_temporal`: momento sobre o qual se verifica a existência institucional;
- `conhecimento_ate`: momento-limite da informação disponível;
- `registrado_em`: momento do registro efetivo da versão;
- `ocorrido_em`: momento do ato/evento, quando conhecido;
- `vigente_desde/ate`: intervalo de efeitos, se demonstrado.

### 5.1 Regra de seleção proposta

1. Fixar organização, referência temporal e conhecimento até, bem como contexto de autorização.
2. Recuperar versões cujo `registrado_em <= conhecimento_ate` e que não violem restrições de conhecimento.
3. Examinar a aplicabilidade de cada versão à `referencia_temporal`, quando a origem permitir determinar a situação nesse instante.
4. Identificar versão única, coerente e com evidência/proveniência utilizável. Preservar regra de seleção e snapshot.
5. Se não for possível determinar o estado histórico ou existirem versões contraditórias não reconciliadas, **não afirmar resposta conclusiva `ENCONTRADO`**.
6. Consulta vazia não comprova inexistência jurídica. Mesmo `consulta_completa = true` significa apenas que o mecanismo pontual de busca foi completado.

O A103 deve manter a possibilidade de esclarecer o que era conhecido em `conhecimento_ate` mesmo para acontecimentos com efeitos em data anterior, sem retroagir o registro no sistema.

## 6. Mapeamento para a porta já homologada no A107-EOB

A estrutura `RegistroIdentidadeA103` da tag `a107-eob-v0.3.0` recebe projeção dos dados proprietários:

| Campo do contrato A107 | Origem lógica A103 |
|---|---|
| `organizacao_id` | DAT-A103-001 |
| `registro_id` | DAT-A103-002 |
| `versao_registro` | DAT-A103-002 |
| `registrado_em` | DAT-A103-002 |
| `referencia_evidencia` | DAT-A103-003 |
| `evidencia_id` | DAT-A103-003 |
| `snapshot_fonte` | DAT-A103-004 |
| `referencia_temporal` | DAT-A103-004 |
| `conhecimento_ate` | DAT-A103-004 |
| `consulta_completa` | DAT-A103-004 |
| `fonte_autoritativa` | Rótulo lógico A103-GEP validado externamente pelo vínculo de confiança |

**Compatibilidade importante:** o contrato atual do A107 transporta uma única `referencia_evidencia` e um único `evidencia_id` em `ENCONTRADO`. Se uma versão exigir várias provas independentes, escolher uma referência isolada não poderá ocultar as demais quando forem indispensáveis à afirmação. Resolver por agregação probatória estável (com identificador e metadados verificáveis) ou evolução versionada de CE-01, a decidir antes da codificação.

## 7. Respostas e falhas

| Situação | Resposta candidata à porta | Tratamento |
|---|---|---|
| Versão identificada, prova referencial, histórico e consulta pontual íntegros | `ENCONTRADO` | A107 pode examinar `existe`; não autoriza |
| Busca pontual concluída sem registro localizado | `NAO_LOCALIZADO` | Não constitui prova negativa |
| Falta de permissão | `NAO_AUTORIZADA` | Nunca revelar existência; A107 interrompe com `A107E0002` |
| Dependência técnica temporariamente indisponível | `INDISPONIVEL` | Sem fato |
| Integridade/recuperação histórica inconclusiva | `ERRO` (provisório) | Não produzir fato; necessidade de detalhar diagnósticos |
| Versões históricas conflitantes | `ERRO` (provisório) | Não presumir versão correta; especificar diagnóstico |
| Prova de referência incompleta | `ERRO` (provisório) | Não `ENCONTRADO` conclusivo |

A porta v0.3.0 **não contém `PARCIAL`**. Evolução do vocabulário de estados exige versão contratual e validação com o adaptador, ou classificação conservadora entre os estados atuais sem mascarar falhas.

## 8. Invariantes adicionais do modelo de dados

- **INV-DAT-01:** `organizacao_id` é estável e não é substituído por ID de documento ou por ID de uma pessoa.
- **INV-DAT-02:** alteração/correção do registro cria nova versão sem apagar versão publicada.
- **INV-DAT-03:** toda versão usada em `ENCONTRADO` referencia pelo menos uma prova rastreável e apta ao escopo da afirmação.
- **INV-DAT-04:** `registrado_em` não representa automaticamente início dos efeitos do ato.
- **INV-DAT-05:** consulta histórica não utiliza versão posterior a `conhecimento_ate`.
- **INV-DAT-06:** resposta não afirma completude ontológica/normativa, apenas completude da busca pontual.
- **INV-DAT-07:** evidência documental externa continua com o custodiante legítimo.
- **INV-DAT-08:** consultas não alteram a organização ou a situação do Marco A.

Essas designações são **locais à proposta** e aguardam vinculação à numeração oficial.

## 9. Registro operacional, métricas e monitoring

Propor logging de acesso e correlação em todas as consultas; métricas agregadas por estado de resposta/latência/completude; monitoring de integridade da reconstrução histórica, falha de leitura e indisponibilidade das fontes. D101/D102/D103 e E302 serão integrados conforme seus contratos, ainda não presumidos implementados.

Não inserir dados pessoais indevidos no log nem replicar conteúdo documental original.

## 10. Testes para homologação futura do modelo/serviço

| Teste candidato | Critério |
|---|---|
| TST-A103-DAT-001 | Organização com duas versões preserva ambas e seleciona a aplicável ao limite de conhecimento |
| TST-A103-DAT-002 | Correção registrada posteriormente não modifica resultado histórico anterior |
| TST-A103-DAT-003 | `registrado_em` posterior a `conhecimento_ate` exclui versão posterior |
| TST-A103-DAT-004 | Consulta sem registro não gera prova negativa |
| TST-A103-DAT-005 | Falta de evidência vinculada impede `ENCONTRADO` conclusivo |
| TST-A103-DAT-006 | Snapshot inexistente ou não recuperável gera resposta inconclusiva/erro |
| TST-A103-DAT-007 | Divergência entre versões não se resolve silenciosamente por maior timestamp |
| TST-A103-DAT-008 | Consulta negada não revela existência ou conteúdo |
| TST-A103-DAT-009 | Documento externo preserva referência ao seu custodiante, sem cópia automática |
| TST-A103-DAT-010 | Repetição da leitura não provoca write institucional ou autorização |
| TST-A103-DAT-011 | Dados simulados não entram no canal de evidência institucional real |
| TST-A103-DAT-012 | Projeção da versão e evidência corresponde a `RegistroIdentidadeA103` do CE-01 v0.3.0 |

Os testes acima são critérios propostos, **não executados**.

## 11. Decisões para próxima etapa de especificação

1. **Unicidade de registros:** definir alcance de `organizacao_id`, `registro_id`, chaves naturais e prevenção de múltiplas identidades;
2. **Origem legítima:** especificar a operação de constituição e evidências de CS-04 que produzem esses registros, para não criar dados de identidade arbitrariamente;
3. **Semântica de estado histórico:** decidir a regra de seleção de versões aplicáveis, inclusive correções retroativas e situações sem intervalo de vigência conhecido;
4. **Agregação probatória:** decidir representação de múltiplas provas ante contrato físico CE-01 de evidência singular;
5. **Identificadores definitivos:** conferir CAT A103 e modelo geral de IDs antes de atribuir DAT/INV/TST/LOG/MET/MON;
6. **Propriedade/custódia:** estabelecer a relação concreta com registros A103 e documentos custodiados por C301-RDI ou outras origens;
7. **Segurança:** definir mecanismo efetivo de autenticação, autorização contextual e proteção de consultas;
8. **Modelo físico:** somente após essas decisões, elaborar DDL/migrações para ambiente isolado, com critérios de testes e auditoria.

## 12. Estado e homologação — 27/11/2026

Em 27/11/2026, o autor declarou expressamente **“homologado”** para a **ESP-A103-DAT-001 v0.1**.

**Escopo homologado:** decomposição lógica proposta dos cinco artefatos DAT-A103-001 a DAT-A103-005, seus relacionamentos e cardinalidades lógicas, princípios de identidade estável, versionamento, proveniência, referência probatória, reconstrução histórica por `referencia_temporal` e `conhecimento_ate`, e correspondência funcional com a porta CE-01 do A107-EOB v0.3.0. Invariantes e cenários de testes permanecem critérios documentais a implementar e verificar.

**Limites da homologação:** a homologação não constitui nem executa implementação física do A103, não cria banco, tabelas, endpoints, procedimentos de constituição, fluxos reais de autenticação/autorização, nem certifica a existência de dados ou evidências institucionais. A nomenclatura dos artefatos lógicos foi aprovada no âmbito desta especificação, mas sua atribuição como **IDs definitivos globais** permanece condicionada à conferência do catálogo A103, sem alterar silenciosamente identificadores preexistentes. As decisões listadas na seção 11 continuam pendentes de detalhamento físico/operacional.

**Preservação de baselines:** a especificação não altera ESP-A103-CE01-001 v0.1, ESP-A107-CE01-001 v0.1, CM-01 a CM-04 ou a tag `a107-eob-v0.3.0`.

**Próximo marco:** detalhar constituição/origem legítima do registro, unicidade, seleção histórica e agregação probatória antes da definição de DDL ou da implementação do serviço proprietário. A integração documental à `main` é procedimento separado.
