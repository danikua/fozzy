import axios from 'axios';
import { Product } from '../types/types';

// Настраиваем axios
export const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 20000,
});

// Универсальная функция для повторных попыток
const retryRequest = async <T>(fn: () => Promise<T>, retries: number = 6, delay: number = 1000): Promise<T> => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn(); // Выполняем запрос
    } catch (error) {
      if (attempt === retries) {
        console.error(`Request failed after ${retries} attempts.`);
        throw error; // Если достигли максимума попыток, выбрасываем ошибку
      }
      console.warn(`Attempt ${attempt} failed. Retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay)); // Ожидаем перед повтором
    }
  }
  throw new Error('Retry logic reached an unexpected state'); // На случай непредвиденных ситуаций
};

// API методы
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
