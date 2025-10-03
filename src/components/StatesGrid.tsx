import { useEffect, useState } from "react";
import { supabase } from "../../src/lib/supabaseClient";

interface State {
  id: string;
  name: string;
  image: string;
}

const StateSkeleton = () => (
  <div className="animate-pulse bg-gray-200 rounded-xl aspect-[3/4]"></div>
);

const StatesGrid = () => {
  const [states, setStates] = useState<State[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStates = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("states")
        .select("id, name, image")
        .order("name", { ascending: true });

      if (error) {
        console.error("Error fetching states:", error.message);
      } else {
        setStates(data || []);
      }
      setLoading(false);
    };

    fetchStates();
  }, []);

  const stateCard = (state: State) => (
    <a
      key={state.id}
      href={`/states/${state.name.toLowerCase().replace(/\s+/g, "-")}`}
      className="group block relative overflow-hidden bg-white shadow-xl transition-all duration-700 hover:shadow-2xl hover:-translate-y-3 border border-gray-100 hover:border-emerald-300/50"
      style={{
        clipPath:
          "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
      }}
    >
      {/* Sleek diagonal accent */}
      <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-b-[40px] border-b-emerald-500/20 group-hover:border-b-emerald-500/40 transition-colors duration-500"></div>

      {/* Image container with sophisticated overlay */}
      <div className="aspect-[4/3] w-full overflow-hidden relative">
        <img
          src={state.image}
          alt={state.name}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
        />

        {/* Multi-layer overlay system */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-emerald-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

        {/* Animated border effect */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-emerald-400/30 transition-colors duration-500"></div>

        {/* Floating geometric elements */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-400 rotate-45 animate-pulse delay-100"></div>
          <div className="absolute bottom-6 left-4 w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce delay-300"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-emerald-300 rounded-full animate-ping delay-500"></div>
        </div>

        {/* State name overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <h3 className="text-white font-bold text-sm truncate">
            {state.name}
          </h3>
        </div>
      </div>

      {/* Content section with glass morphism */}
      <div className="p-4 relative bg-gradient-to-br from-white to-gray-50">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-sm group-hover:text-emerald-700 transition-colors duration-300 truncate">
            {state.name}
          </h3>
          <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>

        {/* Heritage indicator */}
        <div className="mt-2 flex items-center text-emerald-600 text-xs opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300">
          <div className="w-1 h-1 bg-emerald-500 rounded-full mr-2"></div>
          <span className="font-medium">Explore Heritage</span>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </a>
  );

  return (
    <div className="relative z-10 bg-heritage-pattern">
      {/* Enhanced Header Section */}
      <div className="relative text-center mb-16 md:mb-20">
        <div className="relative inline-block">
          <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-3xl blur-xl"></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-6 border border-emerald-200/50 shadow-xl">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-serif font-bold text-slate-900 leading-tight">
              <span className="relative inline-block mr-2 sm:mr-3">
                From Every Corner of
                <div className="absolute -bottom-1 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-shimmer"></div>
              </span>
              <span className="text-emerald-600 relative inline-block">
                India
                <div className="absolute -top-2 -right-3 text-green-500 text-lg sm:text-xl animate-bounce">
                  🇮🇳
                </div>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full animate-glow"></div>
              </span>
            </h2>
            {/* Map pin decoration */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-emerald-500 text-2xl animate-pulse">
              📍
            </div>
          </div>
        </div>
        <p className="mt-6 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed px-4">
          🗺️ Explore the unique artistic heritage, one state at a time.
        </p>
        {/* Geographic decorations */}
        <div className="absolute top-0 left-1/4 w-6 h-6 border-2 border-green-400 rounded-full opacity-30 animate-pulse delay-300"></div>
        <div className="absolute bottom-2 right-1/4 w-4 h-4 border-2 border-emerald-400 rounded-full opacity-40 animate-pulse delay-700"></div>
      </div>

      {/* Enhanced Grid with better spacing */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
        {loading
          ? Array.from({ length: 12 }).map((_, index) => (
              <StateSkeleton key={index} />
            ))
          : states.map(stateCard)}
      </div>
    </div>
  );
};

export default StatesGrid;
