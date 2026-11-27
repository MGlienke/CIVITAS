# CIVITAS T5 — Laboratório EOT/ENT (UC-CIV-001/002/003)

**Status:** protótipo independente, exclusivamente `SIMULADO`, sem integração operacional com A107-EOB, A108-BDN ou A103-GEP. **Não está homologado como contrato de importação CIVITAS definitivo.**

## O que é

Primeiro recorte executável para preparar a importação conjunta e conferir:
- EOT conforme um vocabulário/metamodelo de **fixture** (identificação de tipos, relações, raiz Estado, referências existentes);
- ENT associada à EOT e sua versão, contendo exigências abstratas para tipos/relações que requerem fundamentação;
- referências de tipos/relações ao catálogo semântico de laboratório;
- emissão de diagnósticos e bloqueio do catálogo até verificação;
- imutabilidade da versão importada, idempotência, conflito em alteração e proteção quando houver vínculos simulados.

O formato `CIVITAS-T5-LAB-1` **é apenas um formato exploratório**: não substitui o modelo tipológico MT-BR, o Metamodelo Organizacional nativo, a Ontologia de Referência, o serviço real de conformidade, a ENT completa, a ENI ou a fundamentação do A108.

## Executar

```powershell
cd C:\CIVITAS\CIVITAS-repo\plataforma\a107-modelos-lab
npm test
```

Sem dependências, SQL, serviços externos, conexão com A107 ou dados institucionais.

## Matriz de rastreabilidade

| UC | Decisão refletida no ensaio | Limitação |
|---|---|---|
| UC-001 | EOT externa, conformidade anterior à disponibilidade, versão imutável, bloqueio de substituição quando vinculada | Metamodelo **fictício** de laboratório; sem importador oficial e sem aplicativo offline |
| UC-002 | Importação conjunta EOT/ENT, exigências associadas a tipos/relações, compatibilidade e completude preliminares | Sem normas concretas, ENI, A108 ou julgamento de suficiência jurídica |
| UC-003 | Vocabulário comum e referências de conceitos/relações | **Não** analisa semanticidade ontológica substantiva nem determinação institucional progressiva |

**Segurança:** nenhum dado com `ambiente: REAL` é aceito. Os hashes não provam autoria, autenticidade jurídica ou integridade contra um agente capaz de adulterar o catálogo em memória. O catálogo não é persistente, não tem identidade/autorização institucional e não cria organizações concretas.

O próximo incremento deve integrar modelos de referência **homologados** e versionados com verificador semântico real, preservar trilha e aplicar controles de autoria/publicação e armazenamento durável antes de fazer qualquer ligação com CE-01 ou CS-04.