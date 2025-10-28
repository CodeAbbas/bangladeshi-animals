import React from 'react';
import { Send } from 'lucide-react';
import PageTransition from '../components/PageTransition';

/**
 * About Page
 * @param {{navigateTo: Function}} props
 */
const AboutPage = ({ navigateTo }) => (
  <PageTransition>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">About This Project</h1>
        {/* Added prose for @tailwindcss/typography plugin */}
        <div className="prose prose-lg prose-green max-w-none text-gray-700">
          <p>
            <strong>Bangladeshi Animals</strong> is a personal project born from a deep appreciation for the 
            incredible biodiversity of Bangladesh. The goal is to create a modern, accessible, and 
            educational resource for students, researchers, and anyone curious about the 
            nation's wildlife.
          </p>
          <p>
            This platform is built with a focus on clean design, accurate information, and 
            raising awareness for the many species that face conservation threats.
          </p>
          <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Tech Stack</h3>
          <ul>
            <li><strong>Frontend:</strong> React</li>
            <li><strong>Styling:</strong> Tailwind CSS</li>
            <li><strong>Animation:</strong> Framer Motion</li>
          </ul>
          <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Data Sources</h3>
          <p>
            All information is compiled from reputable sources, including:
          </p>
          <ul>
            <li>IUCN Bangladesh Red List</li>
            <li>Banglapedia (National Encyclopedia of Bangladesh)</li>
            <li>Bangladesh Forest Department publications</li>
            <li>Peer-reviewed academic journals</li>
          </ul>
          
          <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Get in Touch</h3>
          <p>
            Have a suggestion, correction, or want to contribute? We'd love to hear from you.
          </p>
          {/* Un-styled the form to let prose handle it, with custom focus rings */}
          <form className="mt-6 space-y-4 not-prose">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email</label>
              <input type="email" id="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-bangla-green focus:border-bangla-green" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea id="message" rows="4" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-bangla-green focus:border-bangla-green"></textarea>
            </div>
            <button
              type="submit"
              onClick={(e) => e.preventDefault()}
              className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-bangla-green hover:bg-bangla-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bangla-green"
            >
              Send Message <Send className="ml-2 h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  </PageTransition>
);

export default AboutPage;