import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import { supabase } from "../lib/supabaseClient";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";

// Define the shape of a Product object
interface Product {
  id: number;
  name: string;
  image: string;
  price?: string;
  affiliate_link: string;
  rating?: number;
}

// Define the shape of a Festival object
interface Festival {
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

      // Fetch the festival and its related products in one go
      const { data, error } = await supabase
        .from("festivals")
        .select(
          `
          name,
          banner_image,
          festival_products (
            products (
              id,
              name,
              image,
              price,
              affiliate_link,
              rating
            )
          )
        `
        )
        .eq("slug", slug)
        .single();

      if (error) {
        console.error("Error fetching festival data:", error.message);
        setProducts([]);
      } else if (data) {
        setFestival({
          name: data.name,
          banner_image: data.banner_image,
        });

        // This is a simpler, corrected way to extract the products
        const validProducts = data.festival_products
          .map((item: any) => item.products)
          .filter(Boolean); // Filter out any null or undefined products

        setProducts(validProducts);
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
        <section className="relative h-[50vh] bg-gray-700 flex items-center justify-center text-white text-center">
          <img
            src={festival.banner_image}
            alt={festival.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <h1 className="relative z-10 text-5xl md:text-7xl font-serif font-bold">
            {festival.name}
          </h1>
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
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id.toString()}
                    name={product.name}
                    image={product.image}
                    price={product.price}
                    rating={product.rating}
                    affiliateLink={product.affiliate_link}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h2 className="text-2xl font-semibold text-gray-800">
                  No Products Found
                </h2>
                <p className="mt-2 text-gray-500">
                  We are still curating products for this collection. Please
                  check back soon!
                </p>
              </div>
            )}
          </div>
        </Layout>
      </main>
      <Footer />
    </div>
  );
};

export default FestivalPage;
