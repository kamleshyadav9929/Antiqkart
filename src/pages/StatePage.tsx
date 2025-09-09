import React from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Product {
  id: string;
  name: string;
  image: string;
  price?: number;
  affiliate_link: string;
  created_at: string;
}

const StatePage = () => {
  const { stateName: stateSlug } = useParams<{ stateName: string }>();
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [stateName, setStateName] = React.useState("");

  React.useEffect(() => {
    const state =
      stateSlug?.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) ||
      "";
    setStateName(state);

    const fetchProducts = async () => {
      if (!state) return;
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("*, states!inner(name)")
        .eq("states.name", state);

      if (error) {
        console.error("Error fetching products for state:", error.message);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [stateSlug]);

  return (
    <>
      <Navbar />
      <main className="py-12">
        <Layout>
          <h1 className="text-4xl md:text-5xl font-serif font-semibold text-gray-900 mb-8 text-center">
            {stateName}
          </h1>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {Array.from({ length: 10 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id} // Add this line
                  name={product.name}
                  image={product.image}
                  price={product.price?.toString()}
                  affiliateLink={product.affiliate_link}
                />
              ))}
            </div>
          )}
        </Layout>
      </main>
      <Footer />
    </>
  );
};

export default StatePage;
