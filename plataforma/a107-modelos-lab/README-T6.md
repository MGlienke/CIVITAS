# T6 — Referência computacional da Ontologia CIVITAS v20

**Recorte de UC-CIV-001/002/003 — implementação de laboratório, NÃO homologação de contrato final ou conclusão dos UC.**

## Fonte real efetivamente utilizada

- Arquivo do projeto na Biblioteca: **`CIVITAS - Rede Ontologica - v20.md`**, identificado internamente como rede semântica consolidada dos Capítulos 1 a 10, expansão conceitual e relacional aprovada.
- Nesta etapa, foram lidas as **4.153 linhas** da fonte e extraídos diretamente:
  - **158 conceitos** com códigos `CON-001` a `CON-158`, seus nomes e identificadores textuais;
  - **247 relações distintas** do bloco de rede consolidada (seção 5), excluído exemplo de sintaxe; extremos conferidos contra a lista de conceitos.
- Extração em `referencias/ontologia_v20_extracao_t6.json`, com nome/versão e indicação de que o conteúdo é um **derivado técnico**, não uma nova decisão ontológica.
- **Limitação de proveniência:** o arquivo Markdown fonte completo ainda não integra o repositório Git; a extração não possui, nesta etapa, atestado criptográfico da fonte original. Seu digest de extração é computado na execução. A publicação do derivado não substitui a gestão canônica de versões nem a auditoria editorial.

## O que T6 implementa

`src/referencia-v20.js` indexa `CON-xxx` e identificadores estáveis, confere referências dos tipos EOT a conceitos existentes, confere relações EOT como triplas exatas existentes na seção 5 da rede v20, testa referência conjunta à mesma versão EOT/ENT e presença de exigências abstratas associadas. Falhas geram diagnóstico e impedem a aceitação no laboratório.

A fixture de teste agora usa **referências da fonte real** (por exemplo `CON-005: estado`, `CON-010: ente_federativo`, `CON-011: administracao_publica`, `CON-012: entidade_publica`) e triplas da rede, não nomes inventados.

**Distinção crítica:** uma tripla da Ontologia representa relação conceitual. NÃO implica autorização para materializar automaticamente uma relação organizacional concreta, nem comprova a conformidade completa de EOT/ENT, a pertinência/suficiência de norma jurídica, vigência, competência, ato constitutivo ou autorização do Marco A.

## Pendências necessárias para conclusão real do T6

1. **Metamodelo Organizacional nativo:** ainda não localizado como artefato técnico computacional homologado no repositório; narrativa UC-001 aprova sua existência e papel, mas não equivale ao esquema executável.
2. **MT-BR:** a Biblioteca contém uma matriz `CIVITAS_MT_BR_Matriz_Relacoes_Restricoes_v0_1.xlsx`; versão/conteúdo/homologação e compatibilidade precisam ser avaliados separadamente; **não** foi transformada automaticamente em EOT homologada.
3. **Ontologia v20:** registrar a fonte original com hash e processo de atualização controlado antes de promovê-la a referência computacional de produção; revisão humana das 247 relações e de sua interpretação.
4. **A108-BDN/ENT/ENI:** nenhum mecanismo real de fundamentação jurídica ou norma concreta foi integrado.
5. **C103-IEA:** não há autorização institucional para importar/publicar modelos reais; a demonstração só aceita `SIMULADO`.
6. **Integração operacional:** não altera A107-EOB v0.3.0 ou A103; não habilita CE-01, CM-01 nem Marco A.

## Executar

```powershell
cd C:\CIVITAS\CIVITAS-repo\plataforma\a107-modelos-lab
npm test
```

O pipeline existente `.github/workflows/a107-modelos-t5-ci.yml` executa regressão T5 e testes T6 em Linux e Windows. Sem banco, credenciais, serviços externos ou dados reais.
