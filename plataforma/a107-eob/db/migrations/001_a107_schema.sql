-- CIVITAS — A107-EOB / DEC-A107-007
-- Migration 001 — modelo físico inicial v0.1, validado em ambiente de teste.
-- Homologação técnica: esquema a107, restrições, gatilhos, persistência,
-- idempotência e rollback verificados no PostgreSQL 18.6.
-- Ambiente de integração automatizada: banco isolado civitas_a107_teste.
-- O modelo também foi instalado em civitas_plataforma durante validação anterior;
-- isso NÃO representa autorização de implantação em produção.
-- A migração cria somente o schema/objetos, sem criar bancos nem papéis.
-- PostgreSQL 18 já fornece gen_random_uuid() (versões antigas podem requerer extensão).
-- ATENÇÃO: script de criação inicial, NÃO idempotente em instalações existentes.
-- NÃO executar novamente sobre um schema a107 já instalado; revisar manualmente
-- toda implantação e exigir autorização formal para ambientes institucionais.
BEGIN;

CREATE SCHEMA IF NOT EXISTS a107;

-- 1. Pacotes publicados são registros de conteúdo imutável; o Markdown reside em repositório versionado.
CREATE TABLE a107.pacotes_regras (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    codigo varchar(100) NOT NULL,
    versao varchar(50) NOT NULL,
    hash_sha256 varchar(64) NOT NULL CHECK (hash_sha256 ~ '^[0-9a-f]{64}$'),
    manifesto jsonb NOT NULL CHECK (jsonb_typeof(manifesto) = 'object'),
    esquema_versao varchar(50) NOT NULL,
    status varchar(16) NOT NULL DEFAULT 'PUBLICADO'
        CHECK (status IN ('PUBLICADO', 'DESCONTINUADO')),
    publicado_em timestamptz NOT NULL DEFAULT clock_timestamp(),
    registrado_em timestamptz NOT NULL DEFAULT clock_timestamp(),
    UNIQUE (codigo, versao),
    UNIQUE (hash_sha256)
);

-- 2. Execução de comando. Identidade do solicitante é a referência verificada pelo contexto de acesso.
CREATE TABLE a107.execucoes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    solicitacao_id varchar(160) NOT NULL,
    organizacao_id varchar(160) NOT NULL,
    principal_id varchar(160) NOT NULL,
    ambito_id varchar(100) NOT NULL,
    correlation_id varchar(160) NOT NULL,
    pedido_hash_sha256 varchar(64) NOT NULL CHECK (pedido_hash_sha256 ~ '^[0-9a-f]{64}$'),
    referencia_temporal timestamptz NOT NULL,
    conhecimento_ate timestamptz NOT NULL,
    pacote_regras_id uuid NOT NULL REFERENCES a107.pacotes_regras(id) ON DELETE RESTRICT,
    motivo text NOT NULL CHECK (btrim(motivo) <> ''),
    status varchar(24) NOT NULL DEFAULT 'RECEBIDA'
        CHECK (status IN ('RECEBIDA','VALIDANDO','CONSULTANDO_FONTES','AVALIANDO','CONCLUIDA','REJEITADA','FALHA_TECNICA')),
    iniciado_em timestamptz NOT NULL DEFAULT clock_timestamp(),
    atualizado_em timestamptz NOT NULL DEFAULT clock_timestamp(),
    encerrado_em timestamptz,
    codigo_ocorrencia varchar(16),
    diagnostico jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(diagnostico) = 'object'),
    -- Escopo da chave; alternativa: tabela própria de idempotência para serviços adicionais.
    UNIQUE (organizacao_id, principal_id, solicitacao_id),
    CHECK (conhecimento_ate <= iniciado_em),
    CHECK ((status IN ('CONCLUIDA','REJEITADA','FALHA_TECNICA')) = (encerrado_em IS NOT NULL))
);

