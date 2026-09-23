# Jev Location Intelligence

## 1. Project Goal

Build a web application for **SME Location Intelligence**.

The user enters a business type, for example:

> "I want to open a bakery."

The application analyzes different areas across **Buenos Aires City (CABA) and Buenos Aires Province**, collects competitor information using Google Places API, analyzes geographic and commercial indicators, and uses **Jev as a decision engine** to identify potentially attractive areas.

The application must visualize the results on an interactive map.

The goal is NOT to build a chatbot that simply returns text.

The goal is:

**Real data → Geographic analysis → Metrics → Jev → Map + Recommendations**

---

# 2. User Example

The user enters:

```text
Business type:
Bakery

Territory:
CABA + Buenos Aires Province

Analysis radius:
500 m / 1 km

Priorities:
- Low competition: High
- Accessibility: Medium
- Rental cost: High
```

The application analyzes available areas.

Conceptual result:

```text
PALERMO
42 competitors
High density
→ High saturation

CABALLITO
18 competitors
Medium density
→ Medium opportunity

CASTELAR
14 competitors
Low density
Available rental properties
→ Potential opportunity
```

On the map:

```text
🟢 High opportunity
🟡 Medium opportunity
🔴 High competition / saturation
```

When selecting a zone:

```text
Castelar

Bakeries:
14

Competitors / km²:
X

Available rentals:
X

Average rent:
$X

Accessibility:
X

Business Fit:
X

[Ask Jev]
```

---

# 3. Core Principle

Jev MUST NOT invent data.

The system must separate:

### Data

Obtained or calculated by the backend:

* competitor count
* competitor density
* nearest competitor distance
* available commercial properties
* rental price
* property surface
* accessibility
* population/density when a reliable source exists
* other geographic indicators

### Decision

Jev receives those metrics and evaluates alternatives according to:

* business type
* budget
* priorities
* constraints
* characteristics of each zone

Jev is the **decision engine**, not the database or the primary calculator.

---

# 4. Technology Stack

## Frontend

Use:

* Next.js
* TypeScript
* React
* Tailwind CSS
* MapLibre GL JS or Leaflet
* TanStack Query

The frontend should be a modern dashboard with the map as the primary component.

---

# 5. Backend

Use:

* Python
* FastAPI
* Pydantic
* SQLAlchemy
* Alembic
* PostgreSQL
* PostGIS

FastAPI is responsible for:

* REST API
* Google Places integration
* data normalization
* geographic queries
* metric calculation
* scoring
* Jev integration
* storing application-owned data
* orchestration of analysis jobs

---

# 6. Database

Use:

**PostgreSQL + PostGIS**

PostGIS is required because the application needs geographic queries.

Examples:

```sql
competitors within 500 meters
```

```sql
competitors within 1 km
```

```sql
number of competitors per zone
```

```sql
distance between a property and its nearest competitor
```

```sql
business density per km²
```

---

# 7. Data Model

## Business

Represents a business obtained from an external source.

```text
Business
---------
id
external_id
name
category
subcategory
latitude
longitude
address
rating
review_count
source
source_url
created_at
updated_at
```

Do not assume every field will always be available.

Only store data that is permitted by the external source's terms and API policies.

---

# 8. AnalysisZone

Represents a geographic area being analyzed.

```text
AnalysisZone
------------
id
name
type
geometry
latitude
longitude
```

Examples:

```text
Palermo
Caballito
Belgrano
Castelar
Morón
Haedo
Ramos Mejía
```

Initially, work with real administrative areas, neighborhoods, or localities.

Do not invent geographic boundaries.

Use real geographic boundary datasets.

---

# 9. RentalListing

Represents a commercial property available for rent.

```text
RentalListing
-------------
id
source
external_id
title
price
currency
surface_m2
address
latitude
longitude
url
scraped_at
```

Rental data must only come from sources whose automated access is compatible with their terms, robots rules, APIs, or licensing.

Do NOT implement Google Maps scraping.

Do NOT implement Mercado Libre scraping.

If a source does not permit scraping, create an alternative adapter or use a permitted API, public dataset, or development seed dataset.

---

# 10. BusinessAnalysis

Represents the analysis of a zone for a particular business.

```text
BusinessAnalysis
----------------
id
business_type
zone_id
competitor_count
competitor_density
nearest_competitor_distance
rental_count
average_rent
average_surface
accessibility_score
competition_score
cost_score
business_fit_score
created_at
```

---

# 11. Google Places Integration

Google Places will primarily be used to obtain competitor information.

Example:

```text
business_type = "bakery"
zone = "Castelar"
```

