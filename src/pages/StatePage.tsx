import React from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import { Product } from "../context/cart-context";

interface State {
  id: string;
  name: string;
  image: string;
}

const StatePage: React.FC = () => {
  const { stateName } = useParams<{ stateName: string }>();
  const [state, setState] = React.useState<State | null>(null);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchStateAndProducts = async () => {
      setLoading(true);
      // Fetch state info
      const { data: states } = await supabase
        .from("states")
        .select("*")
        .ilike("name", stateName?.replace(/-/g, " ") || "");
      const foundState = states?.[0] || null;
      setState(foundState);

      // Fetch products for this state
      if (foundState) {
        const { data: productsData } = await supabase
          .from("products")
          .select("*, collections(name)")
          .eq("state_id", foundState.id);
        setProducts(productsData || []);
      } else {
        setProducts([]);
      }
      setLoading(false);
    };
    fetchStateAndProducts();
  }, [stateName]);

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen">
        <Layout>
          <div className="py-8">
            {state && (
              <div className="text-center mb-10">
                <img
                  src={state.image}
                  alt={state.name}
                  className="mx-auto w-32 h-32 object-cover rounded-full shadow-md mb-4"
                />
                <h1 className="text-3xl font-bold text-slate-900">
                  {state.name}
                </h1>
              </div>
            )}
            <div>
              {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 px-4">
                  <p className="text-lg font-semibold text-slate-700">
                    No products found for this state.
                  </p>
                </div>
              )}
            </div>
          </div>
        </Layout>
      </div>
    </>
  );
};

export default StatePage;
