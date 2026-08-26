# InvestFlow

This project was migrated from a Base44/Tailwind structure into a Next.js app.

## Local setup

1. Install dependencies:
   npm install

2. Create your local environment file:
   cp .env.example .env.local

3. Run the development server:
   npm run dev

4. Open:
   http://localhost:3000

## Environment variables

Create a `.env.local` file based on `.env.example`:

- NEXT_PUBLIC_APP_NAME=InvestFlow
- NEXT_PUBLIC_SITE_URL=http://localhost:3000

## Production / deployment

This project is ready to deploy to Vercel:

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Set the same environment variables in the Vercel dashboard.
4. Deploy.

## Scripts

- `npm run dev` — start the app in development mode
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — run Next.js lint checks

// filepath: c:\Users\democrito.analista\Documents\Projetos\invest-flow\.gitignore
node_modules
.next
out
dist
coverage
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.DS_Store
*.tsbuildinfo