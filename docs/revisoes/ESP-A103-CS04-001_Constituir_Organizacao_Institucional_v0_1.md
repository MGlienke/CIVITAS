# ESP-A103-CS04-001 — Constituição e Registro de Organização Institucional

**Versão:** 0.1 — **HOMOLOGADA pelo autor em 27/11/2026** (especificação funcional e transacional, sem implementação)  
**Data:** 27/11/2026  
**Módulo proprietário:** A103-GEP  
**Contrato de referência:** CS-04 — Constituir Organização Institucional (ID lógico editorial da Matriz de Componentes e Contratos de Serviços v0.1)  
**Casos de uso:** UC-CIV-004; interdependências com UC-CIV-001/002/003/005/006  
**Incremento de referência:** INC-001 — Constituição e Habilitação Inicial  
**Artefatos-base homologados:** DEC-A103-001 v0.1; ESP-A103-DAT-001 v0.1; ESP-A103-CE01-001 v0.1; DEC-A107-004/005 v0.1; condições CM-01 a CM-04 v0.1.  
**Consumidor evidencial:** A107-EOB v0.3.0, contrato CE-01, inicialmente CM01-R01.  
**Caráter:** especificação funcional e transacional candidata, **sem implementação, DDL, migrações ou endpoint**.

## 1. Finalidade e distinções fundamentais

Especificar como o A103 poderá **registrar/constituir em sua representação computacional uma instância de Organização Institucional**, com identidade estável, proveniência, ato/procedimento de origem e versionamento, tornando uma versão publicada apta a fornecer evidência ao CE-01.

São proposições **distintas**:
1. **Constituição jurídica:** decorre dos atos, competências e fundamentos exigíveis; a operação computacional do A103 não cria, por si só, uma pessoa jurídica, órgão, competência ou efeitos jurídicos.
2. **Constituição registral no CIVITAS:** a operação CS-04 cria ou vincula, sob controle competente, a identidade `organizacao_id` e o primeiro registro/versão da representação institucional.
3. **Publicação de versão do registro:** torna um estado autoritativamente rastreável e consultável por CE-01; publicação não equivale a autorização de Marco A.
4. **Verificação ontológica:** competência do A107-EOB; CM01-R01 verifica a existência referencial, enquanto CM01-R02 a R05 exigem fontes/condições distintas.
5. **Autorização institucional do Marco A:** decisão separada do Administrador da Plataforma; não é efeito colateral de CS-04 nem da verificação A107.

**Decisão de desenho proposta:** CS-04 é a **operação proprietária de escrita e controle de publicação** do A103. CE-01 é leitura de evidências; nunca escreve nem constitui organização.

## 2. Delimitação funcional

**Incluído:** recepção de solicitação autenticada, conferência de legitimidade, resolução prévia de identidade, apresentação de referências constitutivas, validação da integridade dos dados e evidências, preparação de uma versão, aprovação de publicação por principal autorizado, publicação indivisível de identidade/versão/manifesto/evento local de registro, rastreabilidade e retorno das referências produzidas.

**Não incluído:** elaborar atos normativos, conferir vigência jurídica independentemente do módulo competente, instituir o Ente, criar estrutura organizacional de primeiro nível (C302-EOR), criar competências (C309-NEC), gerir Pessoa/IDUP, reconhecer Mandatário/GOI, habilitar cliente/autorizar Marco A (CS-05), criar documento público original pertencente a outro custodiante, ou alterar CM-01 a CM-04.

**Dependências:** consulta a referências EOT de A107 e normativas A108 quando necessárias; decisões de legitimidade do chamador e da autoridade publicadora com C103-IEA/infraestrutura confiável, ainda não especificada fisicamente; fontes e custodiantes de documentos, inclusive C301-RDI quando implementado. Dependências ausentes não se presumem realizadas.

## 3. Identificadores e operações candidatas

**Identificador documental:** `ESP-A103-CS04-001`, sujeito à governança do catálogo A103.  
**Identificador definitivo de serviço SRV:** **pendente** de inspeção/atribuição no catálogo de módulos, para evitar colisão; CS-04 continua sendo identificador lógico editorial, não endpoint nem serviço já existente.

