import Link from "next/link";
import { LinkBtm } from "@/shared/components/ui/link";
import { routes } from "@/shared/config/routes";

const navItems = [
  routes.organizacion,
  routes.servicios,
  routes.proyectos,
  routes.atencion,
];

export function Navbar() {
  return (
    <header className="my-6 w-full">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 sm:h-16">
        <Link href={routes.path} className="font-semibold text-sm uppercase">
          KW
        </Link>
        <nav className="flex items-center gap-4 font-medium text-sm">
          {navItems.map((route) => (
            <LinkBtm
              variant="underline"
              key={route.path}
              href={route.path}
              className="text-xs uppercase"
            >
              {route.name}
            </LinkBtm>
          ))}
          <LinkBtm
            variant="default"
            size={"lg"}
            href={routes.contacto.path}
            className="text-sm uppercase"
          >
            {routes.contacto.name}
          </LinkBtm>
        </nav>
      </div>
    </header>
  );
}
