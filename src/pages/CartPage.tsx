import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { Product } from "../context/cart-context";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import { ShoppingBag } from "lucide-react";

const CartPage = () => {
  const { cartProductDetails, loading } = useCart();

  const groupedProducts = useMemo(() => {
    return cartProductDetails.reduce((acc, product) => {
      // Updated grouping logic to use the correct data field
      const category = product.collections?.name || "Uncategorized";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {} as Record<string, Product[]>);
  }, [cartProductDetails]);

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen">
        <Layout>
          <div className="py-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 text-center">
              Your Wishlist
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto text-center">
              Browse your saved items below, conveniently organized by category.
            </p>
            <div className="mt-12">
              {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <SkeletonCard key={index} />
                  ))}
                </div>
              ) : cartProductDetails.length > 0 ? (
                <div className="space-y-12">
                  {Object.entries(groupedProducts).map(
                    ([category, products]) => (
                      <section key={category}>
                        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-gray-900 mb-6 border-b pb-3">
                          {category}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-6">
                          {products.map((product) => (
                            <ProductCard
                              key={product.id}
                              id={product.id}
                              name={product.name}
                              image={product.image}
                              price={product.price}
                              affiliateLink={product.affiliate_link}
                            />
                          ))}
                        </div>
                      </section>
                    )
                  )}
                </div>
              ) : (
                <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-xl">
                  <ShoppingBag size={48} className="mx-auto text-gray-400" />
                  <h2 className="mt-6 text-2xl font-semibold text-gray-800">
                    Your wishlist is empty
                  </h2>
                  <p className="mt-2 text-gray-500">
                    Looks like you haven't added anything to your list yet.
                  </p>
                  <Link
                    to="/shop"
                    className="mt-6 inline-block px-6 py-3 rounded-full bg-slate-800 text-white font-medium hover:bg-slate-700 transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Layout>
      </main>
      <Footer />
    </>
  );
};

export default CartPage;
