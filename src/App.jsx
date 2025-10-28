import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// Layout
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';

// Pages (Ensure all these end in .jsx)
import HomePage from './pages/HomePage.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import AnimalDetailPage from './pages/AnimalDetailPage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import BlogPage from './pages/BlogPage.jsx';
import AboutPage from './pages/AboutPage.jsx'; // This will fix the error

// Data
import { animalData } from './data/animalData.js';

export default function App() {
  const [page, setPage] = useState('home');
  const [pageProps, setPageProps] = useState({});

  /**
   * Main navigation function
   * @param {string} pageName - The key of the page to navigate to
   * @param {object} [data] - Optional data for dynamic pages
   */
  const navigateTo = (pageName, data = {}) => {
    setPage(pageName);
    setPageProps(data);
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  // Update document title based on page
  useEffect(() => {
    let title = 'Bangladeshi Animals';
    switch (page) {
      case 'home':
        title = 'Bangladeshi Animals - Home';
        break;
      case 'category':
        title = `${pageProps.categoryName || 'Category'} | Bangladeshi Animals`;
        break;
      case 'detail':
        const animal = animalData.find(a => a.id === pageProps.animalId);
        title = `${animal ? animal.name : 'Not Found'} | Bangladeshi Animals`;
        break;
      case 'search':
        title = 'Browse All Animals | Bangladeshi Animals';
        break;
      case 'blog':
        title = 'Blog | Bangladeshi Animals';
        break;
      case 'about':
        title = 'About | Bangladeshi Animals';
        break;
      default:
        title = 'Bangladeshi Animals';
    }
    document.title = title;
  }, [page, pageProps]);

  // Render the current page
  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage navigateTo={navigateTo} />;
      case 'category':
        return <CategoryPage navigateTo={navigateTo} categoryName={pageProps.categoryName} />;
      case 'detail':
        return <AnimalDetailPage navigateTo={navigateTo} animalId={pageProps.animalId} />;
      case 'search':
        return <SearchPage navigateTo={navigateTo} />;
      case 'blog':
        return <BlogPage navigateTo={navigateTo} />;
      case 'about':
        return <AboutPage navigateTo={navigateTo} />;
      default:
        return <HomePage navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="font-sans antialiased text-gray-900 bg-gray-50 min-h-screen flex flex-col">
      <Header navigateTo={navigateTo} />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {/* We use the 'page' state as a key to force re-mounting on page change */}
          {React.cloneElement(renderPage(), { key: page })}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}