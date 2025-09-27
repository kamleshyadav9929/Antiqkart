import React, { useEffect, useState, useMemo, useRef } from "react";
import { supabase } from "../lib/supabaseClient";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { SlidersHorizontal, X, ChevronDown, Check, Search } from "lucide-react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { motion, AnimatePresence } from "framer-motion";

// Interface Definitions
interface Product {
  id: string;
  name: string;
  image: string;
  price?: number;
  affiliate_link: string;
  collection_id: string;
  state_id: string;
  rating?: number;
  popularity?: number;
}

interface Collection {
  id: string;
  name: string;
}

interface State {
  id: string;
  name: string;
  state_id: string;
}

interface Festival {
  id: number;
  name: string;
}

const sortOptions = [
  { value: "popularity", label: "Popularity" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

const ShopPage = () => {
  // State variables
  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [festivalProductIds, setFestivalProductIds] = useState<
    Record<number, string[]>
  >({});
  const [loading, setLoading] = useState(true);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedFestivals, setSelectedFestivals] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sortBy, setSortBy] = useState("popularity");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  // Fetch all initial data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [
        productRes,
        collectionRes,
        stateRes,
        festivalRes,
        festivalProductsRes,
      ] = await Promise.all([
        supabase.from("products").select("*"),
        supabase.from("collections").select("id, name").order("name"),
        supabase.from("states").select("id, name, state_id").order("name"),
        supabase.from("festivals").select("id, name"),
        supabase.from("festival_products").select("festival_id, product_id"),
      ]);

      if (productRes.data) setProducts(productRes.data as Product[]);
      if (collectionRes.data) setCollections(collectionRes.data);
      if (stateRes.data) setStates(stateRes.data as State[]);
      if (festivalRes.data) setFestivals(festivalRes.data);
      if (festivalProductsRes.data) {
        const mapping = festivalProductsRes.data.reduce((acc, item) => {
          if (!acc[item.festival_id]) {
            acc[item.festival_id] = [];
          }
          acc[item.festival_id].push(item.product_id);
          return acc;
        }, {} as Record<number, string[]>);
        setFestivalProductIds(mapping);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products]
      .filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(
        (product) =>
          (product.price || 0) >= priceRange[0] &&
          (product.price || 0) <= priceRange[1]
      );

    if (selectedCollections.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCollections.includes(p.collection_id)
      );
    }

    if (selectedStates.length > 0) {
      filtered = filtered.filter((p) => selectedStates.includes(p.state_id));
    }

    if (selectedFestivals.length > 0) {
      const festiveIds = new Set(
        selectedFestivals.flatMap((id) => festivalProductIds[id] || [])
      );
      filtered = filtered.filter((p) => festiveIds.has(p.id));
    }

    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-desc":
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "popularity":
        filtered.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [
    products,
    searchTerm,
    selectedCollections,
    selectedStates,
    selectedFestivals,
    festivalProductIds,
    priceRange,
    sortBy,
  ]);

  const handleFestivalChange = (festivalId: number) => {
    setSelectedFestivals((prev) =>
      prev.includes(festivalId)
        ? prev.filter((id) => id !== festivalId)
        : [...prev, festivalId]
    );
  };

  const handleCollectionChange = (collectionId: string) => {
    setSelectedCollections((prev) =>
      prev.includes(collectionId)
        ? prev.filter((id) => id !== collectionId)
        : [...prev, collectionId]
    );
  };

  const handleStateChange = (stateId: string) => {
    setSelectedStates((prev) =>
      prev.includes(stateId)
        ? prev.filter((id) => id !== stateId)
        : [...prev, stateId]
    );
  };

  const clearFilters = () => {
    setSelectedCollections([]);
    setSelectedStates([]);
    setSelectedFestivals([]);
    setPriceRange([0, 10000]);
    setSearchTerm("");
  };

  const FilterContent = () => (
    <>
      <FilterSection title="Price Range">
        <div className="px-1 pt-2">
          <Slider
            range
            min={0}
            max={10000}
            step={500}
            value={priceRange}
            onChange={(value) => setPriceRange(value as [number, number])}
            trackStyle={[{ backgroundColor: "#020617" }]}
            handleStyle={[
              { borderColor: "#020617", backgroundColor: "#020617" },
              { borderColor: "#020617", backgroundColor: "#020617" },
            ]}
          />
          <div className="flex justify-between items-center mt-3 text-sm">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
              className="w-20 p-1 border rounded"
            />
            <span>-</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
              className="w-20 p-1 border rounded"
            />
          </div>
        </div>
      </FilterSection>
      <FilterSection title="Festivals">
        {festivals.map((f) => (
          <Checkbox
            key={f.id}
            id={`festival-${f.id}`}
            label={f.name}
            checked={selectedFestivals.includes(f.id)}
            onChange={() => handleFestivalChange(f.id)}
          />
        ))}
      </FilterSection>
      <FilterSection title="Collections">
        {collections.map((c) => (
          <Checkbox
            key={c.id}
            id={`cat-${c.id}`}
            label={c.name}
            checked={selectedCollections.includes(c.id)}
            onChange={() => handleCollectionChange(c.id)}
          />
        ))}
      </FilterSection>
      <FilterSection title="State">
        {states.map((s) => (
          <Checkbox
            key={s.id}
            id={`state-${s.state_id}`}
            label={s.name}
            checked={selectedStates.includes(s.state_id)}
            onChange={() => handleStateChange(s.state_id)}
          />
        ))}
      </FilterSection>
    </>
  );

  return (
    <>
      <Navbar />
      <div className="bg-gray-50">
        <Layout>
          <div className="py-8">
            <h1 className="text-4xl font-serif font-bold text-center mb-8">
              Shop All Products
            </h1>
            <div className="flex items-start">
              <aside className="hidden md:block w-64 lg:w-72 pr-8">
                <div className="sticky top-24">
                  <h2 className="text-lg font-bold mb-4">Filters</h2>
                  <FilterContent />
                  <button
                    onClick={clearFilters}
                    className="w-full mt-4 text-sm font-bold py-3 px-4 rounded-md border"
                  >
                    Clear Filters
                  </button>
                </div>
              </aside>

              <main className="w-full">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 p-4 bg-white rounded-lg shadow-sm gap-4">
                  <div className="relative w-full md:max-w-xs">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-800 text-sm"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Search size={18} />
                    </div>
                  </div>
                  <div className="flex items-center gap-x-4 w-full md:w-auto justify-between">
                    <p className="text-sm text-gray-600">
                      <span className="font-bold text-gray-900">
                        {filteredAndSortedProducts.length}
                      </span>{" "}
                      products
                    </p>
                    <div className="relative" ref={sortDropdownRef}>
                      <button
                        onClick={() => setIsSortOpen(!isSortOpen)}
                        className="flex items-center gap-x-2 text-sm font-medium text-gray-700"
                      >
                        Sort by:{" "}
                        <span className="font-semibold text-gray-900">
                          {
                            sortOptions.find((opt) => opt.value === sortBy)
                              ?.label
                          }
                        </span>
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${
                            isSortOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {isSortOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10"
                          >
                            <ul>
                              {sortOptions.map((option) => (
                                <li key={option.value}>
                                  <button
                                    onClick={() => {
                                      setSortBy(option.value);
                                      setIsSortOpen(false);
                                    }}
                                    className="w-full text-left flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    {option.label}
                                    {sortBy === option.value && (
                                      <Check size={16} />
                                    )}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <button
                      className="md:hidden flex items-center gap-x-2 text-sm font-semibold p-2 px-3 border rounded-md bg-white"
                      onClick={() => setIsFilterOpen(true)}
                    >
                      <SlidersHorizontal size={16} />
                    </button>
                  </div>
                </div>

                {loading ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <SkeletonCard key={i} />
                    ))}
                  </div>
                ) : (
                  <motion.div
                    layout
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-2 sm:gap-x-4 gap-y-4"
                  >
                    <AnimatePresence>
                      {filteredAndSortedProducts.map((product: Product) => (
                        <motion.div
                          key={product.id}
                          className="h-full"
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ProductCard
                            id={product.id}
                            name={product.name}
                            image={product.image}
                            price={product.price?.toString()}
                            rating={product.rating}
                            affiliateLink={product.affiliate_link}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}
              </main>
            </div>
          </div>
        </Layout>
      </div>
      <div
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${
          isFilterOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsFilterOpen(false)}
      >
        <div
          className={`absolute inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-xl transform transition-transform duration-300 ${
            isFilterOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-bold">Filters</h2>
              <button onClick={() => setIsFilterOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="flex-grow p-4 overflow-y-auto">
              <FilterContent />
            </div>
            <div className="p-4 border-t flex gap-x-4">
              <button
                onClick={clearFilters}
                className="w-1/2 text-sm font-bold py-3 px-4 rounded-md border"
              >
                Clear
              </button>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="w-1/2 text-sm font-bold text-white bg-slate-950 py-3 px-4 rounded-md"
              >
                Show Results
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
const FilterSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="py-4 border-b border-gray-200">
    <h3 className="font-semibold text-gray-800">{title}</h3>
    <div className="mt-2 space-y-2">{children}</div>
  </div>
);

const Checkbox = ({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) => (
  <label
    htmlFor={id}
    className="flex items-center text-sm text-gray-600 cursor-pointer"
  >
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 rounded border-gray-300 text-slate-600 focus:ring-slate-500"
    />
    <span className="ml-3">{label}</span>
  </label>
);
export default ShopPage;
