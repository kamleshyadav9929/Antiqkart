import React, { useEffect, useState } from "react";
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
  rating?: number;
}

const NewArrivals: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("id, name, image, price, affiliate_link, rating")
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) {
        console.error("Error fetching new arrivals:", error.message);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    };

    fetchNewArrivals();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
            Fresh on the <span className="text-sky-500">Shelves</span>
          </h2>
          <p className="mt-1 text-muted max-w-2xl">
            Our latest handcrafted additions.
          </p>
        </div>
        <a
          href="/shop"
          className="hidden md:flex items-center gap-x-1.5 text-sm font-semibold text-slate-800 hover:text-sky-600 transition-colors"
        >
          <span>View All</span>
          <ArrowRight size={16} />
        </a>
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
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    image={product.image}
                    price={product.price}
                    rating={product.rating}
                    affiliateLink={product.affiliate_link}
                  />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
