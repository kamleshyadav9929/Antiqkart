import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { Search } from "lucide-react";

interface HeroProps {
  onSearchClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onSearchClick }) => {
  return (
    <section className="pt-16 md:pt-20 pb-12 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold leading-tight">
            India’s Treasures, Curated For You
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
            Handpicked antiques and handcrafted goods from across India—shop
            state-wise or explore exclusive collections.
          </p>
        </div>

        <div className="mt-8 max-w-xl mx-auto">
          <button
            onClick={onSearchClick}
            className="group flex items-center bg-white border border-gray-200 rounded-full px-2 py-2 shadow-sm w-full transition-all focus:outline-none focus:ring-2 focus:ring-slate-800"
          >
            <div className="w-full text-gray-500 text-left pl-4 pr-2 text-sm sm:text-base">
              Search for 'Madhubani Painting' or 'Pashmina'...
            </div>
            <div
              className="flex-shrink-0 bg-slate-800 text-white rounded-full p-3"
              aria-label="Open search"
            >
              <Search size={20} />
            </div>
          </button>
        </div>

        <div className="mt-8 flex gap-3 justify-center">
          {/* This button now links directly to the /shop page */}
          <Link
            to="/shop"
            className="inline-block px-6 py-3 rounded-full bg-slate-800 text-white font-medium border-zinc-800 border-2 hover:bg-slate-700 transition-colors"
          >
            Shop Now
          </Link>
          <Link
            to="/states"
            className="inline-block px-6 py-3 rounded-full border-2 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white transition-colors"
          >
            Explore States
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
