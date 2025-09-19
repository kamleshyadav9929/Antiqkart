import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import { ShoppingBag } from "lucide-react";

const CartPage = () => {
  // We still get the sorted product details and loading state from the hook
  const { cartProductDetails, loading } = useCart();

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
              Here are the treasures you've saved for later.
            </p>
            <div className="mt-12">
              {loading ? (
                // Skeleton loader remains the same
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <SkeletonCard key={index} />
                  ))}
                </div>
              ) : cartProductDetails.length > 0 ? (
                // **UPDATED DISPLAY**
                // We no longer need sections. We just map over the pre-sorted array
                // and render the products in a single, clean grid.
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-6">
                  {cartProductDetails.map((product) => (
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
              ) : (
                // The empty cart message remains the same
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
