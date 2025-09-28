import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { ArrowRight } from "lucide-react";

interface Festival {
  id: number;
  name: string;
  slug: string;
  banner_image: string; // This must match the column name in your Supabase table
}

const FestivalCard = ({ festival }: { festival: Festival }) => (
  <Link
    to={`/festive-specials/${festival.slug}`}
    className="group block w-48 flex-shrink-0 text-center"
  >
    <div className="relative block h-48 w-full rounded-2xl bg-white shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 overflow-hidden border border-gray-200/80">
      {festival.banner_image ? (
        <img
          src={festival.banner_image}
          alt={festival.name}
          className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      ) : (
        <div className="h-full w-full bg-gray-100 flex items-center justify-center">
          <span className="text-xs text-gray-400">No Image</span>
        </div>
      )}
    </div>
    <h3 className="mt-3 text-sm font-semibold text-gray-200 group-hover:text-white truncate transition-colors">
      {festival.name}
    </h3>
  </Link>
);

const SkeletonCard = () => (
  <div className="animate-pulse flex-shrink-0 w-48 text-center">
    <div className="w-full h-48 bg-gray-600/50 rounded-2xl"></div>
    <div className="h-4 bg-gray-600/50 rounded w-3/4 mx-auto mt-3"></div>
  </div>
);

const FestiveCollections = () => {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFestivals = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("festivals")
        .select("id, name, slug, banner_image") // Ensure this select query is correct
        .order("start_date", { ascending: false })
        .limit(5);

      if (error) {
        console.error("Error fetching festivals:", error.message);
      } else {
        setFestivals(data || []);
      }
      setLoading(false);
    };

    fetchFestivals();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-10 px-4 md:px-0">
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-text-main text-white">
            Festive Specials
          </h2>
          <p className="mt-2 text-gray-300 max-w-2xl">
            Explore curated collections for every celebration.
          </p>
        </div>
        <Link
          to="/festive-specials"
          className="hidden md:inline-flex items-center gap-x-2 text-center text-xs font-bold text-white bg-slate-950 py-2.5 px-4 rounded-md transition-colors duration-300 hover:bg-slate-800"
        >
          View All <ArrowRight size={14} />
        </Link>
      </div>

      <div className="relative">
        <div className="flex overflow-x-auto space-x-6 pb-4 -mx-4 px-4 scrollbar-hide h-60 items-start">
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : festivals.map((festival) => (
                <FestivalCard key={festival.id} festival={festival} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default FestiveCollections;
