import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { ArrowRight } from "lucide-react";

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
        console.error("Collections fetch karne mein error:", error.message);
      } else {
        setCollections(data || []);
      }
      setLoading(false);
    };

    fetchCollections();
  }, [showAll]);

  const CollectionCard = ({ collection }: { collection: Collection }) => {
    const cardRef = useRef<HTMLAnchorElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const midCardX = rect.width / 2;
      const midCardY = rect.height / 2;

      const tiltX = ((x - midCardX) / midCardX) * 8;
      const tiltY = ((y - midCardY) / midCardY) * -8;

      cardRef.current.style.setProperty("--tilt-x", `${tiltX}deg`);
      cardRef.current.style.setProperty("--tilt-y", `${tiltY}deg`);
      cardRef.current.style.setProperty("--spotlight-x", `${x}px`);
      cardRef.current.style.setProperty("--spotlight-y", `${y}px`);
    };

    const handleMouseLeave = () => {
      if (!cardRef.current) return;
      cardRef.current.style.setProperty("--tilt-x", "0deg");
      cardRef.current.style.setProperty("--tilt-y", "0deg");
    };

    return (
      <Link
        ref={cardRef}
        to={`/collections/${collection.name
          .toLowerCase()
          .replace(/\s+/g, "-")}`}
        className="group block relative h-64 sm:h-72 md:h-80 w-full rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ease-out will-change-transform hover:shadow-rose-500/20"
        style={{
          transformStyle: "preserve-3d",
          transform:
            "perspective(1200px) rotateY(var(--tilt-x, 0)) rotateX(var(--tilt-y, 0))",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          <div className="relative h-full w-full">
            <img
              src={collection.image}
              alt={collection.name}
              className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-125 group-hover:rotate-2"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 via-transparent to-purple-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          </div>
        </div>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute top-4 left-4 w-2 h-2 bg-rose-400 rounded-full animate-bounce delay-100"></div>
          <div className="absolute top-8 right-6 w-1.5 h-1.5 bg-pink-300 rounded-full animate-bounce delay-300"></div>
          <div className="absolute bottom-12 left-8 w-1 h-1 bg-purple-400 rounded-full animate-bounce delay-500"></div>
          <div className="absolute bottom-16 right-4 w-1.5 h-1.5 bg-rose-300 rounded-full animate-bounce delay-700"></div>
        </div>
        <div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), 
                          rgba(255, 182, 193, 0.3) 0%, 
                          rgba(255, 105, 180, 0.1) 30%, 
                          transparent 60%)`,
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            <h3 className="text-white font-bold text-lg sm:text-xl mb-2 group-hover:text-rose-300 transition-colors duration-300">
              {collection.name}
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-rose-300 text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                <span className="font-medium">Explore Collection</span>
                <ArrowRight
                  size={16}
                  className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                />
              </div>
              <div className="w-8 h-8 bg-rose-500/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300">
                <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-rose-500/30 transition-colors duration-500"></div>
        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-rose-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-400"></div>
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-pink-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-600"></div>
      </Link>
    );
  };

  const SkeletonCard = () => (
    <div className="animate-pulse">
      <div className="w-full h-48 md:h-56 bg-gray-200 rounded-2xl"></div>
      <div className="h-5 mt-4 bg-gray-200 rounded w-3/4"></div>
    </div>
  );

  return (
    <div className="relative z-10">
      <div className="relative text-center mb-16 md:mb-20">
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
        <div className="flex overflow-x-auto space-x-4 sm:space-x-6 pb-6 -mx-4 px-4 scrollbar-hide">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-48 sm:w-56 md:w-64 lg:w-72"
                >
                  <SkeletonCard />
                </div>
              ))
            : collections
                .slice(0, showAll ? collections.length : 12)
                .map((collection) => (
                  <div
                    key={collection.id}
                    className="flex-shrink-0 w-48 sm:w-56 md:w-64 lg:w-72"
                  >
                    <CollectionCard collection={collection} />
                  </div>
                ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;
