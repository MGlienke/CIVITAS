# A103-GEP — T3: Fronteira de confiança (laboratório)

**Versão T3 / 27-11-2026. Escopo: segurança arquitetural implementada para SIMULAÇÃO. Não é autenticação institucional real.**

## Conexão aos Casos de Uso

- **UC-CIV-004**: condiciona a publicação de uma versão simulada a uma decisão verificável de laboratório e a uma declaração de origem, também simulada.
- **UC-CIV-005/006**: dependem do cadastro/autorização de Pessoas e competências reais; **não** implementados aqui.
- **UC-CIV-007**: acreditação pública e IDUP ainda não implementados; o T3 **não** os substitui.
- **UC-CIV-003**: A107 permanece separado; não há fonte CE-01 real.

## Entrega técnica

`src/confianca-t3.js` implementa:
- Verificação de assinaturas **Ed25519** de dois emissores distintos, cujas **chaves públicas são injetadas**. Algoritmo fixo, sem `alg` escolhido pelo token; nenhuma chave privada ou segredo no repositório.
- **Atestado de autorização:** principal de teste, finalidade `CS04_T3_TEST`, operação `publicar_simulacao`, recurso, hash canônico do comando, emissor, público destinatário e janela temporal.
- **Atestado de proveniência:** origem/referências de prova e seus hashes, assinado separadamente pela fonte fictícia de teste.
- **Política de negação por padrão:** assinatura inválida/expirada, emissor desconhecido, audiência incorreta, fonte incorreta, prova alterada, organização diferente ou comando alterado geram `A103T3E0001`, **sem consultar banco**.
- Ponte para o publicador PostgreSQL **T2 SIMULADO**, sem aceitar `principal_id` autodeclarado no corpo do comando como autoridade; a identidade usada na persistência vem do atestado verificado.

Os testes **criam suas próprias chaves efêmeras em memória**, sem dados institucionais. `tests/confianca-t3.test.js` cobre 16 cenários negativos/positivos. `tests/integration-confianca-t3.test.js` executa caso adicional em PostgreSQL 18 temporário quando variáveis de CI estão configuradas.

## O que NÃO está demonstrado

1. **C103-IEA real:** não existe emissor institucional autenticado/integrado neste incremento. Assinatura válida de chave de teste **não prova** competência, representação jurídica, IDUP ou qualidade de servidor público.
2. **Proveniência real:** assinaturas da fixture atestam somente qual processo de teste criou os campos, não autenticidade das referências a documentos ou custódia do C301.
3. **Impossibilidade de bypass institucional:** o T2 continua possuindo interface de simulação e ambiente de teste habilitável por variável; o T3 é uma **fachada voluntária de laboratório**, não perímetro de segurança de produção. Para produção, APIs externas terão de expor somente os comandos autorizados e bloquear acesso direto à persistência por privilégio de banco e arquitetura.
4. **Revogação e replays:** não há fonte real de revogação/rotação, store distribuído de `jti`, política operacional de retenção ou vínculo ao canal mTLS. Idempotência do T2 não equivale a prevenção de replay de tokens.
5. **Marco A:** autorização e publicação de registro continuam distintas. Testes não são evidências jurídicas nem autorização de Marco A.

## Testes

```powershell
cd C:\CIVITAS\CIVITAS-repo\plataforma\a103-gep
npm install
npm test
```

Testes PostgreSQL são opcionais localmente e correm no CI com PostgreSQL 18 temporário em modo `SIMULADO`, a partir de `.github/workflows/a103-t2-postgres-ci.yml`.

**Critério para um T3 institucional futuro:** exigir contrato C103-IEA, prova efetiva de identidade e escopo de competência; aprovar política por operação, por organização, com revogação, transporte autenticado, logging, prevenção de replay, isolamento de credenciais e validação de fonte probatória independente; integração ponta a ponta real apenas depois dessas condições. **Não converter este T3 em autorização institucional por troca de flags.**
