import configPromise from "@payload-config";
import { getPayload } from "payload";
import { ClientsCarousel } from "@/modules/proyectos/components/ui/clients-carousel";

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

  return <ClientsCarousel clients={clients} />;
}
