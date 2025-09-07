import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery }) => {
  return (
    <div className="mt-8 max-w-xl mx-auto">
      <div className="group flex items-center bg-white border border-gray-200 rounded-full px-2 py-2 shadow-sm focus-within:ring-2 focus-within:ring-slate-800 transition-all">
        <input
          type="search"
          name="q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for 'Madhubani Painting' or 'Pashmina'..."
          className="w-full bg-transparent text-gray-800 placeholder-gray-500 pl-4 pr-2 focus:outline-none"
        />
        <button
          type="button" // Changed from submit to button
          className="flex-shrink-0 bg-slate-800 text-white rounded-full p-3 transition-colors hover:bg-slate-700"
          aria-label="Search"
        >
          <Search size={20} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
