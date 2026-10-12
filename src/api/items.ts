export const LIST_TOTAL = 10_000;

const MOCK_DELAY_MS = 300;

export async function fetchAllItems(): Promise<number[]> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
  return Array.from({ length: LIST_TOTAL }, (_, i) => i + 1);
}