The backend performs geographic searches and obtains relevant establishments.

Pipeline:

```text
Google Places
      ↓
Normalization
      ↓
Geographic processing
      ↓
PostGIS
      ↓
Metrics
```

Do NOT scrape the Google Maps website.

Use the official Google Places API.

Do NOT attempt to download a complete copy of Google Maps.

---

# 12. Analysis System

For every zone calculate:

## Competition

```text
competitor_count
```

Number of relevant businesses.

```text
competitor_density
```

Number of competitors per km².

```text
nearest_competitor_distance
```

Distance to the closest competitor.

```text
competition_score
```

Normalized competition indicator.

---

# 13. Cost Analysis

When rental data is available:

```text
average_rent
median_rent
rent_per_m2
available_listings
```

Create:

```text
cost_score
```

The score must be calculated by the backend.

Do not ask Jev to invent the number.

---

# 14. Business Fit Score

The backend can produce independent indicators:

```json
{
  "competition_score": 82,
  "cost_score": 76,
  "accessibility_score": 88,
  "market_score": 79
}
```

Jev then evaluates these indicators according to the user's priorities.

Example:

```json
{
  "business": "bakery",
  "priorities": {
    "competition": 0.9,
    "cost": 1.0,
    "accessibility": 0.7
  },
  "zones": [
    {
      "name": "Castelar",
      "competition_score": 82,
      "cost_score": 76,
      "accessibility_score": 88
    },
    {
      "name": "Caballito",
      "competition_score": 55,
      "cost_score": 61,
      "accessibility_score": 93
    }
  ]
}
```

Jev returns structured reasoning:

```json
{
  "recommendations": [
    {
      "zone": "Castelar",
      "reason": "...",
      "advantages": [],
      "risks": []
    }
  ]
}
```

The application must clearly distinguish between:

* observed data
* calculated metrics
* Jev analysis

---

# 15. Map

The map is the primary UI component.

It must support:

* zoom
* pan
* zone selection
* competitor visualization
* available rental visualization
* zone coloring
* zone details
* comparison between zones

Map layers:

```text
[ ] Competitors
[ ] Available rentals
[ ] Competition density
[ ] Opportunity
```

---

# 16. Opportunity Heatmap

Create a geographic visualization of the opportunity level.

Conceptually:

```text
                 CABA

       🔴 🔴 🟠 🟠
       🔴 🟠 🟡 🟢
       🟠 🟡 🟢 🟢


              PROVINCE

       🟡 🟢 🟢
       🟢 🟢 🟡
       🟠 🟡 🔴
```

The visualization must represent actual backend metrics.

Do not fabricate values.

---

# 17. Main Flow

```text
USER
 ↓
Select business type
 ↓
Select territory
 ↓
Select priorities
 ↓
BACKEND
 ↓
Get competitor data
 ↓
Get geographic data
 ↓
Get rental data
 ↓
PostGIS
 ↓
Calculate metrics
 ↓
JEV
 ↓
Evaluate alternatives
 ↓
FRONTEND
 ↓
Map
 ↓
Zones
 ↓
Recommendations
```

---

# 18. API

Create initially:

```http
POST /api/analysis
```

Request:

```json
{
  "business_type": "bakery",
  "territory": "buenos_aires",
  "competition_weight": 0.9,
  "cost_weight": 1.0,
  "accessibility_weight": 0.7
}
```

Response:

```json
{
  "analysis_id": "123",
  "zones": []
}
```

---

## Get zones

```http
GET /api/analysis/{id}/zones
```

---

## Get zone details

```http
GET /api/zones/{zone_id}
```

---

## Get competitors

```http
GET /api/zones/{zone_id}/competitors
```

---

## Get rental properties

```http
GET /api/zones/{zone_id}/rentals
```

---

## Ask Jev

```http
POST /api/analysis/{id}/jev
```

Request:

```json
{
  "question": "Why is this zone interesting for a bakery?"
}
```

---

# 19. Architecture

```text
                    NEXT.JS
                       │
                       │ REST
                       ▼
                    FASTAPI
                       │
          ┌────────────┼────────────┐
          │            │            │
          ▼            ▼            ▼
    Google Places   Rentals      Geo Data
          │            │            │
          └────────────┼────────────┘
                       ▼
                 PostgreSQL
                  + PostGIS
                       │
                       ▼
                Feature Engine
                       │
                       ▼
                      JEV
                       │
                       ▼
                Recommendations
                       │
                       ▼
                    NEXT.JS
                       │
                       ▼
                      MAP
```

---

# 20. MVP

Do not attempt to cover all of Argentina initially.

First version:

## Territory

