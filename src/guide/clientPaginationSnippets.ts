export const SNIPPET_FETCH_ONCE = `import { useQuery } from "@tanstack/react-query";

export function useItemsQuery() {
  return useQuery({
    queryKey: ["items", "all"],
    queryFn: fetchAllItems,
    staleTime: Infinity,
    // page / pageSize are NOT in the key — changing page does not refetch
  });
}`;

export const SNIPPET_WINDOW = `import { fromPage } from "./pagination";

const [page, setPage] = useState(1);
const [pageSize, setPageSize] = useState(10);

const total = data?.length ?? 0;

// window: offset + returned for this page (server limit/offset, but the array lives in memory).
const window = fromPage(page, pageSize, total);
// window.offset     — start index in the array (0-based)
// window.returned   — count of items in this slice (≤ pageSize; smaller on the last page)
// window.page       — 1-based page number for controls / labels
// window.totalPages — Math.ceil(total / pageSize)
// window.hasNextPage — true if another slice exists after this one`;

export const SNIPPET_SLICE = `// pageItems: what you pass to the list component.
const pageItems = useMemo(
  () => (data ? data.slice(window.offset, window.offset + window.returned) : []),
  [data, window.offset, window.returned],
);`;

export const SNIPPET_RENDER = `// Map pageItems, not data. pageSize rows in the tree, not the whole cache.
return (
  <ul>
    {pageItems.map((item) => (
      <li key={item.id}>{item.name}</li>
    ))}
  </ul>
);

// Server-side alternative: put page in the query key and fetch each page from the API
// useQuery({ queryKey: ["items", page, pageSize], queryFn: () => fetchPage(page, pageSize) })`;
