import React, { useState, useMemo } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import AnimalCard from '../components/AnimalCard';
import { animalData } from '../data/animalData';

/**
 * Search Page (All Animals)
 * @param {{navigateTo: Function}} props
 */
const SearchPage = ({ navigateTo }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredAnimals = useMemo(() => {
    return animalData
      .filter(animal => 
        animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        animal.banglaName.includes(searchTerm) ||
        animal.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(animal => 
        statusFilter === 'all' || animal.conservationStatus === statusFilter
      )
      .filter(animal =>
        categoryFilter === 'all' || animal.category === categoryFilter
      );
  }, [searchTerm, statusFilter, categoryFilter]);

  const allStatuses = ['all', ...new Set(animalData.map(a => a.conservationStatus))];
  const allCategories = ['all', ...new Set(animalData.map(a => a.category))];

  return (
    <PageTransition>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Browse All Animals</h1>
        
        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative md:col-span-1">
            <input
              type="search"
              placeholder="Search all animals..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bangla-green"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          <div className="relative">
            <select
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-bangla-green"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              aria-label="Filter by category"
            >
              <option value="all">All Categories</option>
              {allCategories.filter(c => c !== 'all').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-bangla-green"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter by conservation status"
            >
              <option value="all">All Statuses</option>
              {allStatuses.filter(s => s !== 'all').map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Animal Grid */}
        <p className="text-gray-600 mb-6">Showing {filteredAnimals.length} of {animalData.length} animals.</p>
        
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

export default SearchPage;