import { useQuery } from "@tanstack/react-query";
import { productsActions } from "..";

interface Options {
  filterKey?: string;
}

export const useProducts = ({ filterKey }: Options) => {
  const {
    data: products = [],
    isLoading,
    error,
    isFetching,
  } = useQuery(
    ["products", { filterKey }], 
    () => productsActions.getProducts({ filterKey }),
    {
      staleTime: 1000 * 60 * 60
    }
  );

  return { error, isLoading, products, isFetching };
};
