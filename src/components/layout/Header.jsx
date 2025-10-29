import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Search,
  ChevronDown,
  Home,
  BookOpen,
  Info
} from 'lucide-react';
import { categories } from '../../data/pageData'; // Import categories

/**
 * Header Component
 * @param {{navigateTo: Function}} props
 */
const Header = ({ navigateTo }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { name: "Home", page: "home", icon: Home },
    { name: "All Animals", page: "search", icon: Search },
    { name: "Blog", page: "blog", icon: BookOpen },
    { name: "About", page: "about", icon: Info },
  ];
  
  const categoryLinks = categories.map(c => ({
    name: c.name,
    page: 'category',
    data: { categoryName: c.category }
  }));
  
  const handleNav = (page, data = {}) => {
    navigateTo(page, data);
    setIsMobileMenuOpen(false);
  };
  
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Site Title */}
          <div className="flex-shrink-0 flex items-center">
            <button
  onClick={() => handleNav('home')}
  className="flex items-center text-bangla-green focus:outline-none focus-visible:ring-2 focus-visible:ring-bangla-green rounded-md"
  aria-label="Homepage"
>
  <img
    src="/src/assets/tiger.webp"
    alt="Tiger Logo"
    className="h-8 w-8 object-cover rounded-full"
  />
  <span className="ml-2 text-xl font-bold">Bangladeshi Animals</span>
</button>

          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNav(link.page)}
                className="text-gray-700 hover:text-bangla-green px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-bangla-green"
              >
                {link.name}
              </button>
            ))}
            {/* Desktop Category Dropdown */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-bangla-green px-3 py-2 rounded-md text-sm font-medium flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-bangla-green">
                Categories <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 transition-opacity invisible group-hover:visible z-10">
                {categoryLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleNav(link.page, link.data)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-bangla-green"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Mobile Menu Button & Dark Mode Toggle */}
          <div className="flex items-center">
            
            <div className="md:hidden ml-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-bangla-green"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="md:hidden border-t border-gray-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNav(link.page)}
                  className="w-full text-left text-gray-700 hover:text-bangla-green hover:bg-green-50 block px-3 py-2 rounded-md text-base font-medium"
                >
                  {link.name}
                </button>
              ))}
              <div className="border-t border-gray-100 pt-2">
                <p className="px-3 py-2 text-sm font-semibold text-gray-500">Categories</p>
                {categoryLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleNav(link.page, link.data)}
                    className="w-full text-left text-gray-700 hover:text-bangla-green hover:bg-green-50 block px-3 py-2 rounded-md text-base font-medium"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;