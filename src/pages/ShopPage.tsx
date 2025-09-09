import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ArrowRight, Search } from "lucide-react";

interface Product {
  id: string;
  name: string;
  image: string;
  price?: string;
  affiliate_link: string;
  collections: { name: string };
}

const groupProductsByCollection = (products: Product[]) => {
  return products.reduce((acc, product) => {
    const collection = product.collections?.name || "Other";
    if (!acc[collection]) acc[collection] = [];
    acc[collection].push(product);
    return acc;
  }, {} as Record<string, Product[]>);
};

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q");
    if (query) setSearchTerm(query);
  }, [location.search]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("id, name, image, price, affiliate_link, collections ( name )");
      if (error) console.error("Error fetching products:", error.message);
      else setProducts((data as any[]) || []);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const productsByCollection = groupProductsByCollection(filteredProducts);

  return (
    <>
      <Navbar />
      <main className="bg-gray-50">
        <Layout>
          <div className="text-center py-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">
              Discover Our Collections
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Browse through our curated collections of authentic Indian
              handicrafts and antiques.
            </p>
            <div className="mt-8 mx-auto max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search all products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-800 transition"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Search size={22} />
                </div>
              </div>
            </div>
          </div>
          <div className="pb-16">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="space-y-16">
                {Object.keys(productsByCollection).map((collection) => (
                  <section key={collection}>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-3xl font-serif font-semibold text-gray-900">
                        {collection}
                      </h2>
                      <a
                        href={`/collections/${collection
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="text-sm font-semibold text-blue-600 hover:underline inline-flex items-center"
                      >
                        See All <ArrowRight size={16} className="ml-1" />
                      </a>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                      {productsByCollection[collection]
                        .slice(0, 6)
                        .map((product) => (
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
                ))}
              </div>
            )}
          </div>
        </Layout>
      </main>
      <Footer />
    </>
  );
};

export default ShopPage;
