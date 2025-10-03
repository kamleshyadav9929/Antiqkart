import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

interface Collection {
  id: string;
  name: string;
  image: string;
}

interface CollectionsProps {
  showAll?: boolean;
}

const Collections: React.FC<CollectionsProps> = ({ showAll = false }) => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      setLoading(true);
      let query = supabase.from("collections").select("id, name, image");

      if (!showAll) {
        query = query.limit(8);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Collections fetch error:", error.message);
      } else {
        setCollections(data || []);
      }
      setLoading(false);
    };

    fetchCollections();
  }, [showAll]);

  const CollectionCard = ({ collection }: { collection: Collection }) => (
    <div className="flex-shrink-0 w-40 sm:w-56 text-center">
      <Link
        to={`/collections/${collection.name
          .toLowerCase()
          .replace(/\s+/g, "-")}`}
        className="group block"
      >
        <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
          <img
            src={collection.image}
            alt={collection.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <h3 className="mt-2 text-sm font-semibold text-slate-700 group-hover:text-rose-600 transition-colors truncate">
          {collection.name}
        </h3>
      </Link>
    </div>
  );

  const SkeletonCard = () => (
    <div className="flex-shrink-0 w-40 sm:w-56 animate-pulse">
      <div className="aspect-square bg-gray-200 rounded-xl"></div>
      <div className="h-4 mt-2 bg-gray-200 rounded w-3/4 mx-auto"></div>
    </div>
  );

  return (
    <div className="relative z-10">
      <div className="relative text-center mb-12 md:mb-16">
        <div className="relative inline-block">
          <div className="absolute -inset-4 bg-gradient-to-r from-rose-500/10 to-pink-500/10 rounded-3xl blur-xl"></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-6 border border-rose-200/50 shadow-xl">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-serif font-bold text-slate-900 leading-tight">
              <span className="relative inline-block mr-2 sm:mr-3">
                Handpicked
                <div className="absolute -bottom-1 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full animate-shimmer"></div>
              </span>
              <span className="text-rose-600 relative inline-block">
                Collections
                <div className="absolute -top-2 -right-3 text-pink-500 text-lg sm:text-xl animate-bounce">
                  💎
                </div>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full animate-glow"></div>
              </span>
            </h2>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-rose-500 text-2xl animate-pulse">
              🎨
            </div>
          </div>
        </div>
        <p className="mt-6 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed px-4">
          ✨ Expertly curated for the discerning collector.
        </p>
      </div>

      <div className="relative">
        <div className="flex overflow-x-auto space-x-4 pb-4 -mx-4 px-4 scrollbar-hide">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : collections.map((collection) => (
                <CollectionCard key={collection.id} collection={collection} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;
