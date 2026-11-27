# CIVITAS — Matriz de Dependências e Sequenciamento de Implementação

**Versão:** 0.1 — registrada em 26/11/2026  
**Situação:** proposta de planejamento técnico; ainda não homologada separadamente  
**Fontes:** JRN-CIV-001 a JRN-CIV-006 e UC-CIV-001 a UC-CIV-015 homologados.  
**Natureza:** dependências recomendadas para desenvolvimento, não alterações das narrativas canônicas dos UC.

## 1. Princípio

A ordem de implementação não reproduz rigidamente a numeração das jornadas. Acreditação pública permite identificar GOI, Mandatário e responsáveis institucionais; a acreditação privada exige Agente Público legitimado e competente, verificável por sua participação institucional. Dependências de desenvolvimento distinguem-se das condições para operação efetiva.

## 2. Matriz de dependências

| UC | Função | Dependência obrigatória para execução | Entrega |
|---|---|---|---|
| 001 | Estruturas Organizacionais Tipológicas | Fundação técnica e metamodelo | EOT disponíveis |
| 002 | Estruturas Normativas Tipológicas | UC-001 | ENT/ENI e fundamentos normativos |
| 003 | Ontologia do Estado Digital | Fundação semântica | Ontologia e verificação de realização |
| 004 | Incorporar Organizações Institucionais | UC-001, 002, 003 | Organização incorporada à estrutura estatal |
| 005 | Habilitar Organização como cliente | UC-004; UC-007 para identificar GOI | Cliente habilitado e GOI designado |
| 006 | Preparar minimamente a organização | UC-005; UC-007 para Mandatário; estruturas de 001–004 | Marco A |
| 007 | Registrar Pessoa por Acreditação Pública | Diretório de Pessoas, IDUP e fontes públicas | Pessoa acreditada e raiz de confiança |
| 008 | Acreditar Pessoa privadamente | UC-007; Agente Público legitimado e competente | Acreditação privada |
| 009 | Habilitar Sistemas Estruturantes | UC-006; UC-007 para responsáveis | Sistemas vinculados e responsáveis legitimados |
| 010 | Constituir Estrutura Organizacional | UC-006, 009 | Órgãos, unidades, competências e organograma |
| 011 | Constituir Cargos e Funções | UC-010 | Cargos e funções fundamentados |
| 012 | Carga Inicial de Pessoal | UC-009, 010, 011 e capacidade arquivística de UC-013/014 para conclusão documental | Registros funcionais documentados |
| 013 | Constituir e Habilitar Arquivo Público | UC-009, 010 | Arquivo Público habilitado |
| 014 | Registrar e Arquivar Documentos | UC-013 | Documentos e referências verificáveis |
| 015 | Vincular Pessoa e Emitir Credencial S | UC-007 ou 008; UC-012 | IDUP vinculado ao registro funcional e Credencial S |

**Nota:** a preparação preliminar de UC-012 pode ocorrer antes de UC-013/014; a carga documentalmente fundamentada exige capacidade arquivística disponível.

## 3. Capacidades transversais propostas

| ID | Capacidade | Função | Principais UC consumidores |
|---|---|---|---|
| T01 | Identidade institucional | Organizações, órgãos, unidades, relações | 001–006, 009–014 |
| T02 | Metamodelo e ontologia | Conceitos, relações e condições de realização | Todos, conforme domínio |
| T03 | Fundamentação normativa | Normas, atos, vigência e vínculos de fundamento | 002–006, 009–015 |
| T04 | Identidade de Pessoas | Diretório, IDUP e acreditações | 005–009, 015 |
| T05 | Credenciais e autorizações | C/S, participações e permissões | 005–009, 013–015 |
| T06 | Gestão documental | Registro, guarda, referência e recuperação | 006, 009–015 |
| T07 | Historicidade e rastreabilidade | Estados, eventos e reconstrução histórica | Todos |
| T08 | Verificação e homologação | Conferência e registro de decisões | Todos, conforme aplicável |
| T09 | Integração com IA | Análise de fundamentos e propostas verificáveis | 001–004, 006, 010–011 e outros casos pertinentes |

