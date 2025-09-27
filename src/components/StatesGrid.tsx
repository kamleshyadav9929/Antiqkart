import { useEffect, useState } from "react";
import { supabase } from "../../src/lib/supabaseClient";

interface State {
  id: string;
  name: string;
  image: string;
}

const StateSkeleton = () => (
  <div className="flex flex-col items-center space-y-2 animate-pulse">
    <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-300 rounded-full"></div>
    <div className="h-4 bg-gray-300 rounded w-16"></div>
  </div>
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
      className="group flex flex-col items-center space-y-2 text-center"
    >
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-transparent group-hover:border-dark transition-all duration-300 p-1">
        <img
          src={state.image}
          alt={state.name}
          className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <p className="text-xs font-medium text-text-muted group-hover:text-dark transition-colors">
        {state.name}
      </p>
    </a>
  );

  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-text">
          Shop by State
        </h2>
      </div>

      <div className="md:hidden grid grid-cols-3 gap-x-4 gap-y-6">
        {loading
          ? Array.from({ length: 9 }).map((_, index) => (
              <StateSkeleton key={index} />
            ))
          : states.map(stateCard)}
      </div>

      <div className="hidden md:grid md:grid-cols-8 gap-x-6 gap-y-8">
        {loading
          ? Array.from({ length: 16 }).map((_, index) => (
              <StateSkeleton key={index} />
            ))
          : states.map(stateCard)}
      </div>
    </div>
  );
};

export default StatesGrid;
