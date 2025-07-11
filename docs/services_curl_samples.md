# Packtok – Services API: Full cURL Cookbook

> **Purpose**: copy-paste ready cURL commands for every service type, showing **all** input fields and every enum/drop-down option so the front-end dev can map forms quickly.
>
> Replace the `<PLACEHOLDER>` values with real inputs. If a field is optional, you can delete the line.
>
> Export your token first:
>
> ```bash
> export USER_TOKEN=<normal user JWT>
> export ADMIN_TOKEN=<super/superadmin JWT>
> export API=http://localhost:3001
> ```

---

## 1. Machine Maintenance

**Enum – `MaintenanceRequestType`**
`PREVENTIVE`, `CORRECTIVE`, `PREDICTIVE`, `EMERGENCY`

```bash
curl -X POST "$API/api/v1/services/maintenance" \
  -H "Authorization: Bearer $USER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "maintenanceType": "PREVENTIVE",
    "companyName": "<Company>",
    "address": "<Address>",
    "machineName": "<Machine>",
    "machineIdOrSerialNumber": "<SerialNo>",
    "locationInFacility": "<Floor/Line>",
    "manufacturer": "<Optional>",
    "installationDate": "2023-10-01T00:00:00.000Z",
    "checklistDetails": { "oil": "ok", "noise": "normal" },
    "partsReplaced": { "belt": "2023-09" },
    "technicianNotes": "<Optional>",
    "supervisorApprovalName": "<Optional>"
}'
```

---

## 2. Expert Consultancy

**Enums**
`industryType` → *IndustryType*
`servicesRequired[]` → *ConsultancyServiceType*
`projectGoals[]` → *ConsultancyProjectGoal*

```bash
curl -X POST "$API/api/v1/services/consultancy" \
  -H "Authorization: Bearer $USER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "<Company>",
    "contactPerson": "<Name>",
    "designation": "<Role>",
    "phone": "<Phone>",
    "email": "<Email>",
    "companyAddress": "<Address>",
    "industryType": "MANUFACTURING",
    "industryOther": "<If OTHER>",
    "employeesOperatingMachines": 25,
    "machineTypesInUse": "Cartoners, Fillers",
    "yearsInOperation": 10,
    "servicesRequired": [
      "PROCESS_IMPROVEMENT",
      "ENERGY_EFFICIENCY_SUSTAINABILITY"
    ],
    "currentChallenges": "High scrap rate",
    "projectGoals": ["REDUCE_DOWNTIME"],
    "preferredStartDate": "2025-09-01T00:00:00.000Z",
    "expectedCompletionDate": "2026-03-30T00:00:00.000Z",
    "estimatedBudget": "₹15L",
    "additionalNotes": "ISO 22000 compliance"
}'
```

---

## 3. Turnkey Project Inquiry

**Enums**
`industry[]` → *IndustryType*
`facilityType` → *TurnkeyFacilityType*
`completionTimeline` → *TurnkeyTimeline*
`siteAvailableStatus` → *SiteAvailability*
`servicesNeeded[]` → *TurnkeyServiceNeeded*
`estimatedBudget` → *TurnkeyBudget*
`fundingStatus` → *FundingStatus*

```bash
curl -X POST "$API/api/v1/services/turnkey-project" \
  -H "Authorization: Bearer $USER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "contactName": "<Name>",
    "companyName": "<Company>",
    "role": "Director",
    "email": "dir@example.com",
    "phone": "+91xxxxxxxxxx",
    "website": "https://example.com",
    "industry": ["FOOD_PROCESSING"],
    "facilityType": "EXPANSION_OF_EXISTING_FACILITY",
    "projectDescription": "Add new biscuit line",
    "targetProductionCapacity": "3 t/day",
    "completionTimeline": "MONTHS_6_12",
    "siteAvailableStatus": "YES",
    "servicesNeeded": ["EQUIPMENT_PROCUREMENT","PROCESS_OPTIMIZATION"],
    "powerSupplyAvailable": "750 kVA",
    "utilitiesAvailable": true,
    "machineryPreferences": "European",
    "estimatedBudget": "M5_10",
    "fundingStatus": "SEEKING_FINANCING",
    "requiresOngoingSupport": true,
    "interestedInFutureUpgrades": false,
    "specialRequirements": "Green building norms"
}'
```

