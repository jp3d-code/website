import path from "node:path";
import { fileURLToPath } from "node:url";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
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
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Tags,
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
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || "",
    },
  }),
  sharp: sharp,
  plugins: [],
  i18n: {
    fallbackLanguage: "en",
    supportedLanguages: { en, es },
  },
});
