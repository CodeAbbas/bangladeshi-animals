import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = ({ handleNav }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "mammals", label: "Mammals" },
    { id: "birds", label: "Birds" },
    { id: "reptiles", label: "Reptiles" },
    { id: "amphibians", label: "Amphibians" },
    { id: "fish", label: "Fish" },
    { id: "insects", label: "Insects" },
  ];

  return (
    <header className="bg-white/90 backdrop-blur-md fixed top-0 left-0 right-0 z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* 🔹 Logo Section */}
          <button
            onClick={() => handleNav("home")}
            className="flex items-center text-bangla-green focus:outline-none focus-visible:ring-2 focus-visible:ring-bangla-green rounded-md"
            aria-label="Homepage"
          >
            <img
              src="/src/assets/tiger.webp"
              alt="Tiger Logo"
              className="h-9 w-9 object-cover rounded-full"
            />
            <span className="ml-2 text-xl font-bold">Bangladeshi Animals</span>
          </button>

          {/* 🔹 Desktop Nav */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className="text-gray-700 hover:text-bangla-green transition font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* 🔹 Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* 🔹 Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-100">
          <nav className="flex flex-col p-4 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  handleNav(item.id);
                  setMenuOpen(false);
                }}
                className="text-gray-700 hover:text-bangla-green text-left transition font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