-- 3. Verificação final é distinta do processamento da execução.
CREATE TABLE a107.verificacoes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    execucao_id uuid NOT NULL UNIQUE REFERENCES a107.execucoes(id) ON DELETE RESTRICT,
    pacote_regras_id uuid NOT NULL REFERENCES a107.pacotes_regras(id) ON DELETE RESTRICT,
    organizacao_id varchar(160) NOT NULL,
    ambito_id varchar(100) NOT NULL,
    referencia_temporal timestamptz NOT NULL,
    conhecimento_ate timestamptz NOT NULL,
    executado_em timestamptz NOT NULL DEFAULT clock_timestamp(),
    estado varchar(20) NOT NULL CHECK (estado IN ('ATENDIDA','NAO_ATENDIDA','INDETERMINADA')),
    elegibilidade varchar(36) NOT NULL CHECK (elegibilidade IN
        ('ELEGIVEL_PARA_AUTORIZACAO','NAO_ELEGIVEL','VERIFICACAO_PENDENTE')),
    resultado jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(resultado) = 'object'),
    integridade_sha256 varchar(64) CHECK (integridade_sha256 ~ '^[0-9a-f]{64}$'),
    verificacao_anterior_id uuid REFERENCES a107.verificacoes(id) ON DELETE RESTRICT,
    criado_em timestamptz NOT NULL DEFAULT clock_timestamp(),
    CHECK ((estado = 'ATENDIDA' AND elegibilidade = 'ELEGIVEL_PARA_AUTORIZACAO') OR
           (estado = 'NAO_ATENDIDA' AND elegibilidade = 'NAO_ELEGIVEL') OR
           (estado = 'INDETERMINADA' AND elegibilidade = 'VERIFICACAO_PENDENTE')),
    CHECK (verificacao_anterior_id IS NULL OR verificacao_anterior_id <> id)
);

CREATE TABLE a107.resultados_condicao (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    verificacao_id uuid NOT NULL REFERENCES a107.verificacoes(id) ON DELETE RESTRICT,
    condicao_id varchar(24) NOT NULL CHECK (condicao_id ~ '^CM-0[1-4]$'),
    estado varchar(20) NOT NULL CHECK (estado IN ('ATENDIDA','NAO_ATENDIDA','INDETERMINADA')),
    justificativa text NOT NULL DEFAULT '',
    diagnostico jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(diagnostico) = 'object'),
    UNIQUE (verificacao_id, condicao_id)
);

CREATE TABLE a107.resultados_requisito (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    resultado_condicao_id uuid NOT NULL REFERENCES a107.resultados_condicao(id) ON DELETE RESTRICT,
    requisito_id varchar(30) NOT NULL CHECK (requisito_id ~ '^CM0[1-4]-R0[1-6]$'),
    operador varchar(32) NOT NULL CHECK (operador IN
        ('existe','corresponde','relacionado_a','fundamentado_em',
         'vigente_em','reconhecido_por','satisfaz','precede')),
    propriedade_id varchar(160) NOT NULL,
    estado varchar(20) NOT NULL CHECK (estado IN ('ATENDIDA','NAO_ATENDIDA','INDETERMINADA')),
    justificativa text NOT NULL DEFAULT '',
    parametros jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(parametros) = 'object'),
    diagnostico jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(diagnostico) = 'object'),
    UNIQUE (resultado_condicao_id, requisito_id)
);

