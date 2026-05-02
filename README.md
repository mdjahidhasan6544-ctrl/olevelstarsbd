# O Level Stars

Full-stack learning platform with a React/Vite frontend, Express API, and MongoDB Atlas database.

## Local Setup

1. Install backend dependencies:
   ```bash
   cd backend
   npm ci
   ```
2. Install frontend dependencies:
   ```bash
   cd frontend
   npm ci
   ```
3. Create `backend/.env` from `backend/.env.example` and set `MONGO_URI`, `JWT_SECRET`, and admin variables.
4. Create `frontend/.env.local` from `frontend/.env.example` and set `VITE_API_URL=http://localhost:3001`.
5. Start the backend with `npm run dev` from `backend`.
6. Start the frontend with `npm run dev` from `frontend`.

## Production Deployment

The repository is prepared for:

- Frontend: GitHub Pages through `.github/workflows/deploy-pages.yml`
- Backend: Render web service through `render.yaml`
- Database: MongoDB Atlas through the backend `MONGO_URI` environment variable

### Backend Environment Variables

Set these in Render, not in GitHub-tracked files:

```env
MONGO_URI=mongodb+srv://olevelstars_db_user:<password>@olevelstars.7ew5xw0.mongodb.net/olevelstars?retryWrites=true&w=majority&appName=olevelstars
JWT_SECRET=<strong-random-secret>
JWT_EXPIRY=7d
CLIENT_URL=https://<github-username>.github.io/<repo-name>
NODE_ENV=production
ADMIN_NAME=<admin-name>
ADMIN_EMAIL=<admin-email>
ADMIN_PASSWORD=<strong-admin-password>
```

### Frontend GitHub Variable

After the Render backend is live, add this repository variable or secret in GitHub:

```env
VITE_API_URL=https://<render-backend-url>
```

Then enable GitHub Pages with source set to GitHub Actions and run the deploy workflow.
