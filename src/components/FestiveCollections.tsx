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
        // Step 1: Find the ID for the 'Diwali' festival using a case-insensitive search
        const { data: festivalData, error: festivalError } = await supabase
          .from("festivals")
          .select("id")
          .ilike("name", "diwali") // Use ilike for case-insensitive matching
          .single();

        // If Diwali isn't found, just get the latest festive products as a fallback
        if (festivalError || !festivalData) {
          console.error(
            "Could not find a festival named 'Diwali'. Fetching general festive items.",
            festivalError?.message
          );
          const { data, error } = await supabase
            .from("products")
            .select("*, collections(name)")
            .not("festival_id", "is", null)
            .order("created_at", { ascending: false })
            .limit(10);

          if (error) throw error;
          setProducts((data as Product[]) || []);
          return; // Exit after fallback
        }

        const diwaliFestivalId = festivalData.id;

        // Step 2: Fetch all products linked to the Diwali festival ID
        const { data: diwaliProducts, error: diwaliError } = await supabase
          .from("products")
          .select("*, collections(name)")
          .eq("festival_id", diwaliFestivalId)
          .order("created_at", { ascending: false });

        if (diwaliError) throw diwaliError;

        // Step 3: Fetch other festive products, making sure to exclude the Diwali ones
        const { data: otherFestiveProducts, error: otherError } = await supabase
          .from("products")
          .select("*, collections(name)")
          .not("festival_id", "is", null)
          .neq("festival_id", diwaliFestivalId) // Exclude Diwali items
          .order("created_at", { ascending: false })
          .limit(10 - (diwaliProducts?.length || 0)); // Fetch enough to fill up to 10 spots

        if (otherError) throw otherError;

        // Step 4: Combine the lists, ensuring Diwali products are always first
        const combinedProducts = [
          ...(diwaliProducts || []),
          ...(otherFestiveProducts || []),
        ];

        setProducts((combinedProducts as Product[]) || []);
      } catch (error: any) {
        console.error("Error fetching festive products:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFestiveProducts();
  }, []);

  return (
    <div className="relative z-10">
      <div className="relative text-center mb-16 md:mb-20">
        <div className="relative inline-block">
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl blur-xl"></div>
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
              Festive Specials
            </h2>
            <p className="mt-2 text-slate-600">
              Explore curated products for every celebration and festival!
            </p>
          </div>
        </div>
      </div>

      <div className="-mx-4 sm:-mx-6 lg:-mx-8">
        <div className="flex overflow-x-auto space-x-3 pb-4 px-4 sm:px-2 lg:px-8 scrollbar-hide">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex-shrink-0 w-48 md:w-56">
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
    </div>
  );
};

export default FestiveCollections;
