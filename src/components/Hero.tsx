import React from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

interface HeroProps {
  onSearchClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onSearchClick }) => {
  return (
    // DESIGN UPGRADE: Increased padding for more breathing room
    <section className="relative z-10 pt-20 md:pt-28 pb-16 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div>
          {/* DESIGN UPGRADE: Larger, more impactful heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold leading-tight text-[var(--text-primary)]">
            The Soul of Indian Craftsmanship
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Discover timeless antiques and handcrafted treasures from across
            India, curated for the discerning collector.
          </p>
        </div>

        <div className="mt-10 max-w-xl mx-auto">
          <button
            onClick={onSearchClick}
            className="group flex w-full items-center justify-between rounded-full border border-[var(--border-color)] bg-white/70 backdrop-blur-sm pl-6 pr-2 py-2 text-left text-[var(--text-secondary)] shadow-sm transition-all hover:border-gray-300"
          >
            <span className="truncate text-sm sm:text-base">
              Search for products, collections, or states...
            </span>
            <div className="flex-shrink-0 p-2.5 bg-slate-800 rounded-full">
              <Search size={20} className="text-white" />
            </div>
          </button>
        </div>

        {/* DESIGN UPGRADE: Refined call-to-action buttons */}
        <div className="mt-8 flex gap-4 justify-center">
          <Link
            to="/shop"
            className="inline-block px-8 py-3 rounded-full bg-[var(--accent-primary)] text-white font-medium hover:opacity-90 transition-opacity"
          >
            Explore Products
          </Link>
          <Link
            to="/states"
            className="inline-block px-8 py-3 rounded-full border-2 border-[var(--accent-primary)] text-[var(--accent-primary)] font-medium hover:bg-[var(--accent-primary)] hover:text-white transition-colors"
          >
            Shop by State
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
