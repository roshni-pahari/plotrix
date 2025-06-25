import React, { useState } from 'react';
import { Film, Menu, X, Search, Sparkles } from 'lucide-react';

const Navbar = ({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (page) => {
    onNavigate(page);
    setIsMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Film className="h-8 w-8 text-purple-400" />
              <Sparkles className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Plotrix
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button 
                onClick={() => handleNavigation('landing')}
                className={`hover:text-purple-400 transition-colors duration-200 font-medium ${
                  currentPage === 'landing' ? 'text-purple-400' : ''
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => handleNavigation('main')}
                className={`hover:text-purple-400 transition-colors duration-200 font-medium ${
                  currentPage === 'main' ? 'text-purple-400' : ''
                }`}
              >
                Discover
              </button>
              <a 
                href="#about" 
                className="hover:text-purple-400 transition-colors duration-200 font-medium"
              >
                About
              </a>
              <a 
                href="#contact" 
                className="hover:text-purple-400 transition-colors duration-200 font-medium"
              >
                Contact
              </a>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button 
              onClick={() => handleNavigation('main')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4 py-2 rounded-lg transition-all duration-200 font-medium flex items-center space-x-2"
            >
              <Search className="h-4 w-4" />
              <span>Start Searching</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800 rounded-lg mt-2">
              <button 
                onClick={() => handleNavigation('landing')}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:text-purple-400 hover:bg-gray-700 transition-colors duration-200 ${
                  currentPage === 'landing' ? 'text-purple-400 bg-gray-700' : ''
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => handleNavigation('main')}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:text-purple-400 hover:bg-gray-700 transition-colors duration-200 ${
                  currentPage === 'main' ? 'text-purple-400 bg-gray-700' : ''
                }`}
              >
                Discover
              </button>
              <a 
                href="#about" 
                className="block px-3 py-2 rounded-md text-base font-medium hover:text-purple-400 hover:bg-gray-700 transition-colors duration-200"
              >
                About
              </a>
              <a 
                href="#contact" 
                className="block px-3 py-2 rounded-md text-base font-medium hover:text-purple-400 hover:bg-gray-700 transition-colors duration-200"
              >
                Contact
              </a>
              <button 
                onClick={() => handleNavigation('main')}
                className="w-full mt-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4 py-2 rounded-lg transition-all duration-200 font-medium flex items-center justify-center space-x-2"
              >
                <Search className="h-4 w-4" />
                <span>Start Searching</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;