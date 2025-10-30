import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, SlidersHorizontal, X } from 'lucide-react'; // Added X icon
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
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  
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
  
  // Handlers to control the modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  return (
    <PageTransition>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* --- Page Header & Filter Button --- */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">{categoryName}</h1>
          
          {/* Small Filter Icon Button */}
          <button
            onClick={openModal}
            className="p-2 rounded-full bg-white shadow-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-bangla-green"
            aria-label="Open filters"
          >
            <SlidersHorizontal className="h-5 w-5" />
          </button>
        </div>
        {/* --- End of Header --- */}


        {/* --- Filter Modal (Glossy) --- */}
        <AnimatePresence>
          {isModalOpen && (
            <>
              {/* Backdrop Overlay */}
              <motion.div
                onClick={closeModal} // Click overlay to close
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
                aria-hidden="true"
              />

              {/* Modal Panel */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-[90vw] max-w-md bg-white rounded-xl shadow-2xl p-6"
                role="dialog"
                aria-modal="true"
                aria-labelledby="filter-modal-title"
              >
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-4">
                  <h2 id="filter-modal-title" className="text-xl font-semibold text-gray-800">
                    Filters
                  </h2>
                  <button
                    onClick={closeModal}
                    className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-bangla-green"
                    aria-label="Close modal"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Modal Body (Filter Inputs) */}
                <div className="flex flex-col gap-4">
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
                  
                  <div className="relative">
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

                  <button 
                    onClick={closeModal}
                    className="w-full mt-2 px-4 py-2 bg-bangla-green text-white font-medium rounded-lg shadow-md hover:bg-bangla-green-dark focus:outline-none focus:ring-2 focus:ring-bangla-green focus:ring-offset-2"
                  >
                    Apply Filters
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
        {/* --- End of Filter Modal --- */}


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