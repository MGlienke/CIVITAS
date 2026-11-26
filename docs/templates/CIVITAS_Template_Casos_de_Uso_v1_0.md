# CIVITAS — Template de Caso de Uso

**Código do template:** CIV-UC-TPL  
**Versão:** 1.0  
**Situação:** Homologado para uso metodológico  
**Finalidade:** Consolidar narrativas institucionais homologáveis antes da análise semântica, decomposição funcional e especificação de serviços.

> Este template descreve **o que acontece, por que acontece e quais resultados institucionais são esperados**. Não antecipa módulos, APIs, persistência, tecnologias ou contratos técnicos. Campos sem decisão devem permanecer explicitamente como **A definir**.

## Identificação

| Campo | Valor |
|---|---|
| Código do caso de uso | UC-CIV-NNN |
| Título | [Verbo no infinitivo + objeto] |
| Versão | 0.1 |
| Situação | Em discussão / Narrativa homologada / Consolidação em revisão / Homologado |
| Data | AAAA-MM-DD |
| Responsável pela validação | [Papel ou responsável] |
| Histórico / decisões vinculadas | [IDs e referências] |

## 1. Propósito

[Qual resultado o caso de uso pretende produzir? Por que é necessário?]

## 2. Contexto

[Qual situação institucional motiva o caso de uso? Quais são seus limites e pressupostos?]

## 3. Participantes

- **Participante principal:** [Papel institucional]
- **Demais participantes:** [Pessoas, instituições ou sistemas externos, quando pertinentes]
- **Responsabilidades:** [Somente as já discutidas]

## 4. Pré-condições

[Condições que precisam estar satisfeitas para o caso iniciar, sem especificar implementação.]

## 5. Narrativa principal

1. [Primeiro acontecimento/ação na linguagem do domínio]
2. [Próximo acontecimento/ação]
3. [...]
4. [Resultado alcançado]

> Redigir em linguagem natural; manter uma sequência compreensível, mas não confundir passos narrativos com operações de API ou serviços independentes.

## 6. Situações alternativas

| ID | Condição / variação | Comportamento esperado | Situação |
|---|---|---|---|
| ALT-01 | [Situação] | [Resultado institucional esperado] | A discutir |

[Se ainda não analisadas, registrar: **A definir**.]

## 7. Pós-condições

[Estado institucional/informacional que deve existir ao final, incluindo resultados em caso de insucesso, se acordado.]

## 8. Regras e restrições

| ID | Regra ou restrição | Natureza | Origem / fundamento | Situação |
|---|---|---|---|---|
| REG-01 | [Descrição] | Institucional / Semântica / Normativa / Operacional | [Fonte ou decisão] | A validar |

> Não atribuir base normativa inexistente. Distinguir regra já acordada de hipótese a examinar.

## 9. Questões em aberto

| ID | Questão | Alternativas / implicações | Decisão / situação |
|---|---|---|---|
| Q-01 | [Pergunta pendente] | [Se conhecidas] | Em aberto |

---

## Procedimento de elaboração e homologação

**Etapa 1 — Construção colaborativa da narrativa.** O autor descreve livremente uma situação; discutimos interpretações, conceitos, participantes, limites e resultados. Não executar análise de módulos, decomposição funcional nem desenho técnico nesta etapa.

**Etapa 2 — Homologação da narrativa.** Registrar a versão e a aprovação explícita do autor. A narrativa homologada constitui referência para as etapas posteriores. A conversão para o template deve preservar integralmente seu sentido; novas hipóteses ficam marcadas como pendências e não são consideradas homologadas automaticamente.

**Etapa 3 — Análise e especificação funcional.** Apenas após homologação, analisar ontologia, fundamentação normativa, capacidades, módulos e serviços; identificar reutilização, extensão ou criação, com rastreabilidade.

**Etapa 4 — Revisão e homologação das especificações.** O autor revisa e aprova os artefatos derivados antes de incorporá-los aos catálogos funcionais.

### Regras de controle

1. **Não confundir aprovação da narrativa com aprovação de detalhamentos complementares ou das especificações.**
2. Não converter automaticamente cada passo narrativo em um serviço.
3. Registrar explicitamente hipóteses, alternativas, lacunas e restrições sem validação.
4. Preservar vínculos **Caso de Uso → Capacidades → Serviços → Módulos → Requisitos → Testes**, admitindo relacionamentos muitos-para-muitos.
5. Cada caso de uso usa identificador estável `UC-CIV-NNN`; alterações posteriores atualizam a versão, preservando histórico e decisões.
6. Evitar misturar o catálogo de modelos tipológicos com instâncias concretas no caso de uso, salvo quando a narrativa tratar explicitamente de ambos.

### Convenção de arquivo

`UC-CIV-NNN_Titulo_Resumido_vX_Y.md`

**Exemplo de uso já homologado:** UC-001 — Constituir e Utilizar Estruturas Organizacionais Tipológicas, narrativa v0.5 (a transposição para as nove seções exige conferência para não homologar automaticamente detalhes adicionais).

### Referências do projeto

- Ontologia e Linguagem Ubíqua CIVITAS (versões indicadas no caso de uso).
- Fundamentação Normativa CIVITAS (versão indicada).
- Mapa de Domínios e Módulos CIVITAS (versão indicada).
- Template de Especificação Modular CIVITAS (etapa posterior, não substitui este template).
