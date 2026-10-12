export type Mode = "offset" | "page";

export const TOTAL = 87;

export interface Window {
  offset: number;
  limit: number;
  page: number;
  pageSize: number;
  totalPages: number;
  returned: number;
  hasNextPage: boolean;
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
