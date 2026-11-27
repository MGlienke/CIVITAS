# DEC-A107-003 — Esquema Markdown/YAML das Condições Ontológicas do Marco A

**Estado:** HOMOLOGADA pelo autor  
**Data:** 26/11/2026  
**Módulo:** A107-EOB  
**Incremento:** INC-001  
**Base homologada:** DEC-A107-001, DEC-A107-002, especificação integrada CM-01 a CM-04 v0.1, SRV-A107-003 v0.1.

## Deliberação

O autor aprovou o pacote técnico **DEC-A107-003 v0.1** com cinco arquivos `.md` dotados de *front matter* YAML, o esquema estrutural `condicao.schema.json` (JSON Schema 2020-12) e o guia `README.md`.

Arquivos:
1. `CM-01.md` — Identidade Institucional, **5** requisitos.
2. `CM-02.md` — Estrutura Organizacional Inicial, **6** requisitos.
3. `CM-03.md` — Competências Institucionais, **6** requisitos.
4. `CM-04.md` — Autoridade Institucional, **6** requisitos.
5. `MARCO_A.md` — Composição `todos` das quatro condições.

**Total: 23 requisitos.** São respeitados os operadores homologados `existe`, `corresponde`, `relacionado_a`, `fundamentado_em`, `vigente_em`, `reconhecido_por`, `satisfaz`, `precede`; composição `todos`, `algum`, `nenhum`, `para_cada`, assim como a distinção `ATENDIDA`, `NAO_ATENDIDA`, `INDETERMINADA` e `NAO_APLICAVEL` conforme contexto.

O pacote físico foi atualizado para situação `HOMOLOGADA`, e a validação local confirmou YAML interpretável, conformidade ao JSON Schema, integridade dos IDs/referências e total de 23 requisitos. **Este registro no GitHub não equivale ao upload dos arquivos físicos do pacote.** O ZIP homologado encontra-se como artefato disponibilizado na conversa de homologação e deverá ser incorporado ao repositório de código em etapa posterior.

## Limites da homologação

- Está aprovado o **esquema estrutural v0.1**, não a implementação do motor A107-EOB.
- O JSON Schema valida forma e tipos estruturais, **não** juridicidade, legitimidade, completude do universo exigível ou suficiência probatória.
- Permanecem por implementar os validadores semânticos, mapeamento definitivo das propriedades a identificadores ontológicos, contratos de consulta aos módulos proprietários, política temporal/snapshot, publicação e versionamento íntegros, catálogo de erros e testes do SRV-A107-003.
- `ELEGIVEL_PARA_AUTORIZACAO` **não** significa `MARCO_A_AUTORIZADO`; a decisão pertence ao Administrador da Plataforma.
- A aprovação da DEC-A107-003 não declara testes automatizados do serviço executados nem autorização para produção.

## Próximo passo

Detalhar **DEC-A107-004 — contratos de consulta de evidências com módulos proprietários**, incluindo formato de resposta, fonte autoritativa, prova de completude, vigência temporal, correlação e tratamento de insuficiência.
