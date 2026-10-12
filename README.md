# Pagination visualizer

Small React app (Vite, TypeScript) for one dataset of 87 items. You pick `limit`/`offset` or `page`/`pageSize` and see whether they describe the same slice.

Move the sliders. The query string, SQL, and counts update together. When `offset` is not a multiple of `limit`, you get a window that page mode cannot represent. That mismatch is the whole demo.

When things line up: `offset = (page - 1) * pageSize`.

## Run it

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

Pagination logic is in `src/pagination.ts`. The UI is the rest.
