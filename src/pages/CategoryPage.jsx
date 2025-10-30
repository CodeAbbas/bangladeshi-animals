import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import AnimalCard from '../components/AnimalCard';
import { animalData } from '../data/animalData';

/**
 * Category Page
 * @param {{navigateTo: Function, categoryName: string}} props
 */
const CategoryPage = ({ navigateTo, categoryName }) => {
  // State for the *final* submitted search
  const [searchTerm, setSearchTerm] = useState('');
  // State for the *live input* in the search bar
  const [searchQuery, setSearchQuery] = useState('');
  
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const searchInputRef = useRef(null);
  
  // Focus search input when it opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);
  
  // Get list of animals in this category
  const categoryAnimals = useMemo(() =>
    animalData.filter(a => a.category === categoryName),
    [categoryName]
  );
  
  // Get unique statuses for the modal
  const conservationStatuses = useMemo(() => [
    'all',
    ...new Set(categoryAnimals.map(a => a.conservationStatus))
  ], [categoryAnimals]);
  
  // Generate live search suggestions
  const suggestions = useMemo(() => {
    if (searchQuery.length < 2) return []; // Only show suggestions after 2+ chars
    return categoryAnimals.filter(animal =>
      animal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      animal.banglaName.includes(searchQuery)
    ).slice(0, 4); // Show max 4 suggestions
  }, [searchQuery, categoryAnimals]);
  
  // Filter the main grid based on *submitted* search and filter
  const filteredAnimals = useMemo(() => {
    return categoryAnimals
      .filter(animal =>
        animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        animal.banglaName.includes(searchTerm)
      )
      .filter(animal =>
        statusFilter === 'all' || animal.conservationStatus === statusFilter
      );
  }, [categoryAnimals, searchTerm, statusFilter]);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  const handleClearFilters = () => {
    setStatusFilter('all');
  };
  
  // Handle search submission (Enter key)
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(searchQuery); // Submit the search
    setIsSearchOpen(false); // Close the search bar
  };
  
  // Handle clicking a suggestion
  const handleSuggestionClick = (animal) => {
    setSearchQuery(animal.name); // Set input text
    setSearchTerm(animal.name); // Submit the search
    setIsSearchOpen(false); // Close the search bar
  };
  
  return (
    <PageTransition>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* --- Page Header & Toggles --- */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">{categoryName}</h1>
          
          <div className="flex items-center gap-2">
            {/* Search Toggle Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-full bg-white shadow-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-bangla-green"
              aria-label="Open search"
            >
              <Search className="h-5 w-5" />
            </button>
            
            {/* Filter Toggle Button */}
            <button
              onClick={openModal}
              className="p-2 rounded-full bg-white shadow-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-bangla-green"
              aria-label="Open filters"
            >
              <SlidersHorizontal className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* --- Animated Search Bar & Suggestions --- */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6 overflow-hidden"
            >
              <form onSubmit={handleSearchSubmit} className="relative bg-white p-4 rounded-lg shadow-md">
                <input
                  ref={searchInputRef}
                  type="search"
                  placeholder={`Search in ${categoryName}...`}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bangla-green"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-7 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                
                {/* Suggestions List */}
                {suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white shadow-lg rounded-b-lg border border-t-0 border-gray-200 z-10">
                    {suggestions.map(animal => (
                      <button
                        type="button"
                        key={animal.id}
                        onClick={() => handleSuggestionClick(animal)}
                        className="w-full text-left px-4 py-3 hover:bg-gray-100"
                      >
                        {animal.name} <span className="text-gray-500 italic">({animal.banglaName})</span>
                      </button>
                    ))}
                  </div>
                )}
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- Filter Modal (No Search Bar) --- */}
        <AnimatePresence>
          {isModalOpen && (
            <>
              <motion.div
                onClick={closeModal}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-md bg-white rounded-xl shadow-2xl overflow-hidden"
              >
                <div className="flex justify-between items-center p-6 pb-4">
                  <h2 id="filter-modal-title" className="text-xl font-semibold text-gray-800">
                    Filters
                  </h2>
                  <button onClick={closeModal} aria-label="Close modal" className="-mt-1 -mr-1 p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-bangla-green">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="px-6 pb-6">
                  {/* --- Radio Button Group --- */}
                  <fieldset>
                    <legend className="block text-sm font-medium text-gray-700 mb-3">
                      Conservation Status
                    </legend>
                    <div className="space-y-2">
                      {conservationStatuses.map((status) => {
                        const isActive = statusFilter === status;
                        return (
                          <label
                            key={status}
                            htmlFor={status}
                            className={`flex items-center justify-between w-full p-3 rounded-lg border cursor-pointer transition-all ${isActive ? 'bg-green-50 border-bangla-green ring-1 ring-bangla-green' : 'bg-white border-gray-300 hover:bg-gray-50'}`}
                          >
                            <input
                              type="radio"
                              id={status}
                              name="conservationStatus"
                              value={status}
                              checked={isActive}
                              onChange={() => setStatusFilter(status)}
                              className="sr-only"
                            />
                            <span className={`font-medium ${isActive ? 'text-bangla-green' : 'text-gray-700'}`}>
                              {status === 'all' ? 'All' : status}
                            </span>
                            
                            {/* --- UPDATED Radio Button Visual --- */}
                            <span 
                              className={`
                                h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all
                                ${isActive 
                                  ? 'bg-bangla-green border-bangla-green' // Solid fill when active
                                  : 'bg-white border-gray-400' // Empty when inactive
                                }
                              `}
                            >
                              {/* White inner dot for contrast on the solid fill */}
                              {isActive && (
                                <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
                              )}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                </div>
                
                <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-3 p-4 bg-gray-50 border-t border-gray-200">
                  <button
                    onClick={handleClearFilters}
                    className="px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-bangla-green focus:ring-offset-1"
                  >
                    Clear All
                  </button>
                  <button 
                    onClick={closeModal}
                    className="w-full sm:w-auto px-4 py-2 bg-bangla-green text-white font-medium rounded-lg shadow-md hover:bg-bangla-green-dark focus:outline-none focus:ring-2 focus:ring-bangla-green focus:ring-offset-2"
                  >
                    Apply Filters
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* --- Animal Grid --- */}
        {filteredAnimals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:g:ap-8">
            {filteredAnimals.map(animal => (
              <AnimalCard key={animal.id} animal={animal} navigateTo={navigateTo} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-gray-700">No Animals Found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search filters.</p>
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default CategoryPage;