import { useState } from "react";
import { TOTAL, fromOffset, fromPage, totalPages, type Mode } from "../pagination";

const ITEMS = Array.from({ length: TOTAL }, (_, i) => i + 1);

export default function PaginationVisualizer() {
  const [mode, setMode] = useState<Mode>("offset");
  const [size, setSize] = useState(10);
  const [offset, setOffset] = useState(20);

  const w = mode === "page" ? fromPage(Math.floor(offset / size) + 1, size) : fromOffset(offset, size);

  const changeMode = (next: Mode) => {
    if (next === mode) return;
    if (next === "page") setOffset(fromPage(Math.floor(offset / size) + 1, size).offset);
    setMode(next);
  };

  const changeSize = (next: number) => {
    setSize(next);
    if (mode === "page") {
      const keepPage = Math.min(Math.floor(offset / size) + 1, totalPages(next));
      setOffset((keepPage - 1) * next);
    }
  };

  const setPage = (page: number) => setOffset(fromPage(page, size).offset);

  const step = (dir: 1 | -1) => {
    if (mode === "page") setPage(w.page + dir);
    else setOffset(Math.min(Math.max(offset + dir * size, 0), TOTAL));
  };

  const offsetQuery = `limit=${w.limit}&offset=${w.offset}`;
  const pageQuery = `page=${w.page}&pageSize=${w.pageSize}`;

  return (
    <section aria-labelledby="visualizer-heading">
      <h2 id="visualizer-heading">Limit / offset vs page / pageSize</h2>
      <p className="muted">
        {TOTAL} items. Same slice, either <code>limit/offset</code> or <code>page/pageSize</code>.
      </p>

      <div className="row" role="tablist" aria-label="Pagination style">
        <button
          type="button"
          role="tab"
          aria-selected={mode === "offset"}
          className={mode === "offset" ? "active" : ""}
          onClick={() => changeMode("offset")}
        >
          limit / offset
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "page"}
          className={mode === "page" ? "active" : ""}
          onClick={() => changeMode("page")}
        >
          page / pageSize
        </button>
      </div>

      <section className="controls">
        <label className="slider">
          <span className="muted">{mode === "offset" ? "limit" : "pageSize"}</span>
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
          <span className="muted">{mode === "offset" ? "offset" : "page"}</span>
          {mode === "offset" ? (
            <input
              type="range"
              min={0}
              max={TOTAL}
              step={1}
              value={offset}
              onChange={(e) => setOffset(Number(e.target.value))}
            />
          ) : (
            <input
              type="range"
              min={1}
              max={w.totalPages}
              step={1}
              value={w.page}
              onChange={(e) => setPage(Number(e.target.value))}
            />
          )}
          <strong>{mode === "offset" ? w.offset : w.page}</strong>
        </label>

        <div className="row">
          <button type="button" onClick={() => step(-1)} aria-label="Previous">
            ← Prev
          </button>
          <button type="button" onClick={() => step(1)} aria-label="Next">
            Next →
          </button>
        </div>
      </section>

      <section aria-label="Items" className="grid">
        {ITEMS.map((n, i) => {
          const state = i < w.offset ? "skipped" : i < w.offset + w.limit ? "returned" : "remaining";
          return (
            <div key={n} className={`cell ${state}`}>
              {n}
            </div>
          );
        })}
      </section>

      <div className="legend muted">
        <span>
          <i className="swatch skipped" />
          skipped (offset)
        </span>
        <span>
          <i className="swatch returned" />
          returned
        </span>
        <span>
          <i className="swatch remaining" />
          remaining
        </span>
      </div>

      <section className="metrics">
        <div className="metric">
          <div className="muted">Items returned</div>
          <div className="value">
            {w.returned > 0 ? `${w.offset + 1}–${w.offset + w.returned} of ${TOTAL}` : "0 items, offset past the end"}
          </div>
        </div>
        <div className="metric">
          <div className="muted">Total pages</div>
          <div className="value">{w.totalPages}</div>
        </div>
        <div className="metric">
          <div className="muted">hasNextPage</div>
          <div className="value">{String(w.hasNextPage)}</div>
        </div>
      </section>

      <section className="code">
        <div>GET /items?{mode === "offset" ? offsetQuery : pageQuery}</div>
        <div className="muted">
          {mode === "offset"
            ? w.aligned
              ? `as pages: ${pageQuery}`
              : "as pages: none, offset is not a multiple of limit"
            : `as offset: ${offsetQuery}`}
        </div>
        <div className="sql">
          SELECT * FROM items ORDER BY id LIMIT {w.limit} OFFSET {w.offset};
        </div>
      </section>

      <p className="muted note">
        {mode === "page"
          ? `offset = (page − 1) × pageSize = (${w.page} − 1) × ${size} = ${w.offset}`
          : w.aligned
            ? `page = floor(offset / limit) + 1 = floor(${w.offset} / ${size}) + 1 = ${w.page}`
            : `Offset ${w.offset} with limit ${size} cuts across a page boundary. You can request it with limit/offset. Page/pageSize has no integer page for this slice.`}
      </p>
    </section>
  );
}
