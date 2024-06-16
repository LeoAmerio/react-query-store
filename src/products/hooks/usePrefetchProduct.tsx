import { useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { productsActions } from '..';

export const usePrefetchProduct = () => {

  const queryClient = useQueryClient();

  const preFetch = (id: number) => {
    queryClient.prefetchQuery(['product', id], 
    () => productsActions.getProductById(id)
    )
  }

  return preFetch;
}
