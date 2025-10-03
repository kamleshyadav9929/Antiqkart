import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
import { Product } from "../context/cart-context";

const FestiveCollections = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFestiveProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*, collections(name)")
        .not("festival_id", "is", null)
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) {
        console.error("Error fetching festive products:", error.message);
      } else {
        setProducts((data as Product[]) || []);
      }
      setLoading(false);
    };

    fetchFestiveProducts();
  }, []);

  return (
    <div className="relative z-10">
      <div className="relative text-center mb-16 md:mb-20">
        <div className="relative inline-block">
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl blur-xl"></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-6 border border-purple-200/50 shadow-xl">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-serif font-bold text-slate-900 leading-tight">
              <span className="relative inline-block mr-2 sm:mr-3">
                Festive
                <div className="absolute -bottom-1 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-shimmer"></div>
              </span>
              <span className="text-pink-600 relative inline-block">
                Specials
                <div className="absolute -top-2 -right-3 text-yellow-400 text-lg sm:text-xl animate-bounce">
                  ✨
                </div>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-glow"></div>
              </span>
            </h2>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-purple-500 text-2xl animate-pulse">
              🎉
            </div>
          </div>
        </div>
        <p className="mt-6 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed px-4">
          Explore curated products for every celebration and festival!
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : products.slice(0, 5).map((product) => (
              <div key={product.id} className="h-full flex">
                <ProductCard product={product} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default FestiveCollections;
