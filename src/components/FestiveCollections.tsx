import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { ArrowRight, Sparkles } from "lucide-react";

interface Festival {
  id: number;
  name: string;
  slug: string;
  banner_image: string;
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
    <h3 className="mt-3 text-sm font-semibold text-slate-800 group-hover:text-amber-600 truncate transition-colors">
      {festival.name}
    </h3>
  </Link>
);

const SkeletonCard = () => (
  <div className="animate-pulse flex-shrink-0 w-48 text-center">
    <div className="w-full h-48 bg-gray-200 rounded-2xl"></div>
    <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mt-3"></div>
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
        .select("id, name, slug, banner_image")
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
      <div className="relative text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
          Festive <span className="text-purple-500">Specials</span>
        </h2>
        <div className="absolute -top-3 -right-2 text-purple-400">
          <Sparkles size={32} className="opacity-80" />
        </div>
        <p className="mt-2 text-muted max-w-2xl mx-auto">
          Explore curated collections for every celebration.
        </p>
        <Link
          to="/festive-specials"
          className="mt-4 inline-flex md:hidden items-center gap-x-1.5 text-sm font-semibold text-slate-800 hover:text-purple-600 transition-colors"
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
