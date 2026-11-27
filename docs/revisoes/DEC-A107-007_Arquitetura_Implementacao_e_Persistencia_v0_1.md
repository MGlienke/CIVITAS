# DEC-A107-007 — Arquitetura de Implementação e Persistência do A107-EOB

**Estado:** PROPOSTA v0.1 — EM REVISÃO, NÃO HOMOLOGADA  
**Data:** 26/11/2026  
**Incremento:** INC-001 — Marco A (homologado)  
**Módulo:** A107-EOB — Estrutura Organizacional de Base  
**Serviço-alvo:** SRV-A107-003 — Verificar Condições Ontológicas de Realização (contrato lógico homologado)  
**Base arquitetural:** Mapa de Domínios e Módulos v0.5; DEC-A107-001 a DEC-A107-006 homologadas; CM-01 a CM-04; template CIV-ESP-TPL v0.4.

## 1. Objetivo e limites

Definir uma implementação incremental, testável e auditável do motor de verificação A107-EOB, com resolução e execução de condições Markdown/YAML, contratos de consulta a fontes proprietárias, avaliação de evidências, persistência imutável dos resultados e reavaliação seletiva diária.

A implementação **não** constitui nem altera organizações, Pessoas, competências, atos ou documentos proprietários de outros módulos, nem concede, suspende ou revoga a autorização de Marco A. O serviço retorna **elegibilidade técnica**; a autorização pertence a A103-GEP / Administrador da Plataforma.

O repositório GitHub CIVITAS atual contém documentação de arquitetura e UC, mas **não contém código-fonte do A107**. A implementação de C105-MSG referida nas decisões anteriores foi validada em ambiente local distinto e não se considera transplantada/implantada no repositório.

## 2. Proposta de plataforma de execução (sujeita à homologação)

- **Linguagem e execução:** Node.js com TypeScript em versão LTS suportada, adotando implementação modular por portas/adaptadores.
- **Persistência:** PostgreSQL, banco lógico `civitas_plataforma`, schema independente `a107`. É proposta de reutilização do ambiente local, sem acesso direto à área `c105`.
- **Artefatos ontológicos:** cinco arquivos `.md` de CM-01 a CM-04 e MARCO_A, esquema de validação homologado em DEC-A107-003, versionados com hash de conteúdo.
- **Integração:** portas `EvidenceProvider` tipadas e adaptadores independentes por módulo; não consultar tabelas de outros módulos nem presumir APIs já implementadas.
- **Eventos e auditoria:** transação local com mecanismo de outbox para publicação assíncrona quando necessário. A entrega/consumo real depende dos módulos E1 e D1 e de decisões de integração posteriores.
- **Reavaliação:** agendador transversal, disparo diário em janela configurável de baixa carga; trabalhador A107 especializado em análise de impacto e reexecução seletiva. Sem efeito jurídico automático.

**Decisão arquitetural proposta:** um **serviço implantável** para A107, organizado internamente em componentes independentes, não oito microsserviços.

## 3. Componentes internos e interfaces

| Componente lógico | Porta / responsabilidade | Persistência |
|---|---|---|
| RuleRepository | Carregar manifesto e conteúdo Markdown/YAML íntegro por versão | Pacote publicado / hashes |
| RuleValidator | Validar JSON Schema, sintaxe, catálogo ontológico, IDs, dependências e operadores | Resultado de validação do pacote |
| AuthorizationPort | Validar sujeito e escopo contextual via C103-IEA | Referência do ato de autorização da consulta |
| EvidenceCoordinator | Planejar consultas por requisito e organizar resposta/cobertura | Referências das consultas efetuadas |
| EvidenceProvider | Portas específicas de A103, A108, C302, C309, C101, C103 e E3 | Dados somente nos módulos proprietários |
| OperatorEngine | Operadores: existe, corresponde, relacionado_a, fundamentado_em, vigente_em, reconhecido_por, satisfaz, precede | Sem persistência própria |
| CompositionEngine | todos, algum, nenhum, para_cada; 4 estados e suficiência probatória | Sem persistência própria |
| VerificationService | SRV-A107-003: orquestrar execução, consolidar, persistir | Registros de execução/resultado |
| VerificationRepository | Persistir execuções, requisitos, referências e integridade | PostgreSQL schema a107 |
| ImpactAnalyzer | Detectar alterações relevantes às regras/âmbitos/organizações | Índice de dependências e alterações processadas |
| ReevaluationWorker | Reexecução seletiva diária, checkpoint, retomada e deduplicação | Fila e execução de reavaliação |
| TelemetryAdapter | LOG/MET/MON e auditoria de eventos relevantes | D1 / sistema de telemetria quando integrado |

