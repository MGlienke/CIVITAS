-- CIVITAS / C105-MSG / SRV-C105-001
-- MIG-C105-001 — PostgreSQL — modelo homologado; execução pendente
-- A migração aplica apenas objetos do módulo C105. Executar em banco de desenvolvimento isolado.
BEGIN;
CREATE SCHEMA IF NOT EXISTS c105;

CREATE TABLE c105.comunicacoes (
    communication_id uuid PRIMARY KEY,
    origin_entity_id varchar(128) NOT NULL,
    addressee_idup varchar(128) NOT NULL,
    service_id varchar(128) NOT NULL,
    subject varchar(500),
    content_ref varchar(1024) NOT NULL,
    state varchar(32) NOT NULL DEFAULT 'REGISTRADA',
    registered_at timestamptz NOT NULL DEFAULT clock_timestamp(),
    created_by_principal_ref varchar(256) NOT NULL,
    idempotency_scope varchar(512) NOT NULL,
    idempotency_key varchar(256) NOT NULL,
    request_fingerprint char(64) NOT NULL,
    correlation_id varchar(256) NOT NULL,
    contract_version varchar(32) NOT NULL DEFAULT '1.0',
    CONSTRAINT ck_c105_communication_state CHECK (state IN ('REGISTRADA')),
    CONSTRAINT ck_c105_origin_nonblank CHECK (length(btrim(origin_entity_id)) > 0),
    CONSTRAINT ck_c105_addressee_nonblank CHECK (length(btrim(addressee_idup)) > 0),
    CONSTRAINT ck_c105_service_nonblank CHECK (length(btrim(service_id)) > 0),
    CONSTRAINT ck_c105_content_nonblank CHECK (length(btrim(content_ref)) > 0),
    CONSTRAINT ck_c105_idempotency_nonblank CHECK (length(btrim(idempotency_key)) > 0),
    CONSTRAINT ck_c105_fingerprint_hex CHECK (request_fingerprint ~ '^[0-9a-f]{64}$'),
    CONSTRAINT uq_c105_idempotency UNIQUE (idempotency_scope, idempotency_key)
);
CREATE INDEX idx_c105_comunicacoes_destinatario_data
    ON c105.comunicacoes(addressee_idup, registered_at DESC);
CREATE INDEX idx_c105_comunicacoes_emissor_servico_data
    ON c105.comunicacoes(origin_entity_id, service_id, registered_at DESC);

CREATE TABLE c105.eventos_comunicacao (
    event_id uuid PRIMARY KEY,
    communication_id uuid NOT NULL REFERENCES c105.comunicacoes(communication_id) ON DELETE RESTRICT,
    event_type varchar(96) NOT NULL,
    occurred_at timestamptz NOT NULL,
    recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
    correlation_id varchar(256) NOT NULL,
    event_payload jsonb NOT NULL,
    event_version varchar(32) NOT NULL,
    CONSTRAINT ck_c105_event_payload_object CHECK (jsonb_typeof(event_payload) = 'object'),
    CONSTRAINT ck_c105_event_type_nonblank CHECK (length(btrim(event_type)) > 0)
);
CREATE UNIQUE INDEX uq_c105_evento_registro_unico
    ON c105.eventos_comunicacao(communication_id)
    WHERE event_type = 'ComunicacaoRegistrada';
CREATE INDEX idx_c105_eventos_comunicacao_data
    ON c105.eventos_comunicacao(communication_id, occurred_at);

CREATE TABLE c105.outbox (
    outbox_id uuid PRIMARY KEY,
    event_id uuid NOT NULL UNIQUE REFERENCES c105.eventos_comunicacao(event_id) ON DELETE RESTRICT,
    event_type varchar(96) NOT NULL,
    aggregate_id uuid NOT NULL REFERENCES c105.comunicacoes(communication_id) ON DELETE RESTRICT,
    event_version varchar(32) NOT NULL,
    payload jsonb NOT NULL,
    created_at timestamptz NOT NULL DEFAULT clock_timestamp(),
    published_at timestamptz,
    next_attempt_at timestamptz NOT NULL DEFAULT clock_timestamp(),
    attempt_count integer NOT NULL DEFAULT 0,
    last_failure_code varchar(32),
    CONSTRAINT ck_c105_outbox_payload_object CHECK (jsonb_typeof(payload) = 'object'),
    CONSTRAINT ck_c105_outbox_attempt_count CHECK (attempt_count >= 0)
);
CREATE INDEX idx_c105_outbox_pendentes
    ON c105.outbox(next_attempt_at, created_at)
    WHERE published_at IS NULL;
COMMIT;