-- 4. As evidências são referências, não cópias dos registros institucionais.
CREATE TABLE a107.referencias_evidencia (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    resultado_requisito_id uuid NOT NULL REFERENCES a107.resultados_requisito(id) ON DELETE RESTRICT,
    evidencia_id varchar(200) NOT NULL,
    modulo_fonte varchar(10) NOT NULL CHECK (modulo_fonte ~ '^[A-E][0-9]{3}$'),
    referencia_externa varchar(500) NOT NULL,
    versao_fonte varchar(160),
    snapshot_fonte varchar(250),
    hash_sha256 varchar(64) CHECK (hash_sha256 ~ '^[0-9a-f]{64}$'),
    ocorrido_em timestamptz,
    valido_desde timestamptz,
    valido_ate timestamptz,
    registrado_em_fonte timestamptz,
    consultado_em timestamptz NOT NULL DEFAULT clock_timestamp(),
    tipo_evidencia varchar(100),
    fonte_autoritativa varchar(250),
    cobertura jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(cobertura) = 'object'),
    metadados jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(metadados) = 'object'),
    UNIQUE (resultado_requisito_id, evidencia_id),
    CHECK (valido_ate IS NULL OR valido_desde IS NULL OR valido_ate > valido_desde)
);

-- 5. Registro dos contatos com fontes: sem guardar dados pessoais ou documentos indiscriminadamente.
CREATE TABLE a107.consultas_fonte (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    execucao_id uuid NOT NULL REFERENCES a107.execucoes(id) ON DELETE RESTRICT,
    consulta_id varchar(160) NOT NULL,
    correlation_id varchar(160) NOT NULL,
    modulo_fonte varchar(10) NOT NULL CHECK (modulo_fonte ~ '^[A-E][0-9]{3}$'),
    requisito_id varchar(30) NOT NULL,
    status_consulta varchar(20) NOT NULL CHECK (status_consulta IN
        ('OK','PARCIAL','INDISPONIVEL','NAO_AUTORIZADA','ERRO')),
    referencia_temporal timestamptz NOT NULL,
    conhecimento_ate timestamptz NOT NULL,
    snapshot_fonte varchar(250),
    versao_fonte varchar(160),
    cobertura jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(cobertura) = 'object'),
    diagnostico jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(diagnostico) = 'object'),
    consultado_em timestamptz NOT NULL DEFAULT clock_timestamp(),
    UNIQUE (execucao_id, consulta_id)
);

-- 6. Outbox de eventos. Atualizações controladas de entrega são permitidas.
CREATE TABLE a107.outbox (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    verificacao_id uuid REFERENCES a107.verificacoes(id) ON DELETE RESTRICT,
    evento_tipo varchar(120) NOT NULL,
    evento_versao integer NOT NULL DEFAULT 1 CHECK (evento_versao > 0),
    correlation_id varchar(160) NOT NULL,
    payload jsonb NOT NULL CHECK (jsonb_typeof(payload) = 'object'),
    status varchar(20) NOT NULL DEFAULT 'PENDENTE'
        CHECK (status IN ('PENDENTE','EM_ENVIO','ENTREGUE','FALHA')),
    tentativas integer NOT NULL DEFAULT 0 CHECK (tentativas >= 0),
    disponivel_em timestamptz NOT NULL DEFAULT clock_timestamp(),
    publicado_em timestamptz,
    criado_em timestamptz NOT NULL DEFAULT clock_timestamp(),
    UNIQUE (verificacao_id, evento_tipo, evento_versao)
);

-- 7. Reavaliação diária seletiva; o scheduler é externo à lógica de domínio.
CREATE TABLE a107.execucoes_rotina (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    rotina_codigo varchar(100) NOT NULL DEFAULT 'REAVALIACAO_DIARIA',
    iniciado_em timestamptz NOT NULL DEFAULT clock_timestamp(),
    finalizado_em timestamptz,
    status varchar(20) NOT NULL DEFAULT 'EXECUTANDO'
        CHECK (status IN ('EXECUTANDO','CONCLUIDA','FALHA','INTERROMPIDA')),
    cursor_inicio text,
    cursor_confirmado text,
    diagnostico jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(diagnostico) = 'object'),
    CHECK ((status = 'EXECUTANDO') = (finalizado_em IS NULL))
);

