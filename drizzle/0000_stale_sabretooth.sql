DO $$ BEGIN
 CREATE TYPE "public"."association_request_status" AS ENUM('Pending', 'Accepted', 'Declined');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."event_status" AS ENUM('Coming Soon', 'On going', 'Ended');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."kontak_type" AS ENUM('id_line', 'phone_number', 'instagram');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."lembaga_type" AS ENUM('Himpunan', 'UKM', 'Kepanitiaan');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."notification_type" AS ENUM('Association Request', 'System');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."organogram_type" AS ENUM('Posisi', 'Bidang', 'Divisi');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('admin', 'lembaga', 'mahasiswa');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."support_status" AS ENUM('Open', 'In Progress', 'Resolved', 'Closed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "anmategra_account" (
	"user_id" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"provider_account_id" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT "anmategra_account_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "anmategra_association_request" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"event_id" varchar(255),
	"user_id" varchar(255),
	"position_id" varchar(255) NOT NULL,
	"division_id" varchar(255),
	"bidang_id" varchar(255),
	"status" "association_request_status" DEFAULT 'Pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "anmategra_event_organogram" (
	"eventOrganogram_id" varchar(255) PRIMARY KEY NOT NULL,
	"event_id" varchar(255),
	"type" "organogram_type" NOT NULL,
	"value" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "anmategra_event" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"org_id" varchar(255),
	"name" varchar(255) NOT NULL,
	"description" text,
	"image" varchar(255),
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"status" "event_status" NOT NULL,
	"oprec_link" varchar(255),
	"location" varchar(255),
	"participant_limit" integer,
	"is_highlighted" boolean DEFAULT false NOT NULL,
	"is_organogram" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "anmategra_keanggotaan" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"event_id" varchar(255),
	"user_id" varchar(255),
	"position_id" varchar(255) NOT NULL,
	"division_id" varchar(255),
	"bidang_id" varchar(255),
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "anmategra_kontak" (
	"user_id" varchar(255) PRIMARY KEY NOT NULL,
	"type" "kontak_type",
	"value" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "anmategra_lembaga" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"founding_date" timestamp with time zone NOT NULL,
	"type" "lembaga_type",
	"image" varchar(255),
	"major" varchar(255),
	"field" varchar(255),
	"member_count" integer,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "anmategra_mahasiswa" (
	"user_id" varchar(255) PRIMARY KEY NOT NULL,
	"nim" integer NOT NULL,
	"jurusan" varchar(255) NOT NULL,
	"angkatan" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "anmategra_notification" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255),
	"title" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"type" "notification_type" NOT NULL,
	"read" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "anmategra_post" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"created_by" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "anmategra_session" (
	"session_token" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "anmategra_support" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255),
	"subject" varchar(255) NOT NULL,
	"topic" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"status" "support_status" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "anmategra_support_reply" (
	"reply_id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255),
	"support_id" varchar(255),
	"text" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "anmategra_user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"email_verified" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"image" varchar(255),
	"role" "role" NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "anmategra_verification_token" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	CONSTRAINT "anmategra_verification_token_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "anmategra_account" ADD CONSTRAINT "anmategra_account_user_id_anmategra_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."anmategra_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "anmategra_association_request" ADD CONSTRAINT "anmategra_association_request_event_id_anmategra_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."anmategra_event"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "anmategra_association_request" ADD CONSTRAINT "anmategra_association_request_user_id_anmategra_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."anmategra_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "anmategra_association_request" ADD CONSTRAINT "anmategra_association_request_position_id_anmategra_event_organogram_eventOrganogram_id_fk" FOREIGN KEY ("position_id") REFERENCES "public"."anmategra_event_organogram"("eventOrganogram_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "anmategra_association_request" ADD CONSTRAINT "anmategra_association_request_division_id_anmategra_event_organogram_eventOrganogram_id_fk" FOREIGN KEY ("division_id") REFERENCES "public"."anmategra_event_organogram"("eventOrganogram_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "anmategra_association_request" ADD CONSTRAINT "anmategra_association_request_bidang_id_anmategra_event_organogram_eventOrganogram_id_fk" FOREIGN KEY ("bidang_id") REFERENCES "public"."anmategra_event_organogram"("eventOrganogram_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "anmategra_event_organogram" ADD CONSTRAINT "anmategra_event_organogram_event_id_anmategra_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."anmategra_event"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "anmategra_event" ADD CONSTRAINT "anmategra_event_org_id_anmategra_lembaga_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."anmategra_lembaga"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "anmategra_keanggotaan" ADD CONSTRAINT "anmategra_keanggotaan_event_id_anmategra_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."anmategra_event"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "anmategra_keanggotaan" ADD CONSTRAINT "anmategra_keanggotaan_user_id_anmategra_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."anmategra_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "anmategra_keanggotaan" ADD CONSTRAINT "anmategra_keanggotaan_position_id_anmategra_event_organogram_eventOrganogram_id_fk" FOREIGN KEY ("position_id") REFERENCES "public"."anmategra_event_organogram"("eventOrganogram_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "anmategra_keanggotaan" ADD CONSTRAINT "anmategra_keanggotaan_division_id_anmategra_event_organogram_eventOrganogram_id_fk" FOREIGN KEY ("division_id") REFERENCES "public"."anmategra_event_organogram"("eventOrganogram_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "anmategra_keanggotaan" ADD CONSTRAINT "anmategra_keanggotaan_bidang_id_anmategra_event_organogram_eventOrganogram_id_fk" FOREIGN KEY ("bidang_id") REFERENCES "public"."anmategra_event_organogram"("eventOrganogram_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "anmategra_kontak" ADD CONSTRAINT "anmategra_kontak_user_id_anmategra_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."anmategra_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "anmategra_lembaga" ADD CONSTRAINT "anmategra_lembaga_user_id_anmategra_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."anmategra_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "anmategra_mahasiswa" ADD CONSTRAINT "anmategra_mahasiswa_user_id_anmategra_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."anmategra_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "anmategra_notification" ADD CONSTRAINT "anmategra_notification_user_id_anmategra_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."anmategra_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "anmategra_post" ADD CONSTRAINT "anmategra_post_created_by_anmategra_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."anmategra_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "anmategra_session" ADD CONSTRAINT "anmategra_session_user_id_anmategra_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."anmategra_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "anmategra_support" ADD CONSTRAINT "anmategra_support_user_id_anmategra_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."anmategra_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "anmategra_support_reply" ADD CONSTRAINT "anmategra_support_reply_user_id_anmategra_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."anmategra_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "anmategra_support_reply" ADD CONSTRAINT "anmategra_support_reply_support_id_anmategra_support_id_fk" FOREIGN KEY ("support_id") REFERENCES "public"."anmategra_support"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "account_user_id_idx" ON "anmategra_account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "created_by_idx" ON "anmategra_post" USING btree ("created_by");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "anmategra_post" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_user_id_idx" ON "anmategra_session" USING btree ("user_id");