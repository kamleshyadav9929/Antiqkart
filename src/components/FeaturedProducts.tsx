import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
import { ArrowRight } from "lucide-react";

interface Product {
  id: string;
  name: string;
  image: string;
  price?: string;
  affiliate_link: string;
}

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      // Fetching more products initially to accommodate the longer mobile carousel
      const { data, error } = await supabase
        .from("products")
        .select("id, name, image, price, affiliate_link")
        .order("created_at", { ascending: false })
        .limit(16); // Fetch up to 16 products

      if (error) {
        console.error("Error fetching featured products:", error.message);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // A new component for the "See All" card with a transparent background
  const SeeAllCard = () => (
    <div className="flex-shrink-0 w-48">
      {/* FIX: Removed background color classes for a transparent look */}
      <Link
        to="/shop"
        className="flex h-full w-full flex-col items-center justify-center rounded-lg p-4 transition-transform hover:scale-105"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-white">
          <ArrowRight size={24} />
        </div>
        <span className="mt-4 text-sm font-semibold text-gray-800">
          See All
        </span>
      </Link>
    </div>
  );

  return (
    <div>
      <div className="relative mb-10">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-text">
            Featured Products
          </h2>
          <p className="mt-2 text-muted max-w-2xl mx-auto">
            Our handpicked selection of the finest Indian handicrafts.
          </p>
        </div>
        <div className="hidden text-center md:block md:absolute md:top-1/2 md:right-0 md:-translate-y-1/2 md:mt-0">
          <Link
            to="/shop"
            className="text-center text-xs font-bold text-white bg-slate-800 py-2.5 px-4 rounded-md transition-colors duration-300 hover:bg-slate-700 inline-flex items-center gap-x-2"
          >
            See All <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* --- Mobile View: Carousel with "See All" card at the end --- */}
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
              {/* FIX: Showing 11 products before the "See All" card */}
              {products.slice(0, 11).map((product) => (
                <div key={product.id} className="flex-shrink-0 w-48">
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    image={product.image}
                    price={product.price}
                    affiliateLink={product.affiliate_link}
                  />
                </div>
              ))}
              <SeeAllCard />
            </>
          )}
        </div>
      </div>

      {/* --- Desktop View: Standard Grid --- */}
      <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-6 gap-4">
        {loading
          ? Array.from({ length: 12 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : products.slice(0, 12).map(
              (
                product // Show 12 products on desktop
              ) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  image={product.image}
                  price={product.price}
                  affiliateLink={product.affiliate_link}
                />
              )
            )}
      </div>
    </div>
  );
};

export default FeaturedProducts;
