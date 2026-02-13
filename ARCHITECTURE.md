# Architecture

## Overview

This project follows a feature-oriented structure on top of Next.js App Router.

Core flow:

1. Route pages in `src/app` orchestrate server/client rendering.
2. Feature modules in `src/features/products` contain business logic.
3. API layer in `src/lib/api` handles network and HTTP errors.
4. Domain models in `src/models` are used across UI and services.

## High-Level Layers

### 1) Presentation Layer

- `src/app/products/page.tsx`
  - Server component.
  - Fetches initial products and categories.
  - Uses `revalidate = 60` for ISR.
- `src/app/products/products-client.tsx`
  - Client component.
  - Handles search/category/sort/pagination state.
  - Calls `useProducts` for interactive fetching.
- `src/app/products/[id]/page.tsx`
  - Server component.
  - Loads single product by id.
  - Generates dynamic metadata.
  - Renders `MonthlySalesChart` (mock analytics widget).

Route UX boundaries:

- `loading.tsx` for pending states
- `error.tsx` for recoverable errors
- `not-found.tsx` for invalid/missing resources

### 2) Feature Layer (`src/features/products`)

- `components/`
  - UI components: list, filter, pagination, skeleton, chart.
- `hooks/useProducts.ts`
  - React Query integration.
  - Manages query key, cache behavior, initial/placeholder data.
- `hooks/useMonthlySalesSimulation.ts`
  - Encapsulates simulated monthly sales logic for analytics widget.
- `mocks/monthly-sales.mock.ts`
  - Static dataset used by the simulation hook.
- `types/monthly-sales.types.ts`
  - Monthly sales type contracts used by simulation and chart.
- `utils/products-query.ts`
  - Query-specific transformations:
  - build fetch params
  - apply search/category/sort/pagination rules
- `services/product.service.ts`
  - Maps external API responses to internal domain models.
- `repositories/product.repository.ts`
  - HTTP repository interface + implementation.
  - Endpoint selection logic for list/search/category/detail.

### 3) API Layer (`src/lib/api`)

- `apiConfig.ts`
  - Defines base URL (`https://dummyjson.com`).
- `httpClient.ts`
  - Shared `fetcher<T>` with typed JSON parsing.
- `httpError.ts`
  - Normalizes API failures into `HttpError`.

### 4) Shared Domain and Types

- `src/models/product.model.ts`
  - Domain model used by UI and business logic.
- `src/types/api.ts`
  - API response contracts.

## Data Flow

### Product List Page

1. `src/app/products/page.tsx` (server) loads initial products + categories via `ProductService`.
2. Initial data is passed to `ProductsClient`.
3. `ProductsClient` builds query options from local UI state.
4. `useProducts` executes React Query requests.
5. `ProductService` calls repository and maps API shape to domain shape.
6. `products-query` utility applies search/sort/category/pagination behavior.
7. UI renders list, skeleton, empty, and error states.

### Product Detail Page

1. `src/app/products/[id]/page.tsx` validates `id`.
2. `ProductService.getProductById` fetches and maps detail.
3. Errors map to `notFound()` for 404 or route error boundary for others.
4. Detail UI renders product information and monthly sales chart.

## Rendering Strategy

- Server Components:
  - Initial fetch, SEO metadata, route-level reliability.
- Client Components:
  - Interactive filters and React Query-driven updates.
- ISR:
  - Product list route revalidates every 60 seconds.

## State Management

- Local UI state:
  - `useState` inside `products-client.tsx` for filter/pagination controls.
- Remote/cache state:
  - TanStack Query via `QueryClientProvider` in `src/app/providers.tsx`.
- Theme state:
  - Context-based `ThemeProvider` with localStorage persistence.

## Testing Strategy

Unit tests (Jest + Testing Library) live under `tests/unit`:

- Service mapping tests
- Query utility tests
- UI behavior tests for filter and pagination

## Current Tradeoffs and Follow-Ups

- Monthly sales chart is simulated through a dedicated hook and mock dataset.
  - Next step: replace simulation hook internals with real repository/service endpoint.
- Home route (`src/app/page.tsx`) redirects to `/products`.
- Next build warns about multiple lockfiles in parent directories.
  - Optional: configure `turbopack.root` or remove extra lockfile.
