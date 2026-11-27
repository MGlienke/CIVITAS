# ESP-A107-CE01-001 — Adaptador de evidências A103-GEP / CE-01

**Versão da especificação:** 0.1 — **PROPOSTA, NÃO HOMOLOGADA**
**Implementação contratual inicial:** branch `feature/a107-ce01-a103-v0.1`.
**Referência técnica estável:** `a107-eob-v0.2.0`.
**Consumidor:** A107-EOB, SRV-A107-003.
**Proprietário dos dados:** A103-GEP.
**Contrato lógico:** CE-01, definido em DEC-A107-004.
**Fundamento temporal:** DEC-A107-005.
**Escopo executável inicial:** CM01-R01, propriedade `identidade_institucional`, operador `existe`.

## 1. Decisão e fronteiras

A103-GEP é proprietário do fato institucional e das referências de evidência. A107-EOB interpreta fatos segundo o pacote MARCO_A, avalia requisitos/condições, registra resultados e no máximo identifica elegibilidade para autorização. A autorização efetiva é **ato distinto do Administrador da Plataforma**, jamais realizado pelo adaptador ou pelo motor de condições.

O adaptador é uma ponte entre `PortaIdentidadeA103` (fornecedor ainda não implementado) e `EvidenceProvider` (interface já existente em `src/contracts.ts`). **A presença de uma porta mock, ou o campo declarativo `fonte_autoritativa`, não prova autenticação, titularidade nem legitimidade da fonte real.** O vínculo institucional confiável precisará ser implementado e homologado no A103 e na infraestrutura de integração.

Esta proposta **não atribui identificador SRV ao A103**, nem altera o pacote de regras CM-01 a CM-04.

## 2. Contratos físicos TypeScript

```typescript
export interface PortaIdentidadeA103 {
  consultarIdentidadeInstitucional(
    consulta: ConsultaEvidencia,
    contexto: ContextoAutenticado
  ): Promise<ResultadoConsultaA103>;
}

export type ResultadoConsultaA103 =
  | { status: 'ENCONTRADO'; registro: RegistroIdentidadeA103 }
  | { status: 'NAO_LOCALIZADO'; consulta_completa: boolean; snapshot_fonte?: string }
  | { status: 'INDISPONIVEL' }
  | { status: 'NAO_AUTORIZADA' }
  | { status: 'ERRO' };

export class AdaptadorCe01A103 implements EvidenceProvider {
  readonly contrato = 'CE-01';
  consultar(
    consulta: ConsultaEvidencia,
    contexto: ContextoAutenticado
  ): Promise<RespostaEvidencia>;
}
```

Arquivo de implementação: `plataforma/a107-eob/src/adapters/a103-ce01.ts`. O contrato de fonte `RegistroIdentidadeA103` contém:

| Campo | Destino CE-01 | Regra |
|---|---|---|
| `organizacao_id` | `sujeito.referencia` e `fato.objeto.organizacao_id` | Igual ao contexto consultado |
| `registro_id` | `fatos[].fato_id` | Identificador estável e não vazio |
| `versao_registro` | `integridade.versao_fonte`, `temporalidade.versao_fonte`, `evidencias[].versao` | Não vazia |
| `referencia_evidencia` | `evidencias[].referencia_documental_ou_registro` | Referência, não cópia documental |
| `evidencia_id` | `evidencias[].evidencia_id` e `fatos[].evidencia_ids` | Vínculo obrigatório |
| `registrado_em` | `fatos[].registrado_em` e `evidencias[].registrado_em` | Não posterior a `conhecimento_ate` |
| `referencia_temporal` | `temporalidade.referencia_temporal` | Deve corresponder à consulta |
| `conhecimento_ate` | `temporalidade.conhecimento_ate` | Deve corresponder à consulta |
| `snapshot_fonte` | `temporalidade.snapshot_fonte` | Não vazio em resposta encontrada |
| `fonte_autoritativa` | `fonte_autoritativa` | Rótulo esperado `A103-GEP`; origem confiável ainda depende do canal |
| `consulta_completa` | `cobertura.consulta_completa` | Apenas escopo pontual; não garante universo completo |

## 3. Validação e composição

- A entrada CE-01 aceita apenas `CM01-R01`, `identidade_institucional`, sujeito `OrganizacaoInstitucional`, organização coincidente, contexto autorizado não autodeclarado e referências temporais válidas.
- Resposta encontrada somente é mapeada para fato utilizável se contiver versão, snapshot, referência documental, identidade coerente e data de registro compatível com o limite de conhecimento.
- `NAO_LOCALIZADO` **não** gera `NAO_ATENDIDA`: retorna fatos vazios e `universo_completo = NAO_COMPROVADO`.
- `INDISPONIVEL` e `ERRO` não produzem fatos; geram diagnósticos.
- `NAO_AUTORIZADA` provoca `A107E0002` na fronteira do adaptador. **Pendência:** o motor `avaliarComFontes` v0.2.0 captura genericamente exceções de fontes e transforma em requisito indeterminado. Antes de acoplar fonte real, implementar propagação/negação de autorização e seus testes de ponta a ponta; não declarar segurança de autorização homologada.
- Mesmo quando CM01-R01 for `ATENDIDA`, demais condições pendentes mantêm MARCO_A `INDETERMINADA` e `VERIFICACAO_PENDENTE`; nunca autorização.

**Limitação temporal importante:** igualdade de timestamps e `registrado_em <= conhecimento_ate` não provam validade jurídica histórica nem ausência de revogação. A primeira etapa restringe-se à prova referencial de existência. Critérios de vigência e relacionamentos exigirão verificadores especializados.

## 4. Testes candidatos (executáveis localmente)

O arquivo `tests/ce01-a103.test.ts` cobre:
- TST-A107-CE01-001: registro identificado, versionado e com evidência referencial;
- TST-A107-CE01-002: organização divergente não gera fato utilizável;
- TST-A107-CE01-003: consulta sem registro não se converte em prova negativa;
- TST-A107-CE01-004: indisponibilidade/erro não criam evidências;
- TST-A107-CE01-005: `NAO_AUTORIZADA` recusada pela fronteira do adaptador;
- TST-A107-CE01-006: requisito ou contexto incongruente rejeitado;
- TST-A107-CE01-007: registro posterior a `conhecimento_ate` recusado como evidência;
- TST-A107-CE01-008: CM01-R01 pode ser atendida sem conceder elegibilidade/autorização do Marco A.

Estes testes utilizam **fonte contratual simulada**. São aceites preliminares de mapeamento, não prova do serviço proprietário A103 real. IDs de testes ainda sujeitos à conferência no catálogo.

## 5. Critérios para a próxima integração real

1. Especificar e homologar a interface proprietária de A103-GEP (serviço, esquema, autenticação, escopo e política de autorização).
2. Implementar transporte confiável e validação de proveniência, temporalidade histórica e integridade do registro no A103.
3. Propagar acesso negado fora de `avaliarComFontes` sem confundi-lo com ausência de registro.
4. Definir validação runtime do envelope `RespostaEvidencia` mais estrita que os tipos estáticos.
5. Executar testes integrados com fonte real e registros de prova legítimos, com autorização formal e rastreabilidade.
6. Manter o A107 sem poder de autorizar Marco A.

**Status da entrega:** implementação e testes de contrato criados na branch para validação; nenhum teste desta branch foi ainda comprovado por execução local ou CI, nem mesclado à `main`.
