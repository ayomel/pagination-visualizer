# Pagination visualizer

React + Vite + TypeScript. One dataset. Sliders for `limit`/`offset` or `page`/`pageSize`. Check whether both names describe the same slice.

The query string, SQL, and counts move together. If `offset` is not a multiple of `limit`, page mode has no integer page for that slice. That gap is what the top section is for.

Aligned case: `offset = (page - 1) * pageSize`.

Further down: snippets and a live demo. React Query loads 10,000 items once; paging is `array.slice` on the cached result.

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
