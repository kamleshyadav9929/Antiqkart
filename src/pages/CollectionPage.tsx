import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import { Product } from "../context/cart-context";
import { Layers } from "lucide-react";

interface Collection {
  id: string;
  name: string;
  image: string;
}

const CollectionPage: React.FC = () => {
  const { collectionName } = useParams<{ collectionName: string }>();
  const [collection, setCollection] = useState<Collection | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollectionAndProducts = async () => {
      if (!collectionName) return;
      setLoading(true);

      // Convert slug back to title case for fetching
      const formattedName = collectionName
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());

      // 1. Fetch collection info by name
      const { data: collectionsData, error: collectionError } = await supabase
        .from("collections")
        .select("*")
        .eq("name", formattedName)
        .limit(1);

      if (collectionError || !collectionsData || collectionsData.length === 0) {
        console.error("Error fetching collection:", collectionError?.message);
        setLoading(false);
        return;
      }

      const foundCollection = collectionsData[0];
      setCollection(foundCollection);

      // 2. Fetch products for this collection using its ID
      if (foundCollection) {
        const { data: productsData, error: productsError } = await supabase
          .from("products")
          .select("*, collections(name)")
          .eq("collection_id", foundCollection.id);

        if (productsError) {
          console.error(
            "Error fetching products for collection:",
            productsError.message
          );
          setProducts([]);
        } else {
          setProducts((productsData as Product[]) || []);
        }
      }
      setLoading(false);
    };

    fetchCollectionAndProducts();
  }, [collectionName]);

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen">
        <Layout>
          <div className="py-12 md:py-16">
            {loading && !collection ? (
              <div className="animate-pulse text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <div className="h-10 bg-gray-200 rounded-md w-1/2 mx-auto"></div>
              </div>
            ) : collection ? (
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
                  {collection.name}
                </h1>
                <p className="mt-2 text-slate-600">
                  Explore curated products from the {collection.name}{" "}
                  collection.
                </p>
              </div>
            ) : null}

            <div>
              {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 px-4 border-2 border-dashed rounded-xl">
                  <Layers size={48} className="mx-auto text-gray-400 mb-4" />
                  <h2 className="text-xl font-semibold text-slate-800">
                    No Products Found
                  </h2>
                  <p className="text-slate-500 mt-2">
                    This collection is currently empty. Please check back later!
                  </p>
                </div>
              )}
            </div>
          </div>
        </Layout>
      </main>
    </>
  );
};

export default CollectionPage;
