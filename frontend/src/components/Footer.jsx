import React from 'react';
import { Film, Sparkles, Heart, Github, Twitter, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative">
                <Film className="h-8 w-8 text-purple-400" />
                <Sparkles className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Plotrix
              </span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Discover movies through AI-powered semantic search. Describe what you remember, 
              and let our intelligent system find the perfect match from thousands of films.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="#discover" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Discover Movies
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-white transition-colors duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-400">Features</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Semantic Search</li>
              <li className="text-gray-300">AI Movie Insights</li>
              <li className="text-gray-300">Metadata Enrichment</li>
              <li className="text-gray-300">Multi-language Support</li>
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-400">7k+</div>
              <div className="text-sm text-gray-400">Movies</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">5</div>
              <div className="text-sm text-gray-400">Origins</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">18</div>
              <div className="text-sm text-gray-400">Years Range</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">AI</div>
              <div className="text-sm text-gray-400">Powered</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">24/7</div>
              <div className="text-sm text-gray-400">Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center text-sm text-gray-400 mb-2 sm:mb-0">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-400 mx-1" />
              <span>for MindsDB Competition</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">
                © 2025 Plotrix. All rights reserved.
              </span>
              <button
                onClick={scrollToTop}
                className="bg-purple-600 hover:bg-purple-700 p-2 rounded-full transition-colors duration-200"
                aria-label="Scroll to top"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;