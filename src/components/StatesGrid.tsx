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
      className="group block rounded-xl overflow-hidden bg-slate-100 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-200/80"
    >
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img
          src={state.image}
          alt={state.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-slate-800 text-sm">{state.name}</h3>
      </div>
    </a>
  );

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
          From Every Corner of <span className="text-green-500">India</span>
        </h2>
        <p className="mt-2 text-muted max-w-2xl mx-auto">
          Explore the unique artistic heritage, one state at a time.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5">
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
