import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`projects\` RENAME COLUMN "name" TO "title";`)
  await db.run(sql`CREATE TABLE \`services\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`excerpt\` text NOT NULL,
  	\`content\` text NOT NULL,
  	\`order\` numeric DEFAULT 0 NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`services_image_idx\` ON \`services\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`services_updated_at_idx\` ON \`services\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`services_created_at_idx\` ON \`services\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`videos_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`videos\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`videos_content_order_idx\` ON \`videos_content\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`videos_content_parent_id_idx\` ON \`videos_content\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`videos\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`url\` text NOT NULL,
  	\`platform\` text DEFAULT 'tiktok' NOT NULL,
  	\`excerpt\` text NOT NULL,
  	\`order\` numeric DEFAULT 0 NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`videos_updated_at_idx\` ON \`videos\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`videos_created_at_idx\` ON \`videos\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`values\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`icon\` text,
  	\`order\` numeric DEFAULT 0 NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`values_updated_at_idx\` ON \`values\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`values_created_at_idx\` ON \`values\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`timeline\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`year\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`order\` numeric DEFAULT 0 NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`timeline_updated_at_idx\` ON \`timeline\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`timeline_created_at_idx\` ON \`timeline\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`social_media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	\`icon\` text,
  	\`order\` numeric DEFAULT 0 NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`social_media_updated_at_idx\` ON \`social_media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`social_media_created_at_idx\` ON \`social_media\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`locations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`address\` text NOT NULL,
  	\`lat\` numeric NOT NULL,
  	\`lng\` numeric NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`locations_updated_at_idx\` ON \`locations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`locations_created_at_idx\` ON \`locations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`contact\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`small_title\` text NOT NULL,
  	\`big_title\` text NOT NULL,
  	\`phone\` text NOT NULL,
  	\`email\` text NOT NULL,
  	\`copyright\` text NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`contact_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`locations_id\` integer,
  	\`social_media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`contact\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`locations_id\`) REFERENCES \`locations\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`social_media_id\`) REFERENCES \`social_media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`contact_rels_order_idx\` ON \`contact_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`contact_rels_parent_idx\` ON \`contact_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`contact_rels_path_idx\` ON \`contact_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`contact_rels_locations_id_idx\` ON \`contact_rels\` (\`locations_id\`);`)
  await db.run(sql`CREATE INDEX \`contact_rels_social_media_id_idx\` ON \`contact_rels\` (\`social_media_id\`);`)
  await db.run(sql`DROP TABLE \`projects_rels\`;`)
  await db.run(sql`ALTER TABLE \`projects\` ADD \`excerpt\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`projects\` ADD \`content\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`projects\` ADD \`order\` numeric DEFAULT 0 NOT NULL;`)
  await db.run(sql`ALTER TABLE \`projects\` DROP COLUMN \`sector\`;`)
  await db.run(sql`ALTER TABLE \`projects\` DROP COLUMN \`service_area\`;`)
  await db.run(sql`ALTER TABLE \`projects\` DROP COLUMN \`status\`;`)
  await db.run(sql`ALTER TABLE \`projects\` DROP COLUMN \`country\`;`)
  await db.run(sql`ALTER TABLE \`projects\` DROP COLUMN \`client\`;`)
  await db.run(sql`ALTER TABLE \`projects\` DROP COLUMN \`location\`;`)
  await db.run(sql`ALTER TABLE \`projects\` DROP COLUMN \`year\`;`)
  await db.run(sql`ALTER TABLE \`projects\` DROP COLUMN \`modality\`;`)
  await db.run(sql`ALTER TABLE \`projects\` DROP COLUMN \`summary\`;`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`services_id\` integer REFERENCES services(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`videos_id\` integer REFERENCES videos(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`values_id\` integer REFERENCES values(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`timeline_id\` integer REFERENCES timeline(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`social_media_id\` integer REFERENCES social_media(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`locations_id\` integer REFERENCES locations(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_services_id_idx\` ON \`payload_locked_documents_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_videos_id_idx\` ON \`payload_locked_documents_rels\` (\`videos_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_values_id_idx\` ON \`payload_locked_documents_rels\` (\`values_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_timeline_id_idx\` ON \`payload_locked_documents_rels\` (\`timeline_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_social_media_id_idx\` ON \`payload_locked_documents_rels\` (\`social_media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_locations_id_idx\` ON \`payload_locked_documents_rels\` (\`locations_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`projects\` RENAME COLUMN "title" TO "name";`)
  await db.run(sql`CREATE TABLE \`projects_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`tags_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tags_id\`) REFERENCES \`tags\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_rels_order_idx\` ON \`projects_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`projects_rels_parent_idx\` ON \`projects_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_rels_path_idx\` ON \`projects_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`projects_rels_tags_id_idx\` ON \`projects_rels\` (\`tags_id\`);`)
  await db.run(sql`DROP TABLE \`services\`;`)
  await db.run(sql`DROP TABLE \`videos_content\`;`)
  await db.run(sql`DROP TABLE \`videos\`;`)
  await db.run(sql`DROP TABLE \`values\`;`)
  await db.run(sql`DROP TABLE \`timeline\`;`)
  await db.run(sql`DROP TABLE \`social_media\`;`)
  await db.run(sql`DROP TABLE \`locations\`;`)
  await db.run(sql`DROP TABLE \`contact\`;`)
  await db.run(sql`DROP TABLE \`contact_rels\`;`)
  await db.run(sql`ALTER TABLE \`projects\` ADD \`sector\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`projects\` ADD \`service_area\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`projects\` ADD \`status\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`projects\` ADD \`country\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`projects\` ADD \`client\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`projects\` ADD \`location\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`projects\` ADD \`year\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`projects\` ADD \`modality\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`projects\` ADD \`summary\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`projects\` DROP COLUMN \`excerpt\`;`)
  await db.run(sql`ALTER TABLE \`projects\` DROP COLUMN \`content\`;`)
  await db.run(sql`ALTER TABLE \`projects\` DROP COLUMN \`order\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`tags_id\` integer,
  	\`projects_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tags_id\`) REFERENCES \`tags\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id", "tags_id", "projects_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id", "tags_id", "projects_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_tags_id_idx\` ON \`payload_locked_documents_rels\` (\`tags_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_projects_id_idx\` ON \`payload_locked_documents_rels\` (\`projects_id\`);`)
}
