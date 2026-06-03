import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { LinkBtm } from "@/shared/components/ui/link";
import { routes } from "@/shared/config/routes";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

const navItems = [
  routes.marca,
  routes.proyectos,
  routes.servicios,
  routes.sobreNosotros,
  routes.contacto,
];

function HeaderDesktop() {
  return (
    <div className="mx-auto hidden h-16 w-full max-w-6xl items-center justify-between px-4 md:flex">
      <Link href={routes.path} className="flex flex-col items-baseline">
        <span className="0.5 text-2xl uppercase tracking-widest">JP3D</span>
        <span className="text-muted-foreground text-xs leading-1.5">
          Ingenieria y fabricacion
        </span>
      </Link>
      <nav className="flex items-center gap-6 font-medium text-sm">
        {navItems.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className="transition-colors hover:text-foreground/80"
          >
            {route.name}
          </Link>
        ))}
      </nav>
      <LinkBtm
        variant="outline"
        href={routes.contacto.path}
        className="rounded-full text-xs uppercase tracking-[0.2em]"
      >
        Hablemos
      </LinkBtm>
    </div>
  );
}

function HeaderMobile() {
  return (
    <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 md:hidden">
      <Link href={routes.path} className="flex flex-col items-baseline">
        <span className="0.5 text-2xl uppercase tracking-widest">JP3D</span>
        <span className="text-muted-foreground text-xs leading-1.5">
          Ingenieria y fabricacion
        </span>
      </Link>
      <div className="flex items-center gap-4">
        <Link
          href={routes.contacto.path}
          className="rounded-full border border-foreground/30 px-4 py-2 text-xs uppercase tracking-[0.2em] transition hover:border-foreground"
        >
          Hablemos
        </Link>
        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Abrir menu"
                className={"md:hidden"}
              />
            }
          >
            <MenuIcon />
          </SheetTrigger>
          <SheetContent side="right" className="w-72 py-10">
            <Link
              href={routes.path}
              className="flex w-full items-center justify-center p-6 font-condensed font-semibold text-xl uppercase"
            >
              HYGACON
            </Link>
            <nav className="flex h-full flex-col items-center gap-3 p-4 font-medium">
              {navItems.map((route) => (
                <LinkBtm
                  key={route.path}
                  href={route.path}
                  variant="outline"
                  className="text-xs uppercase"
                >
                  {route.name}
                </LinkBtm>
              ))}
              <div className="pt-2">
                <LinkBtm
                  variant="default"
                  size={"lg"}
                  href={routes.contacto.path}
                  className="font-semibold text-sm uppercase"
                >
                  {routes.contacto.name}
                </LinkBtm>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-border/60 border-b bg-background/70 backdrop-blur">
      <HeaderDesktop />
      <HeaderMobile />
    </header>
  );
}