A separação de componentes não implica transferência de responsabilidade: A107 avalia; A103, A108, C302, C309 e demais módulos fornecem fatos/atos; E302-HIS apoia histórico e E301-ASO apoia resolução de fontes.

## 4. Fluxo de SRV-A107-003

1. Receber pedido com chave de idempotência, `organizacao_id`, `ambito_id`, `referencia_temporal`, `conhecimento_ate`, versão de regra/manifesto, contexto de autenticação e correlação.
2. Validar autorização contextual para a organização e propósito; não confiar em identidade autodeclarada no payload.
3. Resolver pacote `MARCO_A` aprovado (regra publicada + manifesto) e fixar seu ID, versão e hash antes de consultar fontes.
4. Validar sintaxe e semântica: schema, IDs, propriedades ontológicas e dependências; não executar código arbitrário embutido nos arquivos.
5. Preparar plano de consulta por requisitos e operadores, combinando fontes autoritativas, universo esperado e fonte observada.
6. Consultar provedores pelas portas `EvidenceProvider`, com referência temporal e limite de conhecimento, e capturar versões/snapshots. Não presumir snapshot transacional distribuído único.
7. Verificar integridade, autoria/competência quando aplicável, pertinência normativa, cobertura e prova de completude de cada requisito.
8. Avaliar operadores e composições determinísticas; preservar `NAO_ATENDIDA` para descumprimento demonstrado e `INDETERMINADA` para falta de evidência, contradição ou fonte indisponível.
9. Consolidar CM-01 a CM-04 e elegibilidade técnica do Marco A. `NAO_APLICAVEL` é proibida para as quatro condições obrigatórias.
10. Persistir resultado e evidências referenciais em transação local, incluindo auditoria mínima durável e outbox se a publicação de evento for exigida.
11. Devolver `verificacao_id`, estado, elegibilidade, justificativas, versões e correlação. Nunca autorizar Marco A.

Em falha técnica antes do commit, não declarar verificação concluída. Se a fonte estiver indisponível, mas for possível concluir de modo íntegro que a evidência é insuficiente, registrar verificação concluída com estado `INDETERMINADA` (não confundir com falha transacional).

## 5. Persistência PostgreSQL: modelo lógico

**Separação:** schema `a107` dentro de `civitas_plataforma` como opção inicial. Não reutilizar tabelas C105, nem criar cópias dos cadastros proprietários.

| Tabela proposta | Responsabilidade | Regras de integridade |
|---|---|---|
| `a107.pacotes_regras` | Registro de pacote publicado, hash, versão, manifesto, esquema | Identidade estável; imutabilidade de conteúdo após publicação |
| `a107.execucoes` | Comando recebido, idempotência, fases e falha técnica | Idempotência única por escopo definido; status controlado |
| `a107.verificacoes` | Resultado consolidado, organização, âmbito, tempos, versão e elegibilidade | Uma verificação concluída é imutável |
| `a107.resultados_condicao` | Resultado de cada CM e justificativa | FK verificação, ID da condição e versão |
| `a107.resultados_requisito` | Operador, propriedade, estado e diagnóstico por requisito | FK resultado de condição; rastreabilidade do requisito |
| `a107.referencias_evidencia` | Fonte, documento/registro, versão/snapshot, temporalidade, integridade e completude | FK requisito; não armazenar original de documentos |
| `a107.consultas_fonte` | Consulta, resposta ou falha, fonte, correlação, tempos, cobertura e status | Diferenciar ausência comprovada de resposta parcial |
| `a107.outbox` | Eventos de verificação a publicar após confirmação local | Evento persistido atomicamente com conclusão |
| `a107.impactos_pendentes` | Alteração detectada e organizações/condições potencialmente afetadas | Chave estável para evitar reavaliação duplicada |
| `a107.execucoes_rotina` | Janela, cursor/checkpoint, execução periódica, falhas e retomada | Checkpoint somente após progresso durável |

### 5.1 Relacionamentos (esboço)

