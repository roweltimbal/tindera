# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Tindera Project Guidance

This is a portfolio project — code quality and clear architecture decisions matter as much as working features. Read `SPEC.md` at the project root before making changes; it's the source of truth for scope, schema, and brand tokens.

## Commands

```bash
npm run dev      # start dev server on localhost:3000
npm run build    # production build (also type-checks)
npm run lint     # run ESLint
```

No test runner is configured yet. TypeScript checking runs as part of `next build`.

## Stack (do not substitute)

- Next.js 16, App Router, Server Components + Server Actions
- TypeScript, Tailwind CSS v4, shadcn/ui, Lucide React
- MongoDB Atlas (native driver, not Mongoose)
- Zod for all form and server-side validation
- Argon2 for password hashing, HTTP-only session cookies (no NextAuth, no Clerk, no external auth provider)

## Hard boundaries

- No microservices. This is a monolith.
- No Redis or other caching layers.
- No real-time features (no websockets, no polling for live updates) in MVP.
- No AI features in MVP.
- Don't add dependencies not already listed in SPEC.md without asking first.

## App Architecture

The project is currently at scaffold stage. The planned App Router structure:

```
src/
  app/
    (auth)/
      login/page.tsx
      signup/page.tsx
    (app)/
      layout.tsx          # shared shell: nav, session check
      dashboard/page.tsx  # low-stock summary, quick stats
      inventory/page.tsx
      sales/page.tsx
      low-stock/page.tsx
    layout.tsx            # root layout: font, CSS vars
    globals.css           # brand tokens live here (see below)
  lib/
    db.ts                 # MongoDB connection singleton
    session.ts            # cookie read/write helpers
  actions/                # Server Actions (one file per domain)
    products.ts
    sales.ts
    auth.ts
```

**Server Actions** handle all mutations (CRUD, login, logout). Keep them in `src/actions/` rather than colocated with pages to make them easy to find.

**MongoDB** — use a module-level cached client in `src/lib/db.ts` to avoid opening a new connection on every request in dev (Next.js hot-reloads modules). Pattern: check `global._mongoClient`, create if absent, export `getDb()`.

**Auth flow** — on login, hash-verify with Argon2, write a signed session to an HTTP-only `Secure` cookie. On each protected request, read and validate the cookie server-side in the route's Server Component or middleware. No client-side auth state.

**Desktop/Mobile pairs (current pattern)** — dashboard pages currently render both a `*Desktop` and `*Mobile` component (toggled with `lg:hidden` / `hidden lg:flex`), fed by a single data fetch in the page's Server Component — fetch once, pass the same props to both variants rather than fetching per variant. Interactive sub-pieces (search inputs, filter chips, pagination, delete-confirm dialogs) are self-contained client components that manage their own state via `useSearchParams`/`router.push` (URL state) instead of props, so they drop into either tree with no extra wiring. See `src/components/inventory/` for a working example. If a page has a good reason to deviate (e.g. state that shouldn't live in the URL), that's fine — this is the default, not a hard rule.

## Tailwind v4 — CSS-first config

This project uses Tailwind v4, which has no `tailwind.config.js`. All theme customisation lives in `globals.css` using the `@theme` block. Brand tokens must be defined there:

```css
@import "tailwindcss";

@theme inline {
  --color-forest-green: #245424;
  --color-olive-lime:   #84A83C;
  --color-gold-yellow:  #F0C03C;
  --color-cream:        #FCF0E4;
  --font-sans: var(--font-plus-jakarta-sans);
}
```

Use `bg-forest-green`, `text-olive-lime`, etc. in components — not hardcoded hex values.

## Schema

- Four collections only: `users`, `stores`, `products`, `sales`. Match field names and types exactly as defined in SPEC.md.
- `quantity`, `threshold`, `quantitySold` are always `int`, never `decimal`.
- `storeId` on `users` is explicitly `null` at signup, not omitted.
- Category is a fixed enum: Food & Snacks, Beverages, Alcohol, Cleaning Products. Don't add categories without confirming.

## Brand tokens

Font: Plus Jakarta Sans via `next/font/google`, weights 400–800. Apply via `--font-plus-jakarta-sans` CSS variable set in the root layout and referenced in `@theme`.

## Working style

- Prefer simple, direct solutions over abstraction. Don't build for scale this project doesn't need.
- When scope is ambiguous, check SPEC.md first; if still unclear, ask rather than assume.
- Keep the target user (Aling Rosa — low time, low tolerance for friction, mobile-first) in mind for any UX decision.
