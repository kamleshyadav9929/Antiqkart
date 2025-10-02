import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
import { ArrowRight } from "lucide-react";
import { Product } from "../context/cart-context"; // Import Product type

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*, collections(name)") // Fetch collections as well
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

  const SeeAllCard = () => (
    <div className="flex-shrink-0 w-48">
      <Link
        to="/shop"
        className="flex h-full w-full flex-col items-center justify-center rounded-lg p-4 transition-transform hover:scale-105"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-white">
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
      <div className="relative text-center mb-12">
        <h2 className="section-title text-3xl md:text-4xl font-serif font-bold text-slate-900">
          Featured <span className="text-amber-500">Products</span>
        </h2>
        <p className="mt-4 text-muted max-w-2xl mx-auto">
          Our handpicked selection of the finest Indian handicrafts.
        </p>
      </div>

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
              {products.slice(0, 11).map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-48 h-full flex"
                >
                  <ProductCard product={product} />
                </div>
              ))}
              <SeeAllCard />
            </>
          )}
        </div>
      </div>

      <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-6 gap-4">
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
  );
};

export default FeaturedProducts;