Operações lógicas propostas dentro de CS-04 (nomes ainda não vinculantes):
- **PrepararRegistroInstitucional:** validar a solicitação e criar proposta versionada **não publicável por padrão**.
- **ExaminarIdentidadeEProveniencia:** analisar identidade existente/duplicidade, origem e referências essenciais.
- **AutorizarPublicacaoDeVersao:** decisão de um principal efetivamente legitimado para publicação, distinto da autorização do Marco A; escopo e competência sujeitos a contrato de confiança.
- **PublicarVersaoInstitucional:** registrar indivisivelmente uma versão evidencial apta a CE-01 após todas as pré-condições.
- **RetificarRegistroInstitucional:** criar nova versão ligada à anterior, mediante causa e autorização específicas, jamais reescrita destrutiva.
- **ConsultarEstadoDaSolicitacao:** ler estado e resultados da tentativa sem modificar a organização.

Essas operações podem ser implementadas por um serviço com diversos comandos, não implicando microserviços/endpoints separados. A numeração definitiva de SRV e CAP/FND/CAS/OBJ/INV/REG/RFU/RNF/LOG/MET/MON seguirá o template e catálogo homologados quando conferidos.

## 4. Objetos de entrada e saída

### 4.1 Solicitação lógica de constituição

| Campo | Requisito | Semântica |
|---|---|---|
| `solicitacao_id` | Obrigatório | Correlação e idempotência da tentativa |
| `correlation_id` | Obrigatório | Encadeamento entre operações e auditoria |
| `origem_procedimento` | Obrigatório | Procedimento/ato/fluxo que justifica registrar a organização |
| `contexto_autorizacao` | Obrigatório | Referência ao contexto **validado pela infraestrutura**, não autodeclaração |
| `proponente_referencial` | Obrigatório | Identificação confiável do responsável pela proposta |
| `organizacao_existente_id` | Condicional | Referência prévia quando se tratar de correção/versão, não novo registro |
| `identificadores_institucionais` | Condicional | Referências externas auxiliares, jamais identidade automática |
| `tipo_eot_referencial` | Condicional | Tipo/modelo proposto, sob autoridade do A107 |
| `ente_e_relacoes_referenciais` | Condicional | Vínculos propostos sem presumir validade ou posicionamento comprovado |
| `referencias_normativas` | Condicional | Fontes normativas verificáveis por A108, conforme ato/procedimento |
| `referencias_probatorias` | Obrigatório para publicação | Evidências com procedência, custodiante e escopo |
| `ocorrido_em` / `vigente_desde` | Condicional | Instantes jurídico-institucionais quando sustentados, nunca deduzidos de registro técnico |
| `motivo_alteracao` / `versao_base` | Obrigatório na retificação | Cadeia explícita de mudança |
| `modo_evidencia` | Obrigatório | Distingue dados de simulação/teste de evidência institucional legítima |

Os campos são **lógicos**, não payload de API física homologado; não transportar credenciais ou documentos originais por padrão.

### 4.2 Resultado lógico

| Resultado candidato | Semântica |
|---|---|
| `PROPOSTA_REGISTRADA` | Preparação persistida sem efeito público/CE-01 |
| `PENDENTE_VALIDACAO` | Há dúvidas de identidade, origem, competência, versão ou prova |
| `PENDENTE_PUBLICACAO` | Proposta consistente aguardando autorização específica para publicação |
| `PUBLICADA` | Identidade/versão/manifesto/evento local publicados de forma consistente |
| `REJEITADA` | Recusa rastreável por autoridade/procedimento competente |
| `CONFLITO` | Duplicidade, versão-base alterada, idempotência divergente ou integridade inconciliável |
| `NAO_AUTORIZADA` | Falha de legitimidade/escopo; sem revelação de dados protegidos |
| `ERRO` | Erro técnico sem publicação parcial |

Para `PUBLICADA`, retornar pelo menos `organizacao_id`, `registro_id`, `versao_registro`, `manifesto_id`, `manifesto_versao`, `referencia_evidencia`, `registrado_em`, `correlation_id` e referência auditável ao evento local. **Esses estados pertencem a CS-04, não ao enum da porta CE-01 do A107.**

## 5. Máquina de estados candidata

`PROPOSTA` → `EM_VALIDACAO` → `AGUARDANDO_PUBLICACAO` → `PUBLICADA`.

Alternativas: `EM_VALIDACAO` → `PENDENTE_SANEAMENTO` → `EM_VALIDACAO`; proposta → `REJEITADA`; conflito/erro técnico não publica versão.

