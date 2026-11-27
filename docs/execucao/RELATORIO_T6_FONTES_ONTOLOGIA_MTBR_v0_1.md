# T6 — Inventário de fontes e limites de homologação (27/11/2026)

**Escopo:** UC-CIV-001, UC-CIV-002 e UC-CIV-003, somente organização das referências técnicas; **sem aprovação nova de conteúdo institucional ou jurídico**.

| Fonte inspecionada | Situação documental constatada | Uso permitido neste incremento |
|---|---|---|
| `CIVITAS - Rede Ontologica - v20.md` (Biblioteca) | Cabeçalho registra **v20 — expansão conceitual e relacional aprovada**; 4.153 linhas. Seção 3 apresenta os conceitos `CON-001` a `CON-158`; seção 5 traz rede consolidada. | Derivado técnico das identificações e triplas da fonte: **158 conceitos, 247 relações distintas**. Não houve alteração da fonte. |
| `CIVITAS_MT_BR_Matriz_Relacoes_Restricoes_v0_1.xlsx` (Biblioteca) | Painel: **v0.1 — PROPOSTA NÃO HOMOLOGADA**. Contém **25 tipos/categorias, 18 relações, 20 restrições e cinco decisões aprovadas**. Alerta textual: aprovação das cinco decisões MT-BR **não** equivale à homologação das linhas da matriz. | **Não importar como EOT homologada** nem transformar seus relacionamentos propostos em regras ontológicas. |
| `UC-CIV-001_Estruturas_Organizacionais_Tipologicas_v0_6.md` (GitHub) | Narrativa homologada quanto à harmonização GOI e decisões Q-01 a Q-06. A importação depende da conformidade com metamodelo nativo; formato técnico fica para etapa posterior. | Contrato funcional para futuro importador; não fornece sozinho metamodelo computacional completo. |
| `UC-CIV-002_Estruturas_Normativas_Tipologicas_v0_4.md` (GitHub) | Importação EOT+ENT em conjunto, correspondência e completude das exigências abstratas, ENI com fundamentação concreta em fase seguinte. | Verificação preliminar das referências, sem declarar suficiência jurídica. |
| `UC-CIV-003_Ontologia_do_Estado_Digital_v0_4.md` (GitHub) | Ontologia de Referência transversal; EOT/ENT não podem contrariá-la nem constituir ontologias independentes por organização. | Consultar rede v20 de maneira read-only, sem modificar conceitos ou presumir validação semântica substantiva. |

## Achados da transposição v20

1. A extração foi realizada diretamente das seções **3 (conceitos)** e **5 (rede consolidada)** da fonte completa, não de aproximação por conhecimento externo.
2. Foram extraídas 158 identidades `CON-xxx` e 247 triplas distintas `origem → predicado → destino`, após excluir a expressão demonstrativa `ORIGEM → relação → DESTINO`.
3. Os dois extremos de todas as 247 relações coincidem, sem diferença de caixa, com nomes dos conceitos inventariados. O inventário derivado não equivale a uma base ontológica computacional completa (faltam definições, atributos e restrições das seções restantes).
4. **Diferenças entre a rede v20 e propostas MT-BR devem permanecer visíveis.** Por exemplo, a rede registra `ENTIDADE PÚBLICA → composta por → ÓRGÃO PÚBLICO`, enquanto a planilha MT-BR apresenta `Entidade Pública → compõe-se de → Órgão Público` como relação de sua matriz. A aproximação não autoriza corrigir, substituir ou fundir predicados automaticamente.
5. O validador T6 só responde à pergunta: **“Esta referência de conceito e esta tripla figuram na rede v20 examinada?”**. Não responde se a EOT atende integralmente ao metamodelo, se a ENT possui fundamento jurídico suficiente nem se uma instância deve existir.

## Próximos bloqueios antes de declarar UC-001/002/003 implementados

- Construir ou localizar a especificação computacional homologada do **Metamodelo Organizacional nativo**; referenciar explicitamente sua versão e regras.
- Revisar e **homologar separadamente** os elementos pertinentes da matriz MT-BR, respeitando classificações de proposta, dependência de validação e distinções entre relações semânticas e tipológicas.
- Definir autenticação/autorização do Administrador e um protocolo de importação definitivo; manter a elaboração externa/offline prevista em UC-001.
- Incorporar definições, propriedades e restrições semânticas da rede v20, em vez de usar apenas correspondência de nomes e triplas.
- Integrar serviço A108-BDN e mecanismo de ENI, sem confundir uma categoria de documento abstrato com norma concreta vigente.

**Resultado:** T6 fornece referência computacional **parcial, verificável e explicitamente limitada**, preservando estado `SIMULADO` de qualquer EOT/ENT de ensaio. Sem efeito em C103, A103 operacional, A107 v0.3.0 ou Marco A.
