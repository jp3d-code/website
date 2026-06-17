import "dotenv/config";
import { seedCategories } from "./categories";
import { seedClients } from "./clients";
import { seedContact } from "./contact";
import { seedLocations } from "./locations";
import { getPayloadClient } from "./payload";
import { seedProjects } from "./projects";
import { seedServices } from "./services";
import { seedSocialMedia } from "./social-media";
import { seedTags } from "./tags";
import { seedTestimonials } from "./testimonials";
import { seedTimeline } from "./timeline";
import { seedValues } from "./values";
import { seedVideos } from "./videos";

export async function isDatabaseEmpty(): Promise<boolean> {
  const payload = await getPayloadClient();

  const collections = [
    "tags",
    "categories",
    "clients",
    "projects",
    "services",
    "values",
    "timeline",
    "social-media",
    "testimonials",
    "videos",
    "locations",
  ] as const;

  for (const slug of collections) {
    const result = await payload.find({ collection: slug, limit: 1, depth: 0 });
    if (result.totalDocs > 0) {
      payload.logger.info(
        `Seed skipped: collection "${slug}" already has ${result.totalDocs} document(s).`,
      );
      return false;
    }
  }

  return true;
}

export async function runSeed(): Promise<void> {
  const empty = await isDatabaseEmpty();

  if (!empty) {
    return;
  }

  const tagsBySlug = await seedTags();
  const categoriesBySlug = await seedCategories();
  const clientsBySlug = await seedClients();
  await seedLocations();
  await seedProjects({ tagsBySlug, categoriesBySlug, clientsBySlug });
  await seedServices();
  await seedSocialMedia();
  await seedTimeline();
  await seedTestimonials();
  await seedValues();
  await seedVideos();
  await seedContact();
}
