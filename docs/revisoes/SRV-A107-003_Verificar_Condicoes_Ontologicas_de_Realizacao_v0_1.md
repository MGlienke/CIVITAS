# CIVITAS — SRV-A107-003 — Verificar Condições Ontológicas de Realização

**Módulo:** A107-EOB — Estrutura Organizacional de Base  
**Versão:** 0.1 — **MINUTA PARA REVISÃO; NÃO HOMOLOGADA**  
**Data:** 26/11/2026  
**Incremento:** INC-001, homologado  
**Decisões homologadas:** DEC-A107-001 (Markdown/YAML), DEC-A107-002 (vocabulário controlado, inclusive \`precede\` e \`para_cada\`), especificação integrada CM-01 a CM-04 v0.1, Mapa de Domínios e Módulos v0.5, Matriz de Componentes e Serviços v0.1.  
**Padrão:** CIV-ESP-TPL v0.4.  
**Rastreabilidade:** UC-CIV-001, UC-CIV-003, UC-CIV-004, UC-CIV-005, UC-CIV-006 e testes do INC-001.  
**Nota:** identificadores de objetos, dados, regras e testes são **candidatos nesta minuta**; não indicam homologação individual. Não existe implementação ou teste executado deste serviço.

## 1. Objetivo, natureza e fronteira

O A107-EOB deverá oferecer operação que verifica, para uma Organização Institucional e um âmbito de operação explicitamente identificado, as condições ontológicas exigíveis conforme modelos e regras versionados. A verificação deverá consultar fontes institucionais proprietárias, avaliar a suficiência e integridade das evidências, produzir estados fundamentados e preservar resultado auditável e reproduzível.

**Natureza:** comando de verificação, pois produz e persiste um novo resultado, mesmo quando os fatos consultados não se alteram. A consulta a verificação passada pertence ao SRV-A107-004 (em detalhamento futuro).

**Fora do limite:** o serviço não constitui organizações, órgãos, competências ou mandatos; não altera dados proprietários de A103, A108, C302, C309, C101 ou C103; não convalida GOI; não emite credenciais; não autoriza Marco A nem presume recebimento contratual/faturamento; não habilita capacidades posteriores.

## 2. Capacidades e rastreabilidade

| ID candidato | Descrição | Rastreabilidade |
|---|---|---|
| CAP-A107-004 | Verificar condições ontológicas por âmbito | UC-003; INC-001 |
| CAP-A107-005 | Produzir resultado fundamentado e reproduzível | UC-003; INC-001 |
| CAS-A107-003 | Avaliar CM-01–CM-04 para uma organização cliente | UC-004–006 |
| RFU-A107-001 | Resolver versão íntegra de definições do âmbito | DEC-A107-001 |
| RFU-A107-002 | Validar estrutura declarativa YAML contra vocabulário controlado | DEC-A107-002 |
| RFU-A107-003 | Consultar fontes proprietárias com proveniência e temporalidade | CM-01–04 |
| RFU-A107-004 | Executar operadores sem interpretação livre por IA | DEC-A107-002 |
| RFU-A107-005 | Registrar avaliação e resultado imutável | UC-003 |
| RFU-A107-006 | Impedir habilitação/autorização automática | UC-005–006 |

## 3. Entradas lógicas do contrato

A forma de transporte (HTTP, mensageria, função interna) permanece pendente; o contrato lógico abaixo não cria endpoint fictício.

| Campo lógico | Tipo preliminar | Obrigatório | Regra |
|---|---|---|---|
| \`solicitacao_id\` | identificador | Sim | Chave de deduplicação da intenção de verificar; único no contexto do solicitante/organização |
| \`correlation_id\` | identificador | Sim | Correlaciona auditoria e chamadas aos módulos |
| \`organizacao_id\` | referência institucional | Sim | Deve existir no módulo proprietário A103-GEP |
| \`ambito_id\` | identificador de âmbito | Sim | INC-001: \`MARCO_A\`; deve existir definição publicada e íntegra |
| \`referencia_temporal\` | instante ISO 8601 com fuso | Sim | Define momento a respeito do qual fatos/normas serão verificados; não é o momento de execução |
| \`solicitante\` | principal autenticado e contexto | Sim | Identidade/autorização contextual validada por C103-IEA |
| \`versao_regras\` | referência a pacote versionado | Opcional | Ausente: resolver versão publicada aplicável ao contexto, registrar seleção; nunca usar versão implícita depois de iniciar a execução |
| \`motivo\` | referência ao objetivo/processo | Sim | Justificativa/caso de uso para registro e controle de acesso |

O contexto técnico autenticado é fornecido pela infraestrutura e não deve ser aceito por simples alegação de identidade no payload. \`solicitacao_id\` não deve permitir que cliente modifique resultado ou substitua evidências.

**Corte temporal:** a data de consulta de um fato e sua vigência no mundo institucional não se confundem. Fontes devem informar (quando disponíveis) \`vigente_em\`, \`registrado_em\` e a versão/snapshot consultada.

## 4. Saídas lógicas

| Campo lógico | Significado |
|---|---|
| \`verificacao_id\` | Identificador imutável da execução persistida |
| \`solicitacao_id\` | Referência à solicitação/deduplicação |
| \`organizacao_id\`, \`ambito_id\` | Objeto e escopo efetivo |
| \`referencia_temporal\`, \`executado_em\` | Tempo de validade examinado e tempo de execução |
| \`pacote_regras\` | Versão, identificadores dos 5 arquivos, hashes e esquema de interpretação |
| \`estado\` | \`ATENDIDA\`, \`NAO_ATENDIDA\` ou \`INDETERMINADA\` para Marco A |
| \`elegibilidade\` | \`ELEGIVEL_PARA_AUTORIZACAO\`, \`NAO_ELEGIVEL\` ou \`VERIFICACAO_PENDENTE\` |
| \`condicoes\` | CM-01–04: estado, requisitos, fontes, evidências, justificativas e eventuais impedimentos |
| \`qualidade_evidencias\` | Incompletudes, conflitos, indisponibilidades e abrangência comprovada do universo esperado |
| \`referencias_historicas\` | Identificadores/correlação de persistência e auditoria |
| \`avisos\` | Alertas não bloqueantes e necessidades de reavaliação |

Cada requisito deverá informar **operador**, **sujeito**, **propriedade/relação ontológica**, **parâmetros**, **resultado**, **justificativa**, **fonte** e **evidências**. Não devolver documentos completos ou dados pessoais desnecessários.

**Invariante de autorização:** \`ELEGIVEL_PARA_AUTORIZACAO\` é constatação técnica; **nunca** \`MARCO_A_AUTORIZADO\`. A decisão cabe ao Administrador da Plataforma em operação separada de A103-GEP.

## 5. Representação e carregamento de regras

O A107 deverá carregar os cinco arquivos Markdown/YAML previstos no INC-001: \`CM-01.md\`, \`CM-02.md\`, \`CM-03.md\`, \`CM-04.md\` e \`MARCO_A.md\`, de pacote publicado sob controle de versão.

### 5.1 Validação prévia

- Validar sintaxe YAML e schema compatível com versão do interpretador, IDs únicos, referências existentes, grafo de dependências sem ciclos proibidos, operadores autorizados e tipos de parâmetros.
- Garantir que cada propriedade remeta a conceito/relação identificável da rede ontológica vigente para o pacote.
- Validar escopo institucional e âmbito de operação, completude da lista de condições e impossibilidade de \`NAO_APLICAVEL\` em CM-01–04.
- Confirmar integridade do arquivo e pacote (hash criptográfico) e rastrear revisão publicada; não executar arquivos em revisão.
- Rejeitar expressões arbitrárias, código executável e operadores desconhecidos. O texto natural do Markdown é documentação, não código de avaliação.
- Capturar versão do pacote antes de consultar evidências. **Nunca** trocar de versão no meio da execução.

**Pendência:** schema YAML físico, formato do manifesto do pacote e procedimento de publicação/assinatura de regras serão propostos e homologados em documento próprio.

## 6. Contratos de consulta aos módulos proprietários

| Módulo | Informações/evidências fornecidas | Consumo em CM |
|---|---|---|
| **A103-GEP** | Organização, identidade, posição na estrutura estatal, cliente, GOI/Mandatário, decisões e histórico de reconhecimento/convalidação/bloqueio | CM-01, CM-04 |
| **A107-EOB** | EOT, Ontologia, versões e correspondência tipológica/relacional | CM-01–04 |
| **A108-BDN** | Normas, dispositivos, ENT/ENI, fundamentos, vigência e pertinência conforme contratos | CM-01–04 |
| **C302-EOR** | Órgãos/unidades de primeiro nível, vínculos, revisões e versão da estrutura | CM-02 |
| **C309-NEC** | Competências e seus titulares, atribuições, limites, determinações e fundamentos | CM-02–04 |
| **C101-PES** | Identidade IDUP da Pessoa ocupante da posição, somente atributos necessários | CM-04 |
| **C103-IEA** | Autenticação e autorização contextual; legitimidade de quem praticou atos | CM-02, CM-04 |
| **E301-ASO** | Resolução/indicação de fonte autoritativa conforme contexto | Transversal |
| **E302-HIS** | Evidências de evolução, precedência e referência a estados históricos | CM-02, CM-04 |
| **D101-RAS** | Auditoria das verificações e dos atos pertinentes | Transversal |

**Política de fontes proposta:** contratos de consulta devem fornecer referências de evidência e procedência, não simples booleanos desvinculados de fatos. Cada módulo mantém propriedade do seu dado. Fonte inacessível ou sem critério comprovado de completude implica resultado **indeterminado**, e não negativo por padrão. ASoT não deve ser implementada como cópia central dos bancos de origem.

## 7. Semântica de avaliação

### 7.1 Estados

- \`ATENDIDA\`: requisito demonstrado com evidência suficiente e válida ao contexto.
- \`NAO_ATENDIDA\`: descumprimento objetivamente demonstrado, inclusive omissão confirmada em universo exigível comprovadamente completo.
- \`INDETERMINADA\`: informação ausente, fonte indisponível, contradição não resolvida, incompletude ou impossibilidade de verificar integridade/temporalidade.
- \`NAO_APLICAVEL\`: admissível somente em requisitos que o âmbito e a regra autorizem a dispensar, mediante justificativa. **CM-01–04 nunca são não aplicáveis**.

**Regra crítica:** nenhuma falha de comunicação ou consulta vazia é prova automática de ausência. A prova negativa precisa de uma fonte de cobertura completa e suficiente.

### 7.2 Composição \`todos\`

1. Se um requisito obrigatório é comprovadamente \`NAO_ATENDIDA\`, composição \`NAO_ATENDIDA\`.
2. Caso contrário, se qualquer requisito obrigatório é \`INDETERMINADA\`, composição \`INDETERMINADA\`.
3. Caso contrário, todos obrigatórios \`ATENDIDA\` → composição \`ATENDIDA\`.
4. \`NAO_APLICAVEL\` exige fundamentação, exclusão expressamente permitida e registro; não permitido para CM-01–04.
5. **Continuar coletando resultados quando seguro e viável**, mesmo após impedimento conhecido, para fornecer diagnóstico integral. O resultado não é autorização.

### 7.3 Composição \`algum\` (alternativas admissíveis)

- Uma alternativa \`ATENDIDA\` → \`ATENDIDA\`, desde que o conjunto de alternativas seja autorizado pela regra.
- Todas comprovadamente \`NAO_ATENDIDA\` e universo completo → \`NAO_ATENDIDA\`.
- Nenhuma atendida e alguma \`INDETERMINADA\` → \`INDETERMINADA\`.
- Não aplicabilidade é avaliada segundo exclusão explícita, e não equivale a negativa.

Aplicação CM-04: \`algum\` entre **convalidação ordinária pelo Mandatário reconhecido** e **desbloqueio excepcional expresso, fundamentado e rastreável pelo Administrador**; o desbloqueio não se torna convalidação. Além disso, os requisitos independentes de identificação e reconhecimento do Mandatário continuam obrigatórios.

### 7.4 Composição \`nenhum\`

- Uma ocorrência vedada comprovadamente presente → \`NAO_ATENDIDA\`.
- Ausência de ocorrências comprovada em universo completo → \`ATENDIDA\`.
- Fonte parcial ou indisponível, sem ocorrência vedada demonstrada → \`INDETERMINADA\`.

### 7.5 Composição \`para_cada\`

- O conjunto **esperado** deve ser determinado por referências normativas/ontológicas aplicáveis e acompanhado de prova de cobertura/completude.
- Avaliar os requisitos para todos os elementos desse conjunto, identificados de forma estável.
- Se qualquer elemento obrigatório comprovadamente falha → \`NAO_ATENDIDA\`.
- Se nenhuma falha comprovada, mas existe elemento indeterminado ou cobertura não comprovada → \`INDETERMINADA\`.
- Todos os elementos exigíveis comprovadamente avaliados e atendidos, com cobertura demonstrada → \`ATENDIDA\`.
- Coleção vazia **não** significa atendimento automático; requer regra expressa que a admita e prova de que não existem itens obrigatórios.

**CM-02:** universo de órgãos/unidades de primeiro nível exigido pela norma aplicável.  
**CM-03:** universo de competências exigíveis desde Estado até organização, com titulares e determinações.

### 7.6 Operadores elementares — contrato semântico mínimo

| Operador | Afirmativa verificável | Caso indeterminado típico |
|---|---|---|
| \`existe\` | Elemento existe em fonte pertinente sob identidade estável | Busca incompleta ou fonte inacessível |
| \`corresponde\` | Tipagem/relação coincide com modelo publicado e parâmetros | Modelo incompatível ou sem versão |
| \`relacionado_a\` | Relação definida ontologicamente liga sujeitos referenciados | Ausência de cobertura de relações |
| \`fundamentado_em\` | Referência normativa pertinente, identificada e sustentando a proposição | Pertinência/alcance jurídico inconclusivos |
| \`vigente_em\` | Validade/vigência ao instante pertinente, com regras temporais aplicáveis | Informação temporal insuficiente |
| \`reconhecido_por\` | Ato de reconhecimento com autor legitimado e referência da decisão | Competência/autoria não verificável |
| \`satisfaz\` | Condição anteriormente avaliada, coerente em objeto/âmbito/versão/tempo | Resultado antigo incompatível ou sem evidências |
| \`precede\` | Ordem de atos válida, com referência temporal, autoria e cadeia histórica | Datas insuficientes ou contraditórias |

Verificação de mérito normativo ou legitimidade não deve ser reduzida a booleano não fundamentado nem a geração de texto por IA.

## 8. Condições integradas CM-01 a CM-04

| Condição | Requisitos homologados no conjunto | Dependência essencial |
|---|---|---|
| CM-01 | CM01-R01–R05 | Identidade e fundamentação da organização incorporada |
| CM-02 | CM02-R01–R06 | Primeira estrutura conforme norma e homologação do GOI |
| CM-03 | CM03-R01–R06 | Competências e cadeia de determinação, universo completo |
| CM-04 | CM04-R01–R06 | Mandatário legitimado e reconhecido; GOI regularizado e sequência válida |

**Total:** 23 requisitos (5+6+6+6). A verificação integrada exige todas as condições; não aplicabilidade das quatro condições é proibida. Os resultados devem se referir à mesma organização, ao mesmo âmbito e a um contexto temporal coerente.

**CM-04 — exigência especial:** submissão do Mandatário bloqueia GOI imediatamente; convalidação ordinária só após reconhecimento pelo Administrador; excepcional desbloqueio do GOI não equivale a convalidação e não presume reconhecimento do Mandatário nem gera competência jurídica; GOI não altera unilateralmente Mandatário reconhecido. Regras de atos continuam sob responsabilidade dos módulos respectivos.

## 9. Persistência e historicidade

| ID candidato | Agregado/registro | Conteúdo mínimo | Proprietário |
|---|---|---|---|
| DAT-A107-001 | Verificação | identificador, solicitação, organização, âmbito, tempos, pacote/hash, estado/elegibilidade, autor | A107 |
| DAT-A107-002 | Resultado de condição | verificação, condição, estado, justificativa e impedimentos | A107 |
| DAT-A107-003 | Resultado de requisito | condição, operador, propriedade, parâmetros, estado, fundamento e diagnóstico | A107 |
| DAT-A107-004 | Referência de evidência | fonte, ID imutável ou versão/snapshot, tempo, hash quando possível, cobertura e integridade | A107 (referências; não documentos originais) |
| DAT-A107-005 | Registro de execução | fase, correlação, erros, políticas de retentativa e conclusão técnica | A107 |

**Proposta de invariantes:**
- \`INV-A107-001\`: todo resultado vincula organização, âmbito, tempo e versão de regras.
- \`INV-A107-002\`: resultado de Marco A não habilita outro âmbito.
- \`INV-A107-003\`: estado atendido exige evidência suficiente.
- \`INV-A107-004\`: resultados concluídos são imutáveis; reavaliações criam nova execução.
- \`INV-A107-005\`: nenhuma verificação persiste autorização técnica em nome do Administrador.
- \`INV-A107-006\`: dados/documentos permanecem sob responsabilidade dos módulos de origem.
- \`INV-A107-007\`: idempotência de solicitação não reutiliza resultado de versão/contexto incompatível.
- \`INV-A107-008\`: uma avaliação não utiliza silenciosamente versões de regras trocadas durante sua execução.

**Reprodutibilidade:** persistir pacote e hash, operadores/versões, parâmetros, referências e evidências suficientes para auditoria e reconstrução histórica. **Reexecução histórica integral** só poderá ser prometida se as fontes retiverem ou disponibilizarem snapshots suficientes; se não, preservar a conclusão histórica e sinalizar limitação de reprocessamento. Não reconstruir historicidade retroativamente a partir de dados correntes.

## 10. Transições, concorrência e idempotência

Estados técnicos candidatos da execução: \`RECEBIDA\` → \`VALIDANDO\` → \`CONSULTANDO_FONTES\` → \`AVALIANDO\` → \`CONCLUIDA\`; falhas bloqueantes podem resultar \`REJEITADA\` (solicitação inválida) ou \`FALHA_TECNICA\` (sem verificação concluída).

**Não confundir falha técnica com resultado indeterminado:** inconsistência de evidências ou fonte parcialmente indisponível pode gerar uma verificação **concluída e indeterminada**, quando o serviço puder documentar seguramente a insuficiência. Falha de persistência ou impossibilidade de determinar o conjunto de regras não produz resultado concluído.

**Idempotência proposta:** mesma \`solicitacao_id\`, contexto e hash do pedido devolve mesmo \`verificacao_id\`/resultado; mesma chave com parâmetros diferentes é conflito; solicitação nova poderá gerar nova verificação. A correlação e travas de concorrência devem impedir dupla persistência/efeitos. O escopo técnico da transação abrange apenas dados próprios de A107; consultas a fontes externas não fazem parte de transação distribuída.

## 11. Segurança e autorização

- Validar sujeito autenticado/solicitante no C103-IEA; verificar autorização contextual para a organização e o âmbito, inclusive acesso a evidências.
- Segregar permissões de **solicitar verificação**, **consultar resultado**, **gerenciar/publish regras** e **autorizar Marco A**; esta última não pertence ao A107.
- Não aceitar texto livre, URI não permitida, expressão executável ou código dentro da regra como operador ativo.
- Não permitir que usuário administrativo modifique ontologia nativa ou regras constitutivas publicadas sem procedimento controlado do desenvolvimento da plataforma, conforme UC-003.
- Minimizar dados pessoais e segredos no retorno, logging e evidências; preservar referências a documentos mantidos pelo custodiante, respeitando controles de acesso.
- Tratar alterações temporais, versões desativadas, provas de autor e eventuais conflitos entre fontes.

## 12. Catálogo preliminar de erros e ocorrências

Padrão do CIV-ESP-TPL v0.4: \`A107T9999 - [timestamp ISO8601 com fuso]: descrição segura\`, severidade T = C, W, S ou E **expressamente prevista por condição**. No INC-001, códigos abaixo são **propostos**; não há variantes alternativas sem deliberação.

| Código proposto | Tipo | Condição e comportamento |
|---|---|---|
| \`A107E0001\` | E | Solicitação inválida — rejeitar sem resultado de verificação |
| \`A107E0002\` | E | Solicitante não autorizado — negar, registrar trilha segura |
| \`A107E0003\` | E | Definição de âmbito ou pacote de regras ausente/inválido — não executar |
| \`A107E0004\` | E | Operador ou propriedade não reconhecido — rejeitar versão do pacote |
| \`A107E0005\` | E | Conflito de idempotência — não sobrescrever resultado |
| \`A107E0006\` | E | Falha durável de persistência de resultado/auditoria crítica — abortar conclusão |
| \`A107W0007\` | W | Evidência insuficiente para requisito — concluir indeterminado quando houver segurança para persistir a avaliação |
| \`A107W0008\` | W | Fonte consultada indisponível — concluir requisito indeterminado quando viável |
| \`A107W0009\` | W | Divergência temporal ou material de evidências — requisito indeterminado e diagnóstico |

**Observação:** \`NAO_ATENDIDA\` por descumprimento real não é uma exceção técnica e não requer código de erro. Códigos W catalogam ocorrências que integram resultado parcial; critérios de retentativa/timeout dependem de contratos físicos posteriores. Não derivar classificação somente de HTTP.

## 13. Eventos e observabilidade

| ID candidato | Evento ou sinal | Finalidade |
|---|---|---|
| EVT-A107-001 | \`VerificacaoOntologicaConcluida\` | Disponibilizar conclusão e sua referência, sem significar autorização |
| EVT-A107-002 | \`VerificacaoOntologicaFalhou\` | Registrar falha técnica, sem conclusão de conformidade |
| LOG-A107-001 | Solicitação recebida/rejeitada | Auditoria de sujeito, contexto e motivo |
| LOG-A107-002 | Fontes consultadas, versão de regras, conclusão | Proveniência e rastreabilidade |
| MET-A107-001 | Verificações por âmbito e resultado | Gestão e acompanhamento de prontidão |
| MET-A107-002 | Requisitos pendentes/indeterminados por condição | Diagnóstico e evolução |
| MON-A107-001 | Erro/falha do motor | Observabilidade de serviço |
| MON-A107-002 | Indisponibilidade ou degradação de fonte | Diagnóstico de dependências |

Eventos não constituem atos jurídicos. **Publicação assíncrona após persistência** deverá ter entrega confiável (por exemplo, outbox) se o consumidor depender dela. Limiares, SLAs, retenção, protocolos e granularidade são decisões técnicas pendentes; não inventar métricas numéricas.

## 14. Testes de aceitação para codificação

| ID candidato | Cenário | Resultado esperado |
|---|---|---|
| TST-A107-018 | CM-01–04 completas e válidas | \`ATENDIDA\` e \`ELEGIVEL_PARA_AUTORIZACAO\`, sem autorização |
| TST-A107-019 | Uma exigência objetivamente descumprida | \`NAO_ATENDIDA\`, diagnóstico por requisito |
| TST-A107-020 | Evidência ausente sem prova negativa | \`INDETERMINADA\` |
| TST-A107-021 | Fonte indisponível | Verificação indeterminada se puder registrar insuficiência; senão falha técnica |
| TST-A107-022 | Competências cadastradas corretas, porém universo exigível incompleto | Não concluir atendida |
| TST-A107-023 | \`para_cada\` sobre coleção vazia sem permissão expressa | Não concluir atendida |
| TST-A107-024 | Alternativa ordinária de GOI válida | \`algum\` atendida, mantendo Mandatário reconhecido |
| TST-A107-025 | Desbloqueio excepcional motivado, Mandatário não reconhecido | CM-04 não atendida |
| TST-A107-026 | Convalidação anterior ao reconhecimento do Mandatário | \`precede\` falha; CM-04 não atendida |
| TST-A107-027 | Submissão de Mandatário sem bloqueio imediato do GOI | CM-04 não atendida |
| TST-A107-028 | \`NAO_APLICAVEL\` em CM-01 | Rejeitar regra/resultado como não elegível |
| TST-A107-029 | Operador desconhecido no YAML | Pacote inválido; nenhuma verificação concluída |
| TST-A107-030 | Mesmo \`solicitacao_id\`/payload | Retorno idempotente sem duplicação |
| TST-A107-031 | Mesmo \`solicitacao_id\`/payload divergente | Conflito sem sobrescrita |
| TST-A107-032 | Regra atualizada depois de execução | Resultado antigo permanece íntegro |
| TST-A107-033 | Acesso não autorizado a evidência sensível | Negação e trilha de auditoria |
| TST-A107-034 | Persistência falha ao concluir | Não informar sucesso nem emitir evento de conclusão |
| TST-A107-035 | Quatro condições atendidas, nenhum ato de Administrador | Marco A segue não autorizado |

Os testes acima ampliam os TST-A107-009 a 017 homologados no conjunto integrado; **ainda não foram executados**.

## 15. Decisões técnicas ainda abertas

| ID | Decisão | Proposta/orientação | Bloqueio |
|---|---|---|---|
| DEC-A107-003 | Schema YAML definitivo e manifesto dos cinco arquivos | Publicação versionada, validação estática e hashes | Bloqueia parser de produção |
| DEC-A107-004 | Contratos de consulta com A103, A108, C302, C309, C101 e C103 | Evidências com contexto temporal, completude e procedência | Bloqueia integração real |
| DEC-A107-005 | Política temporal/snapshot entre fontes | Fixar referência temporal e registrar versão de cada consulta; declarar inconsistências | Bloqueia garantia de reprodução integral |
| DEC-A107-006 | Seleção de versão e reavaliação após mudanças | Pacote fixado por execução, nova execução para revisão | Bloqueia política de atualização |
| DEC-A107-007 | Interface física e esquema de persistência | Avaliar após contratos lógicos; evitar endpoint fictício | Bloqueia codificação |
| DEC-A107-008 | Tratamento de publicação de eventos e evidência durável | Separar commit local e distribuição, considerar outbox | Bloqueia integração assíncrona quando necessária |

## 16. Critérios de aprovação para codificar

Antes de iniciar código, verificar: (a) decisões técnicas abertas para o escopo resolvidas; (b) cinco arquivos de condição e composição com schemas validados; (c) contratos de consulta de fontes acordados; (d) política de segurança/autorização; (e) persistência e idempotência especificadas; (f) catálogo de erros e logs/métricas/monitoring detalhados; (g) testes definidos antes da implementação.

**Estado final desta minuta:** proposta completa de contrato lógico e comportamento verificável; **não** aprovação antecipada de API, modelo físico, testes executados ou entrada em produção.
