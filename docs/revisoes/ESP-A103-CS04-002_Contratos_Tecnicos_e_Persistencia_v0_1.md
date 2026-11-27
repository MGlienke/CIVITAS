# ESP-A103-CS04-002 — Contratos Técnicos e Persistência Proprietária A103-GEP

**Versão:** 0.1 — **PROPOSTA PARA HOMOLOGAÇÃO, NÃO HOMOLOGADA**  
**Data:** 27/11/2026  
**Módulo:** A103-GEP — Gestão de Entidades Públicas  
**Escopo:** CS-04 — Constituição e Registro de Organização Institucional; fornecimento posterior CE-01/CM01-R01  
**Baseline homologada:** ESP-A103-CS04-001 v0.1; DEC-A103-001 v0.1; ESP-A103-DAT-001 v0.1; ESP-A103-CE01-001 v0.1; DEC-A107-004/005 v0.1 e A107-EOB v0.3.0.  
**Natureza:** proposta de contratos físicos e projeto de persistência PostgreSQL 18, **sem criar tabelas, arquivos SQL executáveis, serviço ou endpoints**.  
**Identificadores:** CS-04 é contrato lógico editorial; **não atribuir SRV-A103-NNN** antes de conferência do catálogo. Tipos e nomes de tabelas abaixo também são candidatos, não parte de interface pública homologada.

## 1. Decisão de arquitetura proposta

Separar explicitamente três camadas:

1. **Comandos proprietários CS-04**: preparam, validam e autorizam a publicação de versões de representação institucional no A103, com identidade institucional, proveniência e evidência referencial.
2. **Persistência proprietária A103**: garante integridade do registro, publicações versionadas imutáveis, idempotência, decisão de publicação e outbox, dentro de uma transação local.
3. **Consulta proprietária CE-01**: extrai um registro historicamente reconstruído e seu manifesto probatório e o expõe pela porta `PortaIdentidadeA103` do A107 v0.3.0, sem consultar tabelas privadas diretamente.

A publicação do registro computacional **não constitui automaticamente a organização perante o Direito** nem a habilita. A verificação `CM01-R01` é responsabilidade do A107, e a autorização do Marco A é ato distinto do Administrador da Plataforma.

### 1.1 Escopo e dependências não presumidas

Este projeto de persistência trata apenas dos **registros proprietários do A103**. Ele **não** cria entidades, competências, cargos ou documentos de outros módulos; não implementa o serviço de confiança de C103-IEA, as normas de A108-BDN ou o repositório arquivístico C301-RDI. Ausência dessas fontes impede produção de evidência institucional real quando a prova/autoridade depende delas.

Para testes, contratos de portas simuladas poderão ser utilizados, mas **não** produzirão registros classificados como evidência real. A fronteira de autorização real é **pré-condição de operação**, não item dispensável.

## 2. Portas técnicas candidatas — sem protocolo definido

| Porta proposta | Função e fronteira | Entrada lógica | Saída lógica |
|---|---|---|---|
| `PrepararRegistroInstitucional` | criar ou recuperar proposta idempotente, sem publicar | comando + contexto autenticado | proposta e versão de elaboração |
| `ExaminarIdentidadeEProveniencia` | verificar duplicidade, origem, custódia e dependências | proposta + referências de fonte | diagnóstico de prontidão |
| `DecidirPublicacaoInstitucional` | registrar decisão de principal legitimado para publicar, não Marco A | proposta, decisão, justificativa e contexto | decisão vinculada à versão |
| `PublicarVersaoInstitucional` | consolidar publicação atomicamente | proposta aprovada + versão-base + comando idempotente | resultado publicado + manifesto + evento |
| `RetificarRegistroInstitucional` | gerar nova proposta referenciando versão anterior | identidade, versão-base, fundamento e alteração | proposta de retificação |
| `ConsultarEstadoSolicitacao` | consulta de andamento, sem efeitos de escrita | solicitação + contexto | estado controlado |
| `ConsultarIdentidadeInstitucional` (CE-01) | recuperar versão e manifesto para CM01-R01 | `ConsultaEvidencia` + `ContextoAutenticado` | `ResultadoConsultaA103` já pactuado com A107 |

