import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import CategoryCard from '../components/CategoryCard';
import AnimalCard from '../components/AnimalCard';
import { animalData } from '../data/animalData';
import { categories } from '../data/pageData';

/**
 * Home Page
 * @param {{navigateTo: Function}} props
 */
const HomePage = ({ navigateTo }) => (
  <PageTransition>
    {/* Hero Section */}
    <section className="relative bg-bangla-green h-[60vh] min-h-[400px] text-white flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('https://placehold.co/1600x900/004d00/FFFFFF?text=Sundarbans+Silhouette')" }}
        role="presentation"
      ></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.h1 
          className="text-4xl md:text-6xl font-extrabold tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Discover the Wildlife of Bangladesh
        </motion.h1>
        <motion.p 
          className="mt-4 text-lg md:text-xl text-green-100 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          A comprehensive guide to the mammals, birds, reptiles, and aquatic life of a nation rich in biodiversity.
        </motion.p>
        <motion.button
          className="mt-8 bg-white text-bangla-green font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-gray-100 hover:shadow-xl transition-all transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-bangla-green"
          onClick={() => navigateTo('search')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Start Exploring
        </motion.button>
      </div>
    </section>

    {/* Intro Section */}
    <section className="py-16 bg-green-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">A Land of Rich Biodiversity</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          From the majestic Royal Bengal Tiger of the Sundarbans to the vibrant song of the Doel in village gardens, Bangladesh is home to an astonishing variety of animal life. This project aims to catalog and celebrate this natural heritage, raising awareness for conservation and education.
        </p>
      </div>
    </section>

    {/* Categories Section */}
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.name} category={cat} navigateTo={navigateTo} />
          ))}
        </div>
      </div>
    </section>

    {/* Featured Species Section */}
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Featured Species</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimalCard animal={animalData.find(a => a.id === 1)} navigateTo={navigateTo} />
          <AnimalCard animal={animalData.find(a => a.id === 3)} navigateTo={navigateTo} />
          <AnimalCard animal={animalData.find(a => a.id === 4)} navigateTo={navigateTo} />
        </div>
      </div>
    </section>
  </PageTransition>
);

export default HomePage;