import { useEffect, useState } from "react";
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
  rating?: number;
}

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("id, name, image, price, affiliate_link, rating")
        .order("created_at", { ascending: false })
        .limit(16);

      if (error) {
        console.error("Error fetching featured products:", error.message);
      } else {
        setProducts(data || []);
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
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
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
  );
};

export default FeaturedProducts;
