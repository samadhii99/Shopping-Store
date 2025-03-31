// src/types.ts
export interface Product {
  id: number;
  name: string;
  brand: string;
  salePrice: number;
  installmentPrice: number;
  image: string;
  colors: string[];
  inStock: boolean;
  category: string;
  selectedColor?: string;
  quantity?: number; // Add this line to resolve the TypeScript error
}

export interface CartItem extends Product {
  quantity: number;
}
