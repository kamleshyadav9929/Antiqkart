import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import ProductCard from "./ProductCard";

import { X, Search, MapPin, Layers } from "lucide-react";

// --- Data Interfaces ---
interface Product {
  id: string;
  name: string;
  image: string;
  price?: number; // Price from database is a number
  affiliate_link: string;
}

interface State {
  id: string;
  name: string;
  image: string;
}

interface Collection {
  id: string;
  name: string;
  image: string;
}

// A union type to represent any possible item in the search results
type SearchItem = Product | State | Collection;

// --- Search Result Card for States & Collections ---
const CategoryCard: React.FC<{
  item: State | Collection;
  type: "state" | "collection";
}> = ({ item, type }) => {
  const getIcon = () => {
    if (type === "state") return <MapPin size={18} className="text-gray-500" />;
    return <Layers size={18} className="text-gray-500" />;
  };
  const href = `/${type}s/${item.name.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <Link
      to={href}
      className="group flex flex-col bg-white border border-gray-200/60 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1"
    >
      <div className="aspect-[4/3] bg-gray-50 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex-grow p-4 flex justify-between items-center">
        <h3 className="font-semibold text-gray-800">{item.name}</h3>
        {getIcon()}
      </div>
    </Link>
  );
};

// --- Main Search Overlay Component ---
interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [allStates, setAllStates] = useState<State[]>([]);
  const [allCollections, setAllCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      const [productsRes, statesRes, collectionsRes] = await Promise.all([
        supabase
          .from("products")
          .select("id, name, image, price, affiliate_link"),
        supabase.from("states").select("id, name, image"),
        supabase.from("collections").select("id, name, image"),
      ]);
      if (productsRes.data) setAllProducts(productsRes.data);
      if (statesRes.data) setAllStates(statesRes.data);
      if (collectionsRes.data) setAllCollections(collectionsRes.data);
      setLoading(false);
    };
    fetchAllData();
  }, []);

  useEffect(() => {
    if (isOpen) {
      setSearchTerm("");
      setTimeout(() => searchInputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const rankedResults = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();
    if (!query) return [];

    const products = allProducts
      .filter((p) => p.name.toLowerCase().includes(query))
      .slice(0, 12);
    const states = allStates
      .filter((s) => s.name.toLowerCase().includes(query))
      .slice(0, 6);
    const collections = allCollections
      .filter((c) => c.name.toLowerCase().includes(query))
      .slice(0, 6);

    let rank = { products: 1, states: 2, collections: 3 };
    if (allStates.some((s) => s.name.toLowerCase() === query)) {
      rank = { states: 1, products: 2, collections: 3 };
    } else if (allCollections.some((c) => c.name.toLowerCase() === query)) {
      rank = { collections: 1, products: 2, states: 3 };
    }

    const sections = [];
    if (products.length > 0)
      sections.push({
        rank: rank.products,
        title: "Products",
        data: products,
        type: "product" as const,
      });
    if (states.length > 0)
      sections.push({
        rank: rank.states,
        title: "States",
        data: states,
        type: "state" as const,
      });
    if (collections.length > 0)
      sections.push({
        rank: rank.collections,
        title: "Collections",
        data: collections,
        type: "collection" as const,
      });

    return sections.sort((a, b) => a.rank - b.rank);
  }, [searchTerm, allProducts, allStates, allCollections]);

  const hasResults = rankedResults.length > 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white/90 backdrop-blur-md animate-fade-in">
      <div className="flex justify-end p-4 md:p-6">
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X size={24} />
        </button>
      </div>
      <div className="flex-shrink-0 px-4 md:px-8 lg:px-16 animate-slide-in-up">
        <div className="relative w-full max-w-2xl mx-auto">
          <div className="group flex items-center bg-white border border-gray-200 rounded-full px-2 py-2 shadow-sm focus-within:ring-2 focus-within:ring-slate-950 transition-all">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search for products, collections, or states..."
              className="w-full bg-transparent text-gray-800 placeholder-gray-500 pl-4 pr-2 focus:outline-none text-base md:text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="button"
              className="flex-shrink-0 bg-slate-950 text-white rounded-full p-3"
            >
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto mt-8 p-4 md:p-8 lg:p-16">
        <div className="max-w-7xl mx-auto">
          {searchTerm.length > 0 && !loading && hasResults && (
            <div className="space-y-12">
              {rankedResults.map((section) => (
                <section key={section.title}>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    {section.title}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
                    {section.data.map((item: SearchItem) => {
                      if (section.type === "product") {
                        // TypeScript knows 'item' is a Product here
                        const productItem = item as Product;
                        return (
                          <ProductCard
                            key={`product-${productItem.id}`}
                            id={productItem.id}
                            name={productItem.name}
                            image={productItem.image}
                            price={productItem.price?.toString()}
                            affiliateLink={productItem.affiliate_link}
                          />
                        );
                      }
                      // TypeScript knows 'item' is a State or Collection here
                      return (
                        <CategoryCard
                          key={`${section.type}-${item.id}`}
                          item={item as State | Collection}
                          type={section.type}
                        />
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          )}
          {searchTerm.length > 0 && !loading && !hasResults && (
            <div className="text-center py-16 text-gray-600">
              <p className="text-xl font-semibold mb-2">
                No results found for "{searchTerm}"
              </p>
            </div>
          )}
          {searchTerm.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              <h2 className="text-2xl font-serif font-semibold text-gray-800">
                Find your next treasure
              </h2>
              <p className="mt-2">
                Discover authentic Indian handicrafts and antiques by searching
                above.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
