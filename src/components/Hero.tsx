import React from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

interface HeroProps {
  onSearchClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onSearchClick }) => {
  return (
    <section className="relative z-10 pt-16 md:pt-20 pb-12 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold leading-tight text-text">
            India’s Treasures, Curated For You
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted max-w-2xl mx-auto">
            Handpicked antiques and handcrafted goods from across India—shop
            state-wise or explore exclusive collections.
          </p>
        </div>

        {/* Search button to open the overlay */}
        <div className="mt-8 max-w-xl mx-auto">
          <button
            onClick={onSearchClick}
            className="group flex w-full items-center justify-between rounded-full border border-gray-300 bg-white pl-5 pr-2 py-2 text-left text-muted shadow-sm transition-all hover:border-gray-400"
          >
            <span className="truncate text-sm sm:text-base">
              <span className="hidden sm:inline">
                Search for products, collections, or states...
              </span>
              <span className="sm:hidden">
                Search states,collections or products...
              </span>
            </span>
            <div className="flex-shrink-0 p-2 bg-slate-800 rounded-full">
              <Search size={20} className="text-white" />
            </div>
          </button>
        </div>

        <div className="mt-8 flex gap-3 justify-center">
          {/* Original Action Buttons */}
          <Link
            to="/shop"
            className="inline-block px-6 py-3 rounded-full bg-slate-800 text-white font-medium hover:bg-slate-700 transition-colors"
          >
            Shop Now
          </Link>
          <Link
            to="/states"
            className="inline-block px-6 py-3 rounded-full border-2 border-slate-800 text-slate-800 font-medium hover:bg-slate-800 hover:text-white transition-colors"
          >
            Explore States
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