---

## 4. Company Acquisition / Sale

**Enums**
`inquirerType` → *InquirerType*
`transactionType` → *TransactionType*
`sellerLegalStructure` → *LegalStructure*

```bash
curl -X POST "$API/api/v1/services/company-acquisition" \
  -H "Authorization: Bearer $USER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "contactName": "<Name>",
    "companyName": "<Company>",
    "role": "Consultant",
    "email": "consultant@example.com",
    "phone": "+91xxxxxxxxxx",
    "inquirerType": "BUYER",
    "transactionType": "STOCK_SHARE_SALE",
    "intendedOutcome": "Acquire 100% stake",
    "sellerBusinessDescription": "<Optional>",
    "sellerLegalStructure": "PVT_LTD",
    "sellerIndustrySector": "Packaging",
    "sellerYearEstablished": 2010,
    "sellerAnnualRevenue": "₹40Cr",
    "sellerEbitda": "₹6Cr",
    "sellerKeyAssets": "Plant, Land",
    "buyerPreferredBusinessType": "Carton",
    "buyerTargetSize": "₹30-60Cr",
    "buyerGeographicPreference": "West India",
    "buyerOwnershipInterest": "100%",
    "advisorsEngaged": ["XYZ Legal", "ABC Finance"],
    "isValued": true,
    "hasOngoingLitigation": false,
    "hasChangeOfControlClauses": false,
    "wantsNda": true,
    "additionalNotes": "Urgent"
}'
```

---

## 5. Manpower Hiring

**Enums**
`industryType` → *IndustryType*
`manpowerType[]` → *ManpowerType*
`hiringDuration` → *HiringDuration*
`hiringUrgency` → *UrgencyLevel*

```bash
curl -X POST "$API/api/v1/services/manpower-hiring" \
  -H "Authorization: Bearer $USER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "<Company>",
    "contactPerson": "<Name>",
    "designation": "HR Manager",
    "phone": "+91xxxxxxxxxx",
    "email": "hr@example.com",
    "companyAddress": "<Address>",
    "industryType": "MANUFACTURING",
    "machineryInvolved": "Flexo press",
    "workLocation": "Floor 2",
    "workingHours": "3 shifts",
    "manpowerType": ["MACHINE_OPERATORS","TECHNICIANS"],
    "skilledWorkersRequired": 5,
    "semiSkilledWorkersRequired": 3,
    "unskilledWorkersRequired": 2,
    "hiringDuration": "PERMANENT",
    "contractDurationDetails": "<Optional>",
    "requiredCertsAndExp": "ITI",
    "expectedJoiningDate": "2025-08-01T00:00:00.000Z",
    "hiringUrgency": "HIGH",
    "additionalNotes": "Night shift allowance"
}'
```

---

## 6. Job-Seeker Profile

Multipart **with file** – keep `cv` key for the document.

```bash
curl -X POST "$API/api/v1/services/jobseeker" \
  -H "Authorization: Bearer $USER_TOKEN" \
  -F firstName=John \
  -F lastName=Doe \
  -F address="123 Street" \
  -F city=Indore \
  -F state=MP \
  -F postalCode=452001 \
  -F stateOfResidence=MadhyaPradesh \
  -F phone=+919812345678 \
  -F alternatePhone="" \
  -F positionSought=Operator \
  -F otherPosition="" \
  -F preferredWorkingMode=Full-time \
  -F hasPreviouslyWorkedWithUs=false \
  -F previousWorkEndDate="" \
  -F cv=@/absolute/path/to/cv.pdf
```

---

## 7. Admin short-cuts

List, view, update status:

```bash
curl -H "Authorization: Bearer $ADMIN_TOKEN" $API/api/v1/admins/services   # list
curl -H "Authorization: Bearer $ADMIN_TOKEN" $API/api/v1/admins/services/<ID>  # detail
curl -X PUT -H "Authorization: Bearer $ADMIN_TOKEN" -H "Content-Type: application/json" \
     -d '{"status":"IN_REVIEW"}' \
     $API/api/v1/admins/services/<ID>/status
```