A autorização para propor e a autorização para publicar são decisões **distintas**, ainda que a política futura venha a admitir o mesmo principal em determinados contextos legitimados. Nenhum endpoint HTTP/gRPC foi decidido.

### 2.1 Envelope de comando de escrita

Campos propostos:

- `solicitacao_id` e `correlation_id` obrigatórios; `tipo_comando` discriminado;
- `organizacao_id` opcional para criação, obrigatório para retificação;
- `versao_base` obrigatória para alterar uma cadeia já publicada;
- `origem_procedimento`, `referencias_normativas`, `referencias_probatorias`, `tipo_eot_referencial` e vínculos institucionais como referências resolúveis;
- `justificativa` e referência de decisão para publicação/retificação;
- `modo_evidencia`: enum `REAL` ou `SIMULADO`, definido **pelo ambiente e política confiável**, nunca confiando apenas em texto do cliente;
- `principal_id`, `escopos`, identidade do emissor e autorização contextual **somente do contexto autenticado recebido de infraestrutura confiável**, nunca fornecidos livremente no comando;
- `pedido_hash` derivado de representação canônica versionada no servidor; excluir segredos e campos de transporte voláteis.

**Não expor SQL ou credenciais em payloads.** A identidade `organizacao_id` deve ser atribuída após resolução de unicidade e dentro de um processo de publicação autorizado, sem confundi-la com IDs externos ou referência documental.

### 2.2 Estados de comando e de registro

Estados propostos de tramitação: `PROPOSTA`, `EM_VALIDACAO`, `PENDENTE_SANEAMENTO`, `AGUARDANDO_PUBLICACAO`, `REJEITADA`, `PUBLICADA`; falhas técnicas não tornam versões parcialmente publicadas.

Estado de retorno candidato do comando: `PROPOSTA_REGISTRADA`, `PENDENTE_VALIDACAO`, `PENDENTE_PUBLICACAO`, `PUBLICADA`, `REJEITADA`, `CONFLITO`, `NAO_AUTORIZADA`, `ERRO`. **Não reutilizar esse enum na interface CE-01**: seu resultado discriminado é `ENCONTRADO`, `NAO_LOCALIZADO`, `INDISPONIVEL`, `NAO_AUTORIZADA` ou `ERRO`.

`PUBLICADA` significa somente uma **versão de registro A103 apta à consulta probatória** sob o escopo aprovado, e não `MARCO_A_AUTORIZADO`.

## 3. Modelo físico PostgreSQL candidato

**Banco de referência para futura avaliação técnica:** `civitas_plataforma`.  
**Schema isolado proposto:** `a103`; não afetar os schemas `a107` e `c105`.  
**SGBD de referência:** PostgreSQL 18.  
**Tipo de IDs internos:** UUID onde apropriado, com chaves de negócio/identificadores textuais controlados quando exigidos pelos contratos.

**Inventário inicial proposto (9 tabelas):**

| Tabela candidata | Responsabilidade | Integridade essencial |
|---|---|---|
| `a103.organizacoes` | `organizacao_id` estável e metadados de identidade | unicidade da identidade e ausência de uso de nome/CNPJ como chave única institucional |
| `a103.solicitacoes_registro` | idempotência, proponente, contexto validado, estado do fluxo, diagnóstico | unicidade no escopo confiável `(principal_id, solicitacao_id, tipo_comando)` + hash do comando |
| `a103.versoes_registro` | versões históricas de uma cadeia de registro `registro_id` | chave única por `registro_id + versao_registro`; `registrado_em` imutável; predecessor rastreado |
| `a103.referencias_probatorias` | referência a uma prova, custódia real, versão, escopo e integridade | vínculo à versão e custodiante original; não armazenar documento original por padrão |
| `a103.manifestos_probatorios` | agregado versionado sob responsabilidade A103 | referência estável, versão imutável e vínculo à versão de identidade |
| `a103.itens_manifesto` | composição ordenada/canonizável do manifesto | FK local para manifesto e referência probatória, proibição de item órfão |
| `a103.decisoes_publicacao` | decisão autenticada/justificada sobre proposta e versão-base | principal e contexto confiáveis, escopo e decisão auditáveis |
| `a103.eventos_registro` | trilha de transições/publicações/retificações do A103 | append-only, correlação e nexo com solicitação/versão |
| `a103.outbox` | entrega confiável de evento de publicação para consumidores futuros | evento versionado + chave de idempotência + status de entrega |

