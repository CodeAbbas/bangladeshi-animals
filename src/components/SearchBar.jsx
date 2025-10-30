import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

/**
 * Animated, controlled search bar with suggestions
 * @param {{
 * isOpen: boolean,
 * searchQuery: string,
 * onQueryChange: (query: string) => void,
 * onClear: () => void,
 * onSubmit: (e: React.FormEvent) => void,
 * suggestions: Array<{id: number | string, name: string, banglaName: string}>,
 * onSuggestionClick: (animal: any) => void,
 * placeholder: string
 * }} props
 */
const SearchBar = ({
  isOpen,
  searchQuery,
  onQueryChange,
  onClear,
  onSubmit,
  suggestions,
  onSuggestionClick,
  placeholder
}) => {
  const searchInputRef = useRef(null);

  // Focus the input when it appears
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  return (
    // This relative wrapper is key to positioning the suggestions
    // FIX: Added z-20 to ensure this whole component is above the animal grid
    <div className="relative mb-6 z-20">
      {/* Search Bar Input */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="search-bar"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden" // Clips the form as it animates
          >
            {/* FIX: Removed p-2 and bg-transparent for cleaner alignment */}
            <form onSubmit={onSubmit} className="relative bg-white p-4 rounded-lg shadow-md">
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="search"
                  placeholder={placeholder}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bangla-green"
                  value={searchQuery}
                  onChange={(e) => onQueryChange(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                {searchQuery.length > 0 && (
                  <button
                    type="button"
                    onClick={onClear}
                    // FIX: Changed right-2 to right-3 for better spacing
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600 rounded-full"
                    aria-label="Clear search"
                  >
                    {/* FIX: Added the missing X icon */}
                    <X className="h-4 w-4" /> 
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Suggestions List (Positioned outside the animated div to fix overflow) */}
      <AnimatePresence>
        {isOpen && suggestions.length > 0 && (
          <motion.div
            key="suggestions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.1 } }}
            exit={{ opacity: 0 }}
            // FIX:
            // 1. Added z-30 (higher than parent)
            // 2. Changed w-[97%] to w-full and used padding to align
            // 3. Changed negative margin to be more precise
            className="absolute top-full left-0 right-0 z-30 w-full px-4"
            style={{ marginTop: '-1rem' }} // Pulls it up perfectly
          >
            <div className="bg-white shadow-lg rounded-b-lg border border-t-0 border-gray-200 overflow-hidden">
              {suggestions.map(animal => (
                <button
                  type="button"
                  key={animal.id}
                  onClick={() => onSuggestionClick(animal)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors"
                >
                  {animal.name} <span className="text-gray-500 italic">({animal.banglaName})</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;