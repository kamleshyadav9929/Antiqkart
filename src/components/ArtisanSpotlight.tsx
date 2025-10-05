import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { Product } from "../context/cart-context";

import { motion } from "framer-motion";

// Updated interface to include the new image column
interface Story {
  id: number;
  title: string;
  content: string | null;
  image_url: string | null; // Original image column
  spotlight_image_url: string | null; // New dedicated column for the spotlight
  created_at: string;
  is_published: boolean;
}

// Simple card for the small product previews
const SpotlightProductPreview: React.FC<{ product: Product }> = ({
  product,
}) => (
  <a
    href={product.affiliate_link}
    target="_blank"
    rel="noopener noreferrer"
    className="group block rounded-lg overflow-hidden border border-gray-200/80 hover:border-gray-300 transition-all duration-300"
  >
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-full object-cover aspect-square transition-transform duration-300 group-hover:scale-105"
    />
  </a>
);

// Main Revamped Spotlight Section
const ArtisanSpotlight: React.FC = () => {
  const [story, setStory] = useState<Story | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStoryData = async () => {
      setLoading(true);

      const { data: storyData, error: storyError } = await supabase
        .from("stories")
        .select("*") // This will automatically include your new column
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (storyError || !storyData) {
        console.error("Error fetching artisan story:", storyError?.message);
        setLoading(false);
        return;
      }
      setStory(storyData);

      const { data: storyProducts, error: storyProductsError } = await supabase
        .from("story_products")
        .select("product_id")
        .eq("story_id", storyData.id);

      if (storyProductsError) {
        console.error(
          "Error fetching story products:",
          storyProductsError.message
        );
        setLoading(false);
        return;
      }

      const productIds = storyProducts.map((item) => item.product_id);
      if (productIds.length > 0) {
        const { data: productsData, error: productsError } = await supabase
          .from("products")
          .select("*")
          .in("id", productIds);

        if (productsError) {
          console.error(
            "Error fetching spotlight products:",
            productsError.message
          );
        } else {
          setProducts(productsData as Product[]);
        }
      }

      setLoading(false);
    };

    fetchStoryData();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[70vh] bg-gray-100 animate-pulse rounded-2xl my-20"></div>
    );
  }

  if (!story) {
    return null;
  }

  // Use the new spotlight image, but fall back to the original image_url if it's not present
  const displayImageUrl = story.spotlight_image_url || story.image_url;

  return (
    <section className="my-20 md:my-28">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="grid lg:grid-cols-2 gap-4 items-center bg-gray-50/80 border border-gray-200/80 rounded-2xl overflow-hidden"
      >
        {/* Left Side: Using the new image URL */}
        <div className="w-full h-64 lg:h-[600px]">
          {displayImageUrl && (
            <img
              src={displayImageUrl}
              alt={story.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Right Side: Content */}
        <div className="p-8 md:p-12 lg:p-16">
          <p className="text-sm uppercase tracking-widest text-amber-600 font-semibold mb-3">
            Artisan Spotlight
          </p>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 leading-tight mb-4">
            {story.title}
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-xl mb-8">
            {story.content}
          </p>

          {products.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-slate-800 mb-3">
                Featured in this Story
              </h3>
              <div className="grid grid-cols-3 gap-3 max-w-sm">
                {products.map((product) => (
                  <SpotlightProductPreview key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}

          <Link
            to="/collections"
            className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 py-3 px-6 rounded-full transition-colors"
          >
            Explore All Collections
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default ArtisanSpotlight;
