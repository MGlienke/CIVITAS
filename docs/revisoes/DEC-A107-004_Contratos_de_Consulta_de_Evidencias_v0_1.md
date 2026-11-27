# DEC-A107-004 — Contratos de Consulta de Evidências

**Módulo consumidor:** A107-EOB — Estrutura Organizacional de Base  
**Serviço consumidor:** SRV-A107-003 — Verificar Condições Ontológicas de Realização  
**Incremento:** INC-001 — Marco A  
**Versão:** 0.1 — **PROPOSTA EM REVISÃO; NÃO HOMOLOGADA**  
**Data da elaboração:** 26/11/2026  
**Referências homologadas:** DEC-A107-001, DEC-A107-002, DEC-A107-003; Especificação Integrada CM-01 a CM-04 v0.1; SRV-A107-003 v0.1; CIV-ESP-TPL v0.4.

## 1. Problema e decisão proposta

O SRV-A107-003 precisa consultar informações de diferentes módulos para verificar 23 requisitos distribuídos por CM-01 a CM-04. O A107 não será proprietário de dados institucionais, normas, competências, atos, Pessoas ou históricos de outros módulos e não fará acesso direto às tabelas internas desses módulos.

**DEC-A107-004 (proposta):** todos os módulos consultados exporão contratos de consulta que retornem fatos e referências de evidência com identidade, fonte proprietária, contexto institucional, versão/snapshot, referência temporal, cobertura da consulta e condição explícita de completude. O A107 aplicará os operadores semânticos homologados sobre essas respostas e conservará os vínculos probatórios. Uma consulta vazia, fonte indisponível ou resposta parcial **não constitui por si só prova negativa**.

A fonte responde pelos fatos de sua atribuição; A107 responde pela composição e avaliação ontológica; E301-ASO identifica fontes autoritativas; E302-HIS oferece suporte transversal à historicidade e à reconstrução; D1 responde por auditoria/observabilidade conforme atribuições. Fonte informacional não é automaticamente o documento original custodiante.

## 2. Contrato lógico comum — ConsultaEvidencia

| Campo proposto | Tipo lógico | Obrigatório | Semântica |
|---|---|---|---|
| `consulta_id` | Identificador único | Sim | Identifica tentativa de consulta |
| `correlation_id` | Identificador | Sim | Correlaciona execução SRV-A107-003 e fontes |
| `verificacao_id` | Referência da avaliação em curso | Sim | Associação à verificação do A107 |
| `organizacao_id` | Referência institucional | Sim | Contexto do sujeito examinado |
| `sujeito` | Tipo ontológico + referência | Sim | Pessoa, Organização, órgão/unidade, competência ou ato conforme propriedade |
| `propriedade_id` | Identificador controlado | Sim | Propriedade/relação ontológica solicitada; mapeamento a catalogar |
| `requisito_id` | Código da condição/requisito | Sim | Um dos CM01-R01 até CM04-R06 |
| `referencia_temporal` | ISO 8601 com fuso | Sim | Tempo da realidade institucional examinado |
| `contexto_autorizacao` | Referência à autorização contextual | Sim | Não pode ser simples autodeclaração do consumidor |
| `pacote_regras` | ID/versão/hash | Sim | Versão estável da regra de avaliação |
| `criterio_cobertura` | Descrição estruturada | Condicional | Obrigatório para `para_cada`, `nenhum` ou provas de ausência |
| `paginacao` | Cursor e limite | Condicional | Somente para fontes que devolvem conjuntos; o cursor deve vincular snapshot |

O protocolo (HTTP, gRPC, integração interna etc.), os endpoints e tipos físicos serão detalhados posteriormente. Consultas não contêm SQL e não expõem bancos proprietários.

## 3. Contrato lógico comum — RespostaEvidencia

| Campo proposto | Tipo lógico | Obrigatório | Semântica |
|---|---|---|---|
| `consulta_id`, `correlation_id` | Identificadores | Sim | Correspondência com pedido |
| `fonte_modulo` | Código de módulo | Sim | Titularidade informacional |
| `fonte_autoritativa` | Referência / escopo | Sim | Proveniência e base de autoridade da fonte |
| `status_consulta` | Enum | Sim | `OK`, `PARCIAL`, `INDISPONIVEL`, `NAO_AUTORIZADA`, `ERRO` |
| `sujeito`, `propriedade_id` | Referências | Sim | Coincidência com consulta original |
| `fatos` | Coleção identificada | Sim | Declarações com valores, relações, IDs e evidências |
| `evidencias` | Coleção referencial | Sim | Referências a provas e seu contexto, não cópias obrigatórias de documentos |
| `temporalidade` | Objeto | Sim | Instante de consulta, versão/snapshot e intervalo de validade dos fatos quando aplicável |
| `cobertura` | Objeto | Sim | Universo esperado, método, paginação, quantidade e completude |
| `consistencia` | Objeto | Sim | Inconsistências e divergências conhecidas |
| `integridade` | Objeto | Sim | Hash/versão do conteúdo ou referência equivalente quando disponível |
| `diagnosticos` | Coleção | Sim | Problemas, razões de incompletude, indisponibilidade e restrições |
| `proxima_pagina` | Cursor ou nulo | Condicional | Cursor vinculado à mesma versão/snapshot |

