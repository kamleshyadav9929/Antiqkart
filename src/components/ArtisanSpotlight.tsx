import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { Product } from "../context/cart-context";
import { ArrowRight } from "lucide-react";

// This is a simplified ProductCard for this specific section
const SpotlightProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <a
    href={product.affiliate_link}
    target="_blank"
    rel="noopener noreferrer"
    className="group block bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 border border-white/20"
  >
    <div className="aspect-[4/3] w-full overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
    </div>
    <div className="p-3">
      <h3 className="text-xs font-semibold text-slate-800 truncate">
        {product.name}
      </h3>
      {product.price && (
        <p className="text-sm font-bold text-slate-900 mt-1">
          ₹{product.price}
        </p>
      )}
    </div>
  </a>
);

const ArtisanSpotlight: React.FC = () => {
  const [story, setStory] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStoryData = async () => {
      setLoading(true);
      const storyData = {
        title: "The Lost Wax Legacy of Dhokra",
        image_url:
          "https://images.unsplash.com/photo-1619552467383-a4e1a613217b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGluZGlhbiUyMGFydGlzYW58ZW58MHx8MHx8fDA%3D",
        content:
          "An ancient folk art tradition from the heartlands of India, Dhokra is a 4,000-year-old method of metal casting using the lost-wax technique. Each piece is a one-of-a-kind testament to the artisan's skill.",
        product_ids: [40, 15, 41],
      };
      setStory(storyData);

      const { data: productsData, error } = await supabase
        .from("products")
        .select("*")
        .in("id", storyData.product_ids);

      if (error) {
        console.error("Error fetching spotlight products:", error);
      } else {
        setProducts((productsData as Product[]) || []);
      }
      setLoading(false);
    };

    fetchStoryData();
  }, []);

  if (loading || !story) {
    return (
      <div className="w-full h-[70vh] bg-gray-200 animate-pulse rounded-2xl"></div>
    );
  }

  return (
    <div className="relative w-full min-h-[90vh] lg:h-[80vh] lg:min-h-[600px] rounded-3xl overflow-hidden shadow-2xl my-16 md:my-24 flex flex-col justify-end">
      {/* Parallax Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url(${story.image_url})`,
          transform: "scale(1.15)",
        }}
      ></div>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 p-6 md:p-12 text-white lg:grid lg:grid-cols-2 lg:gap-8 lg:items-end">
        {/* Story Section */}
        <div className="mb-8 lg:mb-0">
          <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight text-shadow-lg">
            {story.title}
          </h2>
          <p className="mt-4 text-base md:text-lg max-w-lg text-gray-200 leading-relaxed">
            {story.content}
          </p>
          <Link
            to="/collections/sculptures"
            className="inline-flex items-center gap-2 mt-6 bg-amber-500 text-slate-900 font-bold py-3 px-6 rounded-full hover:bg-amber-400 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Explore the Craft <ArrowRight size={20} />
          </Link>
        </div>

        {/* Featured Products Section */}
        <div className="w-full">
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <SpotlightProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanSpotlight;
