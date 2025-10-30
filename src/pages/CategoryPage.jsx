import React, { useState, useMemo } from 'react';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const conservationStatuses = useMemo(() => [
    'all',
    ...new Set(animalData.filter(a => a.category === categoryName).map(a => a.conservationStatus))
  ], [categoryName]);
  
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
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  // New handler to clear filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
  };
  
  return (
    <PageTransition>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Page Header & Filter Button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">{categoryName}</h1>
          <button
            onClick={openModal}
            className="p-2 rounded-full bg-white shadow-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-bangla-green"
            aria-label="Open filters"
          >
            <SlidersHorizontal className="h-5 w-5" />
          </button>
        </div>

        {/* Filter Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <>
              {/* Backdrop Overlay */}
              <motion.div
                onClick={closeModal}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
                aria-hidden="true"
              />

              {/* Modal Panel */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-md bg-white rounded-xl shadow-2xl overflow-hidden"
                role="dialog"
                aria-modal="true"
                aria-labelledby="filter-modal-title"
              >
                {/* Modal Header */}
                <div className="flex justify-between items-center p-6 pb-4">
                  <h2 id="filter-modal-title" className="text-xl font-semibold text-gray-800">
                    Filters
                  </h2>
                  <button
                    onClick={closeModal}
                    className="-mt-1 -mr-1 p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-bangla-green"
                    aria-label="Close modal"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Modal Body (Filter Inputs) */}
                <div className="flex flex-col gap-6 px-6 pb-6">
                  {/* Search Bar */}
                  <div className="relative">
                    <input
                      type="search"
                      placeholder={`Search in ${categoryName}...`}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bangla-green"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  
                  {/* Tag Selector */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Conservation Status
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {conservationStatuses.map((status) => {
                        const isActive = statusFilter === status;
                        return (
                          <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`
                              px-3 py-1 text-sm font-medium rounded-full border transition-colors
                              ${isActive 
                                ? 'bg-bangla-green text-white border-bangla-green' 
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                              }
                            `}
                          >
                            {status === 'all' ? 'All' : status}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                {/* --- NEW Modal Footer --- */}
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