A resposta de fonte **não** contém `ATENDIDA/NAO_ATENDIDA` da condição ontológica: esses são resultados produzidos pelo A107, não pelo módulo consultado. A fonte poderá informar se uma ocorrência está presente, ausente de forma comprovada, ou inconclusiva, com metadados adequados.

### 3.1 Formato de fato

Campos lógicos propostos: `fato_id`, `sujeito`, `predicado/propriedade`, `objeto/valor`, `tipo_valor`, `validade_inicio`, `validade_fim`, `registrado_em`, `versao_fonte`, `evidencia_ids`, `situacao_fonte`. Relações institucionais não devem ser reduzidas a hierarquia sem fundamento.

### 3.2 Formato de evidência

Campos lógicos propostos: `evidencia_id`, `tipo`, `custodiante_modulo`, `referencia_documental_ou_registro`, `fragmento/dispositivo` quando pertinente, `versao`, `hash` quando disponível, `origem`, `autor_do_ato` quando necessário, `ocorrido_em`, `registrado_em`, `acesso`, `escopo_afirmacao`. O A107 guarda referências, com proteção de dados e minimização; documentação oficial permanece sob seus custodiantes.

## 4. Completude e prova negativa — parte central da DEC

Definir `cobertura` com:
- `universo_id` e `criterio_determinacao`: norma, dispositivo, regra ontológica e âmbito que delimitam **o que deveria existir**.
- `fonte_universo`: titular da determinação do universo esperado e versão.
- `fonte_observada`: módulo que apresenta elementos concretamente constituídos e versão.
- `universo_completo`: `COMPROVADO`, `NAO_COMPROVADO` ou `NAO_APLICAVEL_JUSTIFICADO`.
- `consulta_completa`: `SIM`, `NAO` ou `INDETERMINADA`; só SIM quando todas as páginas e dependências exigíveis foram resolvidas.
- `quantidade_esperada`, `quantidade_observada`: opcionais, **não suficientes isoladamente** para demonstrar completude.
- `itens_esperados_ids`, `itens_observados_ids` ou referências estáveis/snapshot comparável.
- `prova_completude`: IDs das determinações normativas/ontológicas, critérios, versões e evidências que suportam a conclusão.

**Regra:** `[]` retornado por uma busca **não** significa que o fato inexiste. Para o operador `nenhum` ou para determinar uma omissão, a fonte deverá provar cobertura integral da propriedade e do âmbito. Sem essa prova, resultado `INDETERMINADA`.

**CM-02:** derivar universo exigível de órgãos e unidades de primeiro nível a partir do instrumento normativo aplicável (A108-BDN / C309-NEC conforme propriedade), comparar com conjunto concreto de C302-EOR. **CM-03:** universo de competências exigíveis decorre das determinações normativas e institucionais, não simplesmente da coleção cadastrada pelo C309-NEC. O C309 pode consolidar o universo desde que exponha procedência normativa e justificativa verificável; não é admitida autodeclaração circular de completude.

## 5. Temporalidade e consistência entre fontes

Cada consulta separa:
- `referencia_temporal` — momento sobre o qual a regra quer afirmar uma condição;
- `ocorrido_em` — instante do fato/ato;
- `registrado_em` — instante de registro pelo sistema;
- `vigente_de/ate` — intervalo de aplicação/eficácia da referência, quando cabível;
- `consultado_em` — momento da leitura;
- `snapshot/versao` — versão exata do estado consultado.

**Proposta:** fixar `referencia_temporal` e versão do pacote do A107 por execução; solicitar snapshots ou versões aos produtores, manter todas as referências e registrar quando não existir visão transacional única entre módulos. Divergências não resolvidas que afetem requisito essencial tornam o requisito **INDETERMINADA**. Não afirmar snapshot global atômico sem mecanismo efetivo.

