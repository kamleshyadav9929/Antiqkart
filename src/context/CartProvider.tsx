import React, { useState, useEffect, ReactNode } from "react";
import { supabase } from "../lib/supabaseClient";
import { Product, CartContext } from "./cart-context";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<string[]>(() => {
    try {
      const localData = localStorage.getItem("antiqkart-cart");
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage:", error);
      return [];
    }
  });

  const [cartProductDetails, setCartProductDetails] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem("antiqkart-cart", JSON.stringify(cartItems));

    const fetchCartProducts = async () => {
      if (cartItems.length === 0) {
        setCartProductDetails([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        // Updated query to fetch the collection name
        .select("id, name, image, price, affiliate_link, collections ( name )")
        .in("id", cartItems)
        .returns<Product[]>();

      if (error) {
        console.error("Error fetching cart product details:", error);
        setCartProductDetails([]);
      } else {
        setCartProductDetails(data || []);
      }
      setLoading(false);
    };

    fetchCartProducts();
  }, [cartItems]);

  const addToCart = (productId: string) => {
    setCartItems((prev) => [...new Set([...prev, productId])]);
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((id) => id !== productId));
  };

  const isItemInCart = (productId: string) => {
    return cartItems.includes(productId);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartProductDetails,
        loading,
        addToCart,
        removeFromCart,
        isItemInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
