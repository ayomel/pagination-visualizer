import { LIST_TOTAL } from "../api/items";
import {
  SNIPPET_FETCH_ONCE,
  SNIPPET_RENDER,
  SNIPPET_SLICE,
  SNIPPET_WINDOW,
} from "../guide/clientPaginationSnippets";
import { useClientPagination } from "../hooks/useClientPagination";
import { useItemsQuery } from "../hooks/useItemsQuery";

export default function ClientPaginationGuide() {
  const { data: items, isPending, isError, error, refetch } = useItemsQuery();
  const { size, window: w, pageItems, changeSize, setPage, step } = useClientPagination(items, {
    initialMode: "page",
  });

  const sliceLive = items
    ? `data.slice(${w.offset}, ${w.offset + w.returned})  // ${pageItems.length} items`
    : "data.slice(offset, offset + returned)";

  return (
    <section className="guide" aria-labelledby="guide-heading">
      <h2 id="guide-heading">Client-side pagination for long lists</h2>
      <p className="muted">
        Same <code>fromPage</code> / <code>Window</code> types as above. This demo fetches{" "}
        <code>{LIST_TOTAL.toLocaleString()}</code> rows once, then maps <code>pageItems</code>, not the full array.
      </p>

      <div className="guide-steps">
        <div className="guide-step">
          <h3>1. Fetch the full list once</h3>
          <pre className="code guide-code">{SNIPPET_FETCH_ONCE}</pre>
        </div>

        <div className="guide-step">
          <h3>2. Derive offset from page + pageSize</h3>
          <pre className="code guide-code">{SNIPPET_WINDOW}</pre>
          <p className="guide-step-note muted">
            <code>window</code> is the slice in array indices: start at <code>offset</code>, take{" "}
            <code>returned</code> rows, use <code>hasNextPage</code> for the next button.
          </p>
        </div>

        <div className="guide-step">
          <h3>3. Slice in memory</h3>
          <pre className="code guide-code">{SNIPPET_SLICE}</pre>
          <p className="guide-step-note muted">
            <code>pageItems</code> is <code>data.slice(...)</code> for the current page. Change page or pageSize and
            React recomputes the slice. The query key stays the same, so nothing refetches.
          </p>
          {!isPending && items && (
            <p className="muted slice-live">
              Live: <code>{sliceLive}</code>
            </p>
          )}
        </div>

        <div className="guide-step">
          <h3>4. Render only pageItems</h3>
          <pre className="code guide-code">{SNIPPET_RENDER}</pre>
          <p className="guide-step-note muted">
            Render <code>pageItems</code>. With pageSize 10 you get 10 list nodes, not 10,000.
          </p>
        </div>
      </div>

      <div className="guide-demo">
        <h3>Live demo</h3>

        {isPending && <p className="status muted">Loading {LIST_TOTAL.toLocaleString()} items…</p>}

        {isError && (
          <p className="status error">
            Failed to load: {error instanceof Error ? error.message : "Unknown error"}{" "}
            <button type="button" onClick={() => refetch()}>
              Retry
            </button>
          </p>
        )}

        {!isPending && !isError && items && (
          <>
            <div className="guide-demo-controls">
              <label className="slider">
                <span className="muted">pageSize</span>
                <input
                  type="range"
                  min={5}
                  max={30}
                  step={1}
                  value={size}
                  onChange={(e) => changeSize(Number(e.target.value))}
                />
                <strong>{size}</strong>
              </label>

              <label className="slider">
                <span className="muted">page</span>
                <input
                  type="range"
                  min={1}
                  max={w.totalPages}
                  step={1}
                  value={w.page}
                  onChange={(e) => setPage(Number(e.target.value))}
                />
                <strong>{w.page}</strong>
              </label>

              <div className="row">
                <button type="button" onClick={() => step(-1)} disabled={w.page <= 1}>
                  ← Prev
                </button>
                <button type="button" onClick={() => step(1)} disabled={!w.hasNextPage}>
                  Next →
                </button>
              </div>
            </div>

            <p className="muted">
              {w.returned > 0
                ? `${w.offset + 1}–${w.offset + w.returned} of ${items.length.toLocaleString()} · page ${w.page} of ${w.totalPages}`
                : "Empty slice"}
            </p>

            <ul className="guide-list" aria-label="Current page items">
              {pageItems.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
