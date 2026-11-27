# DEC-A107-001 — Representação das Condições Ontológicas de Realização

**Módulo:** A107-EOB — Estrutura Organizacional de Base  
**Situação:** HOMOLOGADA pelo autor  
**Data:** 26/11/2026  
**Aplicação:** INC-001 e futuras verificações por âmbito operacional da Plataforma CIVITAS  
**Fonte:** discussão da especificação técnica A107-EOB v0.1; UC-CIV-001, UC-CIV-003, UC-CIV-006; Mapa de Domínios e Módulos v0.5; CIV-ESP-TPL v0.4.

## Decisão homologada

A Plataforma CIVITAS adotará **arquivos Markdown (`.md`) como formato canônico de representação das Condições Ontológicas de Realização**, combinando documentação semântica e fundamentação em linguagem natural com metadados e requisitos verificáveis estruturados em **YAML**, por exemplo, em cabeçalho *front matter*.

O módulo **A107-EOB** será responsável pela validação, interpretação estruturada e execução dessas condições mediante um vocabulário controlado de propriedades e operadores previamente definidos, consultando os módulos proprietários das informações e preservando a versão, a proveniência, as evidências e os resultados de cada verificação.

A interpretação em linguagem natural poderá ser apoiada por IA, mas **não substituirá a avaliação verificável dos critérios estruturados**.

## Consequências arquiteturais

1. O arquivo `.md` possui conteúdo explicativo legível por pessoas e uma seção estruturada apta ao processamento automático.
2. Condições, âmbitos de aplicação, versões, fontes e requisitos deverão ter identidade controlada e referências rastreáveis.
3. O motor não executará código arbitrário embutido em Markdown ou YAML; aceitará somente propriedades, operadores e estruturas reconhecidos e validados.
4. Os valores de evidências serão obtidos dos módulos responsáveis pela informação, não presumidos pela mera existência de declarações textuais.
5. Cada verificação preservará a referência à versão exata, preferencialmente com hash do arquivo, e às evidências consultadas.
6. A verificação do A107-EOB não substitui a autorização técnica do Marco A pelo Administrador da Plataforma e não constitui, isoladamente, efeitos jurídicos.
7. Os resultados deverão preservar historicidade e reproduzibilidade, inclusive quando modelos e regras forem atualizados.
8. O mecanismo deverá respeitar a distinção entre condições **atendidas, não atendidas, indeterminadas e não aplicáveis**, sendo esta última sujeita à justificativa válida e não uma dispensa arbitrária de requisitos.

## Estrutura indicativa de arquivo

```markdown
---
id: CM-01
nome: Identidade Institucional
ambito: MARCO_A
versao: "1.0"
modulo_verificador: A107-EOB
requisitos:
  - id: REQ-01
    propriedade: identidade_institucional
    operador: existe
  - id: REQ-02
    propriedade: fundamento_constitutivo
    operador: verificavel
  - id: REQ-03
    propriedade: posicao_institucional
    operador: existe
---

# CM-01 — Identidade Institucional
## Fundamentação
...
## Condição de realização
...
## Evidências
...
```

**Atenção:** o exemplo é ilustrativo: identificadores internos de requisitos, propriedades, operadores e o esquema YAML ainda **não foram homologados**.

## Próxima especificação

Definir o **vocabulário controlado de propriedades, operadores, tipos de evidência e regras de composição**, começando pelas condições CM-01 a CM-04 do Marco A. Em seguida, especificar validação de esquema, contratos `SRV-A107`, dados persistidos, erros `A107T9999` e testes `TST-A107` segundo o template CIV-ESP-TPL v0.4.

**Limite da homologação:** fica aprovado o formato Markdown com requisitos verificáveis em YAML e a separação entre fundamentação textual, motor determinístico e assistência por IA. Não estão aprovados ainda a gramática final, o catálogo de operadores, o contrato físico nem a implementação.
