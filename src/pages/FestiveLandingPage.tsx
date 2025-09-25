import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import { supabase } from "../lib/supabaseClient";

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
        .order("start_date", { ascending: false }); // Show newest festivals first

      if (error) {
        console.error("Error fetching festivals:", error.message);
      } else {
        setFestivals(data || []);
      }
      setLoading(false);
    };
    fetchFestivals();
  }, []);

  const FestivalCard = ({ festival }: { festival: Festival }) => (
    <Link
      to={`/festive-specials/${festival.slug}`}
      className="group block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="relative">
        <img
          src={festival.banner_image}
          alt={festival.name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h2 className="text-3xl font-serif font-bold text-white text-center">
            {festival.name}
          </h2>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />
      <Layout>
        <div className="py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">
            Festive Specials
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our curated collections for every celebration.
          </p>
        </div>
        <div className="pb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-64 bg-gray-200 rounded-xl animate-pulse"
                ></div>
              ))
            : festivals.map((festival) => (
                <FestivalCard key={festival.id} festival={festival} />
              ))}
        </div>
      </Layout>
      <Footer />
    </div>
  );
};

export default FestiveLandingPage;
