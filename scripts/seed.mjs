const token = process.env.SEED_TOKEN;
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const url = `${baseUrl}/api/internal/seed`;

if (!token) {
  // biome-ignore lint/suspicious/noConsole: actually, this is a script, so we want to log to the console
  console.error("Error: SEED_TOKEN no está definido");
  process.exit(1);
}

const res = await fetch(url, {
  method: "POST",
  headers: { "x-seed-token": token },
});

process.exit(res.ok ? 0 : 1);
