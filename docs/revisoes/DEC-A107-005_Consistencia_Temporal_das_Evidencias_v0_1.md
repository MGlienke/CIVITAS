# DEC-A107-005 — Consistência Temporal das Evidências

**Versão:** 0.1 — **HOMOLOGADA**  
**Data da homologação:** 26/11/2026  
**Módulo:** A107-EOB — Estrutura Organizacional de Base  
**Serviço:** SRV-A107-003 — Verificar Condições Ontológicas de Realização  
**Incremento:** INC-001 — Marco A  
**Referências:** DEC-A107-001, DEC-A107-002, DEC-A107-003, DEC-A107-004, SRV-A107-003 v0.1 e especificação integrada CM-01 a CM-04 v0.1.

## 1. Decisão homologada

O módulo A107-EOB adotará um modelo de verificação temporal fundamentado na **distinção entre o tempo de validade institucional dos fatos e o tempo de conhecimento ou registro** das respectivas informações na CIVITAS.

Cada execução do SRV-A107-003 deverá identificar a **referência temporal** da realidade institucional examinada e o **limite temporal das informações consideradas** (denominado provisoriamente `conhecimento_ate`), preservando as versões das condições, fontes e evidências utilizadas.

Os módulos proprietários serão responsáveis pela disponibilização de seus registros e estados históricos, com suporte transversal do **E302-HIS**, **sem exigir transações distribuídas entre os módulos**.

A consistência temporal será verificada por identificadores estáveis, referências de versões, proveniência e **relações explícitas de precedência entre acontecimentos** institucionalmente relevantes.

Os atos cuja validade operacional exija efeitos simultâneos, como a **submissão da designação do Mandatário e o bloqueio do GOI**, deverão assegurar **atomicidade no módulo proprietário da operação**.

Quando não houver evidências suficientes para reconstruir um estado temporalmente coerente, o A107-EOB deverá produzir resultado **INDETERMINADA**, sem presumir o atendimento da condição examinada.

## 2. Distinções temporais

| Campo lógico candidato | Semântica |
|---|---|
| `ocorrido_em` | Instante em que o acontecimento ocorreu |
| `vigente_desde` | Início dos efeitos pertinentes à verificação |
| `vigente_ate` | Término dos efeitos pertinentes, quando existente |
| `registrado_em` | Momento de incorporação da informação na CIVITAS |
| `versao` | Identificador da versão do registro |

A distinção entre **tempo de validade** e **tempo de registro/conhecimento** é obrigatória para informações historicamente relevantes; nem todo tipo de registro necessariamente terá todos os campos preenchidos.

Um ato pode ocorrer antes de ser registrado, e seu momento de vigência/efeitos não deve ser inferido unicamente dos timestamps de sistema.

## 3. Duas referências por verificação

- `referencia_temporal`: instante institucional sobre o qual se pergunta se as condições estavam realizadas.
- `conhecimento_ate`: limite temporal do acervo de informação considerado, admitindo avaliação retrospectiva com registros posteriores ao fato.

Exemplo **ilustrativo e não vinculante quanto aos valores**:

```yaml
verificacao:
  organizacao_id: "ORG-EXEMPLO"
  ambito: "MARCO_A"
  referencia_temporal: "2026-11-10T18:00:00-04:00"
  conhecimento_ate: "2026-11-15T18:00:00-04:00"
  pacote_regras: "MARCO_A-v0.1.0"
```

A **versão das regras** deverá ser fixada e registrada em cada execução, com análise de sua aplicabilidade temporal. Não se presume que a versão atualmente publicada seja retroativamente aplicável.

## 4. Responsabilidades

- **A107-EOB**: coordena a consulta e verificação, registra tempos, versões, evidências, operadores e resultados.
- **Módulos proprietários** (como A103-GEP, A108-BDN, C302-EOR e C309-NEC): fornecem fatos/atos e referências históricas sob sua responsabilidade, com versões ou snapshots recuperáveis quando exigidos.
- **E302-HIS**: disponibiliza suporte transversal à historicidade, proveniência, correlação e reconstrução de estados; não substitui o proprietário do dado ou do ato.
- **E301-ASO**: identifica fontes autoritativas quando necessário.
- **D1**: oferece auditoria, rastreabilidade e observabilidade conforme contratos correspondentes.

