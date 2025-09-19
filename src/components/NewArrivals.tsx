import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// FIX: Add this interface definition at the top of the file
interface Product {
  id: string;
  name: string;
  image: string;
  price?: string;
  affiliate_link: string;
}

const NewArrivals: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("id, name, image, price, affiliate_link")
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

  if (products.length === 0 && !loading) {
    return null;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-text-main">
          New Arrivals
        </h2>
        <Link
          to="/shop"
          className="text-center text-xs font-bold text-white bg-slate-800 py-2.5 px-4 rounded-md transition-colors duration-300 hover:bg-slate-700 inline-flex items-center gap-x-2"
        >
          See All <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4">
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
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

export default NewArrivals;
