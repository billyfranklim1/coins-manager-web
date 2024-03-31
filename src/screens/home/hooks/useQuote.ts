import { useQuery } from "@tanstack/react-query";
import { getQuotes } from "../api";

export const useQuote = (page = 1, coin_id) => {
  const {
    data: quotes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["quotes", page, coin_id],
    queryFn: () => getQuotes(page, coin_id),
    initialData: { data: [], meta: { total: 0 } },
  });

  return { quotes, isLoading, isError };
};
