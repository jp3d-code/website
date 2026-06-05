import Link from "next/link";
import { LinkBtm } from "@/shared/components/ui/link";
import { contactData } from "@/shared/data/contact";

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <p className="text-muted-foreground text-xs uppercase tracking-[0.35em]">
        {contactData.smallTitle}
      </p>
      <h1 className="font-medium text-3xl uppercase tracking-widest md:text-6xl">
        Ponte en contacto con <span className="text-primary">nosotros</span>
      </h1>
      <div className="space-y-2 text-muted-foreground text-sm">
        <p>{contactData.location}</p>
        <p>{contactData.phone}</p>
        <p>
          <Link
            href={`mailto:${contactData.email}`}
            className="underline-offset-4 hover:underline"
          >
            {contactData.email}
          </Link>
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        {contactData.socials.map((social) => (
          <LinkBtm
            key={social.url}
            href={social.url}
            target="_blank"
            variant="outline"
            className="uppercase tracking-widest"
          >
            {social.label}
          </LinkBtm>
        ))}
      </div>
    </div>
  );
}
