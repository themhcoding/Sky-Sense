import React, { useState, useEffect, useRef } from "react";
import { MapPin, Search, X } from "lucide-react";
import { searchCities } from "../services/weatherAPI";

function SearchBar({ onSearch, onLocationSearch, loading }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState(false);

  const searchRef = useRef();

  useEffect(() => {
    const handleClickOutSide = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, []);

  useEffect(() => {
    const searchTimeOut = setTimeout(async () => {
      if (query.length > 2 && !selectedCity) {
        setSearchLoading(true);

        try {
          const result = await searchCities(query);
          setSuggestions(result);
          setShowSuggestions(true);
        } catch (error) {
          console.error("Search Failed:", error);
        } finally {
          setSearchLoading(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);
    return () => clearTimeout(searchTimeOut);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery("");
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSuggestionsClick = (city) => {
  setSelectedCity(true);
  setShowSuggestions(false);
  setSuggestions([]);

  setQuery(city.name);

  onSearch(city);
};

  return (
    <div className="relative w-full max-w-2xl" ref={searchRef}>
      <form className="relative" onSubmit={handleSubmit}>
        <div className="relative group ">
          <Search className=" absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5 group-focus-within:text-white transition-all"></Search>

          <input
            value={query}
            onChange={(e) => {
              setSelectedCity(false);
              setQuery(e.target.value);
            }}
            type="text"
            placeholder="Discover Weather Anywhere"
            className="w-full pl-12 pr-24 py-4 bg-white/15 border border-white/30 rounded-2xl text-white placeholder-slate-200 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 hover:bg-white/20"
          />

          {/* CONDITIONAL RENDERING */}

          {query && (
            <button
              type="button"
              className="absolute right-14 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-all p-1 rounded-full hover:bg-white/10"
              onClick={clearSearch}
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-all p-1 rounded-full hover:bg-white/10"
            onClick={onLocationSearch}
            disabled={loading}
          >
            <MapPin className="w-5 h-5" />
          </button>
        </div>
      </form>

      {/* CONDITIONAL RENDERING */}

      {showSuggestions && (suggestions.length > 0 || searchLoading) && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-50 ">
          {/* CONDITIONAL RENDERING */}

          {searchLoading ? (
            <div className="p-6 text-center text-white/70">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-white/30 border-t-white mx-auto "></div>
              <p>Search City</p>
            </div>
          ) : (
            suggestions.map((city, index) => {
              return (
                <button
                  type="button"
                  className="w-full px-6 py-4 flex items-center justify-between group hover:bg-white/10 transition-all border-b border-white/10 last:border-b-0"
                  key={`${city.name}-${city.country}-${index}`}
                  onClick={() => handleSuggestionsClick(city)}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">
                        {city.name}
                        {city.state && (
                          <span className="text-white/70">, {city.state}</span>
                        )}
                      </span>

                      <span className="text-sm text-white/60">
                        {city.country}
                      </span>
                    </div>
                  </div>

                  <Search className="w-4 h-4 text-white/40 group-hover:text-white/60 transition-all" />
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
