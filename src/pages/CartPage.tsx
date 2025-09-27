import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import { ShoppingBag } from "lucide-react";

const CartPage = () => {
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
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <SkeletonCard key={index} />
                  ))}
                </div>
              ) : cartProductDetails.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
                  {cartProductDetails.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      image={product.image}
                      price={product.price?.toString()}
                      affiliateLink={product.affiliate_link}
                      collectionName={product.collections?.name}
                    />
                  ))}
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
                    className="mt-6 inline-block px-6 py-3 rounded-full bg-slate-950 text-white font-medium hover:bg-slate-800 transition-colors"
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
