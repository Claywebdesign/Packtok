# Packtok Front-End – Auth, State & Data Layer Guide

This document mirrors the README in `apps/web` and is intended for **any front-end developer** who integrates new routes or features.

---

## 1  Tech Stack

| Layer | Library | Notes |
|-------|---------|-------|
| UI & Routing | Next.js 14 – App Router | Hybrid server / client. |
| Global State | Zustand (`/store/auth-store.ts`) | Persisted to `localStorage`. |
| Data Fetching / Caching | TanStack Query v5 | Configured in `app/providers.tsx`. |
| HTTP | Axios (`/lib/axios.ts`) | Automatic token handling. |
| Styling | shadcn-ui components + Tailwind 4 |

## 2  Auth Lifecycle

```
signup / login  ──►  accessToken (15 min)  +  refreshToken (7 days, http-only cookie)
                                 │
                all requests ────┘ (via Axios interceptor)
                                   ├─ 401/403? call /refresh once, queue others
                                   └─ refresh failed → logout → redirect
```

## 3  Key Files

| Path | Purpose |
|------|---------|
| `store/auth-store.ts` | Holds `accessToken`, `user`, and `logout()` that also POSTs `/logout`. |
| `lib/axios.ts` | Axios instance with refresh-token queue logic. |
| `hooks/useLogin.ts`, `useSignup.ts` | Mutations wrapping `/auth/login` & `/auth/signup`. |
| `hooks/useCurrentUser.ts` | Loads `/auth/me`, caches, syncs Zustand. |
| `components/auth/protected.tsx` | Client-side guard with loading spinner. |
| `lib/auth-server.ts` | Server-component helpers (`requireUser()`). |
| `app/account/page.tsx` | Example protected page using Figma layout. |

## 4  Adding Protected **Client** Routes

```tsx
"use client";
import Protected from "@/components/auth/protected";

export default function PurchasePage() {
  return (
    <Protected>
      <Purchase />
    </Protected>
  );
}
```

*While `Protected` validates the session it shows a loader. If the user is unauthenticated they are redirected to `/auth/signin`.*

## 5  Adding Protected **Server** Routes

```tsx
// app/dashboard/page.tsx  (Server Component)
import { requireUser } from "@/lib/auth-server";

export default async function Page() {
  const user = await requireUser(); // redirects if not logged in
  return <h1>Hello {user.name}</h1>;
}
```

`requireUser()` reads the `refreshToken` cookie on the server and fetches `/auth/me`.

## 6  Making API Calls

Always import the shared Axios instance – the refresh logic is already wired:

```ts
import api from "@/lib/axios";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await api.get("/api/v1/products");
      return data.data;
    },
  });
}
```

## 7  Synchronous Auth Checks

```ts
import { useAuthStore } from "@/store/auth-store";

const loggedIn = Boolean(useAuthStore.getState().accessToken);
```

## 8  Folder Structure Cheat-Sheet

```
apps/web/
  ├─ app/
  │   ├─ providers.tsx          ← QueryClientProvider + Toaster
  │   ├─ auth/*                 ← public auth pages
  │   ├─ account/page.tsx       ← protected example
  ├─ components/
  │   └─ auth/protected.tsx
  ├─ hooks/
  ├─ lib/
  └─ store/
```

## 9  Extending the Account Page

The current `/account` only displays basic fields from Supabase/Prisma (`name`, `email`). To add addresses, orders, etc.:

1. Extend the Prisma `User` model & create endpoints.
2. Add TanStack Query hook `useAddresses()`.
3. Insert new sections in the existing grid on `account/page.tsx`.

## 10  Contribution Checklist

1. **Create a hook** for new endpoints (Query or Mutation).
2. **Wrap** new pages in `<Protected>` (client) **or** `requireUser()` (server).
3. **Update** Zustand only via hook callbacks or generic setters.
4. **Avoid** direct `fetch()`; always use `lib/axios.ts`.
5. Run `npm run lint` & `npm run type-check` before committing.

Happy coding! 🚀
