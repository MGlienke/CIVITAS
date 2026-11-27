# DEC-A107-002 — Vocabulário Controlado de Verificação Ontológica

**Módulo:** A107-EOB — Estrutura Organizacional de Base  
**Situação:** HOMOLOGADA pelo autor em 26/11/2026  
**Referências:** DEC-A107-001 (Markdown com requisitos YAML), Mapa de Domínios e Módulos v0.5, INC-001, UC-CIV-001, UC-CIV-003, UC-CIV-006 e template CIV-ESP-TPL v0.4.

## 1. Decisão homologada

O módulo **A107-EOB** adotará uma **linguagem declarativa de verificação ontológica** com quatro elementos fundamentais: **sujeito, propriedade, operador e evidência**, representados em estruturas YAML associadas aos arquivos Markdown previstos na DEC-A107-001.

- **Sujeito:** elemento institucional cuja realização está sendo verificada.
- **Propriedade:** característica ou relação referenciada à Ontologia do Estado Digital.
- **Operador:** critério de verificação de significado controlado, estável, explicitamente especificado e versionado.
- **Evidência:** informação ou referência que permite fundamentar o resultado, consultada na fonte proprietária/autoritativa correspondente.

As propriedades devem referenciar conceitos e relações da Ontologia; os operadores não criam uma segunda ontologia. O motor consulta as fontes pertinentes, avalia requisitos de forma **determinística** quando a evidência e a regra permitirem e produz resultado fundamentado, versionado e historicamente rastreável.

O vocabulário deve preservar quatro estados: **atendida, não atendida, indeterminada, não aplicável**. Falta de evidência não pode ser automaticamente interpretada como inexistência do fato; *não aplicável* exige fundamento específico. A composição deve usar conectivos controlados, sem dispensar requisitos obrigatórios.

**Limite da homologação:** está aprovada a estrutura conceitual e o **vocabulário inicial**, mas **não** estão congelados os nomes finais de propriedades, contratos físicos dos módulos consumidores, nem o esquema YAML definitivo.

## 2. Vocabulário inicial de operadores — aprovado como ponto de partida

| Operador | Semântica inicial |
|---|---|
| `existe` | Verifica existência identificada e referenciável de elemento. |
| `corresponde` | Verifica compatibilidade com conceito, tipo ou referência. |
| `relacionado_a` | Verifica relação ontológica específica entre elementos. |
| `fundamentado_em` | Verifica existência e pertinência do fundamento normativo. |
| `vigente_em` | Verifica vigência de fundamento, relação ou condição em referência temporal. |
| `reconhecido_por` | Verifica reconhecimento por participante competente. |
| `satisfaz` | Reutiliza resultado verificável de uma condição previamente definida. |

**Restrições:** `fundamentado_em` não corresponde apenas à presença de URL ou referência textual; `reconhecido_por` exige verificação contextual de competência/legitimidade; `satisfaz` deverá tratar resultados indeterminados e versões de maneira explícita.

## 3. Composição inicial — aprovada como ponto de partida

| Operador | Regra |
|---|---|
| `todos` | Exige que todos os requisitos aplicáveis estejam atendidos. |
| `algum` | Pelo menos uma alternativa deve ser atendida, quando a condição autorizar alternativas. |
| `nenhum` | Verifica a ausência de ocorrências vedadas, desde que a fonte e a suficiência probatória permitam concluir essa ausência. |

## 4. Estados do resultado

- **Atendida:** critérios demonstrados por evidência suficiente.
- **Não atendida:** descumprimento constatado por fonte/critério competente.
- **Indeterminada:** evidências insuficientes, inacessíveis, contraditórias ou inconclusivas.
- **Não aplicável:** exclusão validamente fundamentada no âmbito de operação; jamais dispensa discricionária.

A lógica de agregação formal dos quatro estados será detalhada na etapa seguinte, incluindo casos de composição, ausência de dados, conflito entre fontes, tempo de referência e dependências entre requisitos.

## 5. Modelo ilustrativo

```yaml
id: CM-01
ambito: MARCO_A
sujeito:
  tipo: OrganizacaoInstitucional
  referencia: organizacao_avaliada
requisitos:
  - id: R01
    propriedade: identidade_institucional
    operador: existe
    fonte: A103-GEP
  - id: R02
    propriedade: tipo_institucional
    operador: corresponde
    referencia: estrutura_tipologica
    fonte: A107-EOB
  - id: R03
    propriedade: posicao_institucional
    operador: relacionado_a
    referencia: estrutura_estatal
    fonte: A103-GEP
  - id: R04
    propriedade: fundamento_constitutivo
    operador: fundamentado_em
    fonte: A108-BDN
composicao:
  operador: todos
  requisitos: [R01, R02, R03, R04]
```

**Nota:** os nomes das propriedades, `R01` a `R04`, os campos e os contratos de fonte são exemplos em validação, não um schema físico homologado.

## 6. Próxima atividade

**Aplicar o vocabulário às condições CM-01, CM-02, CM-03 e CM-04 do Marco A**, produzindo para cada uma: requisitos e relações ontológicas, origem da informação, operador proposto, evidência exigida, regra de composição, casos indeterminados e testes. Dessa aplicação derivar a gramática YAML definitiva, o contrato do motor `SRV-A107-003` e o catálogo de erros, sem antecipar homologação técnica.

## 7. Rastreabilidade

- **DEC-A107-001:** formato Markdown com requisitos YAML.
- **DEC-A107-002:** linguagem declarativa, quatro elementos, operadores e composições iniciais, quatro resultados.
- **INC-001:** execução até Marco A sem habilitar implicitamente Sistemas Estruturantes ou serviços públicos.

## 8. Complementação homologada — aplicação integrada CM-01 a CM-04

Em 26/11/2026, o autor homologou a especificação integrada **A107-EOB — Condições Ontológicas do Marco A (CM-01 a CM-04) v0.1**, ampliando o vocabulário inicial aprovado nesta decisão com:

- **`precede`** — operador temporal de ordenação e validade da sequência de atos, especialmente reconhecimento do Mandatário e convalidação do GOI;
- **`para_cada`** — composição de requisitos sobre o universo completo de elementos exigíveis, cuja abrangência deverá ser determinada por referências normativas/ontológicas, sobretudo para órgãos de primeiro nível e competências;
- **regra transversal de suficiência probatória** — inexistência de dados ou indisponibilidade de fonte não demonstra inexistência do fato; falta de evidência suficiente gera estado *indeterminada*.

O vocabulário homologado passa assim a contemplar **oito operadores elementares** (sete iniciais e `precede`) e **quatro operadores de composição** (`todos`, `algum`, `nenhum`, `para_cada`). Os nomes das propriedades e o schema YAML definitivo continuam pendentes de especificação. A especificação integrada é registrada em [A107-EOB — CM-01 a CM-04 v0.1](./A107-EOB_Condicoes_Ontologicas_Marco_A_CM01_a_CM04_v0_1.md).