CABA + selected municipalities/localities in Buenos Aires Province.

For example:

```text
CABA
Morón
Castelar
Haedo
Ramos Mejía
San Justo
```

## Business types

Allow the user to enter any category.

Examples:

```text
bakery
veterinary clinic
hair salon
gym
pharmacy
coffee shop
```

## Data sources

Initial version:

1. Google Places for competitors.
2. Public geographic data for boundaries.
3. A permitted rental source or development seed dataset.
4. PostgreSQL + PostGIS.
5. Jev.

---

# 21. Frontend MVP

Main screen:

```text
┌──────────────────────────────────────────────────────┐
│ Jev Location Intelligence                            │
├──────────────────┬───────────────────────────────────┤
│                  │                                   │
│ Business type    │                                   │
│ [ Bakery      ]  │                                   │
│                  │              MAP                  │
│ Budget           │                                   │
│ [$1,200,000   ]  │       🟢 🟢 🟡 🔴                 │
│                  │       🟢 🟡 🔴 🔴                 │
│ Competition      │                                   │
│ █████████░ 90%   │                                   │
│                  │                                   │
│ Cost             │                                   │
│ ██████████ 100%  │                                   │
│                  │                                   │
│ [ ANALYZE ]      │                                   │
├──────────────────┴───────────────────────────────────┤
│ Results                                              │
│                                                      │
│ ⭐ Castelar       Fit 86                              │
│   14 competitors                                    │
│                                                      │
│ ⭐ Haedo          Fit 82                              │
│   17 competitors                                    │
└──────────────────────────────────────────────────────┘
```

---

# 22. Important Rules for Cursor

1. Do not create fake data and present it as real data.
2. Do not invent geographic boundaries.
3. Do not scrape Google Maps.
4. Do not scrape Mercado Libre.
5. Do not assume an API permits indefinite storage of its data.
6. Create adapters for external data sources.
7. Separate ingestion, normalization, analysis, and recommendation.
8. Jev must not replace deterministic calculations.
9. Every score must be explainable.
10. Keep the backend independent from the frontend.
11. Do not couple the application to a single rental source.
12. Design the system so additional sources can be added later.
13. Every external integration must live behind a service/adapter.
14. Use PostGIS for geographic operations.
15. Make the map the center of the user experience.
16. Prioritize a functional MVP before secondary features.
17. Keep API keys and credentials server-side.
18. Never expose Google API credentials in the browser.
19. Cache only data that the relevant API terms allow the application to cache.
20. Treat external data sources as replaceable providers.

---

# 23. Project Structure

```text
jev-location-intelligence/
│
├── frontend/
│   ├── app/
│   ├── components/
│   │   ├── map/
│   │   ├── analysis/
│   │   ├── zones/
│   │   └── competitors/
│   ├── hooks/
│   ├── lib/
│   └── types/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── adapters/
│   │   │   ├── google_places/
│   │   │   ├── rentals/
│   │   │   └── geographic/
│   │   ├── analysis/
│   │   ├── jev/
│   │   └── core/
│   ├── alembic/
│   └── tests/
│
├── data/
│   └── seed/
│
├── docker-compose.yml
└── README.md
```

---

# 24. Implementation Order

### Phase 1

Create:

* Next.js
* FastAPI
* PostgreSQL
* PostGIS
* Docker Compose

### Phase 2

Create the geographic zone model.

### Phase 3

Integrate Google Places.

### Phase 4

Retrieve competitors by geographic area.

### Phase 5

Calculate:

```text
competitor_count
competitor_density
nearest_competitor_distance
```

### Phase 6

Display zones and competitors on the map.

### Phase 7

Add rental properties.

### Phase 8

Add deterministic scoring.

### Phase 9

Integrate Jev.

### Phase 10

Build final recommendations and visual explanations.

---

# 25. Expected Final Experience

The application should allow the user to say:

> "I want to open a bakery."

↓

Select:

> "CABA + Buenos Aires Province"

↓

The application analyzes the territory.

↓

Show:

```text
Zone          Competitors    Rentals    Opportunity

Castelar      14             8          High
Haedo         17             5          High
Caballito     18             12         Medium
Palermo       42             20         High competition
```

↓

Select a zone.

↓

View all available information on the map.

↓

Ask Jev:

> "Where should I investigate first and why?"

Jev must answer using only the data available in the analysis and explain the factors behind its recommendation.

---

# 26. Product Definition

The final product should feel like a **Location Intelligence + AI Decision Support platform**, not a chatbot.

Core value proposition:

> **"Decide where to open your next physical location using geographic data, competition, costs, and AI-assisted analysis."**
