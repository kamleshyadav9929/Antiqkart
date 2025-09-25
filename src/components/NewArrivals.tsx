import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";

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

  return (
    <div>
      <div className="mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-text">
          New Arrivals
        </h2>
        <p className="mt-2 text-muted max-w-2xl mx-auto">
          Check out the latest additions to our curated collection of Indian
          handicrafts.
        </p>
      </div>

      <div className="relative">
        <div className="flex overflow-x-auto space-x-4 pb-4 -mx-4 px-4 scrollbar-hide">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex-shrink-0 w-64">
                  <SkeletonCard />
                </div>
              ))
            : products.map((product) => (
                <div key={product.id} className="flex-shrink-0 w-64">
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    image={product.image}
                    price={product.price}
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
