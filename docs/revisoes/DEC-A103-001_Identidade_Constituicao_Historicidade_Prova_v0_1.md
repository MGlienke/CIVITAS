# DEC-A103-001 — Identidade, Constituição, Historicidade e Agregação Probatória

**Versão:** 0.1 — **PROPOSTA, NÃO HOMOLOGADA**  
**Data:** 27/11/2026  
**Módulo:** A103-GEP  
**Escopo:** CE-01 / CM01-R01 / INC-001 — Marco A  
**Natureza:** decisões de arquitetura do domínio para preparar especificações operacionais e físicas, **sem codificação**.  
**Baselines homologados:** ESP-A103-CE01-001 v0.1; ESP-A103-DAT-001 v0.1; DEC-A107-004 v0.1; DEC-A107-005 v0.1; ESP-A107-CE01-001 v0.1; A107-EOB v0.3.0.  
**Referências de responsabilidade:** Matriz de Componentes e Contratos de Serviços v0.1, CS-04 e CS-05, Mapa de Domínios e Módulos v0.5.

## 1. Objeto e alcance da decisão

A ESP-A103-DAT-001 homologou cinco artefatos lógicos: identidade institucional, versão do registro, referência probatória, snapshot e proveniência da consulta. É necessário definir as regras que permitirão alimentar e reconstruir esses artefatos legitimamente antes de transformá-los em tabelas.

Esta DEC propõe decisões em quatro grupos: (D1) identidade/unicidade, (D2) constituição e origem legítima, (D3) seleção histórica e (D4) agregação probatória.

**Limites:** não regular CS-04 em sua integralidade, não realizar incorporação institucional, não especificar o procedimento de autorização do Marco A, não alterar contratos/implementações da versão A107 v0.3.0, não atribuir IDs definitivos de serviço e não criar persistência física.

## 2. D1 — Identidade institucional e unicidade

**Proposta D1.1 — Identidade estável:** `organizacao_id` identifica univocamente uma **instância de Organização Institucional** registrada no A103. É atribuído exclusivamente por procedimento proprietário A103. Não deriva automaticamente de CNPJ, nome, sigla, código de ente, dispositivo normativo, IDUP ou identificador de órgão/unidade.

**Proposta D1.2 — Chave de fonte e versões:** `organizacao_id` identifica a instância; `registro_id` identifica um registro ou cadeia de registros de identidade vinculada à instância, conforme semântica a fixar em CS-04; `versao_registro` identifica um estado publicado desse registro. Nenhuma dessas chaves se confunde com `evidencia_id` ou `snapshot_fonte`.

**Proposta D1.3 — Não duplicação:** diante de pedido de constituição com potenciais coincidências, o A103 fará a resolução de identidade **antes** de atribuir novo `organizacao_id`, a partir de referências institucionais/fundamentos e do contexto do procedimento, nunca só por homonímia ou correspondência numérica. Não haverá deduplicação destrutiva automática de organizações já constituídas; suspeitas de duplicidade serão tratadas por procedimento competente, com histórico e referências.

**Proposta D1.4 — Imutabilidade referencial:** alterações de denominação, situação informacional ou retificações de atributos não geram, isoladamente, novo `organizacao_id`. Extinção, substituição, sucessão e transformação institucional demandam decisão específica fundada nos atos pertinentes: **não pressupor** que se trate da mesma instância ou de instância nova.

**Proposta D1.5 — Resolução explícita:** quando houver incerteza sobre se dois registros representam a mesma instância, o A103 registrará a divergência e não fornecerá ao CE-01 um fato conclusivo de identidade por mera escolha técnica de um candidato.

### Pergunta de aprovação D1

Aprovar `organizacao_id` como identidade opaca, estável e exclusivamente atribuída pelo A103, com resolução contextual de duplicidades e sem equivalência automática com identificadores cadastrais?

## 3. D2 — Constituição e origem legítima dos registros

