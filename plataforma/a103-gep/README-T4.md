# T4 — Integração A103 → CE-01 → A107 (laboratório SIMULADO)

**27/11/2026 — implementação candidata. Não demonstra a conclusão do UC-CIV-004 ou autorização de Marco A.**

Este incremento integra **módulos reais executáveis**, mas os fatos, os atestados de origem e as permissões são **exclusivamente de teste**. Sem pessoas acreditadas por UC-007, sem C103-IEA, sem cadeia de custódia real e sem normas autoritativas.

## Fluxo verificável

1. No PostgreSQL 18 **temporário da CI**, aplica-se manualmente a migração isolada T2 no schema `a103`.
2. Publica-se uma **versão simulada** pelo publicador transacional T2, com manifesto e referências aos custodiantes fictícios.
3. A porta de laboratório `PortaIdentidadeA103Laboratorio` consulta **somente** versões marcadas `SIMULADO`, com `conhecimento_ate` e contexto de teste validado por função injetada; não aceita fonte sem guardas.
4. A porta retorna exatamente a forma discriminada `ResultadoConsultaA103`, com `evidencia_id` referindo-se ao **manifesto sob responsabilidade A103**, não ao documento externo.
5. O `AdaptadorCe01A103` homologado da versão A107 v0.3.0 gera fato e evidência referencial; `avaliarComFontes` executa o pacote MARCO_A **sem persistir resultado no A107**.
6. Na demonstração, `CM01-R01` pode estar **ATENDIDA apenas no contexto de simulação**, enquanto as demais condições permanecem **INDETERMINADA** e a elegibilidade **VERIFICACAO_PENDENTE**. **Nunca** tratar a avaliação simulada como evidência institucional real nem como autorização.

## Controles e testes

- `A103_T2_TEST_ONLY=1` e `A103_T4_LAB_ONLY=1` são necessários; sem ambos a porta de leitura nega acesso.
- Nenhum endpoint de produção é publicado. A guarda injetada é uma fixture de laboratório, **não** autenticação confiável nem autorização institucional.
- A leitura usa transação `REPEATABLE READ READ ONLY`, reconstrução conservadora restrita à versão publicada e hash do conjunto de referências. **Não implementa** temporalidade jurídica bitemporal completa.
- Para consulta referente a instante **anterior à publicação**, a fonte **não** afirma existência jurídica pretérita.
- A resposta `NAO_LOCALIZADO` declara `consulta_completa:false`; não pode gerar prova negativa.
- O status `NAO_AUTORIZADA` é propagado pelo A107 como `A107E0002`, interrompendo a avaliação.
- A CI `.github/workflows/a103-t4-ce01-a107-ci.yml` compila o **A107 existente sem alterá-lo**, cria PostgreSQL 18 efêmero, executa todos os testes A103 com T4-PG ativo e executa a regressão A107.

## Rodar somente em desenvolvimento isolado

No GitHub Actions o banco temporário é criado automaticamente. **Não executar o script SQL no banco operacional ou schema a103 existente**. O usuário não precisa alterar seu banco local.

**Limitações explícitas:** este ensaio **não** atesta autenticidade/validade da organização, não confere competência nem custódia documental original, não executa o fluxo real de CS-04, não faz auditoria institucional da leitura e não publica resultados no A107. T4 só autoriza discussão técnica do contrato e da integração, não a conclusão do UC-004, UC-006 ou Marco A.

A proposta documental de persistência A103, PR #7, continua não homologada e independente.
