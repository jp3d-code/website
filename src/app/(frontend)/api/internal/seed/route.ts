import { revalidatePath } from "next/cache";
import { runSeed } from "@/seed";

export async function POST(req: Request) {
  const token = req.headers.get("x-seed-token");

  if (token !== process.env.SEED_TOKEN) {
    return new Response("Unauthorized", { status: 401 });
  }

  await runSeed();
  revalidatePath("/", "layout");

  return Response.json({ ok: true });
}
