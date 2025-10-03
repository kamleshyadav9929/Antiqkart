import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
import { Product } from "../context/cart-context";

const TrendingProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("id, name, image, price, affiliate_link, rating")
        .eq("is_trending", true)
        .order("popularity", { ascending: false })
        .limit(10);

      if (error) {
        console.error("Error fetching trending products:", error.message);
      } else if (data) {
        setProducts(data as Product[]);
      }
      setLoading(false);
    };

    fetchTrendingProducts();
  }, []);

  return (
    <div className="relative z-10">
      <div className="relative text-center mb-16 md:mb-20">
        <div className="relative inline-block">
          <div className="absolute -inset-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-3xl blur-xl"></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-6 border border-red-200/50 shadow-xl">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-serif font-bold text-slate-900 leading-tight">
              <span className="relative inline-block mr-2 sm:mr-3">
                Popular
                <div className="absolute -bottom-1 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-red-400 to-orange-500 rounded-full animate-shimmer"></div>
              </span>
              <span className="text-orange-600 relative inline-block">
                Right Now
                <div className="absolute -top-2 -right-3 text-red-500 text-lg sm:text-xl animate-bounce">
                  🔥
                </div>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-glow"></div>
              </span>
            </h2>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-red-500 text-2xl animate-pulse">
              📈
            </div>
          </div>
        </div>
        <p className="mt-6 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed px-4">
          Discover what's trending among our curated collections right now!
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : products.map((product) => (
              <div key={product.id} className="h-full flex">
                <ProductCard product={product} tag="Trending" />
              </div>
            ))}
      </div>
    </div>
  );
};

export default TrendingProducts;
