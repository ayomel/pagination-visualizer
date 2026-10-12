import { useMemo, useState } from "react";
import { fromOffset, fromPage, totalPages, type Mode, type Window } from "../pagination";

type ClientPaginationOptions = {
  initialMode?: Mode;
};

export function useClientPagination<T>(items: T[] | undefined, options: ClientPaginationOptions = {}) {
  const [mode, setMode] = useState<Mode>(options.initialMode ?? "offset");
  const [size, setSize] = useState(10);
  const [offset, setOffset] = useState(0);

  // How many rows exist in the fetched list (0 while still loading).
  const total = items?.length ?? 0;

  // Current slice: offset, returned, page, hasNextPage.
  const window: Window =
    mode === "page" ? fromPage(Math.floor(offset / size) + 1, size, total) : fromOffset(offset, size, total);

  // Rows for this page only (slice from items, no refetch).
  const pageItems = useMemo(
    () => (items ? items.slice(window.offset, window.offset + window.returned) : []),
    [items, window.offset, window.returned],
  );

  const changeMode = (next: Mode) => {
    if (next === mode) return;
    if (next === "page") setOffset(fromPage(Math.floor(offset / size) + 1, size, total).offset);
    setMode(next);
  };

  const changeSize = (next: number) => {
    setSize(next);
    if (mode === "page") {
      const keepPage = Math.min(Math.floor(offset / size) + 1, totalPages(next, total));
      setOffset((keepPage - 1) * next);
    }
  };

  const setPage = (page: number) => setOffset(fromPage(page, size, total).offset);

  const step = (dir: 1 | -1) => {
    if (mode === "page") setPage(window.page + dir);
    else setOffset(Math.min(Math.max(offset + dir * size, 0), total));
  };

  return {
    mode,
    size,
    offset,
    setOffset,
    total,
    window,
    pageItems,
    changeMode,
    changeSize,
    setPage,
    step,
  };
}
