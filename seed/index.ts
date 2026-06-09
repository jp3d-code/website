import "dotenv/config";
import { seedTags } from "./tags";
import { seedLocations } from "./locations";
import { seedProjects } from "./projects";
import { seedServices } from "./services";
import { seedSocialMedia } from "./social-media";
import { seedTimeline } from "./timeline";
import { seedValues } from "./values";
import { seedVideos } from "./videos";

async function main() {
  await seedTags();
  await seedLocations();
  await seedProjects();
  await seedServices();
  await seedSocialMedia();
  await seedTimeline();
  await seedValues();
  await seedVideos();
}

main().catch((error) => {
  // biome-ignore lint/suspicious/noConsole: Allow console.error for logging errors
  console.error("Seed failed:", error);
  process.exit(1);
});
