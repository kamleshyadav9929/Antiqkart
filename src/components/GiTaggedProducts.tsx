import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
import { ShieldCheck } from "lucide-react";

interface Product {
  id: string;
  name: string;
  image: string;
  price?: string;
  affiliate_link: string;
}

const GiTaggedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGiTaggedProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("id, name, image, price, affiliate_link")
        .eq("is_gi_tagged", true)
        .limit(8);

      if (error) {
        console.error("Error fetching GI-tagged products:", error.message);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    };
    fetchGiTaggedProducts();
  }, []);

  if (products.length === 0 && !loading) {
    return null;
  }

  return (
    <div>
      <div className="mb-10 text-center">
        <div className="flex justify-center items-center gap-x-3 mb-2">
          <ShieldCheck className="w-8 h-8 text-amber-600" />
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-text">
            GI-Tagged Treasures
          </h2>
        </div>
        <p className="mt-2 text-muted max-w-3xl mx-auto">
          Explore products with the Geographical Indication (GI) tag—a
          certification of authentic origin and traditional craftsmanship.
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

export default GiTaggedProducts;
