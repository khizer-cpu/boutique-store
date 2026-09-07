# Atelier No.7 — Boutique Store

Full-stack fashion boutique built with Next.js 14 (App Router), TypeScript, Prisma + Postgres, JWT auth, and Tailwind.

## Stack

- **Next.js 14** (App Router, Server Components + API routes in `app/api`)
- **TypeScript**
- **Prisma + PostgreSQL**
- **JWT** auth via `httpOnly` cookie (no NextAuth — hand-rolled per assignment requirements)
- **Tailwind CSS**

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Get a free Postgres database** — easiest options:
   - [Neon](https://neon.tech) (recommended, generous free tier)
   - [Supabase](https://supabase.com)
   - [Railway](https://railway.app)

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Fill in `DATABASE_URL` from your Postgres provider, and generate a `JWT_SECRET`:
   ```bash
   openssl rand -base64 32
   ```

4. **Run migrations and seed data**
   ```bash
   npx prisma migrate dev --name init
   npm run seed
   ```
   This creates the tables and an admin account: `admin@boutique.test` / `admin123`.

5. **Run the dev server**
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000

## Architecture

### Database schema (`prisma/schema.prisma`)

- `User` — customers and admins (`role` enum), password hashed with bcrypt
- `Category` — product categories
- `Product` — belongs to a `Category`
- `Order` — belongs to a `User`, has many `OrderItem`
- `OrderItem` — join table between `Order` and `Product`, snapshots price at purchase time

### Routes (pages)

| Route | Purpose |
|---|---|
| `/` | Product grid (home) |
| `/products/[slug]` | Product detail + add to cart |
| `/cart` | Cart + checkout |
| `/login`, `/register` | Auth |
| `/admin` | Dashboard (admin only) |
| `/admin/products`, `/admin/products/new` | Product management |
| `/admin/orders` | Order management |

### API endpoints

| Endpoint | Method | Access |
|---|---|---|
| `/api/auth/register` | POST | public |
| `/api/auth/login` | POST | public |
| `/api/auth/me` | GET | public (returns null if not logged in) |
| `/api/products` | GET / POST | public / admin |
| `/api/products/[id]` | GET / PATCH / DELETE | public / admin / admin |
| `/api/categories` | GET | public |
| `/api/orders` | GET / POST | logged-in user |

### Auth flow

- Password hashed with bcrypt on register.
- On login, a JWT (`{ userId, email, role }`) is signed and set as an `httpOnly` cookie.
- API routes call `getUserFromRequest(req)` to read + verify the cookie server-side.
- Admin routes check `user.role === "ADMIN"` before mutating.
- Cart is kept client-side in `localStorage` (via `CartContext`) — no DB writes until checkout, which recalculates prices server-side from the DB (never trusts client-sent prices).

## Suggested 2-week milestone breakdown

**Days 1–3: Foundations**
- Confirm schema, run first migration, seed data
- Auth (register/login/me) working end-to-end
- Home page rendering real products

**Days 4–7: Core shopping flow**
- Product detail page, cart, checkout → order creation
- Stock decrement on order, out-of-stock handling

**Days 8–11: Admin panel**
- Product CRUD (create/edit/delete)
- Order list view
- Route protection for `/admin/*`

**Days 12–13: Polish**
- Loading/error states, empty states, responsive pass
- Basic input validation everywhere (already scaffolded with `zod`)

**Day 14: Buffer + demo prep**
- Fix bugs, write lab report / README, rehearse demo

## Git workflow (solo project)

```bash
git init
git add .
git commit -m "chore: initial scaffold"

# work in feature branches even solo — keeps history readable and lets you roll back cleanly
git checkout -b feature/product-detail
# ...work...
git commit -m "feat: product detail page with add to cart"
git checkout main
git merge feature/product-detail
```

Suggested branch naming: `feature/...`, `fix/...`, `chore/...`. Commit in small, working chunks with imperative-mood messages (`feat: add checkout endpoint`, not `updated stuff`).
