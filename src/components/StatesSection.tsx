import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

interface State {
  id: string;
  name: string;
}

export default function StatesSection() {
  const [states, setStates] = useState<State[]>([]);

  useEffect(() => {
    const fetchStates = async () => {
      // Fetch all states, ordered by name
      const { data, error } = await supabase
        .from("states")
        .select("id, name")
        .order("name", { ascending: true });

      if (error) {
        console.error("Error fetching states:", error.message);
      } else {
        setStates(data || []);
      }
    };

    fetchStates();
  }, []);

  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-serif mb-6">Shop by State</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {states.map((s) => (
            <button
              key={s.id}
              className="text-left py-3 px-3 rounded-lg border border-transparent hover:bg-white hover:shadow-sm transition"
            >
              <span className="font-medium">{s.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
