import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
import { ArrowRight, Sparkles } from "lucide-react";
import { Product } from "../context/cart-context"; // Import Product type

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
    <div>
      <div className="relative text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
          Festive <span className="text-purple-500">Specials</span>
        </h2>
        <div className="absolute -top-3 -right-2 text-purple-400">
          <Sparkles size={32} className="opacity-80" />
        </div>
        <p className="mt-2 text-muted max-w-2xl mx-auto">
          Explore curated products for every celebration.
        </p>
        <Link
          to="/festive-specials"
          className="mt-4 inline-flex md:hidden items-center gap-x-1.5 text-sm font-semibold text-slate-800 hover:text-purple-600 transition-colors"
        >
          View All Festivals <ArrowRight size={14} />
        </Link>
      </div>

      <div className="relative">
        <div className="flex overflow-x-auto space-x-4 pb-4 -mx-4 px-4 scrollbar-hide">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex-shrink-0 w-48">
                  <SkeletonCard />
                </div>
              ))
            : products.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-48 h-full flex"
                >
                  <ProductCard product={product} />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default FestiveCollections;
