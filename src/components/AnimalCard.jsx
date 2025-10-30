import React from 'react';
import { motion } from 'framer-motion';
import ConservationBadge from './ConservationBadge'; // We'll use this for the "Endangered" text

/**
 * Reusable Animal Card Component (New Design)
 * Design based on user request for a full-bleed image with a text overlay in the bottom-left.
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
      // Card is now relative, with overflow-hidden and a fixed height (h-72)
      // The original `h-full` is replaced to ensure a consistent size
      className="relative shadow-xl rounded-2xl overflow-hidden cursor-pointer group h-72 focus:outline-none focus-visible:ring-2 focus-visible:ring-bangla-green focus-visible:ring-offset-2"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex="0"
      aria-label={`Learn more about ${animal.name}`}
    >
      {/* Full-bleed Image */}
      <img
        src={animal.image}
        alt={animal.name}
        // Use h-full and w-full to fill the parent card
        className="w-full h-auto max-h-[500px] object-cover transition-transform duration-300 group-hover:scale-105"
        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/cccccc/FFFFFF?text=Image+Not+Found'; }}
      />

      {/* Gradient Overlay for text readability (bottom-up) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" aria-hidden="true"></div>

      {/* Text Overlay Content */}
      <div className="absolute bottom-0 left-0 p-4 text-white">
        {/* Use the existing ConservationBadge component for the status */}
        <div className="mb-1">
          <ConservationBadge status={animal.conservationStatus} />
        </div>
        
        {/* English Name */}
        <h3 className="text-xl font-bold text-white drop-shadow-md">{animal.name}</h3>
        
        {/* Bengali Name */}
        <p className="text-lg italic text-gray-200 drop-shadow-md">{animal.banglaName}</p>
        
        {/* No description, category, or "Learn More" text as per request */}
      </div>
    </motion.div>
  );
};

export default AnimalCard;