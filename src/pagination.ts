export type Mode = "offset" | "page";

export const TOTAL = 87;

/** Describes one page/slice of a list — shared by the visualizer and client-side slicing. */
export interface Window {
  /** Index in the full list where this slice starts. */
  offset: number;
  /** Requested max items (limit or pageSize). */
  limit: number;
  /** 1-based page number when offset is aligned to page boundaries. */
  page: number;
  pageSize: number;
  totalPages: number;
  /** Actual item count in this slice (may be less than limit on the last page). */
  returned: number;
  hasNextPage: boolean;
  /** True when offset is a multiple of limit (page/pageSize can represent this slice exactly). */
  aligned: boolean;
}

export function totalPages(pageSize: number, total = TOTAL): number {
  return Math.max(1, Math.ceil(total / pageSize));
}

export function fromOffset(offset: number, limit: number, total = TOTAL): Window {
  const returned = Math.max(0, Math.min(limit, total - offset));
  return {
    offset,
    limit,
    page: Math.floor(offset / limit) + 1,
    pageSize: limit,
    totalPages: totalPages(limit, total),
    returned,
    hasNextPage: offset + limit < total,
    aligned: offset % limit === 0,
  };
}

export function fromPage(page: number, pageSize: number, total = TOTAL): Window {
  const clamped = Math.min(Math.max(page, 1), totalPages(pageSize, total));
  return fromOffset((clamped - 1) * pageSize, pageSize, total);
}
