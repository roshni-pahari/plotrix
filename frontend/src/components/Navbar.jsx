import React, { useState } from 'react';
import { Film, Menu, X, Search, Play, Star } from 'lucide-react';

const Navbar = ({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (page) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  const handleContactClick = () => {
    window.open('https://github.com/roshni-pahari', '_blank');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 backdrop-blur-md border-b border-purple-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Enhanced Logo */}
          <button 
            onClick={() => handleNavigation('landing')}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-300"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-slate-800 p-2 rounded-lg">
                <Film className="h-6 w-6 text-purple-400" />
                <Play className="h-3 w-3 text-pink-400 absolute -bottom-1 -right-1" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 bg-clip-text text-transparent">
                Plotrix
              </span>
              <span className="text-xs text-purple-300/70 -mt-1">Movie Discovery</span>
            </div>
          </button>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {[
                { key: 'landing', label: 'Home', icon: null },
                { key: 'main', label: 'Discover', icon: Star },
                { key: 'about', label: 'About', icon: null },
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => handleNavigation(key)}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 group ${
                    currentPage === key
                      ? 'text-white bg-purple-600/30 border border-purple-500/30'
                      : 'text-purple-200 hover:text-white hover:bg-purple-600/20'
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  <span>{label}</span>
                </button>
              ))}
              <button
                onClick={handleContactClick}
                className="px-4 py-2 rounded-lg font-medium text-purple-200 hover:text-white hover:bg-purple-600/20 transition-all duration-300"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Enhanced CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={() => handleNavigation('main')}
              className="relative group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-6 py-2.5 rounded-xl transition-all duration-300 font-medium flex items-center space-x-2 shadow-lg hover:shadow-purple-500/25"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-800 rounded-xl blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
              <Search className="h-4 w-4 relative z-10" />
              <span className="relative z-10">Start Exploring</span>
            </button>
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-purple-200 hover:text-white hover:bg-purple-600/20 focus:outline-none transition-all duration-300"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-3 pt-3 pb-4 space-y-2 bg-slate-800/80 backdrop-blur-md rounded-xl mt-3 border border-purple-500/20">
              {[
                { key: 'landing', label: 'Home', icon: null },
                { key: 'main', label: 'Discover', icon: Star },
                { key: 'about', label: 'About', icon: null },
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => handleNavigation(key)}
                  className={`flex items-center space-x-3 w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    currentPage === key
                      ? 'text-white bg-purple-600/30 border border-purple-500/30'
                      : 'text-purple-200 hover:text-white hover:bg-purple-600/20'
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  <span>{label}</span>
                </button>
              ))}
              <button
                onClick={handleContactClick}
                className="flex items-center space-x-3 w-full text-left px-4 py-3 rounded-lg font-medium text-purple-200 hover:text-white hover:bg-purple-600/20 transition-all duration-300"
              >
                <span>Contact</span>
              </button>
              <div className="pt-2 border-t border-purple-500/20">
                <button
                  onClick={() => handleNavigation('main')}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-4 py-3 rounded-xl transition-all duration-300 font-medium flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Search className="h-4 w-4" />
                  <span>Start Exploring</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;