Estas são **capacidades lógicas**, não novos módulos homologados; a correspondência com a arquitetura CIVITAS exige mapeamento próprio.

## 4. Sequenciamento em incrementos

| Incremento | Escopo | Resultado verificável |
|---|---|---|
| I1 — Fundação semântica e institucional | UC-001–004 | Modelos tipológicos, normativos, ontologia e incorporação institucional |
| I2 — Identidade e habilitação | UC-007, 005, 006 | Acreditação pública, GOI, Mandatário, CM-01 a CM-04 e Marco A |
| I3 — Sistemas e organização | UC-009, 010, 011 | Sistemas estruturantes e organização/cargos/funções |
| I4 — Arquivo Público | UC-013, 014 | Recepção, guarda, referência e recuperação documental |
| I5 — Pessoal | UC-012, 015 | Registros funcionais e Credencial S |
| I6 — Acreditação privada | UC-008 | Procedimento por Agente Público competente, com raiz pública verificável |

Incrementos podem compartilhar desenvolvimento paralelo; não são necessariamente marcos contratuais.

## 5. Paralelismo

- UC-001, 002 e 003: componentes semânticos/normativos podem ser desenvolvidos em paralelo com controles de compatibilidade.
- UC-007 e 004: independência parcial até a habilitação do cliente.
- UC-010 e 013: trabalho técnico paralelizável, respeitando a fundação da unidade arquivística para habilitação efetiva.
- UC-011 e 014: independência funcional direta.
- UC-012 e 014: importação/validação preliminar paralela à construção dos serviços documentais.
- UC-008 e 015: desenvolvimento técnico paralelo, execução privada condicionada a competência verificável.

## 6. Marcos propostos de validação

| Marco | Evidência |
|---|---|
| M1 — Fundação | Organização incorporada a modelos tipológicos, normativos e ontológicos |
| M2 — Marco A | Cliente habilitado, GOI, Mandatário, CM-01 a CM-04 e autorização técnica |
| M3 — Estrutura | Sistemas habilitados, órgãos, unidades, cargos e funções fundamentados |
| M4 — Arquivo | Documento guardado/referenciado com integridade, custódia e recuperação |
| M5 — Agente Público | Registro funcional documentado, IDUP reconhecido e Credencial S emitida |
| M6 — Confiança derivada | Acreditação privada por Agente Público competente com cadeia até raiz pública |

M1–M6 são marcos de desenvolvimento propostos e não substituem os marcos jurídicos, operacionais e contratuais dos UC homologados.

## 7. Cenário integrado de referência

1. Constituir modelos semânticos, normativos e organizacionais; incorporar uma Organização Institucional.
2. Acreditar publicamente uma Pessoa apta a atuar como GOI; habilitar cliente, reconhecer Mandatário e autorizar Marco A.
3. Habilitar Sistemas Estruturantes e seus responsáveis legitimados.
4. Constituir órgãos, cargos e funções, incluindo a unidade responsável pelo Arquivo Público.
5. Arquivar termo de posse e registrar referência controlada.
6. Importar registro funcional de Agente Público com cargo, lotação, identificação e documento de posse.
7. A Pessoa, com IDUP e Credencial C, solicita associação ao registro; CIVITAS verifica e emite Credencial S.
8. Quando o Agente Público tiver competência específica, poderá praticar acreditação privada de Pessoa conforme UC-008.

## 8. Recomendações arquiteturais

- Reutilizar serviços transversais de fundamentação, historicidade, autorização e documentos; evitar implementação isolada por UC.
- Separar dependências de desenvolvimento das condições de execução juridicamente válida.
- Adotar o cenário integrado como teste de referência.
- Preparar Matriz de Componentes e Serviços, conciliando T01–T09 com a decomposição modular CIVITAS existente.

**Controle de versão:** v0.1 publicada a pedido do autor em 26/11/2026, como artefato de planejamento. Sua publicação não deve ser interpretada como homologação de uma arquitetura técnica definitiva.
