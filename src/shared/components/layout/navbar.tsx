import Link from "next/link";

import { routes } from "@/shared/config/routes";

const navItems = [
  routes.marca,
  routes.servicios,
  routes.proyectos,
  routes.sobreNosotros,
  routes.contacto,
];

export function Navbar() {
  return (
    <header className="w-full border-border/60 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:h-16">
        <Link href={routes.path} className="font-semibold text-sm uppercase">
          KW
        </Link>
        <nav className="flex items-center gap-4 font-medium text-sm">
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
      </div>
    </header>
  );
}