CREATE TABLE a107.impactos_pendentes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    execucao_rotina_id uuid REFERENCES a107.execucoes_rotina(id) ON DELETE SET NULL,
    evento_origem_id varchar(220) NOT NULL,
    modulo_origem varchar(10) NOT NULL CHECK (modulo_origem ~ '^[A-E][0-9]{3}$'),
    organizacao_id varchar(160) NOT NULL,
    ambito_id varchar(100) NOT NULL,
    condicao_id varchar(24) NOT NULL,
    chave_impacto_sha256 varchar(64) NOT NULL CHECK (chave_impacto_sha256 ~ '^[0-9a-f]{64}$'),
    status varchar(20) NOT NULL DEFAULT 'PENDENTE'
        CHECK (status IN ('PENDENTE','AGENDADO','CONCLUIDO','FALHA','DESCARTADO')),
    justificativa text,
    verificacao_gerada_id uuid REFERENCES a107.verificacoes(id) ON DELETE RESTRICT,
    detectado_em timestamptz NOT NULL DEFAULT clock_timestamp(),
    atualizado_em timestamptz NOT NULL DEFAULT clock_timestamp(),
    UNIQUE (chave_impacto_sha256)
);

-- Índices para consultas usuais do SRV-A107-003 e rotina de reavaliação.
CREATE INDEX idx_a107_verificacoes_org_ambito_tempo
    ON a107.verificacoes (organizacao_id, ambito_id, executado_em DESC);
CREATE INDEX idx_a107_verificacoes_tempo_conhecimento
    ON a107.verificacoes (referencia_temporal, conhecimento_ate);
CREATE INDEX idx_a107_execucoes_status
    ON a107.execucoes (status, iniciado_em);
CREATE INDEX idx_a107_consultas_fonte_execucao
    ON a107.consultas_fonte (execucao_id, modulo_fonte);
CREATE INDEX idx_a107_evidencias_modulo_ref
    ON a107.referencias_evidencia (modulo_fonte, referencia_externa);
CREATE INDEX idx_a107_outbox_pendentes
    ON a107.outbox (disponivel_em, criado_em)
    WHERE status IN ('PENDENTE', 'FALHA');
CREATE INDEX idx_a107_impactos_pendentes
    ON a107.impactos_pendentes (status, detectado_em)
    WHERE status IN ('PENDENTE', 'AGENDADO', 'FALHA');
CREATE INDEX idx_a107_rotina_codigo_inicio
    ON a107.execucoes_rotina (rotina_codigo, iniciado_em DESC);

-- Política: conteúdo de resultados concluídos é append-only. Enquanto a execução estiver em construção,
-- componentes somente permitem INSERT; UPDATE/DELETE do resultado e de evidências são sempre vedados.
CREATE FUNCTION a107.rejeitar_mutacao_resultado()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
    RAISE EXCEPTION 'A107: registro histórico de verificação é imutável (%).', TG_TABLE_NAME
        USING ERRCODE = '55000';
END;
$$;

CREATE TRIGGER t_a107_verificacoes_imutaveis
    BEFORE UPDATE OR DELETE ON a107.verificacoes
    FOR EACH ROW EXECUTE FUNCTION a107.rejeitar_mutacao_resultado();
CREATE TRIGGER t_a107_condicoes_imutaveis
    BEFORE UPDATE OR DELETE ON a107.resultados_condicao
    FOR EACH ROW EXECUTE FUNCTION a107.rejeitar_mutacao_resultado();
CREATE TRIGGER t_a107_requisitos_imutaveis
    BEFORE UPDATE OR DELETE ON a107.resultados_requisito
    FOR EACH ROW EXECUTE FUNCTION a107.rejeitar_mutacao_resultado();
CREATE TRIGGER t_a107_evidencias_imutaveis
    BEFORE UPDATE OR DELETE ON a107.referencias_evidencia
    FOR EACH ROW EXECUTE FUNCTION a107.rejeitar_mutacao_resultado();
CREATE TRIGGER t_a107_consultas_imutaveis
    BEFORE UPDATE OR DELETE ON a107.consultas_fonte
    FOR EACH ROW EXECUTE FUNCTION a107.rejeitar_mutacao_resultado();
