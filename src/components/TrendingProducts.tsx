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

      {/* Swipable on small screens, grid on md+ */}
      <div>
        {/* Mobile: horizontal scroll */}
        <div className="flex md:hidden overflow-x-auto gap-4 pb-2 snap-x snap-mandatory">
          {(loading ? Array.from({ length: 5 }) : products).map(
            (product, idx) => (
              <div
                key={loading ? idx : (product as Product).id}
                className="flex-shrink-0 w-48 md:w-56 h-full flex"
              >
                {loading ? (
                  <SkeletonCard />
                ) : (
                  <ProductCard product={product as Product} tag="Trending" />
                )}
              </div>
            )
          )}
        </div>
        {/* Desktop: grid */}
        <div className="hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
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
    </div>
  );
};

export default TrendingProducts;
