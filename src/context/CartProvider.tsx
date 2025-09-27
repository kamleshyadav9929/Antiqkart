import { useState, useEffect, ReactNode } from "react";
import { supabase } from "../lib/supabaseClient";
import { Product, CartContext } from "./cart-context";

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
      if (
        Array.isArray(parsedData) &&
        parsedData.every((item) => typeof item === "object" && item.productId)
      ) {
        return parsedData;
      }
      return [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage:", error);
      return [];
    }
  });

  const [cartProductDetails, setCartProductDetails] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // FIX: This effect runs once on mount to validate and clean localStorage
  useEffect(() => {
    const validateCartOnLoad = async () => {
      if (cartItems.length > 0) {
        const productIds = cartItems.map((item) => item.productId);

        const { data: validProducts, error } = await supabase
          .from("products")
          .select("id")
          .in("id", productIds);

        if (error) {
          console.error("Error validating cart items:", error);
          return;
        }

        const validProductIds = new Set((validProducts || []).map((p) => p.id));
        const cleanedCartItems = cartItems.filter((item) =>
          validProductIds.has(item.productId)
        );

        if (cleanedCartItems.length !== cartItems.length) {
          setCartItems(cleanedCartItems);
        }
      }
    };
    validateCartOnLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once when the component mounts

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

      supabase.functions
        .invoke("increment-popularity", {
          body: { productId },
        })
        .catch((err) => console.error("Failed to increment popularity:", err));

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
