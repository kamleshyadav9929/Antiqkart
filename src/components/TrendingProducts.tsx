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

interface TrendingProductData {
  position: number;
  products: Product | null;
}

const TrendingProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("trending_products")
        .select(
          `
          position,
          products ( id, name, image, price, affiliate_link )
        `
        )
        .order("position", { ascending: true })
        .limit(10)
        .returns<TrendingProductData[]>();

      if (error) {
        console.error("Error fetching trending products:", error.message);
      } else if (data) {
        const trending = data
          .map((item) => item.products)
          .filter(Boolean) as Product[];
        setProducts(trending);
      }
      setLoading(false);
    };

    fetchTrendingProducts();
  }, []);

  if (products.length === 0 && !loading) {
    return null;
  }

  return (
    <div>
      <div className="mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-text">
          Trending Now
        </h2>
        <p className="mt-2 text-muted max-w-2xl mx-auto">
          Discover what's popular right now among our curated collections of
          authentic Indian handicrafts.
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

export default TrendingProducts;
