# FreshFold Laundry

FreshFold is a Next.js App Router laundry service with public marketing pages, email/password accounts, customer order management, saved addresses, live order tracking, and an administrator console.

## Stack

- Next.js App Router, React, TypeScript, and Tailwind CSS
- Auth.js credentials authentication with JWT sessions
- PostgreSQL and Prisma
- bcrypt password hashes and Zod input validation
- Framer Motion and Lucide icons

## Project structure

```text
app/
  actions/                  Authenticated account, order, address, and admin actions
  admin/                    Role-protected admin overview, orders, customers, and services
  api/auth/[...nextauth]/   Auth.js endpoints
  api/register/             Validated account creation endpoint
  dashboard/                Protected customer overview, orders, addresses, and profile
  login/                    Sign-in page
  register/                 Account creation page
  services/, pricing, ...   Public marketing pages
auth.ts                     Auth.js configuration
components/                 Shared UI, auth, dashboard, and admin forms
lib/                        Prisma client, role guards, and presentation helpers
prisma/                     PostgreSQL schema, migrations, and seed data
```

## Local setup

Requirements: Node.js, npm, and a PostgreSQL database.

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a local environment file from the template:

   ```powershell
   Copy-Item .env.example .env
   ```

   Set `DATABASE_URL` to your PostgreSQL database, set `AUTH_SECRET` to a unique secret (generate one with `npx auth secret`), and choose a strong `ADMIN_EMAIL` and `ADMIN_PASSWORD`. The seed script creates the administrator from these values; never use the example password in a real deployment.

3. Apply the schema and seed the initial services/admin account:

   ```bash
   npm run db:deploy
   npm run db:seed
   ```

   For local schema development, use `npm run db:migrate` instead of `db:deploy`; Prisma will create and apply a migration.

4. Start the app:

   ```bash
   npm run dev
   ```

   Visit `http://localhost:3000`.

## Database commands

- `npm run db:generate` regenerates Prisma Client.
- `npm run dev` and `npm run build` automatically regenerate Prisma Client first.
- `npm run db:migrate` creates/applies a development migration.
- `npm run db:deploy` applies committed migrations in a deployment.
- `npm run db:seed` creates the initial admin and starter services.

## Security and deployment notes

- Customer pages and server actions verify the authenticated user. Order reads are scoped to the signed-in customer; administrative routes and mutations verify the `ADMIN` role on the server.
- Public registration only creates `USER` accounts. Do not add a public role selector.
- Deploy with HTTPS, a managed PostgreSQL service, a unique `AUTH_SECRET`, and a rate limit in front of registration and credential sign-in. Configure backups, monitoring, and your production service-area/contact details before launch.
- Configure the deployment platform to run `npm run db:deploy` as a release step. Do not run development migrations automatically in production.
- FreshFold's contact email, phone, map listing, service area, and starter pricing are example business settings. Update them in the app and seed data for the actual business.