**DAT-A103-004 (snapshot)** e **DAT-A103-005 (registro de consulta)** requerem decisão física adicional: a tabela `eventos_registro` e os registros de auditoria poderão sustentar o histórico, mas **não se deve afirmar que já substituem o snapshot reproduzível nem a trilha de leitura**. Antes de gerar DDL, será necessário decidir se serão materializados em tabelas próprias ou em mecanismo auditável equivalente, com prova de retenção/reprodutibilidade.

### 3.1 Restrições de dados a detalhar

- FKs apenas **dentro do schema A103**, sem FKs SQL para A107, C301, A108 ou outros proprietários.
- Datas com `timestamptz` e distinção de `ocorrido_em`, `registrado_em`, `vigente_desde`, `vigente_ate`, `consultado_em`; `registrado_em` não deve ser retrodatado por aplicação.
- Versões publicadas, decisões e eventos em regime **append-only**; retificação produz nova versão.
- `snapshot_fonte` deve derivar de uma revisão ou visão recuperável, não de rótulo aleatório.
- Unicidade de versão e proteção de publicação concorrente sobre a mesma `versao_base`; escolha de índices e mecanismo de bloqueio/controle otimista ficam para o DDL.
- Hash canônico de comando e manifesto: algoritmo, serialização e normalização a definir e testar; IDs/hashes isolados não demonstram preservação do original.
- `referencias_probatorias.custodiante_modulo` designa **o custodiante original**; `manifestos_probatorios` são objeto sob responsabilidade A103.
- Auditoria técnica de consulta e histórico de acesso negado exigem política de minimização/retenção; negar consulta deve evitar vazamento de existência. Falha de autorização impede a operação principal, mas registro técnico de segurança pode obedecer transação de auditoria independente.
- Dados `SIMULADO` devem ser segregados de forma estrutural ou por ambiente; flag enviada pelo usuário não é barreira de segurança.

### 3.2 Unidade transacional de publicação

Na mesma transação local proprietária do A103:

1. Revalidar permissão de publicação, assinatura/contexto confiável da decisão, prazo, `versao_base` e idempotência;
2. Confirmar resolução de identidade e vínculos entre organização, versão, manifesto e referências locais;
3. Inserir nova versão publicada imutável e itens do manifesto — sem referência essencial faltante;
4. Registrar decisão e evento de publicação, e inserir evento correspondente na outbox;
5. Confirmar COMMIT somente se **todas** as inserções locais necessárias forem válidas.

Em caso de falha essencial: ROLLBACK da publicação, sem versão parcialmente acessível por CE-01. Interações com módulos externos não serão envelopadas em transação distribuída. Estados e decisões anteriores à publicação podem existir em transações próprias conforme o fluxo homologado.

**Atenção:** a validação do custodiante externo deve estar suficientemente evidenciada antes do COMMIT, mas o COMMIT local não garante disponibilidade futura do documento; consultas posteriores devem verificar a continuidade da referência/prova segundo contrato e política de integridade.

## 4. Contrato do manifesto probatório — proposta mínima

Cada manifesto é um objeto A103 **versionado e resolúvel**, referenciável por `evidencia_id` + `referencia_evidencia` da porta CE-01 homologada no A107.

| Campo | Tipo lógico | Obrigatório |
|---|---|---|
| `manifesto_id` | ID estável do agregado | Sim |
| `versao_manifesto` | versão imutável | Sim |
| `organizacao_id`, `registro_id`, `versao_registro` | vínculo exato à afirmação do registro | Sim |
| `escopo_afirmacao` | semântica controlada, inicialmente existência do registro | Sim |
| `itens[]` | IDs/referências/custodiantes originais, versões e papéis probatórios | Sim (não vazio) |
| `criado_em`, `publicado_em` | momentos distintos | Sim, quando publicados |
| `contexto_origem` | referência de procedimento/decisão | Sim |
| `algoritmo_integridade`, `hash_manifesto` | digest com serialização canônica | Condicional até definição técnica |
| `estado_resolucao` | diagnóstico de recuperabilidade do agregado | Sim |

