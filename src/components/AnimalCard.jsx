import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ConservationBadge from './ConservationBadge';
import { truncateText } from '../utils/helpers';

/**
 * Reusable Animal Card Component
 * @param {{animal: object, navigateTo: Function}} props
 */
const AnimalCard = ({ animal, navigateTo }) => {
  const handleClick = () => {
    navigateTo('detail', { animalId: animal.id });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="bg-white shadow-xl rounded-2xl overflow-hidden cursor-pointer h-full flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-bangla-green focus-visible:ring-offset-2"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex="0"
      aria-label={`Learn more about ${animal.name}`}
    >
      <img
        src={animal.image}
        alt={animal.name}
        className="w-full h-48 object-cover"
        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/cccccc/FFFFFF?text=Image+Not+Found'; }}
      />
      <div className="p-4 flex-grow flex flex-col">
        <div className="mb-2">
          <ConservationBadge status={animal.conservationStatus} />
        </div>
        <h3 className="text-xl font-bold text-gray-800">{animal.name}</h3>
        <p className="text-md italic text-gray-600">{animal.banglaName}</p>
        <p className="text-sm font-semibold text-bangla-green mt-1">{animal.category}</p>
        <p className="mt-2 text-gray-700 text-sm flex-grow">
          {truncateText(animal.description, 90)}
        </p>
        <div className="mt-4 text-right">
          <span className="text-bangla-green font-semibold text-sm inline-flex items-center">
            Learn More <ArrowRight className="ml-1 h-4 w-4" />
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default AnimalCard;