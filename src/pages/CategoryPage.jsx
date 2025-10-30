import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion'; // Import motion components
import PageTransition from '../components/PageTransition';
import AnimalCard from '../components/AnimalCard';
import { animalData } from '../data/animalData';

/**
 * Category Page
 * @param {{navigateTo: Function, categoryName: string}} props
 */
const CategoryPage = ({ navigateTo, categoryName }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State to manage toggle
  
  const filteredAnimals = useMemo(() => {
    return animalData
      .filter(animal => animal.category === categoryName)
      .filter(animal =>
        animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        animal.banglaName.includes(searchTerm)
      )
      .filter(animal =>
        statusFilter === 'all' || animal.conservationStatus === statusFilter
      );
  }, [categoryName, searchTerm, statusFilter]);
  
  const conservationStatuses = [
    'all',
    ...new Set(animalData.filter(a => a.category === categoryName).map(a => a.conservationStatus))
  ];
  
  return (
    <PageTransition>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">{categoryName}</h1>
        
        {/* Filter Toggle Button */}
        <div className="mb-6">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-bangla-green focus:ring-offset-2"
            aria-expanded={isFilterOpen}
            aria-controls="filter-panel"
          >
            <SlidersHorizontal className="h-5 w-5" />
            <span>Filters</span>
            <ChevronDown 
              className={`h-5 w-5 transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} 
            />
          </button>
        </div>

        {/* Collapsible Filter Panel */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              id="filter-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden" // Important for smooth height animation
            >
              {/* Original Filter Bar */}
              <div className="bg-white p-4 rounded-lg shadow-md mb-8 flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <input
                    type="search"
                    placeholder={`Search in ${categoryName}...`}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bangla-green"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                <div className="relative flex-grow md:max-w-xs">
                  <select
                    className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-bangla-green"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    aria-label="Filter by conservation status"
                  >
                    <option value="all">All Conservation Statuses</option>
                    {conservationStatuses.filter(s => s !== 'all').map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animal Grid */}
        {filteredAnimals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredAnimals.map(animal => (
              <AnimalCard key={animal.id} animal={animal} navigateTo={navigateTo} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-gray-700">No Animals Found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default CategoryPage;