- Cada transição relevante deve ter `principal_referencial`, instante de registro, motivo, contexto autorizado e correlação.
- Retificação de registro **publicado** produz **nova proposta e versão**, sem voltar a versão publicada ao estado de rascunho ou apagar a anterior.
- Exclusão/desconstituição da organização, sucessão ou transformação são operações institucionais distintas, com regras próprias ainda não especificadas; não implementar por alteração direta de um campo `situacao`.
- **Publicação não é autorização do Marco A.** A organização pode ter registro publicado e verificações restantes pendentes.

## 6. Identidade, unicidade e controle de concorrência

1. Executar resolução contextual de identidade **antes** de criar novo `organizacao_id`. Nome, sigla, CNPJ, código e IDUP **não** são chaves naturais suficientes para deduplicação automática.
2. Se houver candidato preexistente, não criar nova organização nem mesclar silenciosamente; solicitar decisão contextual competente com vínculo ao conjunto de candidatos.
3. Usar identificadores opacos estáveis criados pelo A103 apenas para novo registro validamente autorizado; em atualização, manter `organizacao_id`, `registro_id` conforme a cadeia aprovada, produzindo `versao_registro` distinta.
4. Operações concorrentes sobre a mesma identidade/registro devem ter pré-condição de `versao_base` e detecção de conflito; não permitir publicação dupla conflitante por corrida.
5. `solicitacao_id` e representação canônica do comando identificam idempotência; repetir mesmo comando autorizado recupera o resultado anterior. Mesma chave com conteúdo distinto provoca conflito.
6. A identidade não pode ser atribuída ao documento de prova nem ao manifesto probatório.

**Pendência de aprovação:** a regra exata da relação entre `registro_id` e `organizacao_id` em casos de transformação/sucessão; não estabelecer equivalência física até definir os casos jurídicos aplicáveis.

## 7. Validação de origem, prova e publicação

Antes de uma versão ser publicável:

- **Autoridade:** autenticar o solicitante e verificar autorização para propor ou publicar segundo organização, procedimento, competência e escopo; não permitir autorização exclusivamente autodeclarada.
- **Proveniência:** exigir referência resolúvel ao procedimento/ato que fundamenta o registro, indicação do originador, versão e cadeia mínima de responsabilidade.
- **Identidade:** verificar ausência de conflito de identidade não resolvido e versão-base correta.
- **Referências:** validar integridade e possibilidade de resolução dos itens essenciais e seus respectivos custodiantes, sem duplicar documentos por padrão.
- **Manifesto agregado:** preparar manifesto versionado A103 com `manifesto_id`, `versao`, referência da versão do registro e itens probatórios, contendo identificador, custodiante e escopo de cada prova; **custódia A103 refere-se ao manifesto**, não aos documentos externos.
- **Temporalidade:** registrar `ocorrido_em`, `registrado_em` e intervalos pertinentes sem confundir tempo de efeitos jurídicos com registro; nenhuma retrodatação de `registrado_em`.
- **Publicação controlada:** somente a transição aprovada publicará a identidade/versão/manifesto; propostas e mocks não são retornados como evidência institucional real por CE-01.

Uma checagem de proveniência/integridade pela fonte **não é juízo suficiente de conformidade jurídica** nem substitui CM01-R02–R05.

## 8. Atomicidade e integridade transacional

**Regra candidata:** a operação de publicação deve ser indivisível no âmbito dos recursos transacionais proprietários do A103:

1. Revalidar autorização, identidade, versões de base e pré-condições imediatamente antes da publicação.
2. Consolidar `organizacao_id` (quando novo), `registro_id`, versão imutável, vínculo ao manifesto probatório e decisão de publicação.
3. Persistir registro auditável/evento local de publicação na mesma unidade de consistência, com mecanismo transacional/outbox **a definir na especificação física**.
4. Confirmar a operação somente quando as referências internas obrigatórias estiverem consistentes.
5. Diante de falha, abortar sem versão parcialmente publicável; permitir reprocessamento idempotente, preservando trilhas técnicas apropriadas.

**Não assumir transação distribuída** com A107, A108, C301, C103 ou E302; suas referências/validações terão versões e instantes próprios. O A103 não poderá declarar uma prova externa íntegra por simples commit local.

## 9. Historicidade e relação com CE-01