**CM-04:** `precede` usa precedência lógica e autoria dos atos, não apenas comparação ingênua de timestamps. O **bloqueio imediato** do GOI exige evidência de transição de estado vinculada ao ato de submissão, idealmente atomicidade na responsabilidade transacional de A103-GEP, ou garantia equivalente comprovável. A mera diferença de alguns milissegundos entre logs não basta para demonstrar a regra. A convalidação ordinária requer reconhecimento prévio válido; desbloqueio excepcional não equivale a reconhecimento nem convalidação.

## 6. Fontes e responsabilidade por condição

| Módulo | Objeto/resposta sob responsabilidade do módulo | Condição | Contrato específico a definir |
|---|---|---|---|
| **A103-GEP** | Instância/posição institucional, cadeia de incorporação, habilitação, GOI, Mandatário, submissão, bloqueio, reconhecimento e regularização | CM-01, CM-03, CM-04 | Consulta de organização e fatos/atos administrativos |
| **A107-EOB** | EOT, modelo organizacional, Ontologia e determinações constitutivas versionadas | CM-01, CM-02, CM-03 | Consulta local de modelos e relações |
| **A108-BDN** | ENT/ENI, dispositivos, fundamentos, aplicabilidade e vigência normativa | CM-01, CM-02, CM-03, CM-04 | Consulta normativa com dispositivos e referência temporal |
| **C302-EOR** | Primeiro nível organizacional concreto, composição e homologação da sua versão (registro do ato sob responsabilidade acordada) | CM-02 | Consulta de estrutura e versão homologada |
| **C309-NEC** | Competências, limites, titulares, categorias e cadeias de determinações | CM-02, CM-03, CM-04 | Consulta de competências e universo normativamente exigível |
| **C101-PES** | Existência e identidade da Pessoa/IDUP, sem duplicação de cadastro institucional | CM-04 | Consulta restrita de identidade referencial |
| **C103-IEA** | Contexto de autenticação/autorização, legitimidade e poderes de autores dos atos no momento pertinente | CM-02, CM-04 | Consulta de autorização histórica contextual |
| **E301-ASO** | Fonte autoritativa e origem de referência institucional quando aplicável | Transversal | Resolução de autoridade da fonte |
| **E302-HIS** | Histórico, ordem, versões e reconstrução de estados; não substitui dono do ato | CM-02, CM-04; transversal | Consulta temporal auditável |
| **D101-RAS** | Trilha de auditoria e integridade de operações quando exigida | Transversal | Consulta restrita de registros auditáveis |
| **C301-RDI** | Custódia de documentos públicos e evidências documentais, quando disponíveis | Conforme documentos | Consulta de referência/custódia; não pressupõe implantação integral no INC-001 |

**Nota sobre a maturidade do INC-001:** a disponibilidade integral dos módulos E3, D1 e C301 não deve ser presumida. Quando ainda não implementados, o INC-001 deverá prever adaptadores de prova, contrato simulado ou mecanismo mínimo de evidência auditável, sem atribuir a módulos alheios uma implementação inexistente. Nenhuma simulação poderá ser apresentada como evidência real no aceite integrado.

## 7. Contratos lógicos específicos candidatos

Os identificadores abaixo usam códigos temporários de **interfaces lógicas**, sem atribuir falsos `SRV` a módulos ainda não especificados.

| Contrato lógico | Proprietário | Resposta principal |
|---|---|---|
| CE-01 — Consultar identidade e posição institucional | A103-GEP | Identidade, tipo/posição, referências de incorporação |
| CE-02 — Consultar modelo tipológico/ontológico | A107-EOB | Tipos, relações, restrições, versão e correspondência |
| CE-03 — Consultar normas e fundamentos | A108-BDN | Dispositivos, alcance, validade/vigência e referências |
| CE-04 — Consultar primeiro nível organizacional | C302-EOR | Estrutura concreta versionada e relações |
| CE-05 — Consultar competências e universo exigível | C309-NEC | Competências, titulares, determinações e cobertura |
| CE-06 — Consultar Pessoa referencial | C101-PES | IDUP e identidade estritamente necessária |
| CE-07 — Consultar poderes e autorizações históricas | C103-IEA | Papel/competência, escopo e situação no instante do ato |
| CE-08 — Consultar eventos de mandato e GOI | A103-GEP | Submissão, bloqueio, reconhecimento, convalidação/desbloqueio |
| CE-09 — Consultar cadeia temporal | E302-HIS / módulo proprietário | Atos e transições com ordem e integridade comprováveis |
| CE-10 — Resolver fonte/procedência | E301-ASO | Identificação de origem autoritativa e escopo |
| CE-11 — Consultar integridade/auditoria | D101-RAS | Prova de rastreabilidade segundo política de acesso |
| CE-12 — Consultar evidência documental | C301-RDI | Referência, custódia e disponibilidade documental |

