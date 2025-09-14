import { createContext } from "react";

export interface Product {
  id: string;
  name: string;
  image: string;
  price?: string | number;
  affiliate_link: string;
  // Changed to reflect the database structure
  collections: { name: string } | null;
}

export interface CartContextType {
  cartItems: string[];
  cartProductDetails: Product[];
  loading: boolean;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  isItemInCart: (productId: string) => boolean;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);
