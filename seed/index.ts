import "dotenv/config";
import { seedContact } from "./contact";
import { seedLocations } from "./locations";
import { seedProjects } from "./projects";
import { seedServices } from "./services";
import { seedSocialMedia } from "./social-media";
import { seedTags } from "./tags";
import { seedTimeline } from "./timeline";
import { seedTestimonials } from "./testimonials";
import { seedValues } from "./values";
import { seedVideos } from "./videos";

async function main() {
  await seedTags();
  await seedLocations();
  await seedProjects();
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
