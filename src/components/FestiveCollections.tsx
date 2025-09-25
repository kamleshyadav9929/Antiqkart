import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { ArrowRight } from "lucide-react";

interface Festival {
  id: number;
  name: string;
  slug: string;
  banner_image: string;
}

const FestivalCard = ({ festival }: { festival: Festival }) => (
  <Link
    to={`/festive-specials/${festival.slug}`}
    className="group block w-72 flex-shrink-0"
  >
    <div className="relative rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="h-48">
        <img
          src={festival.banner_image}
          alt={festival.name}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-4">
        <h3 className="text-white text-lg font-semibold">{festival.name}</h3>
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
      <div className="flex justify-between items-center mb-10">
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-text-main">
            Festive Specials
          </h2>
          <p className="mt-2 text-muted max-w-2xl">
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
        <div className="flex overflow-x-auto space-x-6 pb-4 -mx-4 px-4 scrollbar-hide">
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
