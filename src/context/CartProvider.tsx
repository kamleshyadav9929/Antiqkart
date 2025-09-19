import React, { useState, useEffect, ReactNode } from "react";
import { supabase } from "../lib/supabaseClient";
import { Product, CartContext } from "./cart-context";

// Defines the structure for items in our cart, including the timestamp.
interface CartItem {
  productId: string;
  addedAt: number;
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const localData = localStorage.getItem("antiqkart-cart");
      if (!localData) return [];

      const parsedData = JSON.parse(localData);

      // **IMPROVEMENT**: This check ensures we have the correct data format.
      // If the first item doesn't have a 'productId', we assume the format is old
      // and reset the cart to prevent errors.
      if (parsedData.length > 0 && typeof parsedData[0] !== "object") {
        console.warn("Old cart format detected. Clearing cart.");
        localStorage.removeItem("antiqkart-cart"); // Clear the invalid data
        return [];
      }

      return parsedData;
    } catch (error) {
      console.error(
        "Failed to parse cart from localStorage. Resetting cart.",
        error
      );
      // If parsing fails for any reason, clear the broken data.
      localStorage.removeItem("antiqkart-cart");
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

      const productIds = cartItems.map((item) => item.productId);

      const { data, error } = await supabase
        .from("products")
        .select("id, name, image, price, affiliate_link, collections ( name )")
        .in("id", productIds)
        .returns<Product[]>();

      if (error) {
        console.error("Error fetching cart product details:", error);
        setCartProductDetails([]);
      } else {
        const sortedData = (data || []).sort((a, b) => {
          const itemA = cartItems.find((item) => item.productId === a.id);
          const itemB = cartItems.find((item) => item.productId === b.id);
          return (itemB?.addedAt || 0) - (itemA?.addedAt || 0);
        });
        setCartProductDetails(sortedData);
      }
      setLoading(false);
    };

    fetchCartProducts();
  }, [cartItems]);

  const addToCart = (productId: string) => {
    setCartItems((prev) => {
      if (prev.some((item) => item.productId === productId)) {
        return prev;
      }
      return [...prev, { productId, addedAt: Date.now() }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const isItemInCart = (productId: string) => {
    return cartItems.some((item) => item.productId === productId);
  };

  const cartItemIds = cartItems.map((item) => item.productId);

  return (
    <CartContext.Provider
      value={{
        cartItems: cartItemIds,
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
