# Product Analytics Dashboard

A Next.js App Router project for browsing products, viewing product details, and showing product analytics widgets.

## Tech Stack

- Next.js 16 (App Router, Turbopack)
- React 19
- TypeScript
- Tailwind CSS v4
- TanStack Query (React Query)
- React Hook Form
- Recharts (monthly sales chart)
- Jest + Testing Library

## Features

- Root route redirects to `/products`
- Product listing with pagination
- Product search, category filtering, and sorting
- Product detail page with metadata generation
- Monthly sales chart (currently mock data)
- Light/dark theme toggle with persisted selection
- Route-level loading, error, and not-found states

## Project Structure

```text
src/
  app/
    layout.tsx
    providers.tsx
    products/
      page.tsx
      products-client.tsx
      [id]/
        page.tsx
  features/
    products/
      components/
      hooks/
      repositories/
      services/
      types/
      utils/
  lib/
    api/
  models/
  types/
tests/
  unit/
```

For a full architecture breakdown, see `ARCHITECTURE.md`.

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Install

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open `http://localhost:3000`.

### Build and Run Production

```bash
npm run build
npm run start
```

## Scripts

- `npm run dev`: start dev server
- `npm run build`: production build
- `npm run start`: run built app
- `npm run lint`: run ESLint
- `npm run test`: run unit tests
- `npm run test:watch`: run tests in watch mode

## API Source

The app fetches product data from DummyJSON:

- Base URL: `https://dummyjson.com`
- Config: `src/lib/api/apiConfig.ts`

Main endpoints used:

- `GET /products`
- `GET /products/search`
- `GET /products/category/:category`
- `GET /products/:id`
- `GET /products/category-list`

## Testing

Run:

```bash
npm run test
```

Current tests cover:

- product service mapping
- products query utility logic
- pagination behavior
- product filter behavior

## Notes

- The monthly sales chart uses a simulation hook (`src/features/products/hooks/useMonthlySalesSimulation.ts`) and mock dataset (`src/features/products/mocks/monthly-sales.mock.ts`).
- Product listing page uses server rendering for initial data and client-side querying for interactive filters.
