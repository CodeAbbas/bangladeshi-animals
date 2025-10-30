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
 * suggestions: Array<{id: number | string, name: string, banglaName: string, image: string}>, // Added image to prop type
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
    // This relative wrapper is key.
    // z-20 ensures this component sits on top of the AnimalCard grid.
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
            // !! BUG FIX: Removed "overflow-hidden" which was clipping the suggestions
          >
            <form onSubmit={onSubmit} className="relative bg-transparent rounded-lg p-2">
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
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600 rounded-full"
                    aria-label="Clear search"
                  >
                    {/* !! BUG FIX: Added the missing X icon */}
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
            // !! BUG FIX:
            // 1. z-30 (higher than parent) ensures it's on top of all content.
            // 2. Adjusted width and margin to align perfectly with the input box above.
            className="absolute top-full left-0 right-0 z-30 w-[97%] mx-auto"
            style={{ marginTop: '0.50rem' }} // Kept your style
          >
            <div className="bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden">
              
              {/* --- NEW: Rich Suggestion Item --- */}
              {suggestions.map(animal => (
                <button
                  type="button"
                  key={animal.id}
                  onClick={() => onSuggestionClick(animal)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 transition-colors flex items-center gap-3"
                >
                  {/* Image Thumbnail */}
                  <img 
                    src={animal.image}
                    alt={animal.name}
                    className="w-12 h-12 rounded-md object-cover flex-shrink-0"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/48x48/cccccc/FFFFFF?text=?'; }}
                  />
                  {/* Text Content */}
                  <div>
                    <div className="font-medium text-gray-800">{animal.name}</div>
                    <div className="text-sm text-gray-500 italic">{animal.banglaName}</div>
                  </div>
                </button>
              ))}
              {/* --- End of Rich Suggestion Item --- */}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
