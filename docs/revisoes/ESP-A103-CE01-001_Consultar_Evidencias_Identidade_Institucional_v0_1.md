# ESP-A103-CE01-001 — Consultar Evidências de Identidade Institucional

**Versão:** 0.1 — **PROPOSTA, NÃO HOMOLOGADA**  
**Módulo proprietário:** A103-GEP  
**Contrato lógico transversal:** CE-01 — Consultar identidade e posição institucional  
**Consumidor inicial:** A107-EOB / SRV-A107-003  
**Incremento:** INC-001 — Marco A  
**Escopo inicial:** CM01-R01, `identidade_institucional`, operador `existe`  
**Natureza do artefato:** especificação funcional, semântica e contratual; **não corresponde a código, endpoint ou serviço executável**  
**Linha de base do consumidor:** tag `a107-eob-v0.3.0`  
**Rastreabilidade:** Mapa de Domínios e Módulos v0.5; Matriz de Componentes e Contratos de Serviços v0.1 (CS-04 e CS-05); DEC-A107-004; DEC-A107-005; ESP-A107-CE01-001 v0.1; CM-01 v0.1.

## 1. Problema e finalidade

O A107-EOB necessita de evidência referencial da existência de um registro de identidade de Organização Institucional para verificar CM01-R01. O A103-GEP é proprietário dos registros de constituição/incorporação e de seus vínculos institucionais. A leitura desses registros deve ocorrer **por operação proprietária controlada do A103**, sem acesso do A107 a tabelas internas.

**Finalidade da operação proposta:** consultar a identidade institucional de uma organização determinada, reconstruída para a referência temporal e limite de conhecimento requisitados, e devolver fato identificável e referência probatória, ou explicitar por que a resposta não pode ser concluída.

**Não é finalidade desta operação:** constituir uma organização, declarar que sua constituição é juridicamente válida, conferir a conformidade com EOT/ENT/ENI, determinar fundamentos normativos, homologar uma estrutura, verificar competência, reconhecer Mandatário, regularizar GOI, conceder acesso à consulta automaticamente ou autorizar Marco A.

A representação de organização deve distinguir **registro de identidade existente**, **realização ontológica conforme regras** e **ato decisório de autorização**, que são atos/avaliações distintos.

## 2. Responsabilidades e fronteiras

| Responsável | Cabe ao módulo | Não cabe nesta operação |
|---|---|---|
| **A103-GEP** | Registrar e recuperar fatos e referências de identidade institucional, inclusive versões e histórico sob sua titularidade; aplicar controles sobre a consulta | Devolver `ATENDIDA`, `ELEGIVEL_PARA_AUTORIZACAO` ou autorizar Marco A |
| **A107-EOB** | Consultar CE-01, verificar `CM01-R01` com o operador `existe`, compor resultado de CM-01 e Marco A | Alterar o registro A103 ou constituir atos decisórios |
| **C103-IEA / infraestrutura de confiança** | Validar identidade, permissões e contexto operacional mediante contrato próprio, quando disponível | Presumir autorização por identificadores autodeclarados |
| **E301-ASO / E302-HIS** | Identificação de fontes autoritativas e suporte transversal à historicidade, quando disponíveis | Substituir registros/atos de titularidade A103 |
| **C301-RDI** | Custódia documental pública nos casos em que houver documento sob sua responsabilidade | Ser presumido como implantado no INC-001 |
| **Administrador da Plataforma** | Praticar eventual ato competente de autorização do Marco A, fora desta consulta | Ter sua decisão inferida a partir do resultado CE-01 |

A matriz de serviços homologada distingue CS-04 (`Constituir Organização Institucional`, operação proprietária A103) de CS-05 (habilitação/registro do Marco A, fronteira A102/A103 a detalhar). **Este serviço de consulta não implementa CS-04 nem CS-05:** é uma operação de leitura complementar, necessária ao CE-01.

## 3. Identificação proposta e vínculo com o contrato existente

**Nome lógico da operação:** `ConsultarEvidenciasDeIdentidadeInstitucional` (proposto).  
**Identificador documental:** `ESP-A103-CE01-001` (proposto).  
**Identificador de serviço definitivo:** **pendente de homologação no catálogo A103**; não atribuir `SRV-A103-001` ou similar sem conferência do catálogo.  
**Consumidor e porta já existentes:** `PortaIdentidadeA103.consultarIdentidadeInstitucional(consulta, contexto)` no A107 v0.3.0.  
**Transporte:** não definido. Pode ser serviço interno autenticado por protocolo a decidir; não existe endpoint HTTP homologado.

A operação A103 responde em `ResultadoConsultaA103`. O adaptador homologado `AdaptadorCe01A103`, pertencente ao A107, mapeia a resposta para `RespostaEvidencia`. Não substituir nem ampliar os tipos homologados do consumidor sem mudança versionada e testes de compatibilidade.