**Proposta D2.1 — Separação de operações:** CS-04 — *Constituir Organização Institucional* é a responsabilidade de **escrita constitutiva** do A103. CE-01 — *Consultar Evidências de Identidade Institucional* é uma **leitura probatória**. CE-01 não cria registros, repara vínculos, homologa constituição ou substitui o ato que fundamentou a organização.

**Proposta D2.2 — Origem rastreável:** uma versão de identidade elegível como evidência real deve referenciar a operação/ato/registro que a originou, o seu procedimento ou contexto autorizado, a versão e, quando aplicável, a cadeia de fundamento e custódia. `referencia_constituicao` não é um texto livre autossuficiente: precisa ser resolúvel segundo contrato proprietário/custodiante competente.

**Proposta D2.3 — Constituição técnica não é validade jurídica:** uma transação de escrita aprovada tecnicamente constitui um **registro no A103**, não prova isoladamente que a organização foi juridicamente constituída, que todas as condições CM-01 a CM-04 foram atendidas ou que o Marco A foi autorizado. Essas avaliações continuam em suas respectivas competências.

**Proposta D2.4 — Estados e publicação:** separar, no futuro fluxo de CS-04, estados de elaboração/proposta, validação de integridade/proveniência e publicação de versão consultável. Apenas **versões publicadas por procedimento autorizado, com origem rastreável** poderão ser disponibilizadas por CE-01 como evidência institucional real; dados de simulação e versões de rascunho ficam segregados.

**Proposta D2.5 — Correção sem reescrita:** erro material ou revisão de registro publicado produz nova versão com vínculo e justificativa; não altera retroativamente `registrado_em` nem elimina a versão anterior, ressalvadas políticas legais de restrição de acesso/conservação, a serem especificadas sem apagar a trilha probatória.

**Proposta D2.6 — Segurança transacional:** a futura implementação de constituição deverá garantir, na responsabilidade transacional do A103, a consistência entre identidade, versão publicada, referências probatórias exigidas e evento de registro; se qualquer pré-condição essencial falhar, não publicar uma versão consultável. Mecanismo físico e atomicidade serão definidos em especificação própria.

### Pergunta de aprovação D2

Aprovar a exigência de origem institucional e publicação controlada para uma versão servir como evidência **real** em CE-01, deixando a operação concreta CS-04 e suas autorizações para artefato subsequente?

## 4. D3 — Reconstrução histórica e semântica temporal

A DEC-A107-005 homologou a distinção entre tempo de validade institucional e tempo de conhecimento. Esta proposta especifica como **A103** deverá utilizá-la, sem invadir o julgamento jurídico do A107 ou de outras fontes.

**Proposta D3.1 — Duas coordenadas:** o A103 recebe `referencia_temporal` (realidade examinada) e `conhecimento_ate` (limite do acervo disponível). Seleciona informações conhecidas no segundo instante para informar o que pode ser afirmado sobre o primeiro. Um ato com efeitos pretéritos conhecido depois não pode alterar uma resposta “conhecida até” data anterior.

**Proposta D3.2 — Campos distintos:** manter `ocorrido_em`, `registrado_em`, `vigente_desde` e `vigente_ate` quando pertinentes e comprovados. Não derivar vigência ou efeitos exclusivamente de `registrado_em`. A data de consulta (`consultado_em`) não altera nenhum desses instantes.

**Proposta D3.3 — Publicação e disponibilidade histórica:** a escolha da versão deve considerar o histórico das alterações, versões publicadas e correções **conhecidas até** o limite solicitado. O snapshot da fonte deve ser estável, recuperável e referenciar a regra de seleção; não se presume snapshot global distribuído.

**Proposta D3.4 — Reconstituição sem certeza artificial:** se faltam intervalos de eficácia, prova de continuidade, reconciliação de correções ou identificação unívoca da versão aplicável, não transformar o registro atual em um fato histórico conclusivo. Devolver resultado sem fato utilizável, com classificação técnica conservadora compatível com os estados já suportados por `ResultadoConsultaA103`.

**Proposta D3.5 — Correções posteriores:** retificação registrada em T2 pode alterar o conhecimento de um fato ocorrido em T1 para consultas cujo `conhecimento_ate >= T2`, mas **não pode modificar a reconstrução de consulta com limite de conhecimento anterior a T2**. Preservar associação explícita à evidência e ao ato retificador.

