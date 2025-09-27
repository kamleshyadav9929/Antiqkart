import { useEffect, useState, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Search, ChevronDown } from "lucide-react";

interface Product {
  id: string;
  name: string;
  image: string;
  price?: number;
  affiliate_link: string;
  created_at: string;
  rating?: number;
}

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "alpha-asc", label: "Alphabetical (A-Z)" },
];

const CollectionPage = () => {
  const { collectionName: collectionSlug } = useParams<{
    collectionName: string;
  }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [collectionInfo, setCollectionInfo] = useState<{
    name: string;
    image: string | null;
  }>({ name: "", image: null });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchCollectionData = async () => {
      setLoading(true);
      const collectionName =
        collectionSlug
          ?.replace(/-/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()) || "";
      if (!collectionName) return;

      const { data: collectionData, error: collectionError } = await supabase
        .from("collections")
        .select("id, name, image")
        .eq("name", collectionName)
        .single();

      if (collectionError || !collectionData) {
        console.error("Error fetching collection info:", collectionError);
        setLoading(false);
        return;
      }
      setCollectionInfo({
        name: collectionData.name,
        image: collectionData.image,
      });

      const { data: productsData, error: productsError } = await supabase
        .from("products")
        .select("id, name, image, price, affiliate_link, created_at, rating")
        .eq("collection_id", collectionData.id);

      if (productsError) {
        console.error("Error fetching products:", productsError);
      }

      if (productsData) setProducts(productsData);
      setLoading(false);
    };
    fetchCollectionData();
  }, [collectionSlug]);

  const filteredAndSortedProducts = useMemo(() => {
    const result = [...products].filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-desc":
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "alpha-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        result.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
    }
    return result;
  }, [products, searchTerm, sortBy]);

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <Navbar />
      <main>
        <section className="relative h-64 md:h-80 bg-gray-200">
          {collectionInfo.image && (
            <img
              src={collectionInfo.image}
              alt={collectionInfo.name}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white text-center px-4">
              {collectionInfo.name}
            </h1>
          </div>
        </section>
        <Layout>
          <div className="flex justify-between items-center py-6 border-b border-gray-200">
            <p className="text-sm text-gray-600 hidden md:block">
              Showing{" "}
              <span className="font-semibold">
                {filteredAndSortedProducts.length}
              </span>{" "}
              products
            </p>
            <div className="flex items-center gap-x-4 w-full md:w-auto">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-800 text-sm"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Search size={18} />
                </div>
              </div>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-between w-56 border border-gray-300 rounded-md py-2 px-3 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-800 transition-colors hover:bg-gray-50"
                >
                  <span>
                    Sort by:{" "}
                    {sortOptions.find((opt) => opt.value === sortBy)?.label}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transform transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`absolute z-10 top-full right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-all duration-200 ease-out ${
                    isDropdownOpen
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <ul className="divide-y divide-gray-100">
                    {sortOptions.map((option) => (
                      <li
                        key={option.value}
                        onClick={() => handleSortChange(option.value)}
                        className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        {option.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="py-8">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {Array.from({ length: 10 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </div>
            ) : filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4">
                {filteredAndSortedProducts.map((product) => (
                  <div key={product.id} className="h-full">
                    <ProductCard
                      id={product.id}
                      name={product.name}
                      image={product.image}
                      price={product.price?.toString()}
                      rating={product.rating}
                      affiliateLink={product.affiliate_link}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h2 className="text-xl font-semibold text-gray-800">
                  No Products Found
                </h2>
              </div>
            )}
          </div>
        </Layout>
      </main>
      <Footer />
    </>
  );
};

export default CollectionPage;