### 3.1 Entrada contratual existente

`ConsultaEvidencia` contém: `consulta_id`, `correlation_id`, `verificacao_id`, `organizacao_id`, `requisito_id`, `sujeito`, `propriedade_id`, `referencia_temporal`, `conhecimento_ate`, `pacote_regras`, `contexto_autorizacao`, e, quando aplicável, critérios de cobertura e paginação.

`ContextoAutenticado` é recebido em canal/infrastrutura confiável e contém `principal_id`, `autorizacao_contextual_id`, `origem_autenticacao`, `escopos`. Identificadores no corpo da consulta **não são prova autônoma** de permissão.

**Validação de entrada para este recorte:**
1. `requisito_id = CM01-R01`, `propriedade_id = identidade_institucional` e `sujeito.tipo = OrganizacaoInstitucional`.
2. `sujeito.referencia = organizacao_id` e identificadores não vazios.
3. Referências temporais com ISO 8601 e fuso; `conhecimento_ate` não pode exceder o instante da consulta quando o contrato atual assim exige.
4. `contexto_autorizacao` deve ser compatível com o contexto recebido por infraestrutura confiável, **com verificação de escopo de leitura para a organização e propósito solicitado**.
5. `pacote_regras` identifica regra do consumidor, mas não atribui ao A103 a responsabilidade de interpretá-la.

## 4. Resposta proprietária — correspondência exata com A107 v0.3.0

Resultado discriminado aceito pela porta já implementada:

| Estado da porta | Campos de saída | Semântica |
|---|---|---|
| `ENCONTRADO` | `registro: RegistroIdentidadeA103` | Existe registro recuperável e referenciável dentro dos limites de consulta |
| `NAO_LOCALIZADO` | `consulta_completa`, `snapshot_fonte?` | Nenhum registro foi localizado na busca delimitada; **não demonstra inexistência jurídica** |
| `INDISPONIVEL` | Estado | Serviço/fonte indisponível; não é prova negativa |
| `NAO_AUTORIZADA` | Estado | Acesso negado; o A107 interrompe com `A107E0002` |
| `ERRO` | Estado | Falha técnica ou de integridade; não é verificação negativa |

Para `ENCONTRADO`, o `RegistroIdentidadeA103` contém **os seguintes campos já exigidos pelo adaptador**:

| Campo | Natureza | Obrigatoriedade e origem |
|---|---|---|
| `organizacao_id` | Identidade da organização | Obrigatório; deve corresponder à consulta |
| `registro_id` | Identidade estável do registro | Obrigatório; emitido/controlado pelo A103 |
| `versao_registro` | Versão da informação consultada | Obrigatório; referência não vazia |
| `referencia_evidencia` | Referência à prova | Obrigatória; pode ser registro próprio ou referência a documento sob custodiante |
| `evidencia_id` | Identificador da evidência | Obrigatório; referenciado pelo fato correspondente |
| `registrado_em` | Tempo de conhecimento/registro | Obrigatório; não posterior a `conhecimento_ate` |
| `referencia_temporal` | Momento institucional examinado | Obrigatório; deve representar o mesmo instante solicitado |
| `conhecimento_ate` | Limite do acervo consultado | Obrigatório; deve representar o mesmo limite solicitado |
| `snapshot_fonte` | Snapshot/versão recuperável da fonte | Obrigatório e não vazio na resposta encontrada |
| `fonte_autoritativa` | Identificador lógico | `A103-GEP` para o recorte; **não é autenticação por si só** |
| `consulta_completa` | Completude pontual | `true` somente se todas as dependências dessa consulta específica forem resolvidas |

**Regra de integridade:** a simples presença de versão/snapshot como texto não demonstra imutabilidade ou recuperabilidade; o A103 deve manter o encadeamento com a versão real e sua fonte original, e expor evidência técnica verificável quando implementado.

**Compatibilidade:** os nomes e formatos acima são preservados para satisfazer a porta física A107 v0.3.0. Informações mais ricas sobre efeitos jurídicos, proveniência, validade e vínculos ontológicos serão objeto de evolução contratual posterior, sem fingir que os campos atuais as comprovam.

## 5. Modelo de dados proprietário a especificar antes da implementação

A operação requer que o A103 disponha de registro institucional identificado e versionado; o modelo persistente físico não está homologado. **Modelo lógico candidato**, sem criação de tabelas nesta etapa:

