import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import ProductCard from "../components/ProductCard";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Product {
  id: string;
  name: string;
  image: string;
  price?: string;
  affiliate_link: string;
}

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
            <p>Loading...</p>
          ) : (
            collectionsWithProducts.map(
              (collection) =>
                collection.products.length > 0 && (
                  <section key={collection.id} className="mb-16">
                    <h2 className="text-2xl md:text-3xl font-serif font-semibold text-gray-900 mb-6">
                      {collection.name}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
                      {collection.products.map((product) => (
                        <ProductCard
                          key={product.id}
                          id={product.id}
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
