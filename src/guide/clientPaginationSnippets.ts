export const SNIPPET_FETCH_ONCE = `import { useQuery } from "@tanstack/react-query";

export function useItemsQuery() {
  return useQuery({
    queryKey: ["items", "all"],
    queryFn: fetchAllItems,
    staleTime: Infinity,
    // page and pageSize stay out of the key. Changing page does not refetch.
  });
}`;

export const SNIPPET_WINDOW = `import { fromPage } from "./pagination";

const [page, setPage] = useState(1);
const [pageSize, setPageSize] = useState(10);

const total = data?.length ?? 0;

// Same numbers as server limit/offset; the full array is already in memory.
const window = fromPage(page, pageSize, total);
// window.offset: start index (0-based)
// window.returned: rows in this slice (<= pageSize; last page may be shorter)
// window.page: 1-based, for labels and controls
// window.totalPages: Math.ceil(total / pageSize)
// window.hasNextPage: another slice exists after this one`;

export const SNIPPET_SLICE = `// pageItems: what you pass to the list component.
const pageItems = useMemo(
  () => (data ? data.slice(window.offset, window.offset + window.returned) : []),
  [data, window.offset, window.returned],
);`;

export const SNIPPET_RENDER = `// Map pageItems, not data. One page of <li>s, not the full cache.
return (
  <ul>
    {pageItems.map((item) => (
      <li key={item.id}>{item.name}</li>
    ))}
  </ul>
);

// Server-side alternative: put page in the query key and fetch each page from the API
// useQuery({ queryKey: ["items", page, pageSize], queryFn: () => fetchPage(page, pageSize) })`;
