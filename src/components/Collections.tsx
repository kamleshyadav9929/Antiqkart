import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

interface Collection {
  id: string;
  name: string;
  image: string;
}

interface CollectionsProps {
  showAll?: boolean; // New prop to control how many items to show
}

const Collections: React.FC<CollectionsProps> = ({ showAll = false }) => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      setLoading(true);
      let query = supabase.from("collections").select("id, name, image");

      // If not showing all, limit to 8 for the homepage preview
      if (!showAll) {
        query = query.limit(8);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching collections:", error.message);
      } else {
        setCollections(data || []);
      }
      setLoading(false);
    };

    fetchCollections();
  }, [showAll]);

  // Sliced lists for homepage layout
  const mobileCollections = showAll ? collections : collections.slice(0, 6); // 3 rows of 2
  const desktopCollections = showAll ? collections : collections.slice(0, 8); // 2 rows of 4

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
        {!showAll && ( // Only show "See All" on the homepage version
          <Link
            to="/collections"
            className="text-sm font-medium text-gray-600 hover:text-black transition"
          >
            See All →
          </Link>
        )}
      </div>

      {/* Mobile Grid (3 rows) */}
      <div className="grid grid-cols-2 gap-6 md:hidden">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : mobileCollections.map((col) => (
              <CollectionCard key={col.id} collection={col} />
            ))}
      </div>

      {/* Desktop Grid (2 rows) */}
      <div className="hidden md:grid md:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : desktopCollections.map((col) => (
              <CollectionCard key={col.id} collection={col} />
            ))}
      </div>
    </section>
  );
};

export default Collections;
