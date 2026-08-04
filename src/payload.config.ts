import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { en } from "@payloadcms/translations/languages/en";
import { es } from "@payloadcms/translations/languages/es";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Categories } from "./collections/Categories";
import { Clients } from "./collections/Clients";
import { Locations } from "./collections/Locations";
import { Media } from "./collections/Media";
import { Projects } from "./collections/Projects";
import { Services } from "./collections/Services";
import { SocialMedia } from "./collections/SocialMedia";
import { Tags } from "./collections/Tags";
import { TeamMembers } from "./collections/TeamMembers";
import { Testimonials } from "./collections/Testimonials";
import { Timeline } from "./collections/Timeline";
import { Users } from "./collections/Users";
import { Values } from "./collections/Values";
import { Videos } from "./collections/Videos";
import { Contact } from "./globals/Contact";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    theme: "light",
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Tags,
    TeamMembers,
    Categories,
    Clients,
    Projects,
    Services,
    Videos,
    Values,
    Timeline,
    SocialMedia,
    Testimonials,
    Locations,
  ],
  globals: [Contact],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
    push: false,
    migrationDir: "./migrations",
  }),
  sharp: sharp,
  plugins: [
    s3Storage({
      collections: {
        media: {
          signedDownloads: false,
        },
      },
      bucket: process.env.S3_BUCKET || "",
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
        },
        region: process.env.S3_REGION,
        endpoint: process.env.S3_ENDPOINT,
        forcePathStyle: true,
      },
      clientUploads: true,
    }),
  ],
  i18n: {
    fallbackLanguage: "es",
    supportedLanguages: { en, es },
  },
});