A fronteira entre serviços institucionais de A103, C302 e C309 será precisada em seus respectivos contratos; não supor alterações às titularidades homologadas do Mapa v0.5.

## 8. Exemplo lógico de consulta e resposta (não é API física)

**Consulta hipotética:** CM03-R03 — obter fundamento de competência institucional na referência temporal determinada.

```json
{
  "consulta_id": "exemplo-consulta-001",
  "correlation_id": "exemplo-verificacao-001",
  "verificacao_id": "exemplo-verificacao-001",
  "organizacao_id": "org-exemplo",
  "sujeito": {"tipo": "CompetenciaInstitucional", "referencia": "competencia-exemplo"},
  "requisito_id": "CM03-R03",
  "propriedade_id": "fundamento_competencia",
  "referencia_temporal": "2026-11-26T12:00:00-04:00",
  "pacote_regras": {"id": "MARCO_A", "versao": "0.1.0"},
  "contexto_autorizacao": "autorizacao-contextual-validada"
}
```

**Resposta hipotética:**

```json
{
  "consulta_id": "exemplo-consulta-001",
  "correlation_id": "exemplo-verificacao-001",
  "fonte_modulo": "C309-NEC",
  "status_consulta": "OK",
  "sujeito": {"tipo": "CompetenciaInstitucional", "referencia": "competencia-exemplo"},
  "propriedade_id": "fundamento_competencia",
  "fatos": [{
    "fato_id": "fato-exemplo",
    "sujeito": "competencia-exemplo",
    "predicado": "fundamentado_em",
    "objeto": "dispositivo-normativo-exemplo",
    "evidencia_ids": ["evidencia-exemplo"]
  }],
  "evidencias": [{
    "evidencia_id": "evidencia-exemplo",
    "custodiante_modulo": "C309-NEC",
    "referencia_documental_ou_registro": "ref-normativa-exemplo",
    "versao": "v1"
  }],
  "temporalidade": {
    "referencia_temporal": "2026-11-26T12:00:00-04:00",
    "snapshot": "snapshot-exemplo"
  },
  "cobertura": {
    "universo_completo": "NAO_COMPROVADO",
    "consulta_completa": "SIM",
    "prova_completude": []
  },
  "consistencia": {"divergencias": []},
  "integridade": {"versao_fonte": "v1"},
  "diagnosticos": ["O fundamento foi referenciado; a completude do universo de competências depende de consulta própria."]
}
```

**Importante:** resposta `OK` não equivale a condição `ATENDIDA`, nem o fato de existir uma referência normativa prova sua pertinência jurídica. Um fato isolado pode ser suficientemente documentado sem comprovar a completude de toda a coleção.

## 9. Mapeamento das 23 exigências a contratos candidatos

| Condição | Requisitos | Contratos consultados |
|---|---|---|
| CM-01 | CM01-R01–R05 | CE-01, CE-02, CE-03, CE-10 |
| CM-02 | CM02-R01–R06 | CE-02, CE-03, CE-04, CE-05, CE-07, CE-09 |
| CM-03 | CM03-R01–R06 | CE-01, CE-02, CE-03, CE-05, CE-10 |
| CM-04 | CM04-R01–R06 | CE-01, CE-03, CE-05, CE-06, CE-07, CE-08, CE-09, CE-11; CE-12 quando necessário |

As listas não implicam consultar todos os contratos em cada requisito; o plano de consulta deverá selecionar as fontes efetivamente necessárias para o operador executado.

## 10. Tratamento de respostas e falhas

| Resposta/falha | Tratamento no A107 |
|---|---|
| `OK` com fato, prova suficiente e cobertura pertinente | Pode contribuir para `ATENDIDA` |
| `OK` com coleção vazia e cobertura **comprovadamente completa** | Pode constituir prova negativa, segundo o operador/regra |
| `OK` com coleção vazia e cobertura não comprovada | `INDETERMINADA` |
| `PARCIAL` | `INDETERMINADA` salvo descumprimento já objetivamente provado |
| `INDISPONIVEL` | `INDETERMINADA` se o serviço puder concluir diagnóstico com segurança; caso contrário, falha técnica |
| `NAO_AUTORIZADA` | Negar acesso/falha de autorização; não confundir com ausência de fato |
| `ERRO` | Ocorrência catalogada; decisão de retentativa e possibilidade de resultado indeterminado conforme causa |
| Fontes contraditórias | `INDETERMINADA` enquanto a autoridade/procedência não resolver a divergência |
| Snapshot incompatível, versão não rastreável | `INDETERMINADA` ou falha técnica se não houver pacote íntegro para avaliar |

