# Zone

A website built with **Next.js (App Router)**, **React**, **TypeScript**,
**Convex**, **Convex Auth**, and **Tailwind CSS**. Content is managed through a
Convex-native CMS with a built-in admin UI.

## Stack

| Concern        | Choice                                            |
| -------------- | ------------------------------------------------- |
| Framework      | Next.js 15 (App Router) + React 19                |
| Backend / data | Convex                                            |
| Auth           | Convex Auth (`@convex-dev/auth`) — email/password |
| CMS            | Convex-native (`posts`, `pages` tables + admin)   |
| Styling        | Tailwind CSS v4                                    |

## Getting started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up Convex** — this creates a deployment, writes `NEXT_PUBLIC_CONVEX_URL`
   to `.env.local`, and keeps your functions in sync:

   ```bash
   npx convex dev
   ```

   On first run it will prompt you to log in / create a project. Leave this
   running in its own terminal.

3. **Configure Convex Auth** — generate the keys the auth library needs:

   ```bash
   npx @convex-dev/auth
   ```

   This sets `JWT_PRIVATE_KEY` and `JWKS` in your Convex deployment.

4. **Run the app** (in a second terminal):

   ```bash
   npm run dev
   ```

   Open <http://localhost:3000>.

## Project layout

```
app/
  layout.tsx              Root layout + Convex/Auth providers
  page.tsx                Public home page (lists published posts)
  signin/page.tsx         Email/password sign-in & sign-up
  admin/page.tsx          Protected CMS admin (create/edit/delete posts)
  ConvexClientProvider.tsx
convex/
  schema.ts               Auth tables + posts/pages content model
  auth.ts                 Convex Auth providers
  auth.config.ts
  http.ts                 Auth HTTP routes
  posts.ts                CMS queries & mutations
  users.ts                currentUser query
middleware.ts             Route protection for /admin
```

## How auth + the CMS fit together

- `middleware.ts` redirects unauthenticated visitors away from `/admin` and
  signed-in users away from `/signin`.
- All write operations in `convex/posts.ts` call `requireUser`, so the backend
  is the source of truth for access — not just the UI.
- The home page reads published posts; the admin reads everything.

## Extending

- **More content types:** add tables to `convex/schema.ts` and matching
  functions, then build admin UI.
- **OAuth / magic links:** add providers in `convex/auth.ts`.
- **Rich text:** the `body` field is plain text/markdown today — drop in a block
  editor (e.g. TipTap) and store its JSON when you're ready.
- **Roles:** add a `role` field to users and check it inside `requireUser`.