Cada versão publicada preserva `registrado_em` e uma referência a atos/ocorrências e efeitos quando comprováveis. A posterior retificação gera nova versão com causa explícita e sua própria data de registro.

A consulta CE-01 utiliza **duas coordenadas**: `referencia_temporal` (realidade examinada) e `conhecimento_ate` (informação conhecida até). O serviço de leitura A103 selecionará estado/snapshot reproduzível respeitando esse limite.

Para CE-01 inicial, uma resposta `ENCONTRADO` deverá corresponder a versão publicada, com `organizacao_id`, `registro_id`, `versao_registro`, `evidencia_id` do manifesto, referência resolúvel, `snapshot_fonte`, `registrado_em` não posterior a `conhecimento_ate`, e coerência dos dois instantes. A porta física homologada A107 v0.3.0 permanece intocada.

**Restrições:** ausência de registro não prova inexistência jurídica; versão publicada não comprova integralmente validade da organização; manifesto não substitui custódia original. Falhas de reconstrução/recuperação de evidência essencial não serão promovidas a `ENCONTRADO` conclusivo.

## 10. Regras funcionais e invariantes candidatos

| Código candidato | Regra |
|---|---|
| RFU-A103-CS04-001 | Preparar proposta não torna versão consultável por CE-01 |
| RFU-A103-CS04-002 | Atribuição de identidade nova requer resolução prévia de unicidade contextual |
| RFU-A103-CS04-003 | Publicar exige decisão/escopo de autoridade legítima |
| RFU-A103-CS04-004 | Publicação cria versão e manifesto probatório vinculados |
| RFU-A103-CS04-005 | Retificação cria versão nova e conserva anterior |
| RFU-A103-CS04-006 | Repetição do mesmo comando é idempotente; divergência gera conflito |
| INV-A103-CS04-001 | Não existem duas publicações concorrentes e incompatíveis de mesma versão-base |
| INV-A103-CS04-002 | Identidade estável não muda por alteração de denominação |
| INV-A103-CS04-003 | Toda versão publicada conserva origem e prova referencial recuperáveis |
| INV-A103-CS04-004 | Dados simulados/rascunhos nunca alimentam CE-01 institucional real |
| INV-A103-CS04-005 | `registrado_em` não é reescrito para produzir efeitos pretéritos |
| INV-A103-CS04-006 | Publicação e avaliação de CM-01 não concedem Marco A |

**IDs propostos:** precisam de conferência de catálogo para numeração definitiva. Nenhum código `SRV-A103-NNN` foi atribuído.

## 11. Catálogo inicial de falhas e observabilidade

| Falha candidata | Semântica | Efeito |
|---|---|---|
| `ACESSO_NEGADO` | Chamador sem contexto/escopo válido | Sem divulgação de existência, nenhuma publicação |
| `IDENTIDADE_AMBIGUA` | Duplicidade não resolvida | Suspende publicação e exige decisão |
| `VERSAO_CONCORRENTE` | Versão-base não corresponde ao estado vigente | Conflito sem sobregravação |
| `PROVENIENCIA_INSUFICIENTE` | Origem/competência não verificáveis | Não publicar |
| `EVIDENCIA_INDISPONIVEL` | Peça essencial não recuperável | Não publicar versão probatória real |
| `INTEGRIDADE_DIVERGENTE` | Manifesto/registro não conciliável | Falha auditável, sem publicação parcial |
| `IDEMPOTENCIA_DIVERGENTE` | Mesma chave, comando distinto | Conflito, sem segundo efeito |

**Não foram homologados códigos físicos de erro A103.**

**Logging:** solicitação, correlação, transições, autoridade/autorização, decisão de publicação, versões, diagnóstico e idempotência, com minimização de dados.  
**Métricas:** propostas, publicações, recusas, conflitos, retificações, insuficiência de evidências e tempos de tramitação; sem inventar SLA.  
**Monitoramento:** integridade/recuperabilidade da versão e manifesto, falhas na publicação e outbox, divergência de versão e disponibilidade das dependências.

## 12. Testes propostos para o futuro serviço