O manifesto **não** contém cópias obrigatórias de documentos, nem se apresenta como documento público original ou garantia absoluta de validade jurídica. A projeção CE-01 poderá referenciar **o manifesto A103** como evidência singular, preservando internamente os custodiantes de seus itens. A evolução para múltiplas evidências nativas no A107 exige nova versão contratual, não mudança implícita no A107 v0.3.0.

## 5. Autorização e proveniência institucional

O A103 nunca aceitará `principal_id`, `papel` ou `escopos` como prova de autoridade por simples preenchimento de JSON. Os comandos administrativos devem receber um **contexto autenticado e vinculado ao canal**, com identidade, escopo, finalidade, validade e trilha de decisão. A autorização deve ser verificada no instante relevante da ação, inclusive antes da publicação.

O contrato de C103-IEA, o mecanismo de autenticação mútua e o transporte seguro estão **pendentes**. Portanto, não há autorização para conectar o serviço a identidade real ou produzir evidências reais apenas com uma implementação mock de autorização.

Propor separação de permissões: `propor_registro`, `examinar_identidade`, `decidir_publicacao`, `publicar_versao`, `retificar_registro`, `consultar_identidade`; são nomes semânticos candidatos, não permissões já configuradas.

A recusa de acesso deve ocorrer **antes de revelar existência** do registro ou do pedido. O A107 propaga `A107E0002` na fronteira CE-01, conforme contrato existente. Não promover `NAO_AUTORIZADA` a `INDETERMINADA`.

## 6. Historicidade e CE-01

A consulta A103 selecionará uma versão informacionalmente disponível até `conhecimento_ate` e pertinente à `referencia_temporal`, usando a cadeia de versões e os efeitos historicamente demonstráveis.

- Correções registradas depois do limite de conhecimento não são incorporadas a respostas passadas;
- Correções com efeitos pretéritos exigem vínculo explícito com a versão retificada;
- Consulta não deve escolher automaticamente a versão de maior timestamp quando existirem candidatas juridicamente ou semanticamente divergentes;
- `ENCONTRADO` só poderá ser devolvido com `consulta_completa = true`, identidade coerente, `registrado_em <= conhecimento_ate`, versão e manifesto resolúveis e snapshot de fonte reproduzível;
- `NAO_LOCALIZADO` não prova inexistência jurídica; insuficiência/conflicto temporal não gera fato utilizável;
- O identificador de snapshot não representa visão transacional global de todos os módulos.

**Compatibilidade:** preservar a forma já implementada `RegistroIdentidadeA103` e `ResultadoConsultaA103` no A107-EOB v0.3.0, com `fonte_autoritativa = 'A103-GEP'` como **rótulo lógico apenas**, nunca autenticação da origem.

## 7. Códigos de erro e observabilidade

Sem reservar IDs definitivos A103, prever categorias: `ACESSO_NEGADO`, `IDENTIDADE_AMBIGUA`, `PROVENIENCIA_INSUFICIENTE`, `VERSAO_CONCORRENTE`, `INTEGRIDADE_DIVERGENTE`, `MANIFESTO_INCOMPLETO`, `IDEMPOTENCIA_DIVERGENTE`, `DEPENDENCIA_INDISPONIVEL`.

Registrar logging e auditoria de comandos e decisões, além de métricas de propostas, publicações, retificações, conflitos, acesso negado, disponibilidade e tempo de consulta. Monitorar outbox, falhas de recuperação histórica e integridade dos manifestos. D101/D102/D103 são referências arquiteturais, não serviços cuja implantação esteja garantida.

Não inserir segredo, documento completo ou dados pessoais desnecessários nos logs. O esquema de códigos de erro deve ser compatibilizado com o padrão geral CIVITAS antes de publicar contrato externo.

