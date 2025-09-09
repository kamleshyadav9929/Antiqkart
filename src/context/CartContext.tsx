import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabase } from "../lib/supabaseClient";

// Define a reusable Product interface
export interface Product {
  id: string;
  name: string;
  image: string;
  price?: string | number;
  affiliate_link: string;
  category?: string; // Added category for grouping
}

// Define the shape of the context data
interface CartContextType {
  cartItems: string[]; // Array of product IDs
  cartProductDetails: Product[]; // Array of full product objects
  loading: boolean;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  isItemInCart: (productId: string) => boolean;
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create a custom hook for easy access to the context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// Create the provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<string[]>(() => {
    // Load cart IDs from localStorage on initial load
    try {
      const localData = localStorage.getItem("antiqkart-cart");
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
      return [];
    }
  });

  const [cartProductDetails, setCartProductDetails] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Save cart IDs to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("antiqkart-cart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [cartItems]);

  // Fetch full product details when cartItems array changes
  useEffect(() => {
    const fetchCartProducts = async () => {
      if (cartItems.length === 0) {
        setCartProductDetails([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("products")
          .select("id, name, image, price, affiliate_link, category") // Fetch category
          .in("id", cartItems);

        if (error) {
          throw error;
        }
        setCartProductDetails(data || []);
      } catch (error) {
        console.error("Error fetching cart product details:", error);
        setCartProductDetails([]); // Clear details on error
      } finally {
        setLoading(false);
      }
    };

    fetchCartProducts();
  }, [cartItems]);

  const addToCart = (productId: string) => {
    setCartItems((prevItems) => {
      if (!prevItems.includes(productId)) {
        return [...prevItems, productId];
      }
      return prevItems;
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((id) => id !== productId));
  };

  const isItemInCart = (productId: string) => {
    return cartItems.includes(productId);
  };

  const value = {
    cartItems,
    cartProductDetails,
    loading,
    addToCart,
    removeFromCart,
    isItemInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
