import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`team_members\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`role\` text NOT NULL,
  	\`education\` text,
  	\`image_id\` integer,
  	\`order\` numeric DEFAULT 0 NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`team_members_image_idx\` ON \`team_members\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`team_members_updated_at_idx\` ON \`team_members\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`team_members_created_at_idx\` ON \`team_members\` (\`created_at\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`team_members_id\` integer REFERENCES team_members(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_team_members_id_idx\` ON \`payload_locked_documents_rels\` (\`team_members_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`team_members\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`tags_id\` integer,
  	\`categories_id\` integer,
  	\`clients_id\` integer,
  	\`projects_id\` integer,
  	\`services_id\` integer,
  	\`videos_id\` integer,
  	\`company_values_id\` integer,
  	\`timeline_id\` integer,
  	\`social_media_id\` integer,
  	\`testimonials_id\` integer,
  	\`locations_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tags_id\`) REFERENCES \`tags\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`clients_id\`) REFERENCES \`clients\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`videos_id\`) REFERENCES \`videos\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`company_values_id\`) REFERENCES \`company_values\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`timeline_id\`) REFERENCES \`timeline\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`social_media_id\`) REFERENCES \`social_media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`testimonials_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`locations_id\`) REFERENCES \`locations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id", "tags_id", "categories_id", "clients_id", "projects_id", "services_id", "videos_id", "company_values_id", "timeline_id", "social_media_id", "testimonials_id", "locations_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id", "tags_id", "categories_id", "clients_id", "projects_id", "services_id", "videos_id", "company_values_id", "timeline_id", "social_media_id", "testimonials_id", "locations_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_tags_id_idx\` ON \`payload_locked_documents_rels\` (\`tags_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_clients_id_idx\` ON \`payload_locked_documents_rels\` (\`clients_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_projects_id_idx\` ON \`payload_locked_documents_rels\` (\`projects_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_services_id_idx\` ON \`payload_locked_documents_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_videos_id_idx\` ON \`payload_locked_documents_rels\` (\`videos_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_company_values_id_idx\` ON \`payload_locked_documents_rels\` (\`company_values_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_timeline_id_idx\` ON \`payload_locked_documents_rels\` (\`timeline_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_social_media_id_idx\` ON \`payload_locked_documents_rels\` (\`social_media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_testimonials_id_idx\` ON \`payload_locked_documents_rels\` (\`testimonials_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_locations_id_idx\` ON \`payload_locked_documents_rels\` (\`locations_id\`);`)
}
