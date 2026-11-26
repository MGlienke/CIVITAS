# CIVITAS — JRN-CIV-002 — Registro e Acreditação de Pessoas

**Versão:** 0.1 — consolidada e homologada em 26/11/2026  
**Situação:** especificação da jornada concluída e homologada pelo autor  
**Casos de Uso:** [UC-CIV-007 v0.1](../casos-de-uso/UC-CIV-007_Registrar_Pessoa_por_Acreditacao_Publica_na_CIVITAS_v0_1.md) e [UC-CIV-008 v0.1](../casos-de-uso/UC-CIV-008_Acreditar_Privadamente_uma_Pessoa_na_CIVITAS_v0_1.md)  
**Natureza:** jornada transversal de identidade e confiança; não substitui atos de investidura ou autorizações institucionais.

## 1. Objetivo

Permitir que Pessoas ingressem na Plataforma CIVITAS mediante **acreditação pública** ou **acreditação privada derivada**, com identidade única identificada por IDUP, fundamento verificável, rastreabilidade histórica e conexão com o **Catálogo de Raízes de Confiança CIVITAS**.

A jornada estabelece as condições para reconhecer uma Pessoa na plataforma, sem presumir que ela possua Papel Institucional, Posição Institucional, competência, direito de acreditar terceiros ou autorização operacional.

## 2. Estrutura da Cadeia Geral de Confiança

As **fontes externas de acreditação pública inicialmente aceitas** são:

- **ICP-Brasil:** apresentação e verificação do certificado digital e condições aplicáveis.
- **gov.br:** autenticação da Pessoa e reconhecimento dos atributos de identificação/confiança fornecidos pelo serviço.

O **Catálogo de Raízes de Confiança CIVITAS** registra a conexão verificável entre o fundamento público e a identidade da Pessoa publicamente acreditada. Uma Pessoa poderá ter diferentes fontes públicas reconhecidas, mas **um único IDUP**.

A **acreditação privada** constitui vínculo derivado entre um **Agente Público competente**, que realiza procedimento de identificação e declara o reconhecimento no exercício regular de suas atribuições, e a Pessoa reconhecida. Cada elo deve ser verificável até uma Pessoa-raiz e, por meio do catálogo, até a fonte pública correspondente.

O catálogo não se confunde com uma Pessoa acreditadora nem é emissor das credenciais públicas.

## 3. Participantes e responsabilidades

| Participante | Responsabilidade |
|---|---|
| Pessoa que ingressa | Solicita registro e realiza autenticação pública ou se submete a procedimento privado de identificação |
| Fonte pública (ICP-Brasil / gov.br) | Fornece identificação ou meios de validação reconhecidos |
| Agente Público acreditador | Verifica identidade e declara o reconhecimento privado no exercício de competência pertinente |
| CIVITAS | Verifica identidades, cadeia de confiança e legitimidade do acreditador; registra vínculos e preserva historicidade |
| Diretório de Pessoas | Mantém uma identidade e um IDUP por Pessoa, prevenindo duplicações |
| Catálogo de Raízes de Confiança | Relaciona Pessoas-raiz às fontes e evidências públicas e permite verificar a origem das cadeias |

## 4. Pré-condições

**Para UC-007 (acreditação pública):** disponibilidade do Diretório de Pessoas, Catálogo de Raízes de Confiança e meios válidos de verificação das fontes públicas aceitas.

**Para UC-008 (acreditação privada):** pelo menos uma Pessoa com identidade e cadeia de confiança já estabelecidas; **Agente Público legitimado e competente** para efetuar o ato; procedimento de verificação e evidências apropriados. Ter identidade acreditada, isoladamente, não autoriza propagar acreditações.

**Dependência entre jornadas:** a JRN-CIV-002 fornece capacidades de Pessoas usadas pelas JRN-CIV-001, 003 e seguintes. A operacionalização da acreditação privada pode depender de Agentes Públicos reconhecidos e legitimados por atos institucionais de uma organização, inclusive no contexto das jornadas de habilitação e de Pessoal. A numeração das jornadas não impõe ordem de execução estritamente linear.

## 5. Percurso integrado

### Etapa A — UC-CIV-007: Registrar Pessoa por Acreditação Pública

1. Pessoa seleciona e utiliza um mecanismo público admitido: certificado ICP-Brasil ou autenticação gov.br.
2. CIVITAS verifica o fundamento de identidade apresentado conforme a fonte.
3. Consulta o Diretório de Pessoas, evita duplicidades e constitui novo registro com IDUP ou preserva o IDUP existente.
4. Insere no **Catálogo de Raízes** a conexão entre a Pessoa, a fonte pública e as evidências/condições de verificação.
5. Mantém pluralidade de acreditações públicas para uma mesma Pessoa sem multiplicar sua identidade.
6. Registra a rastreabilidade e a historicidade da operação.

**Resultado:** Pessoa registrada na CIVITAS e publicamente acreditada, apta a constituir raiz de confiança para acreditações privadas, sujeitas às regras próprias.

### Etapa B — UC-CIV-008: Acreditar Privadamente uma Pessoa

