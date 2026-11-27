# A103-GEP — Protótipo técnico T1 (somente simulação)

**Não é serviço operacional, não é CE-01 real, não constitui organização juridicamente, não autentica usuários e não autoriza o Marco A.**

Objetivo: exercitar em memória invariantes das especificações homologadas ESP-A103-CS04-001, ESP-A103-DAT-001 e DEC-A103-001, **sem antecipar a homologação pendente da ESP-A103-CS04-002 (PR #7)**.

Executar com Node.js >=22:

```sh
cd plataforma/a103-gep
npm test
```

- Apenas biblioteca padrão Node.js; sem dependências, SQL, rede ou serviços externos.
- Entradas e saídas são marcadas `SIMULADO` e `simulacao:`; **não podem alimentar evidências reais**.
- O campo `permitir_publicacao_simulada` é recurso **exclusivo de teste**, não autorização institucional ou integração C103-IEA.
- Testa propostas, publicação simulada, identidade, versões, concorrência lógica, idempotência e ausência como prova negativa.
- **Não** testa persistência durável, atomicidade SQL real, snapshots bitemporais completos, recuperação documental, controle de acesso institucional, verificação integral de CM-01 a CM-04 ou conclusão do UC-004.

Próximos marcos: homologar decisões físicas pendentes, executar transações reais em PostgreSQL isolado e integrar a fronteira de autenticação confiável, sem promover mocks a produção.
