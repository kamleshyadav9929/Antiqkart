import React from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

interface HeroProps {
  onSearchClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onSearchClick }) => {
  return (
    <section className="relative z-10 pt-20 md:pt-28 pb-16 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold leading-tight text-slate-900">
            The <span className="text-teal-700">Soul</span> of Indian{" "}
            <span className="text-teal-700">Craftsmanship</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Discover timeless antiques and handcrafted treasures from across
            India, curated for the discerning collector.
          </p>
        </div>

        <div className="mt-10 max-w-xl mx-auto">
          <button
            onClick={onSearchClick}
            className="group flex w-full items-center justify-between rounded-full border border-gray-300 bg-white/70 backdrop-blur-sm pl-6 pr-2 py-2 text-left text-gray-500 shadow-sm transition-all hover:border-gray-400"
          >
            <span className="truncate text-sm sm:text-base">
              Search for products, collections, or states...
            </span>
            <div className="flex-shrink-0 p-2.5 bg-slate-950 text-white rounded-full">
              <Search size={20} />
            </div>
          </button>
        </div>

        <div className="mt-8 flex flex-row gap-2 sm:gap-4 justify-center">
          <Link
            to="/shop"
            className="inline-block px-5 py-3 sm:px-8 rounded-full bg-slate-950 text-white font-medium hover:bg-slate-800 transition-opacity text-sm whitespace-nowrap"
          >
            Explore Products
          </Link>
          <Link
            to="/states"
            className="inline-block px-5 py-3 sm:px-8 rounded-full border-2 border-slate-950 text-slate-950 font-medium hover:bg-slate-950 hover:text-white transition-colors text-sm whitespace-nowrap"
          >
            Shop by State
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
