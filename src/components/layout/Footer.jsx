import React from 'react';

/**
 * Footer Component
 */
const Footer = () => (
  <footer className="bg-gray-800 text-gray-300 mt-16">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Bangladeshi Animals</h4>
          <p className="text-sm">
            An educational platform dedicated to the rich and diverse wildlife of Bangladesh.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {/* These should use navigateTo in a real app */}
            <li><a href="#" className="hover:text-green-300">Home</a></li>
            <li><a href="#" className="hover:text-green-300">All Animals</a></li>
            <li><a href="#" className="hover:text-green-300">About Us</a></li>
            <li><a href="#" className="hover:text-green-300">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Sources</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-green-300">IUCN Bangladesh</a></li>
            <li><a href="#" className="hover:text-green-300">Banglapedia</a></li>
            <li><a href="#" className="hover:text-green-300">Bangladesh Forest Dept.</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Bangladeshi Animals. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;