```text
pacotes_regras 1 --- N verificacoes
execucoes     1 --- 0..1 verificacoes
verificacoes  1 --- N resultados_condicao
resultados_condicao 1 --- N resultados_requisito
resultados_requisito 1 --- N referencias_evidencia
execucoes     1 --- N consultas_fonte
verificacoes  1 --- N outbox (eventos)
execucoes_rotina 1 --- N impactos_pendentes
```

**Identificadores externos:** `organizacao_id`, IDs de Pessoa/IDUP, competências, órgãos, documentos e atos são referências estáveis a módulos proprietários; não usar chave estrangeira SQL direta para tabelas de outro módulo. Integridade intermodular é verificada por contratos.

### 5.2 Registro mínimo de verificação

| Campo | Tipo conceitual | Semântica |
|---|---|---|
| `id` | UUID | Identidade da verificação |
| `organizacao_id` | Identificador externo | Organização concreta avaliada |
| `ambito_id` | Código controlado | MARCO_A no INC-001 |
| `referencia_temporal` | timestamptz | Tempo institucional avaliado |
| `conhecimento_ate` | timestamptz | Corte de informações disponíveis consideradas |
| `executado_em` | timestamptz | Momento de execução |
| `pacote_regras_id` | FK local | Identificador de pacote |
| `pacote_hash` | hash | Integridade do conteúdo carregado |
| `estado` | enum/literal controlado | ATENDIDA / NAO_ATENDIDA / INDETERMINADA |
| `elegibilidade` | enum/literal controlado | ELEGIVEL_PARA_AUTORIZACAO / NAO_ELEGIVEL / VERIFICACAO_PENDENTE |
| `correlation_id` | identificador | Rastreabilidade entre módulos |
| `integridade_resultado` | referência hash ou mecanismo equivalente | Integridade do resultado persistido |

**Regra:** `executado_em` não substitui `referencia_temporal` e `conhecimento_ate`. O pacote vigente na data corrente não é automaticamente aplicável a fatos pretéritos. Persistir também seleção e versão das fontes para reconstituição/auditoria.

### 5.3 Imutabilidade, retificação e retenção

- Verificação concluída não é atualizada para novo resultado: criar **nova** verificação vinculada à anterior, com causa/versão de mudança.
- Distinguir correção de dado de origem de alteração de estado jurídico da organização.
- Registrar referência do pacote, hashes, evidências e contexto mínimo necessário à demonstração histórica.
- IDs/hashes isolados não garantem reexecução; disponibilidade das versões históricas nos módulos fornecedores deverá ser assegurada ou explicitamente declarada insuficiente.
- Dados sensíveis devem ser minimizados no A107 e protegidos por políticas de acesso; prazos de retenção ainda dependem de decisão institucional.
- A estratégia de integridade por hash (inclusive canonicalização) deve ser formalizada antes da implementação física.

## 6. Transações, idempotência e concorrência

**Fronteira transacional:** o A107 executa consultas externas fora de uma transação distribuída e abre transação PostgreSQL **local** para confirmar verificação, resultados, referências, auditoria mínima e outbox.

**Idempotência:** chave `solicitacao_id` escopada por organização e principal autorizado; comparar hash canônico do pedido, incluindo `referencia_temporal`, `conhecimento_ate`, âmbito e pacote escolhido. Mesmo pedido/chave devolve `verificacao_id` anterior; mesma chave e parâmetros divergentes gera erro estável `A107E0005`. Não criar duplicação por concorrência; usar índice único e operação atômica.

**Concorrência:** evitar gravações concorrentes para a mesma chave e mudança de versões de regras durante uma execução. Pode haver verificações distintas da mesma organização com tempos/versões diferentes, desde que claramente identificadas. Não bloquear transações de outros módulos.

**Falha parcial:** não persistir resultado final sem a auditoria obrigatória; registros parciais de tentativa podem persistir como `FALHA_TECNICA`, mas nunca como condição `NAO_ATENDIDA`. Falha na entrega assíncrona mantém outbox pendente, sem reversão silenciosa do fato da verificação já concluída.

## 7. Interfaces e protocolos — propostas, não homologados

- Porta de comando `VerificationCommandPort`, responsável pelo SRV-A107-003, sem exposição de endpoint fictício antes da decisão sobre transporte.
- Porta de leitura `VerificationQueryPort`, candidata ao SRV-A107-004 (consulta de resultado).
- Porta `EvidenceProvider` com contrato semântico DEC-A107-004: `consulta_id`, `correlation_id`, sujeito, propriedade, requisito, âmbito, tempos, fonte, `status_consulta`, fatos, referências de evidências, cobertura/completude e versão/snapshot.
- Porta `RulePackagePort` para leitura e publicação **controlada** de pacotes Markdown/YAML (publicação constitutiva não é editável livremente por Administrador/GOI).
- Porta `ImpactEventPort` para informar alterações de regras, normas, estruturas, competências e atos relevantes à reavaliação.
- Porta `TelemetryPort` para LOG, MET e MON.

