# CookBuddy

CookBuddy is a web application with a mobile-ready backend API. The current implementation uses:

- Static responsive frontend in `frontend/`
- Node.js API in `backend/`
- PostgreSQL schema and seed data in `database/`
- CookBuddy mapping-review data from `database/source/CookBuddy_Mapping_Review.xlsx`

Without `DATABASE_URL`, the recipe library still works from `database/generated/recipes.json`, generated from the mapping-review workbook.

## Run Locally

Set your PostgreSQL connection string:

```sh
export DATABASE_URL="postgres://user:password@localhost:5432/cookbuddy"
```

Create tables and seed starter recipes:

```sh
npm run db:init
npm run db:seed
```

Regenerate the seed and fallback recipe data from the workbook:

```sh
python3 scripts/generate_seed_from_mapping.py
```

Start the web app and API:

```sh
npm run dev
```

If npm is not available on your machine, run:

```sh
node backend/server.js
```

Open:

```text
http://localhost:3000
```

## Mobile App Later

The backend is already organized around JSON endpoints and token authentication, so a future React Native or Flutter app can use the same API as the web app.

## API Highlights

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/me`
- `GET /api/recipes`
- `GET /api/pantry`
- `POST /api/pantry`
- `GET /api/meal-plan`
- `POST /api/meal-plan`
- `GET /api/shopping-list`
- `POST /api/shopping-list/generate`
