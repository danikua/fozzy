import axios from 'axios';
import { Product } from '../types/types';

export const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 20000,
});

const retryRequest = async <T>(fn: () => Promise<T>, retries: number = 6, delay: number = 1000): Promise<T> => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn(); 
    } catch (error) {
      if (attempt === retries) {
        console.error(`Request failed after ${retries} attempts.`);
        throw error; 
      }
      console.warn(`Attempt ${attempt} failed. Retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay)); 
    }
  }
  throw new Error('Retry logic reached an unexpected state'); 
};

export const ProductsApi = {
  getProducts: async (): Promise<Product[]> => {
    return retryRequest(async () => {
      const { data } = await api.get<Product[]>('/products');
      return data;
    });
  },

  getProduct: async (id: number): Promise<Product | null> => {
    return retryRequest(async () => {
      const { data } = await api.get<Product>(`/products/${id}`);
      return data;
    });
  },
};
