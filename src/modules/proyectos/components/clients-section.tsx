import configPromise from "@payload-config";
import { getPayload } from "payload";
import {
  Container,
  Section,
  SectionHeader,
  SectionTitle,
} from "@/shared/components/ui/section";
import { getMediaUrl } from "@/shared/lib/utils";

export async function ClientsSection() {
  const payload = await getPayload({ config: configPromise });
  const { docs: clients } = await payload.find({
    collection: "clients",
    sort: "name",
    depth: 1,
  });

  if (!clients || clients.length === 0) {
    return null;
  }

  return (
    <Section className="bg-card">
      <Container>
        <SectionHeader className="mb-12">
          <SectionTitle first="Nuestros" second="Clientes" />
        </SectionHeader>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {clients.map((client) => {
            const logoUrl = getMediaUrl(client.logo);

            return (
              <a
                key={client.id}
                href={client.website || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-4 rounded-lg border border-border/40 bg-background p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
              >
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt={client.name}
                    className="h-16 w-auto object-contain opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                ) : (
                  <div className="flex h-16 w-32 items-center justify-center rounded bg-muted">
                    <span className="text-muted-foreground text-xs">
                      {client.name}
                    </span>
                  </div>
                )}
                <span className="text-center font-medium text-sm">
                  {client.name}
                </span>
              </a>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
