ALTER TABLE "latex" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "latex" ADD COLUMN "updated_at" timestamp NOT NULL;