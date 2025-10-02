// src/context/CartProvider.tsx

import { useState, useEffect, ReactNode, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";
import { CartContext, Product } from "./cart-context";
// The 'useNavigate' import has been removed.

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartProductDetails, setCartProductDetails] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Define fetchCartProducts inside useEffect's setup function
  // or use useCallback with explicit dependencies if needed elsewhere.
  // For simplicity and clarity, we will keep it as useCallback, but remove useNavigate.

  const fetchCartProducts = useCallback(async () => {
    setLoading(true);
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const user = session?.user;

    if (!user) {
      setCartProductDetails([]);
      setLoading(false);
      return;
    }

    const { data: cartItems, error: cartError } = await supabase
      .from("user_cart_items")
      .select("product_id")
      .eq("user_id", user.id);

    if (cartError) {
      console.error("Error fetching cart item IDs:", cartError);
      setCartProductDetails([]);
      setLoading(false);
      return;
    }

    const productIds = cartItems.map((item) => item.product_id);

    if (productIds.length === 0) {
      setCartProductDetails([]);
      setLoading(false);
      return;
    }

    const { data: productsData, error: productsError } = await supabase
      .from("products")
      .select("*, collections(name)")
      .in("id", productIds);

    if (productsError) {
      console.error("Error fetching product details:", productsError);
      setCartProductDetails([]);
    } else {
      const products = (productsData || []).map((p) => ({
        ...p,
        id: String(p.id),
      }));
      setCartProductDetails(products as Product[]);
    }
    setLoading(false);
  }, []); // Dependencies are now empty as supabase and auth.getSession are stable.

  useEffect(() => {
    fetchCartProducts();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      // Fetch cart whenever auth state changes
      if (
        event === "SIGNED_IN" ||
        event === "SIGNED_OUT" ||
        event === "USER_UPDATED"
      ) {
        fetchCartProducts();
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchCartProducts]); // Now fetchCartProducts is a dependency

  const addToCart = async (product: Product) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      // This throws an error to be caught by ProductCard
      throw new Error("User not authenticated");
    }

    // Optimistic update: add to cart immediately in UI
    setCartProductDetails((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      return exists ? prev : [...prev, product];
    });

    const { error } = await supabase.from("user_cart_items").insert({
      user_id: user.id,
      product_id: Number(product.id),
    });

    if (error) {
      // Revert optimistic update on error
      setCartProductDetails((prev) =>
        prev.filter((item) => item.id !== product.id)
      );
      console.error("Error adding to cart:", error.message);
    }
    // No need to fetch again on success - optimistic update is already correct
  };

  const removeFromCart = async (productId: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    // Optimistic update: remove from cart immediately in UI
    const removedProduct = cartProductDetails.find(
      (item) => item.id === productId
    );
    setCartProductDetails((prev) =>
      prev.filter((item) => item.id !== productId)
    );

    const { error } = await supabase
      .from("user_cart_items")
      .delete()
      .match({ user_id: user.id, product_id: Number(productId) });

    if (error) {
      // Revert optimistic update on error
      if (removedProduct) {
        setCartProductDetails((prev) => [...prev, removedProduct]);
      }
      console.error("Error removing from cart:", error.message);
    }
    // No need to fetch again on success - optimistic update is already correct
  };

  const isItemInCart = (productId: string) => {
    return cartProductDetails.some((item) => item.id === productId);
  };

  return (
    <CartContext.Provider
      value={{
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

export default CartProvider;
