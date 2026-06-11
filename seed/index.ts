import "dotenv/config";
import { seedCategories } from "./categories";
import { seedClients } from "./clients";
import { seedContact } from "./contact";
import { seedLocations } from "./locations";
import { seedProjects } from "./projects";
import { seedServices } from "./services";
import { seedSocialMedia } from "./social-media";
import { seedTags } from "./tags";
import { seedTestimonials } from "./testimonials";
import { seedTimeline } from "./timeline";
import { seedValues } from "./values";
import { seedVideos } from "./videos";

async function main() {
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

main().catch((error) => {
  // biome-ignore lint/suspicious/noConsole: Allow console.error for logging errors
  console.error("Seed failed:", error);
  process.exit(1);
});
