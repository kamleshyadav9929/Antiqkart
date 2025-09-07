import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link to fix the error
import { supabase } from "../lib/supabaseClient";
import { ArrowRight } from "lucide-react";

interface Collection {
  id: string;
  name: string;
  image: string;
}

const Collections = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("collections")
        .select("id, name, image")
        .limit(8);

      if (error) {
        console.error("Error fetching collections:", error.message);
      } else {
        setCollections(data || []);
      }
      setLoading(false);
    };

    fetchCollections();
  }, []);

  // Define the CollectionCard component only ONCE
  const CollectionCard = ({ collection }: { collection: Collection }) => (
    <Link
      to={`/collections/${collection.name.toLowerCase().replace(/\s+/g, "-")}`}
      className="group relative block rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="h-48 md:h-56">
        <img
          src={collection.image}
          alt={collection.name}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
        <h3 className="text-white text-lg font-semibold transform transition-transform duration-300 group-hover:-translate-y-1">
          {collection.name}
        </h3>
      </div>
    </Link>
  );

  const SkeletonCard = () => (
    <div className="w-full h-48 md:h-56 bg-gray-200 rounded-2xl animate-pulse"></div>
  );

  return (
    <section className="py-16">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-gray-900">
          Curated Collections
        </h2>
        <Link
          to="/shop"
          className="text-sm font-medium text-gray-600 hover:text-black transition"
        >
          See All →
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : collections.map((col) => (
              <CollectionCard key={col.id} collection={col} />
            ))}
      </div>
    </section>
  );
};

export default Collections;
