import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
import { Product } from "../context/cart-context";

const NewArrivals: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ... (fetching logic remains the same)
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
      {/* --- UPDATED HEADING --- */}
      <div className="relative text-center mb-16 md:mb-20">
        <div className="relative inline-block">
          <div className="absolute -inset-4 bg-gradient-to-r from-sky-500/10 to-cyan-500/10 rounded-3xl blur-xl"></div>
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
              New Arrivals
            </h2>
            <p className="mt-2 text-slate-600">
              Our latest handcrafted additions, fresh from artisan workshops.
            </p>
          </div>
        </div>
      </div>

      {/* --- FIX IS HERE: Improved structure for the slider --- */}
      {/* Outer div uses negative margins to break out of the container's padding */}
      <div className="-mx-4 sm:-mx-6 lg:-mx-8">
        {/* Inner div handles scrolling and adds back padding for the content */}
        <div className="flex overflow-x-auto space-x-3 pb-4 px-4 sm:px-2 lg:px-8 scrollbar-hide">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex-shrink-0 w-48 md:w-56">
                  <SkeletonCard />
                </div>
              ))
            : products.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-48 md:w-56 h-full flex "
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