**Segurança:** principal/autorização são verificados via C103-IEA, e os adaptadores só consultam fontes acessíveis no escopo devido. Mocks/dublês são aceitáveis em testes unitários e de contrato, mas **não** constituem fonte institucional real para homologação de ponta a ponta.

## 8. Arquivos do projeto (organização proposta)

```text
plataforma/
  a107-eob/
    src/
      application/
        verificar-condicoes.ts
        analisar-impactos.ts
        reavaliar-seletivamente.ts
      domain/
        operators/
        compositions/
        evidence/
        rules/
      ports/
        evidence-provider.ts
        rule-package.ts
        verification-repository.ts
        authorization.ts
      adapters/
        postgres/
        markdown-yaml/
        providers/
        telemetry/
      workers/
        reevaluation-worker.ts
    contracts/
      schemas/
    migrations/
    tests/
      unit/
      contract/
      integration/
      acceptance/
    README.md
```

A estrutura acima é um **layout candidato**, não comprovação de diretórios ou arquivos implementados.

## 9. Rotina diária — DEC-A107-006

**Agendamento:** capacidade transversal externa ao motor, com janela de baixa demanda configurável, concorrência limitada e retomada segura. Worker A107 executa:
1. Receber evento ou recuperar alterações desde checkpoint confirmado (com identificador/cursor estável, versão de origem e correlação).
2. Resolver dependências entre alterações, condições e organizações; registrar impacto sem duplicação.
3. Não reavaliar condições sem impacto.
4. Enfileirar reavaliações afetadas, preservando prioridade de operações críticas transacionais.
5. Acionar SRV-A107-003 com tempos/versões fixados e razão `REAVALIACAO_PERIODICA`.
6. Registrar novos resultados históricos, alertas e pendências, **sem revogação automática do Marco A**.
7. Avançar checkpoint somente após trabalho confirmado de modo durável ou formalmente encaminhado para retentativa/dead-letter.

**Atenção:** periodicidade diária não substitui checagem no momento de autorizar operações críticas e não assegura atualização em tempo real de todas as fontes externas.

## 10. Contratos de observabilidade do módulo

| ID candidato | Instrumentação | Critério |
|---|---|---|
| LOG-A107-001 | Pedido, identidade autorizada, resultado e motivo da rejeição | Sem dados sensíveis indevidos |
| LOG-A107-002 | Pacote, consultas, fontes, versões e evidências referenciais | Correlação de ponta a ponta |
| MET-A107-001 | Verificações por âmbito, condição e resultado | Definição de contagem e período |
| MET-A107-002 | Requisitos indeterminados e motivos | Distinguir fonte, evidência e conflito |
| MON-A107-001 | Falhas do motor e persistência | Alertas conforme política aprovada |
| MON-A107-002 | Falha/degradação de adaptadores e fonte | Não misturar degradação com não conformidade |
| MON-A107-003 | Atraso/falha na rotina diária e outbox | Checkpoint e pendências rastreáveis |

Limiares de alerta, SLA, cardinalidade, destino físico e retenção dependem de decisão operacional. A emissão mínima dos três conjuntos (LOG/MET/MON) deve ser testada no incremento.

## 11. Erros

Aplicar catálogo preliminar homologado em SRV-A107-003, respeitando o padrão `A107T9999 - [timestamp]: descrição`. Preservar como erro técnico distinto de estado ontológico de não atendimento. Exemplos de situações previamente definidas:
- `A107E0001`: solicitação inválida.
- `A107E0002`: falta de autorização.
- `A107E0003`: pacote/âmbito inválido.
- `A107E0004`: operador/propriedade desconhecida.
- `A107E0005`: conflito de idempotência.
- `A107E0006`: falha de persistência.
- `A107W0007`: evidência insuficiente.
- `A107W0008`: fonte indisponível.
- `A107W0009`: divergência de evidência/tempo.

Códigos de gravidade não devem ser derivados automaticamente do HTTP ou da camada de transporte.

## 12. Plano de implementação proposto

