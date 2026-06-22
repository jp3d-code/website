import { ServiceDetailSection } from "@/modules/servicios/components/sections/service-detail-section";
import type { Service } from "@/payload-types";

interface ServicioDetailPageProps {
  service: Service;
}

export default function ServicioDetailPage({
  service,
}: ServicioDetailPageProps) {
  return <ServiceDetailSection service={service} />;
}