**Proposta D3.6 — Reprodutibilidade e divergências:** consultas repetidas com as mesmas coordenadas, estado da fonte e permissão equivalente devem reproduzir a mesma seleção ou declarar uma limitação verificável de retenção. Se duas versões são conflitantes sem conciliação auditável, não escolher a “mais recente” por conveniência.

**Exemplo ilustrativo (não prova validade jurídica):**

| Registro | Efeitos informados | Registrado em | Consulta: realidade 10/11, conhecido até 12/11 | Consulta: realidade 10/11, conhecido até 20/11 |
|---|---|---|---|---|
| Versão 1 | Desde 01/11 | 05/11 | Pode integrar a reconstrução | Pode integrar a reconstrução, sujeita às correções conhecidas |
| Retificação da versão 1 | Altera informação de 01/11 | 15/11 | **Não** pode ser considerada | Pode integrar reconstrução com sua fundamentação e efeitos |

**Observação importante:** “pode integrar” não significa que o registro sozinho demonstre a situação institucional em toda data ou a validade jurídica do ato.

### Pergunta de aprovação D3

Aprovar reconstrução pelas duas coordenadas, snapshots por fonte reprodutíveis, preservação de correções e tratamento conservador de conflitos, sem snapshot distribuído único?

## 5. D4 — Agregação probatória e custódia

O `RegistroIdentidadeA103` do A107 v0.3.0 possui apenas um `evidencia_id` e uma `referencia_evidencia` por resposta `ENCONTRADO`. O modelo lógico do A103 admite múltiplas referências por versão.

**Proposta D4.1 — Unidade probatória:** separar **fato institucional afirmado**, **conjunto de evidências que o sustentam**, **referências aos originais custodianos** e **versão do registro A103**. Nenhuma referência isolada será apresentada como suficiente quando a afirmação depende necessariamente de várias provas.

**Proposta D4.2 — Agregado referencial:** para preservar a compatibilidade com a porta CE-01 v0.3.0, o A103 poderá expor um **identificador estável de agregado probatório** como `evidencia_id` e uma **referência resolúvel ao manifesto desse agregado** como `referencia_evidencia`. O manifesto deve registrar: identificação do fato e versão, conjunto imutável/versão dos itens, custodiante e referência de cada item, escopo da afirmação, proveniência, e integridade quando implementada. Esse agregado não substitui os documentos originais.

**Proposta D4.3 — Não mascarar insuficiência:** a existência de manifesto, hash ou ID agregado **não comprova suficiência jurídica ou legitimidade**. Se uma peça essencial não for recuperável, estiver contraditória ou não apresentar procedência verificável, não devolver resposta `ENCONTRADO` conclusiva no recorte dependente dessa peça.

**Proposta D4.4 — Custódia:** o A103 pode manter referências aos documentos custodiados por C301-RDI ou outros proprietários; nunca reassumir a cadeia de custódia externa por armazenar metadados ou cópias técnicas. Se a própria prova for registro interno A103, o A103 é responsável por seu histórico, integridade e política de acesso.

**Proposta D4.5 — Compatibilidade contratual:** o manifesto resolúvel é mecanismo **candidato**, não implementação existente. A estrutura atual do adaptador A107 atribui `custodiante_modulo: 'A103-GEP'` ao item agregado. Isso só é semanticamente correto se a referência transportada for **o manifesto agregado custodiado pelo A103**, não uma referência documental externa apresentada como se fosse sua. Para transmitir custódia detalhada de cada documento no envelope do A107 será necessária evolução contratual versionada. Não alterar a versão A107 v0.3.0 silenciosamente.

**Proposta D4.6 — Política de identidade probatória:** criar nova versão de agregado quando suas referências/escopo mudarem, mantendo a versão anterior consultável para reconstituição histórica. A recomposição não substitui retroativamente provas utilizadas em verificações já realizadas.

### Pergunta de aprovação D4

