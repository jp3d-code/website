# WS_KW

This is a Next.js app using the App Router (`src/app`) and a shared component layer (`src/shared`).

## What this project uses

### Next.js

Next.js is the framework that runs the app. If you know React, think of Next.js as React plus routing, server rendering, layouts, and build tooling.

### Biome

Biome is the tool we use for code quality.

- `npm run lint` checks the code style and common mistakes.
- `npm run format` automatically formats the code.

It plays the same role that ESLint + Prettier often do in a React project, but in one tool.

### Shadcn

[Shadcn](https://ui.shadcn.com/docs/components/radix/button) is the UI pattern used for the shared components.

It does not work like a traditional component library where you import everything from one package. Instead, the components live in our codebase and are easy to customize.

In this project, the reusable UI pieces are in `src/shared/components/ui`.

If you want to add a new UI component, you can use the shadcn CLI.

```bash
pnpx shadcn@latest add button
```

### Tailwind CSS

Tailwind is used for styling with utility classes.

The global design tokens and theme variables live in `src/app/globals.css`.

Examples:

- `display: flex` becomes `flex`
- `align-items: center` becomes `items-center`
- `justify-content: center` becomes `justify-center`
- `gap: 16px` becomes `gap-4`
- `padding: 24px` becomes `p-6`

Example in React:

```tsx
<div className="flex items-center justify-center gap-4 p-6">
  Content
</div>
```

## Project structure

```text
src/
  app/                # Next.js routes, layout, page, and global styles
  modules/            # Feature modules used by pages
  shared/
    components/ui/     # Reusable UI components
    providers/         # Global providers like theme
    lib/               # Small shared helpers
    config/            # App constants and env config
```

## How to read the code

- `src/app/layout.tsx`: root layout for the whole app
- `src/app/page.tsx`: home page
- `src/app/*/page.tsx`: route entry points (usually render a module component)
- `src/modules/*`: feature modules for each page/section
- `src/app/globals.css`: global theme, tokens, and Tailwind setup

Example page using a module:

```tsx
// src/app/contacto/page.tsx
import type { Metadata } from "next";
import Title from "@/modules/contacto/components/title";
import { routes } from "@/shared/config/routes";

export const metadata: Metadata = {
  title: routes.contacto.name,
};

export default function ContactoPage() {
  return <Title />;
}
```
- `src/shared/components/ui/*`: reusable UI components
- `src/shared/providers/*`: context/providers used across the app
- `src/shared/lib/utils.ts`: shared helper functions like `cn`

## Getting Started

Run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Helpful scripts

```bash
pnpm run dev      # Start the local development server
pnpm run build    # Build the app for production
pnpm run start    # Run the production build
pnpm run lint     # Check code quality with Biome
pnpm run format   # Format code with Biome
```
