# DEC-A107-006 — Gestão de Versões e Reavaliação Periódica das Condições Ontológicas

**Estado:** HOMOLOGADA pelo autor  
**Data:** 26/11/2026  
**Módulo verificador:** A107-EOB  
**Serviço de avaliação:** SRV-A107-003  
**Incremento:** INC-001  
**Referências:** DEC-A107-001 a DEC-A107-005, especificação integrada CM-01 a CM-04, contrato SRV-A107-003 v0.1.

## 1. Decisão homologada

A Plataforma CIVITAS adotará mecanismo de **verificação periódica** das Condições Ontológicas de Realização, executado **diariamente**, preferencialmente em janela configurável de **baixa demanda de processamento**.

A rotina deverá:
1. Identificar alterações ocorridas desde sua última execução concluída em fontes ontológicas, tipológicas, normativas e institucionais (incluindo Ontologia, EOT/ENT, normas, estruturas, competências e atos).
2. Determinar quais condições, organizações e âmbitos operacionais podem ter sido afetados.
3. **Reavaliar seletivamente** os elementos efetivamente impactados por meio do `SRV-A107-003`, sem reexecutar indiscriminadamente todas as verificações.
4. Preservar resultados e respectivas referências anteriores de forma histórica e imutável.
5. Registrar divergências, insuficiência de evidências, alertas, pendências e recomendações para agentes responsáveis.
6. Não revogar automaticamente autorizações ou produzir outros efeitos jurídicos por força de uma reavaliação técnica.

A verificação periódica **complementa, mas não substitui**, verificações exigíveis **no momento de operações institucionais críticas**, como o bloqueio imediato do GOI, reconhecimento do Mandatário e concessão inicial do Marco A.

## 2. Arquitetura operacional

A **orquestração do agendamento** deverá ser concebida como **capacidade transversal de infraestrutura**, desacoplada do motor semântico A107-EOB, permitindo uso futuro por outros módulos sem duplicação. A107 determina impactos e executa as verificações ontológicas; o agendador programa e acompanha a execução.

O agendador deverá contemplar: janela configurável, limite de concorrência/carga, tratamento de falhas, retentativa segura, retomada a partir de checkpoint e referência da última execução **concluída com sucesso**. O mecanismo de captura de alterações não poderá avançar irreversivelmente o cursor de processamento antes de registrar resultados e falhas de forma durável.

A janela diária não é garantia de instantaneidade. Novas informações de fontes externas podem chegar com atraso; a rotina deve registrar indisponibilidade e retomá-la na execução subsequente ou em retentativa.

## 3. Tratamento de mudanças

| Situação | Tratamento |
|---|---|
| Ausência de alteração relevante | Registrar execução da rotina; manter verificação existente |
| Alteração sem impacto no âmbito | Registrar análise de impacto; não reavaliar |
| Alteração com impacto verificável | Produzir nova execução `SRV-A107-003`, mantendo a anterior |
| Alteração que requer interpretação ou nova determinação institucional | Registrar pendência e encaminhar ao responsável legitimado, sem presumir nova interpretação |

**Rastreabilidade:** toda análise de impacto deve indicar fonte, evento/versão, instante, organização, âmbito, condições e justificativa. A reavaliação segue DEC-A107-005, distinguindo referência temporal da realidade, tempo de conhecimento e versões aplicáveis.

## 4. Resultados históricos e efeitos institucionais

Uma nova verificação não substitui, apaga nem altera o resultado de verificação anterior. A divergência entre resultados históricos pode refletir mudança de fatos, de regras, de fontes ou de conhecimento posterior, e deve ser explicitada.

O resultado técnico de uma reavaliação não cancela automaticamente o Marco A. Revisão, suspensão ou revogação da autorização exigirá decisão competente e fundamento próprio.

## 5. Escopo inicial e limites

**No INC-001:** suportar detecção de alterações necessárias a CM-01 a CM-04, correlação de impactos, reexecução seletiva, log, métricas, monitoring, controles de carga e auditabilidade.

**Não pressupõe homologação:** horário exato, fornecedor de agendamento, contratos físicos, mecanismo de captura de mudanças (eventos, versionamento, consulta incremental etc.), métricas numéricas, política de retenção, procedimentos de efeitos jurídicos ou código de produção. Esses temas serão especificados tecnicamente.

## 6. Critérios de teste candidatos

| Cenário | Resultado esperado |
|---|---|
| Nenhuma alteração relevante | Nenhuma reavaliação redundante |
| Mudança irrelevante à organização/âmbito | Análise de impacto registrada; sem reprocessamento |
| Mudança normativa que afeta CM-03 | Nova verificação seletiva com novas versões/evidências |
| Falha parcial durante lote | Checkpoint permite retomada sem omissão/duplicação indevida |
| Nova verificação diferente da anterior | Dois resultados imutáveis; divergência rastreável |
| Verificação técnica desfavorável após Marco A autorizado | Alerta/pendência, nunca revogação automática |
| Operação crítica antes da próxima janela diária | Verificação transacional imediata, independente da rotina |
| Fonte com evento tardio | Reprocessamento identificável sem perda silenciosa |

**Estado:** cenários previstos, ainda não executados.

## 7. Registro

A DEC-A107-006 foi expressamente **homologada** pelo autor em 26/11/2026. Constitui baseline funcional do agendamento diário e da reavaliação seletiva. Persistência física, integração com fontes e orquestração permanecem para especificação técnica.
