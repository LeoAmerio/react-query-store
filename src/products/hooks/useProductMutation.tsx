import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Product, productsActions } from "..";

export const useProductMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: productsActions.createProduct,

    onMutate: (product) => {
      // Optimistic product
      const optimisticProduct = { id: Math.random(), ...product };

      // Almacenar producto en cache del query client
      queryClient.setQueryData<Product[]>(["products", { filterKey: product.category }],
        (old) => {
          if (!old) return [optimisticProduct];

          return [...old, optimisticProduct];
        }
      );
      return {
        optimisticProduct,
      };
    },
    onSuccess: (product, variables, context) => {
      // queryClient.invalidateQueries(["products", { filterKey: data.category }]);
      queryClient.removeQueries(["products", context?.optimisticProduct.id ]);
      queryClient.setQueryData<Product[]>(["products", { filterKey: product.category }],
      (old) => {
        if (!old) return [product];

        return old.map(cacheProduct => {
          return cacheProduct.id === context?.optimisticProduct.id ? product : cacheProduct;
        })
      }
    )},
    onError: (error, variables, context) => {
      queryClient.removeQueries(["products", context?.optimisticProduct.id ]);

      queryClient.setQueryData<Product[]>(["products", { filterKey: variables.category }],
        (old) => {
          if (!old) return [];

          return old.filter(cacheProduct => cacheProduct.id !== context?.optimisticProduct.id);
        }
      );
    }
  });

  return mutation;
};
