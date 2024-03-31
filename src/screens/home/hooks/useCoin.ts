import { useQuery } from "@tanstack/react-query";
import { getCoins } from "../api";

export const useCoin = (page = 1) => {
  const {
    data: coins,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["coins", page],
    queryFn: () => getCoins(page),
    initialData: { data: [], meta: { total: 0 } },
  });

  return { coins, isLoading, isError };
};