Aprovar o **agregado referencial versionado sob custódia do A103** como solução inicial de compatibilidade com a evidência singular do CE-01, com proveniência dos originais preservada e sem considerar o agregado prova jurídica autossuficiente?

## 6. Matriz de impactos dos quatro grupos

| Decisão | Artefatos lógicos impactados | Requisito do CE-01 impactado |
|---|---|---|
| D1 | DAT-A103-001, 002 e 005 | Identidade coerente de `organizacao_id` e `registro_id` |
| D2 | DAT-A103-002, 003 e 005 | Registro real originado de fonte/procedimento legítimo |
| D3 | DAT-A103-002, 004 e 005 | `referencia_temporal`, `conhecimento_ate`, `snapshot_fonte` |
| D4 | DAT-A103-003, 004 e 005 | `evidencia_id`, `referencia_evidencia`, `versao_registro` |

## 7. Invariantes e testes de decisão propostos

| Teste candidato | Situação | Aceite |
|---|---|---|
| TST-A103-DEC-001 | Duas denominações para mesma instância | Identidade estável com versões apropriadas; não criar organização por renomeação |
| TST-A103-DEC-002 | Colisão de dados cadastrais | Exigir resolução institucional, sem fusão destrutiva |
| TST-A103-DEC-003 | Registro sem origem/publicação controlada | Não fornecer evidência institucional real em CE-01 |
| TST-A103-DEC-004 | Retificação posterior ao limite de conhecimento | Excluir retificação da resposta retrospectiva anterior |
| TST-A103-DEC-005 | Correção retroativa autorizada conhecida posteriormente | Conservar versões, fundamento e coordenação das datas |
| TST-A103-DEC-006 | Divergência de versões | Resposta não conclusiva; diagnóstico técnico auditável |
| TST-A103-DEC-007 | Conjunto documental com múltiplas peças essenciais | Agregado versionado preserva todas as referências requeridas |
| TST-A103-DEC-008 | Agregado com referência essencial indisponível | Não produzir fato conclusivo |
| TST-A103-DEC-009 | Documento custodiado externamente | Manifesto A103 aponta custodiante original; não o substitui |
| TST-A103-DEC-010 | Alteração de agregado após verificação | Agregado anterior recuperável; verificação histórica não se reescreve |
| TST-A103-DEC-011 | Fonte mock e fonte institucional | Dados simulados segregados e sem efeito probatório real |
| TST-A103-DEC-012 | Verificação `CM01-R01` retorna `ATENDIDA` | Não autoriza Marco A ou constitui nova organização |

São **critérios de teste futuros**; não há implementação nova.

## 8. Questões pendentes e sequência sugerida

1. **Verificar catálogos e colisões:** identificadores DAT/DEC/INV/TST/SRV do A103 (ainda não homologados globalmente).
2. **Detalhar CS-04:** operação de constituição/registro, competências e autorizações para publicação de versões reais; não confundir transação com validade jurídica.
3. **Formalizar esquema do manifesto probatório:** campos, modo de resolução e política de custódia/integração com C301-RDI.
4. **Precisar a temporalidade física:** política de seleção histórica, snapshot reproduzível e tratamento de divergências, com critérios de retenção.
5. **Especificar o controle de acesso efetivo:** integração institucional e validação do contexto C103-IEA, quando existente.
6. **Definir DDL isolado e contratos de serviços:** somente após homologar as decisões de identidade, origem, tempo e prova; realizar testes com dados de prova segregados e não atribuir a eles natureza de evidência real.
7. **Planejar evolução contratual CE-01:** eventual ampliação de proveniência e múltiplas provas deve ser versionada e testada com A107 sem modificar a tag v0.3.0.

## 9. Deliberação solicitada

Solicita-se avaliação das quatro decisões **D1–D4**, especialmente do agregado probatório versionado de D4. O documento é uma **proposta arquitetural**, não altera as especificações homologadas nem implementa qualquer código, banco, endpoint ou autorização.

**Estado:** rascunho para revisão; homologação documental e eventual merge dependerão de aprovação explícita do autor.
