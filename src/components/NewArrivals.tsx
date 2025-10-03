import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";

import { Product } from "../context/cart-context";

const NewArrivals: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*, collections(name)")
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) {
        console.error("Error fetching new arrivals:", error.message);
      } else {
        setProducts((data as Product[]) || []);
      }
      setLoading(false);
    };

    fetchNewArrivals();
  }, []);

  return (
    <div className="relative z-10">
      <div className="relative text-center mb-16 md:mb-20">
        <div className="relative inline-block">
          <div className="absolute -inset-4 bg-gradient-to-r from-sky-500/10 to-cyan-500/10 rounded-3xl blur-xl"></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-6 border border-sky-200/50 shadow-xl">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-serif font-bold text-slate-900 leading-tight">
              <span className="relative inline-block mr-2 sm:mr-3">
                Fresh on the
                <div className="absolute -bottom-1 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-sky-400 to-cyan-500 rounded-full animate-shimmer"></div>
              </span>
              <span className="text-sky-600 relative inline-block">
                Shelves
                <div className="absolute -top-2 -right-3 text-cyan-500 text-lg sm:text-xl animate-bounce">
                  ✨
                </div>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-cyan-400 to-sky-500 rounded-full animate-glow"></div>
              </span>
            </h2>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-sky-500 text-2xl animate-pulse">
              📦
            </div>
          </div>
        </div>
        <p className="mt-6 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed px-4">
          ✨ Our latest handcrafted additions, fresh from artisan workshops.
        </p>
      </div>

      <div className="relative">
        <div className="flex overflow-x-auto space-x-4 pb-4 -mx-4 px-4 scrollbar-hide">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex-shrink-0 w-48 md:w-56">
                  <SkeletonCard />
                </div>
              ))
            : products.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-48 md:w-56 h-full flex"
                >
                  <ProductCard product={product} />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
