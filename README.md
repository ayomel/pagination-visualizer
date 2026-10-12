# Pagination visualizer

Small React app (Vite, TypeScript) for one dataset of 87 items. You pick `limit`/`offset` or `page`/`pageSize` and see whether they describe the same slice.

Move the sliders. The query string, SQL, and counts update together. When `offset` is not a multiple of `limit`, you get a window that page mode cannot represent. That mismatch is the whole demo.

When things line up: `offset = (page - 1) * pageSize`.

Scroll down for a **long-list guide**: TypeScript snippets plus a live demo that loads 10,000 items once with React Query and paginates on the client by slicing the cached array.

## Long lists (client-side)

- Top section: [`src/components/PaginationVisualizer.tsx`](src/components/PaginationVisualizer.tsx) + [`src/pagination.ts`](src/pagination.ts)
- Bottom guide: [`src/components/ClientPaginationGuide.tsx`](src/components/ClientPaginationGuide.tsx), [`src/guide/clientPaginationSnippets.ts`](src/guide/clientPaginationSnippets.ts), [`src/hooks/useItemsQuery.ts`](src/hooks/useItemsQuery.ts), [`src/hooks/useClientPagination.ts`](src/hooks/useClientPagination.ts)
- Mock fetch: [`src/api/items.ts`](src/api/items.ts) (`@tanstack/react-query` is only required for the guide demo)

## Run it

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
pnpm preview
```
