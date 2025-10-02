import { createContext } from "react";

export interface Product {
  id: string;
  name: string;
  image: string;
  price?: number;
  affiliate_link: string;
  rating?: number;
  collections?: { name: string } | null;
  created_at?: string; // FIX: Made optional to allow for cases where it's not available
  popularity?: number;
  collection_id?: string;
  state_id?: string;
  [key: string]: unknown;
}

interface CartContextType {
  cartProductDetails: Product[];
  loading: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  isItemInCart: (productId: string) => boolean;
}

export const CartContext = createContext<CartContextType>({
  cartProductDetails: [],
  loading: false,
  addToCart: () => {},
  removeFromCart: () => {},
  isItemInCart: () => false,
});
