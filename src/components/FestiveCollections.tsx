import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
import { Product } from "../context/cart-context";

const FestiveCollections = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFestiveProducts = async () => {
      setLoading(true);
      try {
        // Find the ID for the 'Diwali' festival (case-insensitive)
        const { data: festivalData, error: festivalError } = await supabase
          .from("festivals")
          .select("id")
          .ilike("name", "%diwali%")
          .maybeSingle();

        let combinedProducts: Product[] = [];

        if (festivalError) {
          console.warn("Festival fetch error:", festivalError.message);
        }

        // If Diwali found, fetch its products
        if (festivalData?.id) {
          const { data: diwaliProducts, error: diwaliError } = await supabase
            .from("products")
            .select("*, collections(name)")
            .eq("festival_id", festivalData.id)
            .order("created_at", { ascending: false });

          if (diwaliError) throw diwaliError;

          combinedProducts = [...(diwaliProducts as Product[])];
        }

        // Fetch other festive products (non-null festival_id)
        const { data: otherFestiveProducts, error: otherError } = await supabase
          .from("products")
          .select("*, collections(name)")
          .not("festival_id", "is", null)
          .order("created_at", { ascending: false })
          .limit(10);

        if (otherError) throw otherError;

        // Merge them (Diwali first, then others excluding duplicates)
        const otherFiltered = (otherFestiveProducts || []).filter(
          (p) => !combinedProducts.some((dp) => dp.id === p.id)
        );

        combinedProducts = [
          ...combinedProducts,
          ...(otherFiltered as Product[]),
        ];

        setProducts(combinedProducts || []);
      } catch (error) {
        // FIX: Replaced 'error: any' with a safe error handler
        if (error instanceof Error) {
          console.error("Error fetching festive products:", error.message);
        } else {
          console.error("An unknown error occurred:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFestiveProducts();
  }, []);

  return (
    <section className="relative z-10 py-10">
      {/* Header */}
      <div className="text-center mb-16 md:mb-20 relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl blur-2xl"></div>
        <div className="relative">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
            Festive Specials
          </h2>
          <p className="mt-2 text-slate-600">
            Explore curated products for every celebration and festival!
          </p>
        </div>
      </div>

      {/* Product Scroller */}
      <div className="-mx-4 sm:-mx-6 lg:-mx-8">
        <div className="flex overflow-x-auto space-x-4 pb-4 px-4 sm:px-6 lg:px-8 scrollbar-hide">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex-shrink-0 w-48 md:w-56">
                  <SkeletonCard />
                </div>
              ))
            : products.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-48 md:w-56 h-full flex"
                >
                  <ProductCard product={product} />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default FestiveCollections;
