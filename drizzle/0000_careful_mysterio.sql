CREATE TABLE IF NOT EXISTS "smart-donna_account" (
	"userId" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"providerAccountId" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT "smart-donna_account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "coupons" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"discount_percentage" integer NOT NULL,
	"exhaust_limit" integer DEFAULT 0 NOT NULL,
	"max_discount_amount" integer NOT NULL,
	"min_order_amount" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "coupons_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "smart-donna_plans" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"price" integer NOT NULL,
	"validity" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "smart-donna_post" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"createdById" varchar(255) NOT NULL,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "smart-donna_session" (
	"sessionToken" varchar(255) PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "smart-donna_transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"npId" varchar(255) NOT NULL,
	"orderId" varchar(255) NOT NULL,
	"amount" integer NOT NULL,
	"currency" varchar(3) NOT NULL,
	"billingCycle" varchar(255) NOT NULL,
	"plan" integer NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"expiresAt" timestamp with time zone NOT NULL,
	CONSTRAINT "smart-donna_transactions_npId_unique" UNIQUE("npId"),
	CONSTRAINT "smart-donna_transactions_orderId_unique" UNIQUE("orderId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "twitter_spaces" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text,
	"space_url" text,
	"status" text,
	"original_transcript" text,
	"abstract" text,
	"mind_map" text,
	"summary" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "smart-donna_userPlan" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"transactionId" varchar(255),
	"planId" varchar(255) NOT NULL,
	"startDate" timestamp with time zone NOT NULL,
	"endDate" timestamp with time zone,
	"createdAt" timestamp with time zone NOT NULL,
	CONSTRAINT "smart-donna_userPlan_transactionId_unique" UNIQUE("transactionId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "smart-donna_user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"emailVerified" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"image" varchar(255),
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "smart-donna_verificationToken" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	CONSTRAINT "smart-donna_verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "smart-donna_account" ADD CONSTRAINT "smart-donna_account_userId_smart-donna_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."smart-donna_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "smart-donna_post" ADD CONSTRAINT "smart-donna_post_createdById_smart-donna_user_id_fk" FOREIGN KEY ("createdById") REFERENCES "public"."smart-donna_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "smart-donna_session" ADD CONSTRAINT "smart-donna_session_userId_smart-donna_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."smart-donna_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "smart-donna_transactions" ADD CONSTRAINT "smart-donna_transactions_userId_smart-donna_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."smart-donna_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "smart-donna_userPlan" ADD CONSTRAINT "smart-donna_userPlan_userId_smart-donna_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."smart-donna_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "account_userId_idx" ON "smart-donna_account" ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "createdById_idx" ON "smart-donna_post" ("createdById");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "smart-donna_post" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_userId_idx" ON "smart-donna_session" ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "transactions_userId_idx" ON "smart-donna_transactions" ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "userPlan_userId_idx" ON "smart-donna_userPlan" ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "userPlan_planId_idx" ON "smart-donna_userPlan" ("planId");