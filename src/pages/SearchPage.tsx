import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { MapPin, Layers, Package } from "lucide-react";

interface SearchResult {
  id: string;
  name: string;
  result_type: "product" | "state" | "collection";
  image: string;
  link: string;
}

const SearchResultCard = ({ result }: { result: SearchResult }) => {
  const getIcon = () => {
    switch (result.result_type) {
      case "product":
        return <Package size={18} className="text-gray-500" />;
      case "state":
        return <MapPin size={18} className="text-gray-500" />;
      case "collection":
        return <Layers size={18} className="text-gray-500" />;
      default:
        return null;
    }
  };

  if (result.result_type === "product") {
    return (
      <ProductCard
        id={result.id}
        name={result.name}
        image={result.image}
        affiliateLink={result.link}
      />
    );
  }

  return (
    <a
      href={result.link}
      className="group flex flex-col bg-white border border-gray-200/60 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1"
    >
      <div className="aspect-[4/3] bg-gray-50 overflow-hidden">
        <img
          src={result.image}
          alt={result.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex-grow p-4 flex justify-between items-center">
        <h3 className="font-semibold text-gray-800">{result.name}</h3>
        {getIcon()}
      </div>
    </a>
  );
};

const SearchPage = () => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const q = searchParams.get("q") || "";
    setQuery(q);

    const performSearch = async () => {
      if (!q) {
        setResults([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      const { data, error } = await supabase.rpc("search_all", {
        search_term: q,
      });

      if (error) {
        console.error("Error performing search:", error);
        setResults([]);
      } else {
        setResults(data || []);
      }
      setLoading(false);
    };

    performSearch();
  }, []);

  return (
    <>
      <Navbar />
      <main className="py-12">
        <Layout>
          <h1 className="text-3xl md:text-4xl font-serif font-semibold text-gray-900 mb-8">
            Search Results for "{query}"
          </h1>

          {loading ? (
            <p>Loading...</p>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {results.map((result) => (
                <SearchResultCard
                  key={`${result.result_type}-${result.id}`}
                  result={result}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">
              No results found for your search. Try another keyword.
            </p>
          )}
        </Layout>
      </main>
      <Footer />
    </>
  );
};

export default SearchPage;