| Etapa | Entrega verificável | Dependências |
|---|---|---|
| T0 | Projeto compilável, migrations do schema a107, testes e telemetria mínima | Decisões de stack/permissões |
| T1 | Carregamento, hash e validação dos cinco arquivos Markdown/YAML e catálogo de propriedades | DEC-A107-003; ontologia/versionamento |
| T2 | OperatorEngine e CompositionEngine puros, com testes determinísticos dos estados e coleções | DEC-A107-002 |
| T3 | Portas de evidência e adaptadores simulados com testes de contrato, incluindo completude e temporalidade | DEC-A107-004/005 |
| T4 | SRV-A107-003 integrado, idempotência, persistência imutável, auditoria e outbox | T0–T3 |
| T5 | Integração progressiva a fontes reais para CM-01–04, começando A103/A108/C302/C309 | Contratos proprietários implementados |
| T6 | ImpactAnalyzer e rotina seletiva diária, com falha/retomada | DEC-A107-006 |
| T7 | Teste ponta a ponta INC-001 até elegibilidade do Marco A, autorização **separada** pelo A103 | Integrações reais e autorização contextual |

Os testes unitários com dublês não demonstram, isoladamente, prontidão institucional real. Os testes de aceitação do INC-001 exigem fontes e atos verificáveis para o cenário escolhido.

## 13. Testes técnicos necessários antes da aceitação

| Teste | Resultado esperado |
|---|---|
| Carregamento de Markdown/YAML íntegro e versionado | Regras determinísticas; versão fixada |
| YAML adulterado ou operador desconhecido | Rejeição do pacote, sem resultado concluído |
| `todos`/ `algum`/ `nenhum` com estados contraditórios | Composição multivalorada conforme SRV |
| `para_cada` com universo incompleto ou vazio sem justificativa | Não retornar `ATENDIDA` |
| `precede` com vínculo inválido entre atos | Não atestar CM-04 |
| Falha de fonte de evidência | Requisito indeterminado ou falha técnica segundo contrato |
| Datas de validade/conhecimento distintas | Reconstrução coerente ou insuficiência explícita |
| Mesmo pedido/chave idempotente sob concorrência | Uma execução/resultado efetivo |
| Commit de resultado falha | Sem evento de conclusão ou sucesso falso |
| Falha de entrega assíncrona após commit | Outbox pendente e retentativa |
| Alteração de norma impacta apenas CM-03 | Reavaliação seletiva, resultados anteriores preservados |
| Falha da rotina diária em lote | Retomada sem perda/duplicidade indevida |
| Resultado elegível sem autorização do Administrador | Marco A continua não autorizado |
| LOG/MET/MON | Emissão, correlação e proteção dos dados comprovadas |

**Não existem resultados de execução destes testes:** são critérios a implementar.

## 14. Pontos de decisão antes da codificação

| Ponto | Proposta | Estado |
|---|---|---|
| Stack do serviço | Node.js / TypeScript / PostgreSQL | Pendente de homologação |
| Estrutura implantável | Um serviço A107 modular por portas/adaptadores | Pendente de homologação |
| Esquema de dados | PostgreSQL `civitas_plataforma.a107`, tabelas descritas na seção 5 | Pendente de homologação |
| Estratégia temporal | Modelo de DEC-A107-005, versões por fonte e referências de evidências | Princípio homologado; implementação física pendente |
| Operadores e composição | Motor determinístico isolado | Princípio homologado; tipos físicos pendentes |
| Eventos | Persistência local e outbox quando necessário | Padrão proposto; integração física pendente |
| Rotina diária | Worker A107 + orquestração transversal | Princípio homologado; infraestrutura pendente |
| Esquemas e protocolos | Definir depois de aprovar fronteiras e tipos | Pendente |
| Integração com C105 | Reutilizar padrões, **sem compartilhar schema ou operações** | Diretriz proposta |
| Evidências do INC-001 | Testes de contrato com dublês + demonstração com fontes reais | A detalhar e executar |

## 15. Alcance da decisão

A homologação futura desta DEC autorizará o **desenho arquitetural e o modelo lógico de persistência**, **não** significará criação de tabelas, APIs, código, execução de testes nem homologação operacional do INC-001. O próximo passo será o **modelo físico DDL + interfaces TypeScript/JSON Schema + testes de contrato**, respeitando os campos e contratos já homologados.

**Estado:** proposta para revisão do autor; não homologada.
