Tindera

Mobile-first inventory and sales tracking app for Filipino sari-sari store owners.

The Problem

Sari-sari store owners run lean, solo operations — often tracking stock and sales from memory or a notebook, if at all. That costs real money in three ways: running out of fast-moving stock, restocking the wrong items because there's no visibility into what actually sells, and having no record to separate profit from revenue come tax season.

Tindera is built around Aling Rosa, a solo store owner persona, with one goal: make stock and sales tracking fast enough that it doesn't get in the way of actually running the store.

Features (MVP)

Inventory management — add, edit, delete products; view quantity, threshold, and price at a glance
Low stock alerts — products are automatically flagged when quantity drops to or below a set threshold
Sales recording — log a sale in a few taps; inventory deducts automatically
Dashboard — quick access to inventory, low-stock items, and account controls

See SPEC.md for full scope, schema, and roadmap.

Tech Stack

Framework: Next.js 16 (App Router, Server Components, Server Actions)
Language: TypeScript
Styling: Tailwind CSS, shadcn/ui
Database: MongoDB Atlas
Validation: Zod
Auth: Custom — Argon2 password hashing, session-based auth with HTTP-only cookies
Deployment: Vercel

Status

🚧 In active development.

Project scoped — user stories, MVP feature set, database schema
MongoDB Atlas schema validated
Brand system and lo-fi/hi-fi wireframes (Figma)
Next.js project scaffolded
Zod validation schemas
Auth (signup, login, sessions)
Inventory CRUD
Sales recording
Low stock dashboard

Design

Figma wireframes and hi-fi screens available on request. Brand palette:

HexForest green#245424Olive-lime#84A83CGold yellow#F0C03CCream#FCF0E4

Typeface: Plus Jakarta Sans

Getting Started

bashnpm install
npm run dev

Open http://localhost:3000.

Author

Built by Rowel Timbal as a portfolio project.