1. Agente Público acreditador apresenta identidade e cadeia de confiança que permitam alcançar o Catálogo de Raízes.
2. CIVITAS verifica sua **condição institucional de Agente Público e competência específica para o ato**, além da consistência da cadeia.
3. Agente Público realiza procedimento de **verificação documental presencial** como meio ordinário. Outro procedimento técnico só poderá ser admitido quando fundamentado e autorizado pelo **poder público competente**.
4. Agente Público declara formalmente a identidade verificada e apresenta as evidências pertinentes.
5. CIVITAS constitui ou reutiliza o IDUP da Pessoa, sem duplicidade, e registra a relação de acreditação privada.
6. A cadeia resultante permite reconstruir os sucessivos elos, sua legitimidade e a origem pública da confiança, com histórico de verificações.

**Resultado:** Pessoa identificada e privadamente acreditada na CIVITAS, sem que isso lhe confira automaticamente a faculdade de acreditar terceiros.

**Importante:** as etapas A e B são **modalidades de ingresso**, não passos obrigatórios consecutivos para toda Pessoa. A existência de raízes públicas e de Agentes Públicos legitimados é pré-condição prática para a modalidade privada.

## 6. Pontos de controle

| Controle | Evidência verificável |
|---|---|
| Identidade única | Registro no Diretório de Pessoas com IDUP, sem duplicação |
| Fonte pública | Reconhecimento ICP-Brasil ou gov.br e registro da conexão no Catálogo de Raízes |
| Agente acreditador | Identidade, condição de Agente Público, competência e cadeia de confiança verificáveis |
| Procedimento privado | Verificação de identidade, ordinariamente documental presencial, com declaração e evidências |
| Procedimento alternativo | Fundamentação e autorização pelo poder público competente |
| Encadeamento | Relações verificáveis até Pessoa-raiz e fonte pública, incluindo validade e legitimidade de cada elo |
| Historicidade | Atos, responsáveis, verificações, evidências, vigências e mudanças preservados |

## 7. Critérios de conclusão

A especificação da JRN-CIV-002 abrange **dois percursos de ingresso**, conforme a situação de cada Pessoa:

- **Pela via pública:** Pessoa identificada com IDUP e acreditação pública verificada, vinculada no Catálogo de Raízes de Confiança.
- **Pela via privada:** Pessoa identificada com IDUP e acreditação privada válida no âmbito CIVITAS, realizada por Agente Público competente mediante procedimento fundamentado, com cadeia segura e percorrível até o Catálogo de Raízes e sua origem pública.

A jornada entrega as **capacidades funcionais** para ambas as vias. Sua especificação estará concluída com os UC-007 e UC-008 homologados; a execução de uma acreditação privada real depende de existir um Agente Público legitimado e competente para praticá-la.

**Não é requisito** que toda Pessoa seja acreditada pelas duas vias, nem que uma Pessoa com acreditação privada obtenha credencial pública.

## 8. Situações alternativas e restrições

- Fonte pública indisponível, inválida ou não verificável: não concluir reconhecimento público sem fundamento verificável.
- Identidade existente: preservar IDUP e acrescentar o fundamento de acreditação aplicável.
- Acreditador privado sem condição de Agente Público, sem competência específica ou sem cadeia válida: impedir o ato.
- Verificação insuficiente ou procedimento alternativo sem autorização pública: não concluir acreditação privada.
- Relação de identidade conflitante: suspender vinculação automática e tratar divergências.
- Expiração, revogação, invalidação ou conflito em elo da cadeia: preservar histórico e não presumir validade atual, observadas as políticas específicas a definir.
- Acreditação, ainda que válida, não concede automaticamente Papel Institucional, Posição Institucional, competência, autorização de administrar a CIVITAS ou direito de acreditar terceiros.

## 9. Interfaces com outras jornadas

| Jornada | Relação |
|---|---|
| JRN-CIV-001 | Fornece Pessoas acreditadas publicamente passíveis de designação como GOI e Mandatário, desde que cumpridos os atos próprios |
| JRN-CIV-003 | Fornece Pessoas publicamente acreditadas para a designação e legitimação de responsáveis pelos Sistemas Estruturantes |
| JRN-CIV-004 | Estrutura Organizacional cria órgãos, cargos e funções que poderão subsidiar posteriores relações de Pessoas |
| Jornada futura de Pessoal | Registra investiduras, vínculos, exercício e outras condições institucionais; pode tornar verificável a competência de Agentes Públicos para acreditação privada |

## 10. Questões para detalhamento posterior

- Política de níveis de conta gov.br aceitos, validação de certificados ICP-Brasil e revalidação da situação das acreditações.
- Evidências e elementos mínimos da verificação documental presencial.
- Competência e procedimento de autorização de soluções técnicas alternativas.
- Tratamento dos efeitos de expiração ou revogação sobre elos e cadeias derivadas.
- Segurança, privacidade, retenção e custódia das evidências; integração com Arquivos Públicos quando aplicável.
- Critérios de prevenção de duplicidade e resolução de conflitos de identidade.

Nenhuma dessas matérias, ainda por especificar, modifica as regras homologadas dos UC-007 e UC-008.

## 11. Homologação e situação documental

**Em 26/11/2026**, o autor, tendo aprovado previamente os UC-CIV-007 v0.1 e UC-CIV-008 v0.1, autorizou expressamente a **consolidação e publicação da JRN-CIV-002**, formalizando a jornada como especificação homologada.

A conclusão da especificação **não implica que a plataforma já tenha sido implementada ou que a cadeia privada esteja operacionalmente ativa**.
