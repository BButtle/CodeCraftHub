# User Management Service (CodeCraftHub)

## Run locally
1) Create `.env` based on `.env.example`
2) Install deps:
   npm install
3) Start:
   npm run dev

## Key endpoints
- POST /api/auth/register
- POST /api/auth/login
- GET  /api/auth/me
- GET  /api/users/:id
- PATCH /api/users/:id
- PATCH /api/users/:id/preferences

## Health
- GET /health