O A107 não converterá falha de infraestrutura em descumprimento institucional. A avaliação de `todos` manterá o predomínio de descumprimento comprovado quando há outros requisitos indeterminados, sem ocultar o diagnóstico de ambos.

## 11. Segurança e confiança

- A identidade do solicitante decorre do contexto autenticado, não de campo livre.
- O A107 precisará ter permissão específica para requisitar informações em nome do fluxo e respeitar o escopo institucional.
- Respostas só transportarão dados mínimos necessários; Pessoa/IDUP, investidura e atos exigem proteção de dados.
- O consultor não terá privilégio para acessar tabelas internas de módulos proprietários.
- Provas referenciais não substituirão o documento custodiante ou a cadeia de custódia pertinente.
- A proveniência exige referência à entidade que constitui o fato e, quando aplicável, ao ator/autor do ato e à sua legitimação contextual no momento da prática.
- Atos e normas não devem adquirir validade apenas por serem informados como válidos por um sistema; a legitimidade e a pertinência precisam ser verificáveis.

## 12. Identificadores de rastreabilidade candidatos

Como os contratos pertencem a mais de um módulo, os IDs provisórios **CE-01…CE-12** são apenas identificadores editoriais da matriz transversal. Identificadores `SRV-MMMM-NNN` definitivos serão atribuídos quando cada módulo proprietário especificar e aprovar sua interface.

Para o A107-EOB, sugerem-se: `DAT-A107-004` (referência de evidência, conforme SRV-A107-003), `LOG-A107-002` (consultas e proveniência), `MET-A107-002` (insuficiência de evidências por requisito), `MON-A107-002` (indisponibilidade de dependências). Não criar ID novo para artefato já identificado.

## 13. Testes propostos da DEC-A107-004

| Teste candidato | Cenário | Critério de aceite |
|---|---|---|
| TST-A107-036 | Fonte retorna fato íntegro e evidência rastreável | Requisito avaliado sem acesso direto à fonte física |
| TST-A107-037 | Busca vazia sem prova de completude | Indeterminada, não negativa automática |
| TST-A107-038 | Competência omitida do cadastro, mas exigida na determinação normativa completa | Não atendida com identificação da omissão |
| TST-A107-039 | Universo normativo não determinável | Indeterminada |
| TST-A107-040 | Paginação incompleta | Indeterminada |
| TST-A107-041 | Versões/snapshots conflitantes | Diagnóstico temporal; não elegível |
| TST-A107-042 | Fonte não autoriza consulta | Falha de autorização com auditoria, sem exposição de dados |
| TST-A107-043 | Histórico de submissão e bloqueio do GOI dissociados | CM-04 não atendida ou indeterminada conforme integridade |
| TST-A107-044 | Convalidação anterior ao reconhecimento do Mandatário | Sequência inválida |
| TST-A107-045 | Repetição de consulta no mesmo snapshot e contexto | Resposta correlacionável e sem ambiguidades |
| TST-A107-046 | Documento referenciado sem prova de procedência suficiente | Não presumir fundamento válido |
| TST-A107-047 | Conjunto de fatos consistente, mas origem sem integridade verificável | Indeterminada quando integridade for exigida |

**Estado:** cenários especificados; não foram executados.

## 14. Pendências de interface física e próximos passos

| Código | Pendência | Critério para resolução |
|---|---|---|
| P-004-01 | Envelope JSON Schema definitivo | Tipos, validações, exemplos positivos/negativos |
| P-004-02 | Identificadores ontológicos das propriedades | Mapear campos de CM01–CM04 a conceitos/relações estáveis |
| P-004-03 | Comprovação do universo completo | Acordar fonte, critério, snapshot e prova para CM-02/03 |
| P-004-04 | Modelo temporal intermodular | Coerência/snapshots e impossibilidade de garantir transação distribuída |
| P-004-05 | Contrato de atos e reconhecimento CM-04 | A103 + C103 + E302; prova de bloqueio atômico |
| P-004-06 | Segurança e exposição de evidências documentais | Minimização, proteção, custódia e verificabilidade |
| P-004-07 | Protocolos, paginação, erro, retry e observabilidade | Contratos físicos por módulo e testes |
| P-004-08 | Integração parcial no INC-001 | Dublês contratados e prova de aceite sem fingir fontes reais |

**Recomendação para homologação:** aprovar o *contrato semântico comum*, a regra de completude e a atribuição de responsabilidades, mas não presumir aprovação das APIs físicas, protocolos, schemas finais, mecanismos de snapshot distribuído ou testes ainda não realizados.
