import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
import { Flame } from "lucide-react";

interface Product {
  id: string;
  name: string;
  image: string;
  price?: string;
  affiliate_link: string;
  rating?: number;
}

// The old TrendingProductData interface is no longer needed.

const TrendingProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      setLoading(true);

      // --- UPDATED QUERY ---
      // This now fetches directly from the 'products' table where 'is_trending' is true.
      // It sorts by 'popularity' to show the most popular trending items first.
      const { data, error } = await supabase
        .from("products")
        .select("id, name, image, price, affiliate_link, rating")
        .eq("is_trending", true)
        .order("popularity", { ascending: false })
        .limit(10);
      // --- END OF UPDATED QUERY ---

      if (error) {
        console.error("Error fetching trending products:", error.message);
      } else if (data) {
        // The data is now a direct array of products, so no mapping is needed.
        setProducts(data);
      }
      setLoading(false);
    };

    fetchTrendingProducts();
  }, []);

  return (
    <div>
      <div className="mb-10 text-center">
        <div className="flex justify-center items-center gap-x-3">
          <Flame className="text-amber-500" size={32} />
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
            Popular <span className="text-amber-500">Right Now</span>
          </h2>
        </div>
        <p className="mt-2 text-muted max-w-2xl mx-auto">
          Discover what's trending among our curated collections.
        </p>
      </div>

      <div className="relative">
        <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide -mx-4 px-4">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex-shrink-0 w-48">
                  <SkeletonCard />
                </div>
              ))
            : products.map((product) => (
                <div key={product.id} className="flex-shrink-0 w-48">
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    image={product.image}
                    price={product.price}
                    rating={product.rating}
                    affiliateLink={product.affiliate_link}
                    tag="Trending"
                  />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingProducts;
