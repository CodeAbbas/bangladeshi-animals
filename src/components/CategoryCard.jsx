import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable Category Card Component
 * @param {{category: object, navigateTo: Function}} props
 */
const CategoryCard = ({ category, navigateTo }) => {
  const Icon = category.icon;
  
  const handleClick = () => {
    navigateTo('category', { categoryName: category.category });
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="bg-white backdrop-blur-sm p-6 rounded-2xl shadow-lg text-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-bangla-green focus-visible:ring-offset-2"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex="0"
      aria-label={`Browse ${category.name}`}
    >
      <Icon className={`h-12 w-12 ${category.color} mx-auto mb-3`} />
      <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
    </motion.div>
  );
};

export default CategoryCard;