import React from "react";
import { supabase } from "../lib/supabaseClient";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import {
  SlidersHorizontal,
  X,
  Search,
  ChevronDown,
  Layers,
  Check,
  ShoppingBag,
} from "lucide-react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "../context/cart-context";

interface Collection {
  id: string;
  name: string;
  image: string;
}

// FIX: Corrected the State interface
interface State {
  id: string;
  name: string;
}

const sortOptions = [
  { value: "latest", label: "Latest Arrivals" },
  { value: "popularity", label: "Popularity" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

const CustomDropdown = ({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (value: string) => void;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const selectedLabel = sortOptions.find(
    (opt) => opt.value === selected
  )?.label;

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      )
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full sm:w-auto" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full min-w-max sm:w-48 border border-gray-300 rounded-md py-2 px-3 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-800 transition-colors hover:bg-gray-50"
      >
        <span>{selectedLabel}</span>
        <ChevronDown
          size={16}
          className={`transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 top-full right-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
          >
            {sortOptions.map((option) => (
              <li
                key={option.value}
                onClick={() => {
                  onSelect(option.value);
                  setIsOpen(false);
                }}
                className="flex justify-between items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                {option.label}
                {selected === option.value && (
                  <Check size={16} className="text-slate-800" />
                )}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

const ShopPage = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [collections, setCollections] = React.useState<Collection[]>([]);
  const [states, setStates] = React.useState<State[]>([]);
  const [loading, setLoading] = React.useState(true);

  const [selectedCollections, setSelectedCollections] = React.useState<
    string[]
  >([]);
  const [selectedStates, setSelectedStates] = React.useState<string[]>([]);
  const [priceRange, setPriceRange] = React.useState<[number, number]>([
    0, 10000,
  ]);
  const [tempPriceRange, setTempPriceRange] = React.useState<[number, number]>([
    0, 10000,
  ]);
  const [sortBy, setSortBy] = React.useState("latest");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [showAllStates, setShowAllStates] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [productRes, collectionRes, stateRes] = await Promise.all([
        supabase.from("products").select("*, collections(name)"),
        supabase.from("collections").select("id, name, image").order("name"),
        // FIX: Corrected the query to fetch only necessary fields
        supabase.from("states").select("id, name").order("name"),
      ]);

      if (productRes.data) setProducts(productRes.data as Product[]);
      if (collectionRes.data) setCollections(collectionRes.data);
      if (stateRes.data) setStates(stateRes.data as State[]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredAndSortedProducts = React.useMemo(() => {
    let filtered = [...products]
      .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(
        (p) =>
          (p.price || 0) >= priceRange[0] && (p.price || 0) <= priceRange[1]
      );
    if (selectedCollections.length > 0)
      filtered = filtered.filter(
        (p) => p.collection_id && selectedCollections.includes(p.collection_id)
      );
    if (selectedStates.length > 0)
      filtered = filtered.filter(
        (p) => p.state_id && selectedStates.includes(p.state_id)
      );

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
      default: // "latest"
        filtered.sort(
          (a, b) =>
            new Date(b.created_at || 0).getTime() -
            new Date(a.created_at || 0).getTime()
        );
        break;
    }
    return filtered;
  }, [
    products,
    searchTerm,
    selectedCollections,
    selectedStates,
    priceRange,
    sortBy,
  ]);

  const clearFilters = () => {
    setSelectedCollections([]);
    setSelectedStates([]);
    setPriceRange([0, 10000]);
    setTempPriceRange([0, 10000]);
    setSearchTerm("");
    setSortBy("latest");
  };

  const toggleSelection = (
    id: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const FilterContent = () => (
    <>
      <div className="md:hidden">
        <FilterSection title="Sort By">
          <CustomDropdown selected={sortBy} onSelect={setSortBy} />
        </FilterSection>
      </div>
      <FilterSection title="Price Range (₹)">
        <Slider
          range
          min={0}
          max={10000}
          step={100}
          value={tempPriceRange}
          onChange={(val) => setTempPriceRange(val as [number, number])}
          onAfterChange={() => setPriceRange(tempPriceRange)}
          className="mt-4"
          trackStyle={[{ backgroundColor: "#fbbf24" }]}
          handleStyle={[{ borderColor: "#fbbf24" }, { borderColor: "#fbbf24" }]}
          railStyle={{ backgroundColor: "#e5e7eb" }}
        />
        <div className="flex justify-between text-sm mt-2 font-medium">
          <span>₹{tempPriceRange[0]}</span>
          <span>₹{tempPriceRange[1]}</span>
        </div>
      </FilterSection>
      <FilterSection title="Collections">
        {collections.map((c) => (
          <Checkbox
            key={c.id}
            id={`col-${c.id}`}
            label={c.name}
            checked={selectedCollections.includes(c.id)}
            onChange={() => toggleSelection(c.id, setSelectedCollections)}
          />
        ))}
      </FilterSection>
      <FilterSection title="States">
        {(showAllStates ? states : states.slice(0, 10)).map((s) => (
          // FIX: Corrected to use s.id for filtering logic
          <Checkbox
            key={s.id}
            id={`state-${s.id}`}
            label={s.name}
            checked={selectedStates.includes(s.id)}
            onChange={() => toggleSelection(s.id, setSelectedStates)}
          />
        ))}
        {states.length > 10 && (
          <button
            onClick={() => setShowAllStates(!showAllStates)}
            className="text-sm text-blue-600 hover:underline mt-2 flex items-center gap-x-1"
          >
            {showAllStates ? "Show Less" : `See All ${states.length} States`}{" "}
            <ChevronDown
              size={14}
              className={`transition-transform ${
                showAllStates ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      </FilterSection>
    </>
  );

  return (
    <>
      <Navbar />
      <div className="bg-gray-50">
        <Layout>
          <div className="py-8">
            <header className="py-8 text-center">
              <div className="relative text-center mb-16 md:mb-20">
                <div className="relative inline-block">
                  <div className="absolute -inset-4 bg-gradient-to-r from-sky-500/10 to-cyan-500/10 rounded-3xl blur-xl"></div>
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-6 border border-sky-200/50 shadow-xl">
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-serif font-bold text-slate-900 leading-tight">
                      <span className="relative inline-block mr-2 sm:mr-3">
                        Discover our
                        <div className="absolute -bottom-1 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-sky-400 to-cyan-500 rounded-full animate-shimmer"></div>
                      </span>
                      <span className="text-sky-600 relative inline-block">
                        treasures
                        <div className="absolute -top-2 -right-3 text-cyan-500 text-lg sm:text-xl animate-bounce">
                          ✨
                        </div>
                        <div className="absolute -bottom-1 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-cyan-400 to-sky-500 rounded-full animate-glow"></div>
                      </span>
                    </h2>
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-sky-500 text-2xl animate-pulse">
                      📦
                    </div>
                  </div>
                </div>
              </div>
            </header>
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-semibold text-slate-800 mb-6 flex items-center gap-x-2">
                <Layers size={24} className="text-rose-500" /> Curated
                Collections
              </h2>
              <div className="flex overflow-x-auto space-x-4 pb-4 -mx-4 px-4 scrollbar-hide">
                {collections.slice(0, 8).map((c) => (
                  <Link
                    key={c.id}
                    to={`/collections/${c.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="group flex-shrink-0 w-36 sm:w-48"
                  >
                    <div className="aspect-square bg-slate-100 rounded-xl overflow-hidden shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                      <img
                        src={c.image}
                        alt={c.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="mt-2 text-sm text-center font-semibold text-slate-700 group-hover:text-rose-600 transition-colors truncate">
                      {c.name}
                    </h3>
                  </Link>
                ))}
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              <aside className="hidden md:block md:col-span-1">
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

              <main className="md:col-span-4">
                <div className="flex flex-row justify-between items-center bg-white rounded-lg shadow-md gap-2 p-2 sm:p-4 sm:gap-4 mb-4">
                  <div className="relative flex-grow">
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
                  <div className="hidden sm:block">
                    <CustomDropdown selected={sortBy} onSelect={setSortBy} />
                  </div>
                  <button
                    className="md:hidden flex-shrink-0 p-2.5 border rounded-full bg-white shadow-sm"
                    onClick={() => setIsFilterOpen(true)}
                  >
                    <SlidersHorizontal size={16} />
                  </button>
                </div>

                <div>
                  {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <SkeletonCard key={i} />
                      ))}
                    </div>
                  ) : filteredAndSortedProducts.length > 0 ? (
                    <motion.div
                      layout
                      // FIX: Reduced the gap for a tighter layout on small screens
                      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2"
                    >
                      <AnimatePresence>
                        {filteredAndSortedProducts.map((product) => (
                          <motion.div
                            key={product.id}
                            className="h-full"
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ProductCard product={product} />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  ) : (
                    <div className="text-center py-20 px-4">
                      <ShoppingBag
                        size={48}
                        className="mx-auto text-amber-400 mb-4"
                      />
                      <p className="text-lg font-semibold text-slate-700">
                        No matching treasures found...
                      </p>
                      <p className="text-slate-500 mt-2">
                        but awesome products are on their way! Please wait.
                      </p>
                    </div>
                  )}
                </div>
              </main>
            </div>
          </div>
        </Layout>
      </div>

      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setIsFilterOpen(false)}
            ></div>
            <motion.div
              className="absolute inset-y-0 right-0 w-4/5 max-w-sm bg-white shadow-xl flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
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
                  onClick={() => {
                    clearFilters();
                    setIsFilterOpen(false);
                  }}
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const FilterSection = ({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`py-4 border-b border-gray-200 last:border-b-0 ${
      className || ""
    }`}
  >
    <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
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
    className="flex items-center text-sm text-gray-700 cursor-pointer hover:text-slate-900 transition-colors"
  >
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 rounded border-gray-300 text-slate-600 focus:ring-slate-500 focus:ring-1"
    />
    <span className="ml-3">{label}</span>
  </label>
);

export default ShopPage;