CREATE TRIGGER t_a107_pacotes_imutaveis
    BEFORE UPDATE OR DELETE ON a107.pacotes_regras
    FOR EACH ROW EXECUTE FUNCTION a107.rejeitar_mutacao_resultado();

-- Impossibilitar INSERT de detalhes após fechamento da execução; usar FOR SHARE como trava intertransacional.
CREATE FUNCTION a107.verificar_execucao_aberta()
RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE
    v_execucao uuid;
    v_status varchar(24);
BEGIN
    IF TG_TABLE_NAME = 'resultados_condicao' THEN
        SELECT execucao_id INTO v_execucao FROM a107.verificacoes WHERE id = NEW.verificacao_id;
    ELSIF TG_TABLE_NAME = 'resultados_requisito' THEN
        SELECT v.execucao_id INTO v_execucao
        FROM a107.resultados_condicao c JOIN a107.verificacoes v ON v.id = c.verificacao_id
        WHERE c.id = NEW.resultado_condicao_id;
    ELSIF TG_TABLE_NAME = 'referencias_evidencia' THEN
        SELECT v.execucao_id INTO v_execucao
        FROM a107.resultados_requisito r
        JOIN a107.resultados_condicao c ON c.id = r.resultado_condicao_id
        JOIN a107.verificacoes v ON v.id = c.verificacao_id
        WHERE r.id = NEW.resultado_requisito_id;
    ELSE
        RAISE EXCEPTION 'Tabela não suportada: %', TG_TABLE_NAME;
    END IF;
    IF v_execucao IS NULL THEN
        RAISE EXCEPTION 'A107: verificação pai ausente.' USING ERRCODE = '23503';
    END IF;
    SELECT status INTO v_status FROM a107.execucoes WHERE id = v_execucao FOR SHARE;
    IF v_status IS NULL OR v_status IN ('CONCLUIDA','REJEITADA','FALHA_TECNICA') THEN
        RAISE EXCEPTION 'A107: execução encerrada, detalhes bloqueados.' USING ERRCODE = '55000';
    END IF;
    RETURN NEW;
END;
$$;

CREATE TRIGGER t_a107_insert_condicao_aberta
    BEFORE INSERT ON a107.resultados_condicao
    FOR EACH ROW EXECUTE FUNCTION a107.verificar_execucao_aberta();
CREATE TRIGGER t_a107_insert_requisito_aberta
    BEFORE INSERT ON a107.resultados_requisito
    FOR EACH ROW EXECUTE FUNCTION a107.verificar_execucao_aberta();
CREATE TRIGGER t_a107_insert_evidencia_aberta
    BEFORE INSERT ON a107.referencias_evidencia
    FOR EACH ROW EXECUTE FUNCTION a107.verificar_execucao_aberta();

-- Validação transacional no fechamento: exige 4 condições e 23 requisitos coerentes.
-- Esta validação não substitui a avaliação probatória/semântica da aplicação.
CREATE FUNCTION a107.validar_fechamento_execucao()
RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE
    v_id uuid;
    v_org text;
    v_ambito text;
    v_pacote uuid;
    v_ref timestamptz;
    v_conhecimento timestamptz;
    v_estado text;
    v_elegibilidade text;
    v_total_cond integer;
    v_total_req integer;
    v_incorretos integer;
