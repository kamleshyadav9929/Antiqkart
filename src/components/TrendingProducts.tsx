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
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
              Popular Right Now
            </h2>
            <p className="mt-2 text-slate-600">
              Discover what's trending among our curated collections right now!
            </p>
          </div>
        </div>
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
                  <ProductCard product={product} tag="Trending" />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingProducts;
