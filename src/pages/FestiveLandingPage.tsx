import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
import { supabase } from "../lib/supabaseClient";
import { ArrowRight } from "lucide-react";

interface Festival {
  id: number;
  name: string;
  slug: string;
  banner_image: string;
}

const FestiveLandingPage = () => {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFestivals = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("festivals")
        .select("id, name, slug, banner_image")
        .order("start_date", { ascending: false });

      if (error) {
        console.error("Error fetching festivals:", error.message);
      } else {
        setFestivals(data || []);
      }
      setLoading(false);
    };
    fetchFestivals();
  }, []);

  // --- NEW MINIMAL FESTIVAL CARD ---
  const FestivalCard = ({ festival }: { festival: Festival }) => (
    <Link
      to={`/festive-specials/${festival.slug}`}
      className="group block rounded-xl overflow-hidden bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 border border-gray-200/80"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={festival.banner_image}
          alt={festival.name}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-serif font-semibold text-slate-800">
            {festival.name}
          </h2>
          <div className="bg-gray-100 group-hover:bg-slate-800 p-2 rounded-full transition-colors duration-300">
            <ArrowRight
              size={18}
              className="text-gray-500 group-hover:text-white transition-colors duration-300"
            />
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <Layout>
        <div className="py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-slate-900">
            Festive Collections
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Explore our curated collections for every celebration.
          </p>
        </div>
        <div className="pb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/3] bg-gray-200 rounded-xl"></div>
                  <div className="h-6 mt-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))
            : festivals.map((festival) => (
                <FestivalCard key={festival.id} festival={festival} />
              ))}
        </div>
      </Layout>
    </div>
  );
};

export default FestiveLandingPage;
