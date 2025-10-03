import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
import { ArrowRight } from "lucide-react";
import { Product } from "../context/cart-context"; // Import Product type

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*, collections(name)") // Fetch collections as well
        .order("created_at", { ascending: false })
        .limit(16);

      if (error) {
        console.error("Error fetching featured products:", error.message);
      } else {
        setProducts((data as Product[]) || []);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const SeeAllCard = () => (
    <div className="flex-shrink-0 w-48">
      <Link
        to="/shop"
        className="flex h-full w-full flex-col items-center justify-center rounded-lg p-4 transition-transform hover:scale-105"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-white">
          <ArrowRight size={24} />
        </div>
        <span className="mt-4 text-sm font-semibold text-gray-800">
          See All
        </span>
      </Link>
    </div>
  );

  return (
    <div className="relative z-10">
      <div className="relative text-center mb-16 md:mb-20">
        <div className="relative inline-block">
          <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-3xl blur-xl"></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-6 border border-amber-200/50 shadow-xl">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-serif font-bold text-slate-900 leading-tight">
              <span className="relative inline-block mr-2 sm:mr-3">
                Featured
                <div className="absolute -bottom-1 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-shimmer"></div>
              </span>
              <span className="text-amber-600 relative inline-block">
                Products
                <div className="absolute -top-2 -right-3 text-orange-500 text-lg sm:text-xl animate-bounce">
                  👑
                </div>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full animate-glow"></div>
              </span>
            </h2>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-amber-500 text-2xl animate-pulse">
              🎨
            </div>
          </div>
        </div>
        <p className="mt-6 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed px-4">
          🎨 Our handpicked selection of the finest Indian handicrafts, curated
          with love.
        </p>
      </div>

      <div className="md:hidden relative">
        <div className="flex overflow-x-auto space-x-4 pb-4 -mx-4 px-4 scrollbar-hide">
          {loading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="flex-shrink-0 w-48">
                <SkeletonCard />
              </div>
            ))
          ) : (
            <>
              {products.slice(0, 11).map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-48 h-full flex"
                >
                  <ProductCard product={product} />
                </div>
              ))}
              <SeeAllCard />
            </>
          )}
        </div>
      </div>

      <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-6 gap-4">
        {loading
          ? Array.from({ length: 12 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : products.slice(0, 12).map((product) => (
              <div key={product.id} className="h-full flex">
                <ProductCard product={product} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