Não é requisito um **snapshot físico distribuído único**. Cada fonte deve informar seu estado/versão consultado e a adequação às duas referências temporais. Se versões entre fontes forem incompatíveis e afetarem o mérito da verificação sem possibilidade de reconciliação, o resultado será indeterminado.

## 5. CM-04 — sequência e atomicidade

1. Submissão da designação do Mandatário e **bloqueio imediato** do GOI constituem transição institucional consistente que deve ser confirmada de forma atômica no módulo responsável pela operação (proposta de proprietário: A103-GEP, conforme responsabilidades homologadas).
2. O Administrador verifica a investidura e reconhece legitimamente o Mandatário por ato próprio, fundamentado e registrado.
3. **Somente após o reconhecimento válido** do Mandatário pode ocorrer a convalidação ordinária da designação do GOI.
4. O **desbloqueio excepcional** do GOI pelo Administrador permanece via distinta da convalidação, com decisão expressa, motivada e rastreável; não equivale à convalidação nem cria competência jurídica.
5. O operador `precede` deverá examinar **vínculos entre atos, integridade, legitimidade/autoria e ordenação institucional**, e não se basear apenas em comparação ingênua de timestamps.

Um exemplo declarativo de vínculo entre atos, **ilustrativo quanto a nomes/campos**, é:

```yaml
ato:
  id: "CONVALIDACAO-001"
  tipo: "CONVALIDACAO_GOI"
  autor: "IDUP-MANDATARIO"
  ocorrido_em: "2026-11-15T10:00:00-04:00"
  depende_de:
    - "RECONHECIMENTO-MANDATARIO-001"
```

## 6. Persistência e reproduzibilidade

O Registro de Verificação do A107 deve conservar: organização, âmbito, `referencia_temporal`, `conhecimento_ate`, pacote de regras/versão/hash, fontes e suas versões/snapshots, referências de evidências, resultados por requisito/condição e consolidação, justificativas, integridade e auditoria.

O A107 **não duplica indiscriminadamente** documentos e registros proprietários; preserva referências probatórias. **Somente IDs e hashes não garantem reconstrução histórica integral**: as versões das fontes precisam ser efetivamente recuperáveis sob política de retenção e custódia apropriada. Quando não for possível reexecutar uma verificação histórica, preservar sua conclusão original e declarar a limitação de reprocessamento.

## 7. Recorte de implementação INC-001

Homologa-se abordagem **incremental**: implementar inicialmente a historicidade necessária a CM-01 a CM-04, respeitando contratos de E3 e a responsabilidade de cada módulo. **Não** se exigirá, no INC-001, mecanismo universal de reconstrução temporal de toda a Plataforma CIVITAS.

O princípio de historicidade por fonte e o envelope temporal ficam estabilizados para evolução posterior do E302-HIS. Dados e evidências simulados em testes não serão confundidos com evidência institucional real.

## 8. Limites e pendências de detalhamento

Esta homologação aprova **a solução arquitetural e a semântica temporal**. Permanecem pendentes: definições físicas de schemas, formato e obtenção de versões/snapshots por módulo, mecanismo concreto de consistência e atomicidade local, políticas de retenção, reconciliação de conflitos, validação e testes de execução; nenhuma implantação foi declarada.

A aprovação **não altera** competências jurídicas, datas de efeitos dos atos, definições constitutivas da Ontologia ou a separação entre elegibilidade técnica e autorização do Marco A.

## 9. Registro de aprovação

Em 26/11/2026 o autor confirmou expressamente: **“Vamos homologar”**, referente à DEC-A107-005 — Consistência Temporal das Evidências v0.1. A decisão está homologada; os contratos técnicos e a implementação permanecem por especificar.
