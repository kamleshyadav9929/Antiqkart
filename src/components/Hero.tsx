import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const Hero = () => {
  // This function sends a global event that the Navbar will hear
  const handleSearchClick = () => {
    window.dispatchEvent(new CustomEvent("open-search-overlay"));
  };

  return (
    <section className="relative bg-gray-50 overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23a0aec0" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
        }}
      ></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center z-10">
        <motion.h1
          className="text-4xl lg:text-6xl font-serif font-extrabold leading-tight"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          <span className="text-slate-900">Discover the </span>
          <span className="text-amber-600">Soul</span>
          <span className="text-slate-900"> of Indian </span>
          <span className="text-amber-600">Artistry</span>
        </motion.h1>

        <motion.p
          className="mt-4 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
        >
          Your curated guide to authentic handicrafts, from the heart of every
          state.
        </motion.p>

        <motion.div
          className="mt-8 max-w-xl mx-auto w-full"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
        >
          <button
            onClick={handleSearchClick}
            className="group w-full flex items-center text-left bg-white border border-gray-200 rounded-full px-2 py-2 shadow-sm hover:ring-2 hover:ring-slate-800 transition-all"
          >
            <span className="flex-grow text-gray-500 pl-4 pr-2">
              Search for 'Madhubani Painting' or 'Pashmina'...
            </span>
            <span className="flex-shrink-0 bg-slate-800 text-white rounded-full p-3">
              <Search size={20} />
            </span>
          </button>
        </motion.div>

        <motion.div
          className="mt-6 flex flex-row items-center justify-center gap-3 sm:gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
        >
          <Link
            to="/shop"
            className="w-full sm:w-auto inline-block bg-slate-900 text-white font-semibold py-3 px-6 sm:px-8 rounded-full shadow-md hover:bg-slate-800 transition-transform hover:scale-105 text-sm sm:text-base"
          >
            Shop Now
          </Link>
          <Link
            to="/states"
            className="w-full sm:w-auto inline-block bg-white text-slate-800 font-semibold py-3 px-6 sm:px-8 rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition-colors text-sm sm:text-base"
          >
            Visit Your State
          </Link>
        </motion.div>
      </div>

      {/* --- NEW STATISTICS SECTION --- */}
      <motion.div
        className="relative max-w-5xl mx-auto px-4 pb-16"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.0, ease: "easeOut" }}
      >
        <div className="w-full bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            {/* Stat 1 */}
            <div className="text-center">
              <p className="text-3xl md:text-5xl font-extrabold text-indigo-600 relative inline-block">
                500+
                <span className="absolute -bottom-1 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full animate-glow"></span>
              </p>
              <p className="text-xs md:text-sm font-semibold text-slate-700 mt-2 uppercase">
                Unique Artisans
              </p>
            </div>
            {/* Stat 2 */}
            <div className="text-center">
              <p className="text-3xl md:text-5xl font-extrabold text-emerald-600 relative inline-block">
                20+
                <span className="absolute -bottom-1 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full animate-glow"></span>
              </p>
              <p className="text-xs md:text-sm font-semibold text-slate-700 mt-2 uppercase">
                States Explored
              </p>
            </div>
            {/* Stat 3 */}
            <div className="text-center">
              <p className="text-3xl md:text-5xl font-extrabold text-purple-600 relative inline-block">
                1K+
                <span className="absolute -bottom-1 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-glow"></span>
              </p>
              <p className="text-xs md:text-sm font-semibold text-slate-700 mt-2 uppercase">
                Products Curated
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
