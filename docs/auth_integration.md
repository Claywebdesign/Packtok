# Packtok – Auth Integration Guide

A concise reference  on how to use the Packtok backend after the migration to **Supabase Auth + Prisma**.

---

## 1  Environment variables (front-end)

| Key | Where to get it | Notes |
|-----|-----------------|-------|
| `SUPABASE_URL` | Supabase → Settings → API → Project URL | Public value, safe to ship in client bundles. |
| `SUPABASE_ANON_KEY` | Supabase → Settings → API → Anon Key | Public value, used by `@supabase/supabase-js` in the browser / RN / Flutter. |
| `API_BASE_URL` | e.g. `https://api.packtok.com` or `http://localhost:3001` | All Express routes below are relative to this. |

> Mobile apps **must** persist cookies (for the `refreshToken`) or store it manually.

---

## 2  Routes & payloads

```
POST   /api/v1/auth/signup
POST   /api/v1/auth/verify-otp
POST   /api/v1/auth/login
POST   /api/v1/auth/refresh
POST   /api/v1/auth/logout
GET    /api/v1/auth/me
```

### 2.1  Sign-Up

```
POST /api/v1/auth/signup
Content-Type: application/json

{
  "name": "Alice Example",
  "email": "alice@example.com",
  "password": "Sup3r-Secr3t!",
  "phone_number": "+15551234567"  // optional
}
```

*201 Created*

```json
{
  "data": {
    "id": "<supabase-uuid>",
    "email": "alice@example.com"
  },
  "message": "User registered. Please check your email for the OTP verification code."
}
```

An e-mail from **<no-reply@packtok.com>** is sent containing a six-digit OTP valid for 10 minutes.

### 2.2  Verify OTP

```
POST /api/v1/auth/verify-otp
{
  "email": "alice@example.com",
  "otp": "123456"
}
```

*200 OK* → account is now confirmed in Supabase.

### 2.3  Log-In

```
POST /api/v1/auth/login
{
  "email": "alice@example.com",
  "password": "Sup3r-Secr3t!"
}
```

*200 OK*

```json
{
  "data": {
    "accessToken": "<jwt>",
    "user": { "id": "…", "name": "Alice", "role": "NORMAL_USER", "permissions": [] }
  }
}
```

A secure, http-only `refreshToken` cookie is also set.
If the e-mail wasn't confirmed you'll get *403* with message *"Account not verified. A new OTP has been sent."*

### 2.4  Authenticated request

```
GET /api/v1/auth/me
Authorization: Bearer <accessToken>
```

Returns the user object enriched with permissions.

### 2.5  Refresh token

```
POST /api/v1/auth/refresh
// no body, the cookie travels automatically
```

*200 OK* `{ "data": { "accessToken": "<new>" } }`
Replace the stale token in your client state and retry the original call.

### 2.6  Logout

```
POST /api/v1/auth/logout
```

Clears the `refreshToken` cookie. On the client also call `supabase.auth.signOut()` to clear any in-memory session if you use the Supabase JS client directly.

---

## 3  Token lifecycle

| Item | TTL | Where stored |
|------|-----|--------------|
| `accessToken` | 15 minutes | Front-end state (Redux, React context, secure storage, etc.). Send as `Authorization` header. |
| `refreshToken`| 7 days     | Http-only cookie. Browser sends automatically; React-Native must persist manually if you don't rely on cookies. |

Front-end pattern:

1. Attempt request with current access token.
2. If 401/403 ➜ call `/refresh`.
3. Retry original request with new token.

---

## 4  React example (web)

```ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(import.meta.env.SUPABASE_URL, import.meta.env.SUPABASE_ANON_KEY);

export async function login(email: string, password: string) {
  const res = await fetch(`${import.meta.env.API_BASE_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include', // for cookie
  });
  if (!res.ok) throw await res.json();
  const { data } = await res.json();
  localStorage.setItem('accessToken', data.accessToken);
}
```

---

## 5  React-Native quick snippet

```ts
import CookieManager from '@react-native-cookies/cookies';

// after login response
await CookieManager.set('https://api.packtok.com', {
  name: 'refreshToken',
  value: res.cookies.refreshToken,
  path: '/',
  secure: true,
  httpOnly: true,
});
```

Use Axios interceptors to call `/refresh` and update `accessToken` on 401.

---

## 6  Error codes

| Code | Meaning | Typical fix |
|------|---------|-------------|
| 400  | Malformed body / invalid OTP format | Verify payload. |
| 401  | Missing or invalid access token | Login again or refresh. |
| 403  | Email not confirmed | Trigger `/verify-otp`. |
| 409  | Email already exists | Prompt user to log in instead. |

---

## 7  Role / Permissions snapshot

`req.user.permissions` contains an array of enum values: `MANAGE_BIDDING`, `MANAGE_MANPOWER`, etc. For admin dashboards simply check inclusion before showing privileged UI.

---

## 8  Postman collection (import-able JSON)

```json
{
  "info": {
    "name": "Packtok Auth",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    { "name": "Sign-up", "request": { "method": "POST", "header": [{"key":"Content-Type","value":"application/json"}], "url": "{{API_BASE_URL}}/api/v1/auth/signup", "body": { "mode": "raw", "raw": "{\n  \"name\": \"Alice Example\",\n  \"email\": \"alice@example.com\",\n  \"password\": \"Sup3r-Secr3t!\"\n}" } } },
    { "name": "Verify OTP", "request": { "method": "POST", "header": [{"key":"Content-Type","value":"application/json"}], "url": "{{API_BASE_URL}}/api/v1/auth/verify-otp", "body": { "mode": "raw", "raw": "{\n  \"email\": \"alice@example.com\",\n  \"otp\": \"123456\"\n}" } } },
    { "name": "Login", "request": { "method": "POST", "header": [{"key":"Content-Type","value":"application/json"}], "url": "{{API_BASE_URL}}/api/v1/auth/login", "body": { "mode": "raw", "raw": "{\n  \"email\": \"alice@example.com\",\n  \"password\": \"Sup3r-Secr3t!\"\n}" } } }
  ]
}
```

---

## 9  Deleting an account (server-side)

```ts
await supabase.auth.admin.deleteUser(userId);
await prisma.user.delete({ where: { id: userId } });
```

---
