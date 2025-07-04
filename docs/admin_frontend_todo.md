# Admin Front-End Refactor / QA Checklist

_Repository root → `apps/admin`_

---

## 1  Split Large Client Pages into Server + Client Parts

| File | Action |
|------|--------|
| `app/dashboard/page.tsx` | Convert to **Server Component**. Move interactive widgets (charts, filters) to child Client components located in `app/dashboard/_components/`. |
| `app/dashboard/products/page.tsx` (≈ 600 LOC) | Same as above. Create `product-grid.tsx` and `product-table.tsx` under `app/dashboard/products/_components/` and mark them with `"use client"`. |
| Similar pattern for:<br/>`quotes/page.tsx`, `customers/page.tsx`, `invoice/page.tsx`, `messages/page.tsx` | |

Guideline: Server component fetches with `fetchJson()` (see §7) and streams HTML; Client component handles sorting, view-mode, mutations.

---

## 2  Remove Unnecessary `"use client"` Directives

Scan all files under `app/**` that do **not** invoke React client-only hooks and delete the directive.

_Examples_: `app/layout.tsx`, many static stub pages in `dashboard/*`.

---

## 3  Type-Safety / ESLint Clean-up

1. Replace `any` or explicit disables:
   * `hooks/useLogin.ts` (lines 41, 44, 65) – introduce `ApiLoginResponse` type.
   * `lib/axios.ts` (header mutating) – add `AxiosHeaders` interface instead of `any`.
   * `constants/navigation.ts` – use `LucideIcon` for `icon` field.
   * `types/product.ts` – replace `Record<string, any>` with `Specification = Record<string,string|number|boolean>` (or stricter interface).
2. Remove ESLint comments once types are fixed.

---

## 4  Move Toast / Side-Effects into `useEffect`

Affected files:

* `app/dashboard/products/page.tsx`  – error toast.
* `app/dashboard/quotes/page.tsx`     – error toast.
* (check other pages using `useXxx` hooks)

Pattern:

```tsx
const { error } = useProducts();
useEffect(() => {
  if (error) toast.error("Failed to fetch products");
}, [error]);
```

---

## 5  Guard Dev-Only Tooling from Production Bundle

| File | Change |
|------|--------|
| `app/providers.tsx` | Wrap `ReactQueryDevtools` in `process.env.NODE_ENV === "development"` **and** dynamic import:

```tsx
{process.env.NODE_ENV === "development" && (
  <ReactQueryDevtools initialIsOpen={false} />
)}
``` |
| Optional | Lazily import `react-hot-toast` in same file if bundle size is critical. |

---

## 6  Centralise Badge Colours & Query Keys
1. **Create** `utils/badges.ts`:
```ts
export const statusBadge = { /* … */ } as const;
export const typeBadge   = { /* … */ } as const;
export function cxBadge<K extends keyof typeof statusBadge>(k: K) {
  return statusBadge[k] ?? "bg-gray-100 text-gray-800";
}
```

2. Replace inline colour maps in:
   * `products/page.tsx`
   * `submissions/page.tsx`
   * any other pages showing status/type badges.
3. **Create** `utils/queryKeys.ts`:

```ts
export const QK = {
  products:   ["products"] as const,
  categories: ["categories"] as const,
  quotes:     ["quotes"] as const,
};
```

4. Update hooks `useProducts`, `useCategories`, `useQuotes`, etc. to use `QK`.

---

## 7  RSC-Friendly Data Fetching Helper

1. **Create** `lib/fetcher.ts`:

```ts
export async function fetchJson<T>(url: string, options?: RequestInit) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
    ...options,
    credentials: "include",
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Fetch failed");
  const json = await res.json();
  return (json.data ?? json) as T;
}
```

2. Refactor Server pages (see §1) to call `fetchJson` directly and pass data to Client components.
3. In Client components, prime React-Query cache:

```tsx
const qc = useQueryClient();
qc.setQueryData(QK.products, products);
```

---

## 8  Dev / Prod Bundle Optimisations

* Replace `lucide-react` star-imports with specific icon imports or `import type { LucideIcon }` for types.
* Ensure `.next` build shows reduced JS size (run `pnpm turbo run build --filter @packtok/admin`).

---

## 9  Add Zod Schemas for Product & Category Forms

Paths:

* `schemas/product-schema.ts` – validation for create/update product.
* `schemas/category-schema.ts` – validation for category create.
Hook into RHF on corresponding forms.

---
