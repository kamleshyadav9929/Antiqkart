import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
import { Product } from "../context/cart-context";

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*, collections(name)")
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

  return (
    <div className="relative z-10">
      {/* Heading */}
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
          Our handpicked selection of the finest Indian handicrafts, curated
          with love.
        </p>
      </div>

      {/* Products Grid / Swiper */}
      <div>
        {/* Mobile: horizontal scroll */}
        <div className="flex md:hidden gap-4 overflow-x-auto snap-x snap-mandatory px-2 scrollbar-hide">
          {loading
            ? Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className="snap-center flex-shrink-0 w-44 h-full"
                >
                  <SkeletonCard />
                </div>
              ))
            : products.slice(0, 12).map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-48 md:w-56 h-full flex"
                >
                  <ProductCard product={product} />
                </div>
              ))}
        </div>

        {/* Desktop: normal grid */}
        <div className="hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-6">
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

      <section className="mt-12">
        <div className="flex items-center justify-between mb-6 px-2 sm:px-0">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-serif text-slate-900">
            Featured
          </h2>
          <Link
            to="/featured"
            className="hidden sm:inline-block text-sm text-amber-600 hover:underline font-medium"
          >
            See All
          </Link>
        </div>
        {/* Mobile: horizontal scroll */}
        <div className="flex md:hidden overflow-x-auto gap-4 pb-2 snap-x snap-mandatory px-2">
          {(loading ? Array.from({ length: 5 }) : products).map(
            (product, idx) => (
              <div
                key={loading ? idx : (product as Product).id}
                className="min-w-[60vw] sm:min-w-[250px] max-w-[250px] flex-shrink-0 snap-center"
              >
                {loading ? (
                  <SkeletonCard />
                ) : (
                  <ProductCard product={product as Product} tag="Featured" />
                )}
              </div>
            )
          )}
          {/* See All button at end */}
          <div className="min-w-[60vw] sm:min-w-[250px] max-w-[250px] flex-shrink-0 snap-center flex items-center justify-center">
            <Link
              to="/featured"
              className="w-full h-full flex items-center justify-center rounded-2xl border border-amber-400 bg-white text-amber-600 font-semibold text-base hover:bg-amber-50 transition"
              style={{ minHeight: 180 }}
            >
              See All
            </Link>
          </div>
        </div>
        {/* Desktop: grid */}
        <div className="hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  tag="Featured"
                />
              ))}
        </div>
      </section>
    </div>
  );
};

export default FeaturedProducts;