- **OrganizacaoInstitucional**: `organizacao_id` estável e identidade da instância.
- **VersaoRegistroInstitucional**: `registro_id`, `versao_registro`, referência ao estado consultado, `registrado_em`, intervalo de aplicabilidade/efeitos quando existente, referência ao registro precedente e contexto de atualização.
- **ReferenciaProbatoria**: `evidencia_id`, `referencia_evidencia`, custodiante/escopo da prova, versão/hash quando disponível.
- **RegistroHistorico**: histórico necessário à reconstrução no limite de conhecimento, sem depender apenas da situação atual.

Estes elementos não presumem DDL, esquema PostgreSQL, tabelas, propriedade do documento original nem serviço de constituição já implementado. O registro institucional só poderá ser tratado como fato real quando produzido por fluxo A103 efetivo, autorizado e auditável.

## 6. Temporalidade e reconstrução histórica

Adotar as duas coordenadas temporais da DEC-A107-005:

1. **`referencia_temporal`**: instante da realidade institucional examinada.
2. **`conhecimento_ate`**: limite da informação que podia ser considerada.

`ocorrido_em`, `registrado_em` e intervalos de vigência/efeitos são conceitos distintos. O A103 não deve inferir validade jurídica unicamente de `registrado_em`; um ato anterior pode ser conhecido posteriormente.

Para resposta `ENCONTRADO`, o serviço deverá identificar uma versão/snapshot da fonte consistente com os dois parâmetros, preservar referências da prova e permitir auditoria posterior. Havendo divergência de versões, ambiguidade sobre o estado histórico ou impossibilidade de reconstrução, a resposta **não será `ENCONTRADO` como fato plenamente demonstrado**: registrar `ERRO` ou resultado de insuficiência correspondente, segundo política de falhas a homologar. Não substituir silenciosamente por versão corrente.

O snapshot requerido é **da fonte A103**, não um snapshot global transacional de todos os módulos.

## 7. Autenticação, autorização e proteção dos dados

**Pré-condição de segurança:** a infraestrutura autenticará o chamador e vinculará o contexto transmitido à requisição. O A103 verificará o direito de consultar a organização e a propriedade requerida. A mera coincidência entre `contexto_autorizacao` e `autorizacao_contextual_id` não valida poderes reais.

**Decisões de segurança propostas:**
- Permissão explícita de consulta de evidências de identidade institucional, escopo limitado à organização e finalidade da verificação;
- Validação do contexto emitido por fonte confiável, com vigência, revogação e rastreabilidade conforme o contrato C103-IEA quando especificado;
- Rejeitar acesso indevido como `NAO_AUTORIZADA`, sem revelar se o registro existe;
- Não repassar credenciais, segredos, dados pessoais desnecessários nem SQL de módulos;
- Não escrever em A103 durante consulta; não praticar ato de incorporação, regularização ou autorização institucional;
- Logs com `correlation_id`, organização/escopo, decisão de acesso e identificador do serviço, sujeitos a política de retenção e minimização.

**Importante:** não existe atualmente interface C103-IEA homologada para este caso nem transporte confiável implementado no A103; portanto, integração real e aprovação operacional permanecem pendentes.

## 8. Invariantes propostos

| ID candidato | Invariante |
|---|---|
| INV-A103-CE01-001 | Uma resposta `ENCONTRADO` corresponde à organização consultada e a um registro A103 identificado |
| INV-A103-CE01-002 | Toda afirmação referenciada usa versão, evidência e snapshot coerentes com os parâmetros temporais |
| INV-A103-CE01-003 | `NAO_LOCALIZADO` nunca constitui automaticamente prova de inexistência jurídica |
| INV-A103-CE01-004 | `NAO_AUTORIZADA` não transporta dado institucional e interrompe a verificação no consumidor |
| INV-A103-CE01-005 | A operação é de leitura; não cria/atualiza organização, Marco A ou autorização |
| INV-A103-CE01-006 | Versões históricas não são substituídas silenciosamente pela versão corrente |
| INV-A103-CE01-007 | Evidência referencial não transfere a titularidade nem a custódia do documento original |
| INV-A103-CE01-008 | Uma simulação não é qualificada ou apresentada como prova institucional real |

Os IDs desta seção são provisórios, sujeitos a conferência de colisão com o catálogo A103.

## 9. Logging, métricas e monitoramento

Conforme a Matriz de Componentes e Serviços v0.1, o módulo deverá prever:
- **Logging/auditoria:** consulta, identidade confiável do solicitante, autorização, escopo, versão consultada, evidência referenciada, resultado e diagnósticos; sem dados pessoais indevidos.
- **Métricas:** consultas por resultado, indisponibilidade, problemas de consistência temporal, recusas de acesso e completude dos dados por fonte; sem inventar metas/SLAs.
- **Monitoring:** saúde das dependências, erros de leitura histórica, latência e divergências observadas.
- **Eventos:** consulta de leitura não cria, por si só, evento de autorização ou incorporação. Eventuais eventos de auditoria seguem contratos transversais específicos.

