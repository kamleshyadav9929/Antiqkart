import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Define the structure for a Product
interface Product {
  id: string;
  name: string;
  image: string;
  price?: string;
  affiliate_link: string;
}

// Define the structure for a Collection, which includes its Products
interface CollectionWithProducts {
  id: string;
  name: string;
  products: Product[];
}

const AllProductsPage = () => {
  const [collectionsWithProducts, setCollectionsWithProducts] = useState<
    CollectionWithProducts[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsByCollection = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("collections").select(`
          id,
          name,
          products (
            id,
            name,
            image,
            price,
            affiliate_link
          )
        `);

      if (error) {
        console.error("Error fetching products by collection:", error.message);
      } else {
        setCollectionsWithProducts(data || []);
      }
      setLoading(false);
    };

    fetchProductsByCollection();
  }, []);

  return (
    <>
      <Navbar />
      <main className="py-12">
        <Layout>
          <h1 className="text-4xl md:text-5xl font-serif font-semibold text-gray-900 mb-12 text-center">
            All Products
          </h1>
          {loading ? (
            <div>
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <SkeletonCard key={index} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            collectionsWithProducts.map(
              (collection) =>
                collection.products.length > 0 && (
                  <section key={collection.id} className="mb-16">
                    <h2 className="text-2xl md:text-3xl font-serif font-semibold text-gray-900 mb-6">
                      {collection.name}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                      {collection.products.map((product) => (
                        <ProductCard
                          key={product.id}
                          name={product.name}
                          image={product.image}
                          price={product.price}
                          affiliateLink={product.affiliate_link}
                        />
                      ))}
                    </div>
                  </section>
                )
            )
          )}
        </Layout>
      </main>
      <Footer />
    </>
  );
};

export default AllProductsPage;
