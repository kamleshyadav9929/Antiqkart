import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

import Layout from "../components/Layout";
import { supabase } from "../lib/supabaseClient";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import { Product } from "../context/cart-context";
import { Gift } from "lucide-react";

interface Festival {
  id: number;
  name: string;
  banner_image: string;
}

const FestivalPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [festival, setFestival] = useState<Festival | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFestivalData = async () => {
      if (!slug) return;
      setLoading(true);

      const { data: festivalData, error: festivalError } = await supabase
        .from("festivals")
        .select("id, name, banner_image")
        .eq("slug", slug)
        .single();

      if (festivalError || !festivalData) {
        console.error("Error fetching festival:", festivalError?.message);
        setLoading(false);
        return;
      }
      setFestival(festivalData);

      const { data: productsData, error: productsError } = await supabase
        .from("products")
        .select("id, name, image, price, affiliate_link, rating")
        .eq("festival_id", festivalData.id);

      if (productsError) {
        console.error(
          "Error fetching products for festival:",
          productsError.message
        );
        setProducts([]);
      } else {
        setProducts((productsData as Product[]) || []);
      }
      setLoading(false);
    };

    fetchFestivalData();
  }, [slug]);

  return (
    <div className="bg-white">
      <Navbar />
      {loading && !festival ? (
        <div className="h-[50vh] bg-gray-200 animate-pulse"></div>
      ) : festival ? (
        <section className="relative h-[50vh] bg-gray-100">
          <img
            src={festival.banner_image}
            alt={festival.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white p-4">
            <h1 className="text-5xl md:text-7xl font-serif font-bold">
              {festival.name}
            </h1>
          </div>
        </section>
      ) : null}

      <main>
        <Layout>
          <div className="py-16">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-6 lg:gap-3">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={{ ...product, id: product.id.toString() }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Gift size={48} className="mx-auto text-gray-400 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-800">
                  No Products Found
                </h2>
                <p className="mt-2 text-gray-500 max-w-md mx-auto">
                  We are still curating products for this collection. Please
                  check back soon!
                </p>
              </div>
            )}
          </div>
        </Layout>
      </main>
    </div>
  );
};

export default FestivalPage;
