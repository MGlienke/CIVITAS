# CIVITAS — Revisão transversal UC-001 a UC-006

**Versão da revisão:** 0.1 — diagnóstico para conferência e homologação editorial  
**Data:** 2026-11-26  
**Escopo:** narrativas, decisões e vínculos entre UC-CIV-001 a UC-CIV-006; sem decomposição funcional.  
**Condição:** documento de revisão; **não altera as versões homologadas**.

## 1. Síntese executiva

A cadeia conceitual é consistente na sequência: **Metamodelo + EOT (UC-001) → ENT/ENI (UC-002) → Ontologia única e Determinação Institucional Progressiva (UC-003) → instanciação progressiva de Organizações Institucionais (UC-004) → habilitação do cliente e designação do Gestor (UC-005) → constituição mínima CM-01 a CM-04 e Marco A (UC-006)**.

A revisão identificou **quatro pontos prioritários de harmonização**: (i) delimitação da realização ontológica ao âmbito de autorização em cada marco, (ii) denominação do Gestor da Organização Institucional, (iii) distinção entre autorização técnica, recebimento definitivo e autorização de faturamento com o Mandatário quando competente, e (iv) formalização documental da narrativa UC-004 v0.3.

## 2. Situação verificada dos arquivos

| Caso | Narrativa examinada | Situação encontrada |
|---|---|---|
| UC-001 | `UC-CIV-001_Estruturas_Organizacionais_Tipologicas_v0_5.md` | v0.5 homologada; Q-01 a Q-06 homologadas; usa termo histórico Gestor de Entidade |
| UC-002 | `UC-CIV-002_Estruturas_Normativas_Tipologicas_v0_3.md` | v0.3 homologada; Q-01 a Q-05 homologadas; usa termo histórico Gestor de Entidade |
| UC-003 | `UC-CIV-003_Ontologia_do_Estado_Digital_v0_3.md` | v0.3 homologada; Q-01 a Q-05 homologadas; realização integral antes da autorização inicial precisa agora de delimitação por âmbito operacional |
| UC-004 | Narrativa v0.3 redigida em conversa e discutida | Não foi localizado, no caminho de arquivo previsto, artefato v0.3 publicado no GitHub; confirmar caminho/cadastro antes de afirmar ausência total no repositório |
| UC-005 | `UC-CIV-005_Habilitar_Organizacao_Institucional_como_Cliente_CIVITAS_v0_2.md` | v0.2 homologada; critério atual fala em todas as condições ontológicas antes de autorizar operação, sem distinguir o Marco A |
| UC-006 | `UC-CIV-006_Constituir_e_Preparar_Minimamente_Organizacao_Institucional_Cliente_v0_1.md` | v0.1 homologada; encerra nas quatro condições constitutivas e Marco A |

## 3. Achados priorizados

### R-01 — Critério de autorização ontológica por âmbito (prioridade CRÍTICA)

**Constatação:** UC-003 Q-04 e narrativa v0.3 afirmam realização integral de *todas* as condições ontológicas aplicáveis antes da autorização inicial de operação; UC-005 v0.2 adota a mesma leitura. A decisão posterior do UC-006 distingue a autorização para **operação administrativa inicial (Marco A)** da implantação de sistemas estruturantes e da prestação de serviços públicos.

**Diretriz aprovada posteriormente:** no Marco A, realizar e verificar integralmente as condições constitutivas CM-01 a CM-04. Não tratar condições dos marcos posteriores como já realizadas, nem autorizar capacidades ou serviços ainda não preparados.

**Proposta editorial para próxima revisão:** inserir a qualificação **“todas as condições ontológicas exigíveis para o âmbito de operação objeto da autorização”** e delimitar, de maneira explícita, o Marco A como operação administrativa inicial. Novas capacidades e serviços passam por verificações próprias em seus marcos de habilitação. A regra original de integralidade **permanece dentro de cada âmbito**, não deixa de existir.

**Ação:** UC-003 versão de harmonização e UC-005 versão de harmonização, preservando arquivos anteriores.