| ID candidato | Cenário | Critério de aceitação |
|---|---|---|
| TST-A103-CS04-001 | Proposta preparada | Nenhuma versão disponível no CE-01 real |
| TST-A103-CS04-002 | Novo registro com origem/prova/autoridade consistentes | Publicação preserva identidade, versão, manifesto e trilha |
| TST-A103-CS04-003 | Documento de origem não recuperável | Bloqueio de publicação |
| TST-A103-CS04-004 | Identidade potencialmente duplicada | Resolução contextual antes de atribuição de ID |
| TST-A103-CS04-005 | Alteração de denominação | Mesma identidade, nova versão |
| TST-A103-CS04-006 | Publicador não autorizado | Recusa antes de qualquer efeito institucional |
| TST-A103-CS04-007 | Erro na persistência do manifesto/evento | Falha atômica, sem versão publicada |
| TST-A103-CS04-008 | Dois publicadores concorrentes | Um estado consistente, com conflito da versão-base |
| TST-A103-CS04-009 | Reenvio do mesmo comando | Resultado idempotente; sem duplicação |
| TST-A103-CS04-010 | Reenvio com chave idêntica e conteúdo diferente | Conflito rastreável |
| TST-A103-CS04-011 | Retificação com efeitos pretéritos registrada posteriormente | Histórico antigo preservado; consulta bitemporal coerente |
| TST-A103-CS04-012 | Publicação seguida de CM01-R01 atendida | Marco A segue não autorizado |
| TST-A103-CS04-013 | Mock/dados de teste em canal institucional | Nenhuma evidência real publicada/consultada |
| TST-A103-CS04-014 | Custodiante externo, manifesto A103 | Manifesto é referenciado; documento permanece sob custodiante externo |

Testes **não implementados nem executados**. Os 19 testes A107 v0.3.0 não provam essa operação real.

## 13. Decisões a resolver antes de implementação

1. **Competência constitutiva e publicadora:** quem pode propor, resolver duplicidade, aprovar e publicar; relação com C103-IEA e fase inicial sem integração real.
2. **Fases e eventos de CS-04:** confirmar máquina de estados, comandos e possibilidade de revisão/retirada de proposta sem apagar histórico.
3. **Semântica registral:** relação entre `organizacao_id` e `registro_id` para versões, sucessão e correções.
4. **Manifesto e referência:** formato, serialização canônica, imutabilidade, hash, resolução, custodiante e indisponibilidade de provas.
5. **Historicidade física:** retenção, snapshots e regras de reconstrução reprodutível.
6. **Transação local e outbox:** atomicidade e idempotência, sem presumir comunicação distribuída.
7. **Segurança efetiva:** identidade do principal, autorização contextual, escopos, tratamento de negação e dados sensíveis.
8. **Numeração e catálogo de artefatos:** verificar colisões e conferir padrão antes da atribuição de SRV/DAT/INV/REG/RFU/RNF/TST/LOG/MET/MON definitivos.
9. **Aceite integrado:** provas com dados institucionais legítimos e ambiente segregado; mocks não servirão como evidências reais.

## 14. Registro de homologação — 27/11/2026

Em 27/11/2026, o autor declarou expressamente **“homologado”** para a **ESP-A103-CS04-001 v0.1 — Constituição e Registro de Organização Institucional**.

**Escopo homologado:** especificação funcional e transacional de CS-04, incluindo distinção entre constituição jurídica, registro no A103 e publicação de versão; operações lógicas e máquina de estados; identidade e controle de duplicidade; origem e referências probatórias; competência para a publicação a comprovar por mecanismo de autorização próprio; versionamento, histórico, retificações, idempotência, concorrência e atomicidade local; separação entre publicação registral, verificação ontológica no A107 e autorização do Marco A pelo Administrador da Plataforma.

**Limites da homologação:** não foram aprovados DDL, migrações, arquitetura física, endpoints, atribuição definitiva de SRV e outros códigos pendentes de catálogo, procedimentos reais de autenticação/autorização, constituição jurídica concreta, publicação institucional real, operação executável nem autorização de Marco A. Os 14 testes candidatos constituem critérios para implementação futura e **não foram executados**. Permanecem pendentes as decisões técnicas e operacionais da seção 13.

**Baselines preservados:** DEC-A103-001 v0.1, ESP-A103-DAT-001 v0.1, ESP-A103-CE01-001 v0.1, A107-EOB v0.3.0 e CM-01 a CM-04. Esta homologação não altera o código existente do A107.

**Próximo marco:** integração documental do PR #6 à `main`, quando realizada separadamente, seguida do detalhamento de contratos, controles de autorização, manifesto probatório e persistência física do A103-GEP.
