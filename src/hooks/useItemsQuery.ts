import { useQuery } from "@tanstack/react-query";
import { fetchAllItems } from "../api/items";

export function useItemsQuery() {
  return useQuery({
    queryKey: ["items", "all"],
    queryFn: fetchAllItems,
    staleTime: Infinity,
  });
}
