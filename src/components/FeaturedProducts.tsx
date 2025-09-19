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
      const { data, error } = await supabase
        .from("products")
        .select("id, name, image, price, affiliate_link")
        .order("created_at", { ascending: false })
        .limit(12);

      if (error) {
        console.error("Error fetching featured products:", error.message);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        {/* FIX 1: Smaller heading on mobile (text-2xl) */}
        <h2 className="text-2xl md:text-4xl font-serif font-semibold text-text">
          Featured Products
        </h2>
        {/* FIX 2: Button now shows only an icon on mobile */}
        <Link
          to="/shop"
          className="text-center font-bold text-white bg-slate-800 rounded-md transition-colors duration-300 hover:bg-slate-700 inline-flex items-center gap-x-2 p-2 sm:py-2.5 sm:px-4 text-xs"
        >
          <span className="hidden sm:inline">See All</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* FIX 3: Reduced gap between cards on mobile (gap-1) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:hidden gap-1">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : products
              .slice(0, 6)
              .map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  image={product.image}
                  price={product.price}
                  affiliateLink={product.affiliate_link}
                />
              ))}
      </div>

      <div className="hidden md:grid md:grid-cols-6 gap-4">
        {loading
          ? Array.from({ length: 12 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                image={product.image}
                price={product.price}
                affiliateLink={product.affiliate_link}
              />
            ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
