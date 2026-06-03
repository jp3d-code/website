import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container, Section } from "@/shared/components/ui/section";
import { homeData } from "@/shared/data/home";

const toAppLink = (url: string) => {
  if (url.startsWith("/")) return url;
  if (url.endsWith(".html")) {
    const clean = url.replace("./", "").replace(".html", "");
    return clean === "index" ? "/" : `/${clean}`;
  }
  return url;
};

export function ExploreLinksSection() {
  return (
    <Section className="bg-card">
      <Container className="flex justify-between gap-10 md:flex-row">
        <h2 className="text-4xl uppercase tracking-widest md:text-7xl">
          Sigue explorando
        </h2>
        <div className="grid gap-2">
          {homeData.exploreLinks.map((item) => (
            <Link
              key={item.title}
              href={toAppLink(item.url)}
              className="group flex items-center gap-2 py-1 text-muted-foreground transition-all duration-150 hover:translate-x-2 hover:text-foreground"
            >
              <h3 className="font-medium text-lg">{item.title}</h3>
              <ArrowRight className="stroke-2 opacity-0 transition-all group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
