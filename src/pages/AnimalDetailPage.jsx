import React, { useState, useRef, useEffect } from 'react'; // Import hooks
import PageTransition from '../components/PageTransition';
import ConservationBadge from '../components/ConservationBadge';
import AnimalCard from '../components/AnimalCard';
import { animalData } from '../data/animalData';
import { Volume2, Pause } from 'lucide-react'; // Import icons

/**
 * Animal Detail Page
 * @param {{navigateTo: Function, animalId: number}} props
 */
const AnimalDetailPage = ({ navigateTo, animalId }) => {
  const animal = animalData.find(a => a.id === animalId);
  
  // --- New Audio State ---
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // --- New Audio Logic ---
  // This effect handles loading and cleaning up the audio
  useEffect(() => {
    // Stop any currently playing audio before changing
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    
    if (animal && animal.sound) {
      // Create new Audio object
      const audio = new Audio(animal.sound);
      audio.onended = () => setIsPlaying(false); // Reset when sound finishes
      audioRef.current = audio;
    } else {
      audioRef.current = null; // No sound for this animal
    }

    // Cleanup function: runs when component unmounts or animal changes
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [animal]); // Re-run if the animal (and its sound) changes

  // Play/Pause toggle function
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  // --- End of New Audio Logic ---


  if (!animal) {
    return (
      <PageTransition>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl font-bold text-red-600">Animal Not Found</h1>
          <p className="text-lg text-gray-700 mt-4">The animal you are looking for does not exist in our database.</p>
          <button
            className="mt-8 bg-bangla-green text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-bangla-green-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-bangla-green focus-visible:ring-offset-2"
            onClick={() => navigateTo('home')}
          >
            Back to Home
          </button>
        </div>
      </PageTransition>
    );
  }
  
  const relatedSpecies = animalData
    .filter(a => a.category === animal.category && a.id !== animal.id)
    .slice(0, 3);

  return (
    <PageTransition>
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => navigateTo('category', { categoryName: animal.category })}
            className="text-bangla-green font-semibold hover:underline"
          >
            &larr; Back to {animal.category}
          </button>
          <div className="mt-4 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">{animal.name}</h1>
            <h2 className="text-2xl md:text-3xl font-medium text-gray-600 italic mt-1">{animal.banglaName}</h2>
            <p className="text-lg text-gray-500 mt-2">({animal.scientificName})</p>
            <div className="mt-4">
              <ConservationBadge status={animal.conservationStatus} />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Image */}
          <div className="md:col-span-2">
            <img
              src={animal.image}
              alt={animal.name}
              className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-lg"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/800x500/cccccc/FFFFFF?text=Image+Not+Found'; }}
            />
          </div>
          
          {/* Quick Facts */}
          <aside className="md:col-span-1 bg-green-50/70 p-6 rounded-2xl shadow-md">
            <div className="flex justify-between items-center ">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Quick Facts</h3>
            
            {/* --- NEW Animal Sound Button --- */}
            {animal.sound && (
              <div className="mb-4">
                <button
                  onClick={togglePlay}
                  className="p-2 rounded-full bg-white shadow-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-bangla-green"
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </button>
              </div>
            )}
            </div>
            {/* --- End of Animal Sound Button --- */}
            
            <ul className="space-y-3">
              <li className="flex justify-between">
                <strong className="text-gray-700">Category:</strong>
                <span className="text-gray-800 text-right">{animal.category}</span>
              </li>
              <li className="flex justify-between">
                <strong className="text-gray-700">Diet:</strong>
                <span className="text-gray-800 text-right">{animal.diet}</span>
              </li>
              <li className="flex justify-between">
                <strong className="text-gray-700">Avg. Lifespan:</strong>
                <span className="text-gray-800 text-right">{animal.averageLifespan}</span>
              </li>
              <li className="flex flex-col">
                <strong className="text-gray-700 mb-1">Habitat:</strong>
                <span className="text-gray-800">{animal.habitat}</span>
              </li>
              <li className="flex flex-col">
                <strong className="text-gray-700 mb-1">Distribution:</strong>
                <span className="text-gray-800">{animal.distribution.join(', ')}</span>
              </li>
            </ul>
          </aside>
        </div>

        {/* Description */}
        <div className="prose prose-lg max-w-none text-gray-700 mt-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">About the {animal.name}</h3>
          <p>{animal.description}</p>
          {/* Add more paragraphs for a real site */}
          <p>
            This section will be populated with more detailed information about the animal's behavior,
            role in the ecosystem, and specific conservation efforts in Bangladesh.
          </p>
        </div>
        
        {/* Related Species */}
        {relatedSpecies.length > 0 && (
          <section className="mt-16">
            <h3 className="text-3xl font-bold text-gray-800 mb-8">Related Species</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedSpecies.map(related => (
                <AnimalCard key={related.id} animal={related} navigateTo={navigateTo} />
              ))}
            </div>
          </section>
        )}
      </article>
    </PageTransition>
  );
};

export default AnimalDetailPage;