### R-02 — Denominação institucional do Gestor (prioridade ALTA)

**Constatação:** UC-001, UC-002 e UC-005 utilizam “Gestor de Entidade”. O conceito de Entidade Pública possui significado próprio na Ontologia; nem toda Organização Institucional cliente corresponde a esse conceito.

**Decisão posterior:** denominação **Gestor da Organização Institucional (GOI)**. Evitar “Gestor de Entidade” em textos consolidados futuros. Não substituir indiscriminadamente menções ontológicas reais a “Entidade Pública”.

**Ação:** atualizar narrativas derivadas e registros editoriais dos UC-001, UC-002 e UC-005 mediante novas versões ou errata expressamente homologada.

### R-03 — Marco A, recebimento definitivo e faturamento (prioridade CRÍTICA)

**Constatação:** UC-005 diferencia habilitação, operação, recebimento e faturamento, mas foi homologado antes de fixarmos o Marco A como operação administrativa inicial. UC-006 acrescentou a aprovação do Mandatário quando juridicamente competente.

**Diretriz aprovada posteriormente:** Administrador concede **autorização técnica** do Marco A; esta pode fundamentar **recebimento definitivo** da solução e, quando estabelecido contratualmente, **autorização para faturamento**. O Mandatário aprova a entrega definitiva **se detiver competência para tanto**; a autoridade ou comissão competente da Administração contratante deve praticar os atos exigidos pelo contrato e regime aplicável. Não presumir identidade entre autorização técnica, aceite definitivo, emissão de documento fiscal, liquidação e pagamento.

**Ação:** harmonizar UC-005, UC-006 e critérios de evidência contratual em versão posterior, sem automatismo jurídico.

### R-04 — Arquivo UC-004 e seu status (prioridade ALTA)

**Constatação:** houve redação v0.3 na conversa, definindo primeira instanciação da raiz Estado, incorporação progressiva de organizações intermediárias necessárias, fundamentação normativa e manutenção pelo Administrador da Plataforma. Não foi localizado arquivo v0.3 sob o caminho nominal testado. A v0.3 foi apresentada para homologação, sem registro definitivo de aprovação formal inequívoca na sequência.

**Ação:** recuperar a narrativa exatamente como discutida, publicar como **minuta para conferência** se não existir registro em outro caminho e obter homologação formal antes de marcá-la como canônica.

### R-05 — Fronteira UC-001 / UC-004 / UC-006 (prioridade MÉDIA)

O UC-001 estabelece o metamodelo nativo, a EOT externa, a instanciação raiz e a governança dos modelos. O UC-004 descreve o processo concreto de incorporação da instância raiz Estado e das organizações necessárias; não deve duplicar a gestão dos modelos tipológicos. O UC-006 configura apenas a **primeira estrutura administrativa interna**, fundamentada na norma própria; não deve reconstruir toda a instância institucional realizada pelo Administrador.

**Ação:** acrescentar remissões entre casos e registrar os limites em quadro de dependências.

### R-06 — Complementação de competências (prioridade MÉDIA)

UC-002 já prevê complemento progressivo da ENI com normas e dispositivos que fundamentam competências. UC-006 CM-03 obriga composição progressiva da competência desde o Estado até a organização alvo, com distinção entre titularidade, exercício, limites e modalidades.

**Ação:** estabelecer remissão expressa entre ENI, determinação institucional progressiva e CM-03, sem tratar competências como uma união indiscriminada de normas.

### R-07 — Mandatário e Gestor da Organização Institucional (prioridade ALTA)

Mandatário é Posição Institucional ocupada por Pessoa no Papel de Agente Público, e não novo conceito da Ontologia. Gestor é designado inicialmente pelo Administrador na habilitação contratual. O Gestor registra a investidura do Mandatário; Administrador verifica e reconhece sua legitimidade; Mandatário convalida o Gestor; até a convalidação, Gestor fica bloqueado, ressalvado desbloqueio expresso pelo Administrador. Desbloqueio não se transforma em convalidação, nem cria competência para substituir o Mandatário.