## 8. Matriz de testes candidatos

| Teste | Cenário | Critério |
|---|---|---|
| TST-A103-CTP-001 | Criar proposta | Não há versão institucional publicada nem evidência real CE-01 |
| TST-A103-CTP-002 | Principal sem permissão de publicação | Nenhuma alteração publicada e nenhuma divulgação indevida |
| TST-A103-CTP-003 | Publicação íntegra | Identidade, versão, manifesto, decisão, evento e outbox consistentes após COMMIT |
| TST-A103-CTP-004 | Erro de manifesto na publicação | ROLLBACK, sem versão parcialmente visível |
| TST-A103-CTP-005 | Erro de outbox na publicação | ROLLBACK, sem publicação concluída |
| TST-A103-CTP-006 | Solicitação repetida idêntica | Retorna mesmo resultado, sem duplicação |
| TST-A103-CTP-007 | Mesma idempotência e payload divergente | Conflito |
| TST-A103-CTP-008 | Publicações concorrentes na mesma versão-base | No máximo uma publicação válida para a mesma condição de base |
| TST-A103-CTP-009 | Retificação | Nova versão, preservando original e datas de registro |
| TST-A103-CTP-010 | Consulta bitemporal anterior à retificação | Não inclui informação conhecida posteriormente |
| TST-A103-CTP-011 | Manifesto com documento de custodiante externo | A103 mantém agregado, custódia original preservada |
| TST-A103-CTP-012 | Evidência simulada em ambiente real | Bloqueada, mesmo com flag cliente `REAL` |
| TST-A103-CTP-013 | Versão histórica ou prova não recuperável | Não devolver `ENCONTRADO` conclusivo |
| TST-A103-CTP-014 | Publicação e CM01-R01 `ATENDIDA` no A107 | Marco A continua não autorizado |
| TST-A103-CTP-015 | `NAO_AUTORIZADA` na leitura CE-01 | A107 lança `A107E0002`; nenhuma conclusão persistida |
| TST-A103-CTP-016 | Permissão de consulta de outra organização | A103 recusa sem revelar existência |
| TST-A103-CTP-017 | Reprocessamento da outbox | Publicação local não duplicada, entrega idempotente |
| TST-A103-CTP-018 | Projeção CE-01 com tempos e snapshot | Campos coerentes com `RegistroIdentidadeA103` v0.3.0 |

Os 18 cenários são **propostos, não executados**. Nenhum teste dos 19 existentes no A107 valida sozinho a implementação do A103 real.

## 9. Pendências para autorizar a criação de DDL e código

1. **Catálogo A103:** conferir IDs já utilizados e atribuir códigos definitivos (SRV, DAT, INV, REG, RFU, RNF, TST, LOG, MET, MON) sem colisões.
2. **Competência/segurança:** aprovar concretamente política e mecanismo confiável de quem propõe, decide e publica; vínculo a C103-IEA.
3. **Persistência bitemporal:** especificar de modo testável a reconstrução de versões, estratégia de `snapshot_fonte`, transições e política de retenção.
4. **Manifesto:** definir formato canônico, algoritmo de hash, resolução e semântica de `estado_resolucao` e das peças essenciais.
5. **Modelo físico:** fechar tabelas adicionais ou mecanismos equivalentes para snapshots e consultas, colunas, índices, triggers, privilégios e migrações versionadas.
6. **Autorização/ambiente:** estabelecer separação entre ambiente simulado e prova institucional real.
7. **Transação e eventos:** aprovar garantias de idempotência concorrente, atomicidade local e semântica de outbox.
8. **Testes:** obter ambiente isolado e executar testes controlados do banco/contratos antes de homologação operacional.

## 10. Deliberação

**Proposta para homologação técnica documental** dos envelopes, portas, responsabilidades, inventário preliminar de persistência e critérios de integridade/aceite. A publicação deste documento **não altera nenhum baseline homologado**, nem cria módulo A103 executável.

**A codificação e DDL permanecem bloqueados nesta etapa** até resolver as decisões pendentes, conferir IDs e receber homologação específica dos contratos/esquema físico.
