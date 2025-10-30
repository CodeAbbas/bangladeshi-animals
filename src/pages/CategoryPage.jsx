import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import AnimalCard from '../components/AnimalCard';
import FilterModal from '../components/FilterModal'; // Import new component
import SearchBar from '../components/SearchBar';   // Import new component
import { animalData } from '../data/animalData';

/**
 * Category Page
 * @param {{navigateTo: Function, categoryName: string}} props
 */
const CategoryPage = ({ navigateTo, categoryName }) => {
  // --- STATE MANAGEMENT ---
  const [searchTerm, setSearchTerm] = useState('');     // Final submitted search
  const [searchQuery, setSearchQuery] = useState('');   // Live input text
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // --- DATA COMPUTATION ---
  const categoryAnimals = useMemo(() => 
    animalData.filter(a => a.category === categoryName), 
    [categoryName]
  );

  const conservationStatuses = useMemo(() => [
    'all', 
    ...new Set(categoryAnimals.map(a => a.conservationStatus))
  ], [categoryAnimals]);

  // Suggestions now appear live
  const suggestions = useMemo(() => {
    if (searchQuery.length < 1) return []; // Show from 1+ char
    const query = searchQuery.toLowerCase();
    return categoryAnimals.filter(animal => 
      animal.name.toLowerCase().includes(query) ||
      animal.banglaName.includes(searchQuery) ||
      animal.description.toLowerCase().includes(query)
    ).slice(0, 4);
  }, [searchQuery, categoryAnimals]);

  // Main grid filtering
  const filteredAnimals = useMemo(() => {
    const query = searchTerm.toLowerCase();
    return categoryAnimals
      .filter(animal => 
        animal.name.toLowerCase().includes(query) ||
        animal.banglaName.includes(searchTerm) ||
        animal.description.toLowerCase().includes(query)
      )
      .filter(animal => 
        statusFilter === 'all' || animal.conservationStatus === statusFilter
      );
  }, [categoryAnimals, searchTerm, statusFilter]);
  
  // --- EVENT HANDLERS ---
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(searchQuery);
    setIsSearchOpen(false); // This fixes the overflow bug
  };
  
  const handleSuggestionClick = (animal) => {
    setSearchQuery(animal.name);
    setSearchTerm(animal.name);
    setIsSearchOpen(false); // This fixes the overflow bug
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchTerm('');
  };
  
  const handleClearFilters = () => {
    setStatusFilter('all');
  };
  
  // Toggles search and pre-fills input with current filter
  const handleToggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchQuery(searchTerm); 
    }
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* --- Page Header & Toggles --- */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">{categoryName}</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleSearch}
              className={`p-2 rounded-full bg-white shadow-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-bangla-green ${isSearchOpen ? 'bg-gray-100' : ''}`}
              aria-label="Toggle search"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="p-2 rounded-full bg-white shadow-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-bangla-green"
              aria-label="Open filters"
            >
              <SlidersHorizontal className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* --- Reusable Search Bar Component --- */}
        <SearchBar
          isOpen={isSearchOpen}
          searchQuery={searchQuery}
          onQueryChange={setSearchQuery}
          onClear={handleClearSearch}
          onSubmit={handleSearchSubmit}
          suggestions={suggestions}
          onSuggestionClick={handleSuggestionClick}
          placeholder={`Search in ${categoryName}...`}
        />

        {/* --- Reusable Filter Modal Component --- */}
        <FilterModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          statuses={conservationStatuses}
          activeStatus={statusFilter}
          onStatusChange={setStatusFilter}
          onClear={handleClearFilters}
        />

        {/* --- Animal Grid --- */}
        {filteredAnimals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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