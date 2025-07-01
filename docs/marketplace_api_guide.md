# Packtok – Marketplace API Guide
### (Products · Categories · Quotes)

This document complements `docs/auth_integration.md` and covers every route that was added after the Auth migration.
All URLs are relative to **`${API_BASE_URL}`** (e.g. `http://localhost:3001`). Replace the tokens and IDs in angle-brackets with real values.

> **Notation**
> `Bearer <USER_TOKEN>`  – access token obtained from the auth flow.
> `Bearer <ADMIN_TOKEN>` – access token whose user is **ADMIN** or **SUPER_ADMIN**.

---

## 1. Category management

| Method | URL | Auth | Purpose |
|--------|-----|------|---------|
| GET | `/api/v1/categories` | – | List every category |
| POST | `/api/v1/categories` | User | Create (or idempotently return) a new category |
| DELETE | `/api/v1/categories/{id}` | Admin | Remove a category |

### 1.1  Create category
```
POST /api/v1/categories
Authorization: Bearer <USER_TOKEN>
Content-Type: application/json

{ "name": "Shrink Sleeves" }
```
*201 Created*
```json
{
  "data": { "id": "cm…", "name": "Shrink Sleeves" },
  "message": "Category created"
}
```

---

## 2. Admin product flow

### 2.1  Create product
```
POST /api/v1/admins/products
Authorization: Bearer <ADMIN_TOKEN>
Body type: multipart/form-data
```
| key            | type | value / file |
|----------------|------|--------------|
| title          | text | Brand-new Cartoner |
| description    | text | High-speed mono-carton machine |
| price          | text | 125000.00 |
| quantity       | text | 1 |
| productType    | text | MACHINERY |
| machineType    | text | MONO_CARTON |
| condition      | text | NEW |
| categoryName   | text | Cartoning |
| manufacturer   | text | ACME |
| year           | text | 2024 |
| specifications | text | `{ "power":"5kW", "speed":"200cpm" }` |
| thumbnail      | file | thumb.jpg |
| images         | file | img1.jpg (`images` key can repeat up to 5x) |
| video          | file | demo.mp4 (optional) |
| videoThumbnail | file | vid-thumb.jpg (optional) |
| pdf            | file | specsheet.pdf (optional) |

*201 Created* returns full `MarketplaceProduct` record.

### 2.2  List all products
`GET /api/v1/admins/products`  (requires `Admin` token)

### 2.3  Update product
```
PUT /api/v1/admins/products/{productId}
Authorization: Bearer <ADMIN_TOKEN>
Body: multipart/form-data – only changed fields
```
Example form-data:
| key  | type | value |
|------|------|-------|
| price| text | 110000.00 |
| images | file | new-img.jpg |

### 2.4  Change product status
```
PUT /api/v1/admins/products/{productId}/status
Authorization: Bearer <ADMIN_TOKEN>
Content-Type: application/json
{ "status": "SOLD" }
```
Status enum: `AVAILABLE`, `OUT_OF_STOCK`, `SOLD`, `DRAFT`.

---

## 3. Customer catalogue (public)

| Route | Description |
|-------|-------------|
| `GET /api/v1/products` | Supports `page`, `limit`, `categoryId`, `productType`, `machineType`, `condition`. Returns `{ items, total, page, limit }`. MACHINERY prices are hidden. |
| `GET /api/v1/products/{id}` | Single product. Same price-secrecy rule. |

---

## 4. Customer – sell equipment

### 4.1  Submit item (saved as DRAFT)
```
POST /api/v1/products/submit
Authorization: Bearer <USER_TOKEN>
Body: multipart/form-data
```
| key            | type | value / file |
|----------------|------|--------------|
| title          | text | Used Gear |
| description    | text | Good condition, lightly used |
| price          | text | 500.00 |
| productType    | text | SPARE_PARTS |
| condition      | text | USED |
| categoryName   | text | Gears |
| thumbnail      | file | gear-thumb.jpg |
| images         | file | gear-1.jpg |

Returns product with `status=DRAFT`, `submissionStatus=PENDING_APPROVAL`.

### 4.2  Admin moderation
```
GET /api/v1/admins/submissions          // list pending
PUT /api/v1/admins/submissions/{id}/approve  // make AVAILABLE
PUT /api/v1/admins/submissions/{id}/reject   // mark REJECTED
(all require ADMIN_TOKEN)
```

---

## 5. Quote workflow

### 5.1  Customer creates quote
```
POST /api/v1/quotes
Authorization: Bearer <USER_TOKEN>
Content-Type: application/json
{
  "productId": "<PRODUCT_ID>",
  "companyName": "XYZ Packaging",
  "address": "123 Industrial Park",
  "message": "Need two units. Delivery to Mumbai.",
  "additionalInfo": "Include shipping cost."
}
```
*201 Created* → `QuoteRequest` with status `PENDING`.

### 5.2  Admin manages quotes
| Action | Route | Body |
|--------|-------|------|
| List   | `GET /api/v1/admins/quotes` | – |
| Update | `PUT /api/v1/admins/quotes/{quoteId}` | `{ "status": "REVIEWED" }`<br>`{ "status": "COMPLETED" }`<br>`{ "status": "CANCELLED" }` |

Once a quote is set to `COMPLETED`, the admin typically also sets the associated product to `SOLD` via **2.4** above.

---

## 6. Delete category (admin)
```
DELETE /api/v1/categories/{id}
Authorization: Bearer <ADMIN_TOKEN>
```

---

## 7. Testing tips

* Multipart text parts must use form-data **text/plain**.
* JSON-object fields inside multipart (e.g. `specifications`) should be provided as raw JSON strings.
* Repeat the `images` key to upload up to 5 gallery images.
* Remember to run `pnpm prisma migrate dev && pnpm --filter @packtok/db prisma generate` whenever `schema.prisma` changes.
* If buckets are private set `SUPABASE_BUCKET_PRIVATE=true` in the `.env` and the backend will return long-lived **signed** URLs instead of public ones.
