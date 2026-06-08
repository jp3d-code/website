import "dotenv/config";
import { seedTags } from "./tags";

async function main() {
  await seedTags();
}

main().catch((error) => {
  // biome-ignore lint/suspicious/noConsole: Allow console.error for logging errors
  console.error("Seed failed:", error);
  process.exit(1);
});
