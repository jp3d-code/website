import { brandData } from "@/shared/data/brands";
import { imageByName, imageSrc } from "@/shared/data/images";

export default function BrandPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16">
      <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-10">
          {brandData.sections.map((section) => {
            const image = section.image ? imageByName[section.image] : null;
            return (
              <section key={section.title} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-xl uppercase tracking-[0.2em]">
                    {section.title.replace(/_/g, " ")}
                  </h2>
                  {image && (
                    <img
                      src={imageSrc(image)}
                      alt={section.title}
                      className="h-14 w-14 rounded-full object-cover"
                    />
                  )}
                </div>
                <div className="space-y-3 text-muted-foreground text-sm">
                  <p>{section.excerpt}</p>
                  {section.content.map((text, index) => (
                    <p key={`${section.title}-${index}`}>{text}</p>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
