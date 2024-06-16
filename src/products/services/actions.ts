import { productsApi, type Product } from "..";

interface GetProductsOptions {
  filterKey?: string;
}

const sleep = ( seconds: number = 0 ): Promise<boolean> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
} 

export const getProducts = async ({ filterKey }: GetProductsOptions): Promise<Product[]> => {
  sleep(2)
  
  const filteredUrl = ( filterKey ) ? `category=${filterKey}` : ''
  const { data } = await productsApi.get<Product[]>(`/products?${filteredUrl}`);

  return data;
};

export const getProductById = async (id: number): Promise<Product> => {
  // sleep(2)
  const { data } = await productsApi.get<Product>(`/products?${id}`);

  return data;
};