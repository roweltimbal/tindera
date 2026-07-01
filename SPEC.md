# Tindera — MVP Spec

Mobile-first inventory and sales tracking app for Filipino sari-sari store owners. Built as a portfolio project to demonstrate product thinking and engineering competence.

## Persona: Aling Rosa

Solo sari-sari store owner. Runs the store herself, no staff. Restocks based on memory or gut feel. Tracks sales in a notebook or not at all. Every wrong restock decision or missed low-stock item costs her real money.

## Problem

1. Runs out of fast-moving stock → lost sales or emergency retail-price restocks.
2. Restocks slow-moving items because she doesn't know what actually sells → capital tied up wrong.
3. No record of sales vs. capital → can't tell profit from revenue, tax season is guesswork.

## Epic

> As a sari-sari store owner, I want a simple app that tracks my stock and sales for me, so that I stop losing money to stockouts, bad restocking decisions, and untracked profit.

## MVP Scope

### Must Have

**Inventory Page**

- View product name, quantity, threshold, price
- Edit product properties
- Delete products
- Add new products

**Sales Page**

- Search product
- Adjust quantity purchased
- Deduct sold quantity from inventory total

**Low Stock Page**

- View low-stock products (flagged when `quantity <= threshold`)

**Dashboard**

- Access to inventory page
- View low-stock items
- Login / logout

### Nice to Have (post-MVP)

- Inventory: base price + sale price split, email product list
- Sales: record sale history
- Low stock: email alerts
- Dashboard: daily/weekly/monthly/YTD sales, top performers, average quantity sold, tax estimate calculator

## Core User Stories (MVP)

1. **Low Stock Awareness** — flagged when `quantity <= threshold`, visible on dashboard without searching.
2. **Fast Stock Lookup** — searchable/filterable product list by name and category, current quantity at a glance.
3. **Recording a Sale** — selecting product + quantity sold auto-calculates `totalAmount` from `salePrice`, deducts from `quantity`, timestamps via `soldAt`.
4. **Identifying Profitable Products** — "Top Sellers" view ranks products using `Sales` aggregated by `productId` over a selectable time range.
5. **Daily/Weekly Income Snapshot** — dashboard surfaces sales-today and income-this-week totals from `Sales` collection.

## Future-Phase Stories (post-MVP)

6. Gross sales, capital spent, and net profit over a period.
7. Exportable sales summary for tax prep.

## Tech Stack

- **Frontend:** Next.js 16, App Router, Server Components, Server Actions, React, TypeScript
- **Styling:** Tailwind CSS, shadcn/ui, Lucide React icons
- **Backend:** Next.js Server Actions (CRUD, form submissions, business logic)
- **Database:** MongoDB Atlas — `users`, `stores`, `products`, `sales`
- **Auth:** Custom — email + password, Argon2 hashing, HTTP-only secure cookies, session-based, CSRF via Next.js forms
- **Validation:** Zod (form + server-side)
- **Deployment:** Vercel

## Architecture Principles

- Monolith architecture
- No microservices
- No Redis
- No external auth provider
- No AI features in MVP
- No real-time synchronization in MVP
- Minimal dependencies, favor simplicity and speed of development

## Database Schema

### `users`

| field          | type             | notes                                    |
| -------------- | ---------------- | ---------------------------------------- |
| `_id`          | ObjectId         |                                          |
| `storeId`      | ObjectId \| null | explicitly `null` at signup, not omitted |
| `firstName`    | string           | required, used for UI display            |
| `lastName`     | string           | required                                 |
| `email`        | string           | required, unique index                   |
| `passwordHash` | string           | required, Argon2 (embeds salt)           |

### `stores`

| field       | type     | notes    |
| ----------- | -------- | -------- |
| `_id`       | ObjectId |          |
| `storeName` | string   | required |

### `products`

| field         | type     | notes                                                                |
| ------------- | -------- | -------------------------------------------------------------------- |
| `_id`         | ObjectId |                                                                      |
| `storeId`     | ObjectId | required                                                             |
| `productName` | string   | required                                                             |
| `category`    | string   | required, enum: Food & Snacks, Beverages, Alcohol, Cleaning Products |
| `price`       | decimal  | required                                                             |
| `quantity`    | int      | required, whole units                                                |
| `threshold`   | int      | required, whole units                                                |

### `sales`

| field          | type     | notes                     |
| -------------- | -------- | ------------------------- |
| `_id`          | ObjectId |                           |
| `storeId`      | ObjectId | required                  |
| `productId`    | ObjectId | required                  |
| `quantitySold` | int      | required, whole units     |
| `salePrice`    | decimal  | required                  |
| `totalAmount`  | decimal  | required, auto-calculated |
| `soldAt`       | date     | required, ISODate         |

## Indexes

```js
// users
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ storeId: 1 });

// products
db.products.createIndex({ storeId: 1 });
db.products.createIndex({ storeId: 1, productName: 1 });
db.products.createIndex({ storeId: 1, quantity: 1, threshold: 1 });

// sales
db.sales.createIndex({ storeId: 1, soldAt: -1 });
db.sales.createIndex({ storeId: 1, productId: 1 });
```

Schema validation currently `validationAction: "warn"` during development — tighten to `"error"` once schema stabilizes.

## Brand System

| Token        | Hex       | Usage                   |
| ------------ | --------- | ----------------------- |
| Forest green | `#245424` | headings, wordmark      |
| Olive-lime   | `#84A83C` | CTAs, action elements   |
| Gold yellow  | `#F0C03C` | accents, feature badges |
| Cream        | `#FCF0E4` | page background         |

**Typeface:** Plus Jakarta Sans (Google Fonts, weights 400–800), via `next/font/google`.