BEGIN
    IF TG_OP = 'UPDATE' THEN
        IF OLD.status IN ('CONCLUIDA','REJEITADA','FALHA_TECNICA') THEN
            RAISE EXCEPTION 'A107: execução encerrada não pode ser alterada.' USING ERRCODE = '55000';
        END IF;
        IF NEW.status = 'CONCLUIDA' THEN
            SELECT v.id, v.organizacao_id, v.ambito_id, v.pacote_regras_id,
                   v.referencia_temporal, v.conhecimento_ate, v.estado, v.elegibilidade
              INTO v_id, v_org, v_ambito, v_pacote, v_ref, v_conhecimento, v_estado, v_elegibilidade
            FROM a107.verificacoes v WHERE v.execucao_id = NEW.id;
            IF v_id IS NULL THEN
                RAISE EXCEPTION 'A107: conclusão sem verificação registrada.' USING ERRCODE = '23514';
            END IF;
            IF v_org IS DISTINCT FROM NEW.organizacao_id OR
               v_ambito IS DISTINCT FROM NEW.ambito_id OR
               v_pacote IS DISTINCT FROM NEW.pacote_regras_id OR
               v_ref IS DISTINCT FROM NEW.referencia_temporal OR
               v_conhecimento IS DISTINCT FROM NEW.conhecimento_ate THEN
                RAISE EXCEPTION 'A107: verificação incoerente com execução.' USING ERRCODE = '23514';
            END IF;
            SELECT count(*) INTO v_total_cond FROM a107.resultados_condicao WHERE verificacao_id = v_id;
            IF v_total_cond <> 4 THEN
                RAISE EXCEPTION 'A107: conclusão exige quatro condições; encontradas %.', v_total_cond USING ERRCODE = '23514';
            END IF;
            SELECT count(*), count(*) FILTER (WHERE
                   (c.condicao_id = 'CM-01' AND r.requisito_id !~ '^CM01-R0[1-5]$') OR
                   (c.condicao_id = 'CM-02' AND r.requisito_id !~ '^CM02-R0[1-6]$') OR
                   (c.condicao_id = 'CM-03' AND r.requisito_id !~ '^CM03-R0[1-6]$') OR
                   (c.condicao_id = 'CM-04' AND r.requisito_id !~ '^CM04-R0[1-6]$'))
            INTO v_total_req, v_incorretos
            FROM a107.resultados_requisito r
            JOIN a107.resultados_condicao c ON c.id = r.resultado_condicao_id
            WHERE c.verificacao_id = v_id;
            IF v_total_req <> 23 OR v_incorretos <> 0 THEN
                RAISE EXCEPTION 'A107: requisitos incompletos ou atribuídos a condição incorreta (%).', v_total_req USING ERRCODE = '23514';
            END IF;
            IF (v_estado = 'ATENDIDA' AND EXISTS (
                  SELECT 1 FROM a107.resultados_condicao c WHERE c.verificacao_id = v_id AND c.estado <> 'ATENDIDA'
                )) OR (v_estado = 'NAO_ATENDIDA' AND NOT EXISTS (
                  SELECT 1 FROM a107.resultados_condicao c WHERE c.verificacao_id = v_id AND c.estado = 'NAO_ATENDIDA'
                )) OR (v_estado = 'INDETERMINADA' AND EXISTS (
                  SELECT 1 FROM a107.resultados_condicao c WHERE c.verificacao_id = v_id AND c.estado = 'NAO_ATENDIDA'
                )) THEN
                RAISE EXCEPTION 'A107: resultado consolidado incompatível com condições.' USING ERRCODE = '23514';
            END IF;
            IF v_estado = 'INDETERMINADA' AND NOT EXISTS (
                  SELECT 1 FROM a107.resultados_condicao c WHERE c.verificacao_id = v_id AND c.estado = 'INDETERMINADA'
                ) THEN
                RAISE EXCEPTION 'A107: estado indeterminado sem condição indeterminada.' USING ERRCODE = '23514';
            END IF;
        END IF;
    END IF;
    RETURN NEW;
END;
$$;

CREATE TRIGGER t_a107_validar_fechamento_execucao
    BEFORE UPDATE ON a107.execucoes
    FOR EACH ROW EXECUTE FUNCTION a107.validar_fechamento_execucao();

-- Pacotes de regras: linha publicada é imutável; mudar vigência gera nova versão, não UPDATE.
-- Observação: a coluna 'status' é registro de publicação inicial. Descontinuação futura exige evento/versionamento.

COMMIT;
