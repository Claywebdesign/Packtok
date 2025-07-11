# Packtok – Services API Guide

### (Maintenance · Consultancy · Turnkey · Acquisition · Manpower · Job-Seeker)

All URLs are relative to **`${API_BASE_URL}`** (e.g. `http://localhost:3001`).
Replace tokens / IDs in <angle-brackets> with real values.

> **Auth notation**
> `Bearer <USER_TOKEN>` – access token of a normal authenticated user
> `Bearer <ADMIN_TOKEN>` – access token whose user is `ADMIN` or `SUPER_ADMIN`

---

## 1  Enums & Common Values

| Enum | Values |
|------|--------|
| `ServiceStatus` | `SUBMITTED`, `AWAITING_ASSIGNMENT`, `IN_REVIEW`, `ACTION_REQUIRED`, `APPROVED`, `REJECTED`, `IN_PROGRESS`, `COMPLETED`, `CLOSED`, `CANCELLED` |
| `ServiceType`   | `MAINTENANCE`, `CONSULTANCY`, `TURNKEY_PROJECT`, `COMPANY_ACQUISITION`, `MANPOWER_HIRING`, `JOB_SEEKER_SUBMISSION` |

For other enums (industry, manpower type, etc.) see the Prisma schema – they are fully enforced by the API.

---

## 2  Customer / User Routes

| Method | URL | Body type | Purpose |
|--------|-----|-----------|---------|
| POST | `/api/v1/services/maintenance` | JSON | Submit a machine-maintenance request |
| POST | `/api/v1/services/consultancy` | JSON | Submit an expert-consultancy request |
| POST | `/api/v1/services/turnkey-project` | JSON | Submit a turnkey-project inquiry |
| POST | `/api/v1/services/company-acquisition` | JSON | Submit a company acquisition / sale inquiry |
| POST | `/api/v1/services/manpower-hiring` | JSON | Submit a manpower-hiring request |
| POST | `/api/v1/services/jobseeker` | multipart/form-data | Job-seeker profile (with CV upload) |
| GET  | `/api/v1/services/my` | – | List *my* submitted service requests |

*All user routes require `Authorization: Bearer <USER_TOKEN>`*

### 2.1  Maintenance – example

```http
POST /api/v1/services/maintenance
Authorization: Bearer <USER_TOKEN>
Content-Type: application/json

{
  "maintenanceType": "EMERGENCY",
  "companyName": "Alpha Packaging",
  "address": "Plot 21, Industrial Estate",
  "machineName": "Cartoner 2000",
  "machineIdOrSerialNumber": "C2K-23-XY",
  "locationInFacility": "Line 3",
  "manufacturer": "ACME",
  "installationDate": "2022-05-12T00:00:00.000Z",
  "checklistDetails": { "vibration": "high", "noise": "abnormal" },
  "partsReplaced": { "belt": "yes" },
  "technicianNotes": "Gear slippage suspected",
  "supervisorApprovalName": "Raj Kumar"
}
```

*201 Created*

```json
{
  "data": {
    "id": "sr_…",
    "status": "SUBMITTED",
    "serviceType": "MAINTENANCE",
    "maintenanceRequest": { /* … */ }
  },
  "message": "Maintenance request submitted"
}
```

### 2.2  Job-Seeker – multipart sample

| key | type | value / file |
|-----|------|--------------|
| firstName | text | Jane |
| lastName | text | Doe |
| address | text | 11 Main St |
| city | text | Pune |
| state | text | MH |
| postalCode | text | 411001 |
| stateOfResidence | text | Maharashtra |
| phone | text | +919876543210 |
| positionSought | text | Technician |
| preferredWorkingMode | text | Full-time |
| hasPreviouslyWorkedWithUs | text | false |
| cv | **file** | jane-doe-cv.pdf |

---

## 3  Admin Workflow

Base path: `/api/v1/admins/services`
(`ADMIN_TOKEN` or `SUPER_ADMIN_TOKEN` required)

| Method | URL | Body | Purpose |
|--------|-----|------|---------|
| GET | `/` | – | List **all** service requests |
| GET | `/{id}` | – | Detailed single request |
| PUT | `/{id}/assign` | `{ "adminId": "<ADMIN_ID>" }` | Assign request to an admin |
| PUT | `/{id}/status` | `{ "status": "<ServiceStatus>" }` | Update request status |
| DELETE | `/{id}` | – | Delete (only **SUPER_ADMIN** allowed) |

Every assignment or status change automatically logs an entry in `ServiceActionLog`.

### 3.1  List requests

```http
GET /api/v1/admins/services
Authorization: Bearer <ADMIN_TOKEN>
```

*200 OK*

```json
{
  "data": [
    {
      "id": "sr_…",
      "serviceType": "CONSULTANCY",
      "status": "IN_REVIEW",
      "createdAt": "2025-07-11T08:27:00.000Z",
      "user": { "id":"u1", "name":"Alice", "email":"alice@…" },
      "assignedTo": { "id":"admin42", "name":"Bob" },
      "consultancyRequest": { /* … */ },
      "actionLogs": [
        { "createdAt":"…", "action":"Status changed to IN_REVIEW", "actorId":"admin42" }
      ]
    }
  ],
  "message": "Service requests fetched"
}
```

### 3.2  Assign request

```http
PUT /api/v1/admins/services/sr_xxx/assign
Authorization: Bearer <ADMIN_TOKEN>
Content-Type: application/json

{ "adminId": "admin42" }
```

*200 OK* – returns updated request object.

---

## 4  Action Log Shape

```ts
{
  id: string;
  createdAt: string; // ISO
  action: string;
  notes?: string;
  actor: { id: string; name: string; email: string };
}
```

Use this for a timeline component.

---

## 5  Recommended Status Flow

```
SUBMITTED → AWAITING_ASSIGNMENT → IN_REVIEW →
  ├─ ACTION_REQUIRED ↩ (need more info)
  └─ APPROVED → IN_PROGRESS → COMPLETED
                       ↘  REJECTED
                           CLOSED / CANCELLED
```

Only the `status` field is enforced by the backend; UI decides allowed transitions.

---

## 6  Uploads

| Field | Accepted types | Supabase bucket |
|-------|----------------|-----------------|
| `cv` (job-seeker) | pdf, doc, docx, txt | `SUPABASE_DOC_BUCKET` |
| Images | jpg, jpeg, png | `SUPABASE_IMAGE_BUCKET` |
| Videos | mp4, mov, webm | `SUPABASE_VIDEO_BUCKET` |

If `SUPABASE_BUCKET_PRIVATE=true`, API returns 1-year signed URLs instead of public URLs.

---

## 7  Testing Tips

* Persist cookies in Postman/Thunder Client – `refreshToken` is http-only.
* Enums are case-sensitive (all caps, underscore).
* Multipart text parts must be **text/plain**.
* Job-seeker endpoint expects exactly one `cv` file; other endpoints ignore files.

---
