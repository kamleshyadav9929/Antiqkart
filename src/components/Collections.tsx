import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { ArrowRight } from "lucide-react";

// Collection ka structure define karte hain
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

  const mobileCollections = showAll ? collections : collections.slice(0, 6);
  const desktopCollections = showAll ? collections : collections.slice(0, 8);

  // Yeh bilkul naya aur special Collection Card hai
  const CollectionCard = ({ collection }: { collection: Collection }) => {
    const cardRef = useRef<HTMLAnchorElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const midCardX = rect.width / 2;
      const midCardY = rect.height / 2;

      // Tilt effect ki intensity
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
        className="group block relative h-full w-full rounded-2xl bg-slate-900 shadow-xl transition-all duration-300 ease-out will-change-transform"
        style={{
          transformStyle: "preserve-3d",
          transform:
            "perspective(1000px) rotateY(var(--tilt-x, 0)) rotateX(var(--tilt-y, 0))",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Card ki Image */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <img
            src={collection.image}
            alt={collection.name}
            className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
        </div>

        {/* Spotlight Effect */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(350px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(255,255,255,0.15), transparent 40%)`,
          }}
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* Inner Border Effect */}
        <div className="absolute inset-0 rounded-2xl border-2 border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Card ka Content (Parallax Effect ke saath) */}
        <div
          className="absolute bottom-0 w-full p-4 md:p-6 text-white"
          style={{ transform: "translateZ(50px)" }}
        >
          <h3 className="text-lg md:text-xl font-bold">{collection.name}</h3>
          <div className="mt-2 flex items-center gap-x-2 text-sm opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <span>Explore Collection</span>
            <ArrowRight size={16} />
          </div>
        </div>
      </Link>
    );
  };

  // Loading ke time dikhane wala Skeleton Card
  const SkeletonCard = () => (
    <div className="animate-pulse">
      <div className="w-full h-48 md:h-56 bg-gray-200 rounded-2xl"></div>
      <div className="h-5 mt-4 bg-gray-200 rounded w-3/4"></div>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-text-main">
          Curated Collections
        </h2>
        {!showAll && (
          <Link
            to="/collections"
            className="text-center text-xs font-bold text-white bg-slate-950 py-2.5 px-4 rounded-md transition-colors duration-300 hover:bg-slate-800 inline-flex items-center gap-x-2"
          >
            See All <ArrowRight size={14} />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6 md:hidden">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : mobileCollections.map((col) => (
              <div key={col.id} className="h-48">
                <CollectionCard collection={col} />
              </div>
            ))}
      </div>

      <div className="hidden md:grid md:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : desktopCollections.map((col) => (
              <div key={col.id} className="h-56">
                <CollectionCard collection={col} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default Collections;