IDs definitivos para LOG/MET/MON deverão ser atribuídos no catálogo do módulo A103, evitando duplicações.

## 10. Comportamento e matriz de testes propostos

| Teste candidato | Situação | Resultado exigido |
|---|---|---|
| TST-A103-CE01-001 | Organização e registro válido, versão e prova recuperáveis | `ENCONTRADO` com todos os campos do contrato |
| TST-A103-CE01-002 | Registro ausente na consulta delimitada | `NAO_LOCALIZADO`; A107 mantém ausência sem prova negativa |
| TST-A103-CE01-003 | Consulta de outra organização/escopo | `NAO_AUTORIZADA` ou rejeição segura |
| TST-A103-CE01-004 | Chamador sem autorização contextual vigente | `NAO_AUTORIZADA`; não vazar existência |
| TST-A103-CE01-005 | Versão histórica indisponível | Não devolver `ENCONTRADO` demonstrado; explicitar diagnóstico |
| TST-A103-CE01-006 | `registrado_em` posterior a `conhecimento_ate` | Registro não utilizável como evidência |
| TST-A103-CE01-007 | Referência de prova ausente ou incoerente | Resposta não utilizável; não produzir `ATENDIDA` |
| TST-A103-CE01-008 | Fonte indisponível | `INDISPONIVEL`; distinguir de acesso negado |
| TST-A103-CE01-009 | A103 fornece fato, demais CM não demonstradas | A107 não autoriza Marco A e continua `VERIFICACAO_PENDENTE` |
| TST-A103-CE01-010 | Simulação e registros reais indistintamente disponíveis | Impedir utilização de dados simulados em verificação institucional real |
| TST-A103-CE01-011 | Consulta repetida com mesmos tempos/snapshot | Resposta coerente com a mesma visão histórica quando recuperável |
| TST-A103-CE01-012 | Consulta não altera estado proprietário | Nenhum write institucional/ato/alteração por efeito da leitura |

**Nota:** testes listados são critérios de aceite futuros, não testes implementados ou aprovados. Os 19 testes aprovados do A107 v0.3.0 validam seu adaptador com fonte simulada, não este serviço A103 real.

## 11. Fluxo operacional proposto

1. A107 solicita evidência CE-01 para `CM01-R01`, com organização e referências temporais.
2. O canal confiável autentica o consumidor e transporta contexto autorizado.
3. A103 verifica autorização contextual antes de revelar qualquer registro.
4. A103 recupera identidade institucional, versão histórica e referência probatória sob sua titularidade.
5. A103 verifica coerência, procedência e possibilidade de reconstrução temporal.
6. A103 responde usando `ResultadoConsultaA103` com estado explícito.
7. O adaptador CE-01 do A107 converte para `RespostaEvidencia` ou propaga `A107E0002` diante de acesso negado.
8. O A107 aplica seu operador `existe` e registra o resultado da verificação, preservando outros requisitos pendentes.
9. **Nenhuma etapa autoriza Marco A.** Se houver elegibilidade futura, um ato decisório institucional separado será necessário.

## 12. Decisões pendentes antes da codificação

1. **Catálogo do A103:** identificador definitivo de serviço, IDs de erros e artefatos, e relação desta operação com CS-04 e CS-05;
2. **Constituição efetiva:** origem e transação proprietária do registro institucional, critérios de identificação, unicidade, versões e historicidade;
3. **Armazenamento:** esquema físico, migrações e controle de acesso no banco do A103;
4. **Transportes e confiança:** mecanismo de autenticação de serviço e delegação contextual, vínculo a C103-IEA e autorização histórica;
5. **Prova e custódia:** natureza de `referencia_evidencia`, fonte originadora, integridade e titularidade de registros/documentos;
6. **Semântica temporal:** regra de seleção entre estados históricos, validade e efeitos, inclusive divergências e limites de reconstrução;
7. **Falhas:** distinção entre `ERRO`, `INDISPONIVEL` e resultado incompleto quando a porta proprietária não possui `PARCIAL`;
8. **Testes reais:** ambiente isolado de integração, dados institucionais legítimos, política de auditoria e critérios de homologação operacional.

### Deliberação solicitada

Homologar ou revisar **ESP-A103-CE01-001 v0.1** como especificação do serviço proprietário de consulta CE-01 limitada a `CM01-R01`, **sem homologar implementação inexistente**. Após aprovação, iniciar a decomposição de dados/artefatos e definição da interface executável, em branch distinta, com testes e fonte controlada.

**Estado atual:** somente documento de proposta, sem alteração de código, DDL, regras do A107, serviços institucionais ou dados da plataforma.