**Ação:** inserir vínculo cruzado UC-005↔UC-006 e especificar posteriormente autenticação, investidura e sucessão, sem antecipar arquitetura técnica.

### R-08 — Fases posteriores e serviço ao cidadão (prioridade MÉDIA)

CM-05 a CM-10 deixaram de integrar o conjunto mínimo de autorização administrativa; as correspondentes funções poderão ser realizadas nos futuros casos: sistemas estruturantes, responsabilidades de pessoal, arquivos e custódia, atuação administrativa e serviços públicos. CM-10 (verificabilidade ontológica) é transversal, não uma etapa final isolada.

**Ação:** manter essas condições como inventário de investigação posterior, não como obrigação já satisfeita no Marco A.

## 4. Matriz de dependências e marcos

| Ordem | Caso | Produto institucional | Pode ou não realizar |
|---|---|---|---|
| 1 | UC-001 | Metamodelo e EOT conforme | Não constitui cliente por si só |
| 2 | UC-002 | ENT/ENI e requisitos de fundamentação | Não substitui normas concretas |
| 3 | UC-003 | Ontologia única e determinações progressivas | Não cria uma Ontologia por entidade |
| 4 | UC-004 | Estado-raiz e organizações necessárias instanciados, com identidade e fundamento | Não habilita automaticamente cliente |
| 5 | UC-005 | Cliente habilitado e GOI designado | Não autoriza automaticamente operação |
| 6 | UC-006 | CM-01 a CM-04 verificadas; Marco A tecnicamente autorizado | Não autoriza automaticamente sistemas estruturantes completos nem serviços ao cidadão |
| Posterior | Futuro(s) UC(s) | Organização administrativa complementar e sistemas estruturantes | Exige realizações ontológicas pertinentes |
| Posterior | Futuro(s) UC(s) | Serviços públicos preparados e publicados | Exige condições próprias por serviço |

## 5. Formulações a homologar em versões de harmonização

**F-01 — Regra de integralidade por âmbito:** “A autorização de determinado âmbito operacional da CIVITAS dependerá da realização e verificação integrais das condições ontológicas exigíveis para esse âmbito. A autorização administrativa inicial (Marco A) exige CM-01 a CM-04; a habilitação de capacidades e serviços adicionais dependerá da realização e verificação das condições correspondentes, sem presunção de atendimento.”

**F-02 — Governança de acesso:** “A designação inicial do GOI pela administração da plataforma permite a preparação. O registro da investidura do Mandatário exige verificação pelo Administrador; sua convalidação regula a continuidade do Gestor, admitindo desbloqueio excepcional fundamentado pelo Administrador sem equivalência à convalidação.”

**F-03 — Marco contratual:** “A autorização técnica do Marco A poderá fundamentar recebimento definitivo e autorização de faturamento nos termos do contrato, mediante aprovação e atos formais da autoridade pública competente — inclusive Mandatário, quando detiver competência —, sem automatizar aceite, liquidação ou pagamento.”

Estas formulações são **recomendações editoriais de harmonização**, não novas homologações dos documentos precedentes.

## 6. Plano de regularização

1. Conferir e registrar a narrativa UC-004 v0.3, sem presumir homologação não registrada.
2. Preparar novas versões harmônicas dos UC-003 e UC-005, incorporando F-01 a F-03, para aprovação expressa.
3. Atualizar nomenclatura dos UC-001 e UC-002 por errata controlada ou novas versões, com preservação das decisões originais.
4. Confirmar a matriz de dependências e o limite do Marco A antes de iniciar casos de uso de sistemas estruturantes.
5. Não iniciar decomposição funcional até concluir a revisão das narrativas.

## 7. Histórico

- UC-001 v0.5 homologada; UC-002 v0.3 homologada; UC-003 v0.3 homologada; UC-005 v0.2 homologada.
- UC-006 v0.1 homologada em 26/11/2026 com escopo limitado a CM-01 a CM-04, Marco A.
- Revisão transversal v0.1 elaborada em 26/11/2026, pendente de conferência/homologação dos ajustes propostos.
