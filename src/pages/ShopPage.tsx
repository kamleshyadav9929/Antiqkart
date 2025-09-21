import React, { useEffect, useState, useMemo } from "react";
import { supabase } from "../lib/supabaseClient";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface Product {
  id: string;
  name: string;
  image: string;
  price?: number;
  affiliate_link: string;
  collection_id: string;
  state_id: string;
  popularity?: number; // Added for sorting
}

interface Collection {
  id: string;
  name: string;
}

interface State {
  id: string;
  name: string;
}

const sortOptions = [
  { value: "popularity", label: "Sort by: Popularity" },
  { value: "featured", label: "Sort by: Featured" },
  { value: "price-asc", label: "Sort by: Price: Low to High" },
  { value: "price-desc", label: "Sort by: Price: High to Low" },
];

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sortBy, setSortBy] = useState("popularity");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [productRes, collectionRes, stateRes] = await Promise.all([
        supabase.from("products").select("*"),
        supabase.from("collections").select("id, name").order("name"),
        supabase.from("states").select("id, name").order("name"),
      ]);

      if (productRes.data) setProducts(productRes.data as Product[]);
      if (collectionRes.data) setCollections(collectionRes.data);
      if (stateRes.data) setStates(stateRes.data);

      setLoading(false);
    };
    fetchData();
  }, []);

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
    setPriceRange([0, 10000]);
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products].filter((p) => {
      if (!p.price) return false;
      return p.price >= priceRange[0] && p.price <= priceRange[1];
    });

    if (selectedCollections.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCollections.includes(p.collection_id)
      );
    }
    if (selectedStates.length > 0) {
      filtered = filtered.filter((p) => selectedStates.includes(p.state_id));
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
      default: // "featured"
        break;
    }
    return filtered;
  }, [products, selectedCollections, selectedStates, priceRange, sortBy]);

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

  const FilterContent = () => (
    <>
      <div className="relative mb-4">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <ChevronDown size={16} />
        </div>
      </div>

      <FilterSection title="Price Range">
        <div className="px-2 pt-2">
          <Slider
            range
            min={0}
            max={10000}
            step={500}
            value={priceRange}
            onChange={(value) => setPriceRange(value as [number, number])}
            trackStyle={[{ backgroundColor: "#020617" }]}
            handleStyle={[
              { borderColor: "#020617" },
              { borderColor: "#020617" },
            ]}
          />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1] === 10000 ? "10000+" : priceRange[1]}</span>
          </div>
        </div>
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
            id={`state-${s.id}`}
            label={s.name}
            checked={selectedStates.includes(s.id)}
            onChange={() => handleStateChange(s.id)}
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
            <main className="w-full">
              <div className="flex justify-end mb-4">
                <button
                  className="flex items-center gap-x-2 text-sm font-semibold p-2 px-4 border rounded-md bg-white shadow-sm"
                  onClick={() => setIsFilterOpen(true)}
                >
                  <SlidersHorizontal size={16} />
                  Filters & Sort
                </button>
              </div>
              {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {filteredAndSortedProducts.map((product) => (
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
              )}
            </main>
          </div>
        </Layout>
      </div>
      <Footer />
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
              <h2 className="text-lg font-bold">Filters & Sort</h2>
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
    </>
  );
};

export default ShopPage;
