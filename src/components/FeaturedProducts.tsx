import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
import { ArrowRight } from "lucide-react";

// Define the structure for a Product
interface Product {
  id: string;
  name: string;
  image: string;
  price?: string;
  affiliate_link: string;
}

const FeaturedProducts = () => {
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
    <section className="py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-gray-900">
          Featured Products
        </h2>
        <Link
          to="/shop"
          className="text-sm font-medium text-blue-600 hover:underline inline-flex items-center"
        >
          See All <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>

      {/* Mobile: Two-row grid (showing 6 items) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:hidden gap-4">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : products.slice(0, 6).map((product) => (
              <ProductCard
                key={product.id}
                id={product.id} // Add this line
                name={product.name}
                image={product.image}
                price={product.price}
                affiliateLink={product.affiliate_link}
              />
            ))}
      </div>

      {/* Desktop: Two-row grid (showing 12 items) */}
      <div className="hidden md:grid md:grid-cols-6 gap-6">
        {loading
          ? Array.from({ length: 12 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id} // Add this line
                name={product.name}
                image={product.image}
                price={product.price}
                affiliateLink={product.affiliate_link}
              />
            ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
