-- A103 T2: LABORATÓRIO SIMULADO; NÃO EXECUTAR EM PRODUÇÃO.
BEGIN;
CREATE SCHEMA IF NOT EXISTS a103;
CREATE TABLE a103.organizacoes (
 organizacao_id uuid PRIMARY KEY, registro_id uuid NOT NULL UNIQUE,
 nome_referencia text NOT NULL, ambiente text NOT NULL CHECK(ambiente='SIMULADO'),
 criado_em timestamptz NOT NULL DEFAULT clock_timestamp()
);
CREATE TABLE a103.solicitacoes_registro (
 solicitacao_id text NOT NULL, principal_simulado text NOT NULL, pedido_hash char(64) NOT NULL,
 organizacao_id uuid NOT NULL REFERENCES a103.organizacoes(organizacao_id),
 estado text NOT NULL CHECK(estado='PUBLICADA'), resultado jsonb NOT NULL,
 criado_em timestamptz NOT NULL DEFAULT clock_timestamp(),
 PRIMARY KEY(principal_simulado,solicitacao_id)
);
CREATE TABLE a103.versoes_registro (
 registro_id uuid NOT NULL REFERENCES a103.organizacoes(registro_id),
 organizacao_id uuid NOT NULL REFERENCES a103.organizacoes(organizacao_id),
 versao_registro integer NOT NULL CHECK(versao_registro>0), versao_anterior integer,
 nome text NOT NULL, origem_referencial text NOT NULL,
 registrado_em timestamptz NOT NULL DEFAULT clock_timestamp(),
 ambiente text NOT NULL CHECK(ambiente='SIMULADO'),
 PRIMARY KEY(registro_id,versao_registro),
 CHECK((versao_registro=1 AND versao_anterior IS NULL) OR (versao_registro>1 AND versao_anterior=versao_registro-1))
);
CREATE TABLE a103.referencias_probatorias (
 evidencia_id uuid PRIMARY KEY, registro_id uuid NOT NULL, versao_registro integer NOT NULL,
 referencia_externa text NOT NULL, custodiante_modulo text NOT NULL, essencial boolean NOT NULL DEFAULT true,
 ambiente text NOT NULL CHECK(ambiente='SIMULADO'),
 FOREIGN KEY(registro_id,versao_registro) REFERENCES a103.versoes_registro(registro_id,versao_registro)
);
CREATE TABLE a103.manifestos_probatorios (
 manifesto_id uuid PRIMARY KEY, registro_id uuid NOT NULL, versao_registro integer NOT NULL,
 versao_manifesto integer NOT NULL DEFAULT 1 CHECK(versao_manifesto>=1),
 custodiante text NOT NULL DEFAULT 'A103-GEP' CHECK(custodiante='A103-GEP'),
 hash_sha256 char(64) NOT NULL, ambiente text NOT NULL CHECK(ambiente='SIMULADO'),
 criado_em timestamptz NOT NULL DEFAULT clock_timestamp(),
 UNIQUE(registro_id,versao_registro),
 FOREIGN KEY(registro_id,versao_registro) REFERENCES a103.versoes_registro(registro_id,versao_registro)
);
CREATE TABLE a103.itens_manifesto (
 manifesto_id uuid NOT NULL REFERENCES a103.manifestos_probatorios(manifesto_id),
 evidencia_id uuid NOT NULL REFERENCES a103.referencias_probatorias(evidencia_id),
 ordem integer NOT NULL CHECK(ordem>0),
 PRIMARY KEY(manifesto_id,evidencia_id),UNIQUE(manifesto_id,ordem)
);
CREATE TABLE a103.decisoes_publicacao (
 decisao_id uuid PRIMARY KEY, registro_id uuid NOT NULL,versao_registro integer NOT NULL,
 principal_simulado text NOT NULL, justificativa text NOT NULL,
 ambiente text NOT NULL CHECK(ambiente='SIMULADO'),
 decidido_em timestamptz NOT NULL DEFAULT clock_timestamp(),
 FOREIGN KEY(registro_id,versao_registro) REFERENCES a103.versoes_registro(registro_id,versao_registro)
);
CREATE TABLE a103.eventos_registro (
 evento_id uuid PRIMARY KEY,registro_id uuid NOT NULL,versao_registro integer NOT NULL,
 tipo text NOT NULL CHECK(tipo='PUBLICACAO_SIMULADA'),correlation_id text NOT NULL,
 ambiente text NOT NULL CHECK(ambiente='SIMULADO'),
 registrado_em timestamptz NOT NULL DEFAULT clock_timestamp(),
 FOREIGN KEY(registro_id,versao_registro) REFERENCES a103.versoes_registro(registro_id,versao_registro)
);
CREATE TABLE a103.outbox (
 outbox_id uuid PRIMARY KEY, evento_id uuid NOT NULL UNIQUE REFERENCES a103.eventos_registro(evento_id),
 tipo text NOT NULL CHECK(tipo='PUBLICACAO_SIMULADA'),
 payload jsonb NOT NULL, publicado_externamente boolean NOT NULL DEFAULT false,
 criado_em timestamptz NOT NULL DEFAULT clock_timestamp()
);
CREATE FUNCTION a103.bloquear_mutacao_historica() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN RAISE EXCEPTION 'A103_T2_HISTORICO_IMUTAVEL'; END $$;
DO $$ DECLARE t text; BEGIN
 FOREACH t IN ARRAY ARRAY['versoes_registro','referencias_probatorias','manifestos_probatorios','itens_manifesto','decisoes_publicacao','eventos_registro'] LOOP
  EXECUTE format('CREATE TRIGGER trg_immut BEFORE UPDATE OR DELETE ON a103.%I FOR EACH ROW EXECUTE FUNCTION a103.bloquear_mutacao_historica()',t);
 END LOOP;
END $$;
COMMIT;
