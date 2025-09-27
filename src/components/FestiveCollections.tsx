import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { ArrowRight, ArrowUpRight } from "lucide-react";

interface Festival {
  id: number;
  name: string;
  slug: string;
  banner_image: string;
}

const FestivalCard = ({ festival }: { festival: Festival }) => (
  <Link
    to={`/festive-specials/${festival.slug}`}
    className="group block w-72 flex-shrink-0 [perspective:1000px]"
  >
    <div className="relative block h-full w-full rounded-xl shadow-md transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(8deg)_rotateX(-8deg)]">
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <img
          src={festival.banner_image}
          alt={festival.name}
          className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      <div className="absolute bottom-0 w-full p-4 text-white">
        <div className="rounded-lg bg-black/30 p-4 backdrop-blur-md border border-white/20">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{festival.name}</h3>
            <ArrowUpRight
              size={20}
              className="transform transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </div>
        </div>
      </div>
    </div>
  </Link>
);

const SkeletonCard = () => (
  <div className="animate-pulse flex-shrink-0 w-72">
    <div className="w-full h-48 bg-gray-200 rounded-xl"></div>
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
        .limit(5); // Fetch the 5 most recent festivals

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
        <div className="flex overflow-x-auto space-x-6 pb-4 -mx-4 px-4 scrollbar-hide h-56">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
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
