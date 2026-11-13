# CIVITAS — C105-MSG — INC-C105-001

Implementação inicial Node.js do SRV-C105-001: registro de comunicações com PostgreSQL e Transactional Outbox. Não disponibiliza mensagens, não resolve representantes e não produz ciência ou efeitos jurídicos.

## Instalação local (Windows PowerShell)

Pré-requisitos: Node.js 22+, PostgreSQL em execução e uma base de desenvolvimento isolada. Não versionar credenciais.

```powershell
cd .\modules\C105-MSG
npm install
npm test
npm run check

# Defina a conexão apenas na sua sessão local:
$env:DATABASE_URL = "postgresql://USUARIO:SENHA@127.0.0.1:5432/civitas_plataforma"
npm run migrate
Remove-Item Env:DATABASE_URL
```

**Atenção:** substitua USUARIO/SENHA por credenciais locais e evite imprimir a connection string; senhas com caracteres especiais precisam de URL-encoding. Crie o banco antes da migração e nunca execute migração sem revisar seu destino.

## Contratos

`createRegistrarComunicacao` requer portas `repository`, `identity`, `people`, `services`, `documents`. Não existe endpoint público nesta versão. Identidade do chamador deve vir de fronteira confiável, nunca de declaração enviada pelo cliente. Os testes usam fakes; não os reutilize em produção.

## Garantias e limitações

Registro, evento histórico e outbox são persistidos em uma transação. Publicação da outbox é at-least-once. O publicador de exemplo mantém transação aberta durante transporte: evolução futura precisa de leases, backoff supervisionado e DLQ. LOG/MET/MON definitivos e integrações institucionais reais ainda não estão concluídos; módulo não está pronto para produção.
