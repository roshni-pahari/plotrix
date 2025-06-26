import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  Globe, 
  Star, 
  MessageCircle, 
  Info,
  ChevronDown,
  Loader2,
  AlertCircle,
  Film,
  Clapperboard,
  Image,
  ArrowUp,
  Sparkles,
  TrendingUp,
  Award,
  Clock,
  Zap
} from 'lucide-react';
import MovieChatBot from '../components/MovieChatBot';
import MovieDetails from '../components/MovieDetails';

const MainPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrigin, setSelectedOrigin] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showChatBot, setShowChatBot] = useState(false);
  const [showMovieInfo, setShowMovieInfo] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Configuration
  const API_BASE_URL = 'http://localhost:8000';
  const origins = ['American', 'Bollywood', 'British', 'Japanese', 'South_Korean'];
  const years = Array.from({ length: 18 }, (_, i) => 2000 + i);

  // Animation and scroll effects
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
      window.scrollTo(0, 0);
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError('');
    setSearchResults([]);

    try {
      const requestBody = {
        query: searchQuery.trim(),
        ...(selectedOrigin && { origin: selectedOrigin }),
        ...(selectedYear && { release_year: parseInt(selectedYear) })
      };

      const response = await fetch(`${API_BASE_URL}/search_movies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        if (response.status === 404) {
          setError('No matching movies found. Try adjusting your search query or filters.');
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } else {
        const data = await response.json();
        setSearchResults(data);
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search movies. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAskAboutMovie = (movie) => {
    setSelectedMovie(movie);
    setShowChatBot(true);
    setShowMovieInfo(false);
  };

  const handleGetMoreInfo = (movie) => {
    setSelectedMovie(movie);
    setShowMovieInfo(true);
    setShowChatBot(false);
  };

  const handleCloseModals = () => {
    setShowChatBot(false);
    setShowMovieInfo(false);
    setSelectedMovie(null);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedOrigin('');
    setSelectedYear('');
    setSearchResults([]);
    setError('');
  };

  const MovieCard = ({ movie, index }) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div 
        className={`transform transition-all duration-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
        style={{ transitionDelay: `${index * 100}ms` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900 rounded-2xl p-8 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 group hover:shadow-2xl hover:shadow-purple-500/10 relative overflow-hidden">
          {/* Animated background */}
          <div className={`absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
          
          {/* Floating elements */}
          <div className={`absolute top-6 right-6 transform transition-all duration-500 ${isHovered ? 'scale-110 rotate-12' : ''}`}>
            <div className="w-3 h-3 bg-purple-400 rounded-full opacity-60 animate-pulse"></div>
          </div>
          <div className={`absolute bottom-6 left-6 transform transition-all duration-700 delay-100 ${isHovered ? 'scale-110 -rotate-12' : ''}`}>
            <div className="w-2 h-2 bg-pink-400 rounded-full opacity-40 animate-bounce"></div>
          </div>

          <div className="relative flex flex-col lg:flex-row lg:gap-8">
            {/* Enhanced Movie Poster Section */}
            <div className="flex-shrink-0 mb-8 lg:mb-0">
              <div className="w-56 h-80 mx-auto lg:mx-0 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl overflow-hidden relative group-hover:shadow-2xl transition-all duration-500 transform ">
                {movie.poster_url && !imageError ? (
                  <>
                    {imageLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-700">
                        <div className="flex flex-col items-center space-y-3">
                          <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
                          <span className="text-sm text-purple-300">Loading poster...</span>
                        </div>
                      </div>
                    )}
                    <img
                      src={movie.poster_url}
                      alt={`${movie.title} poster`}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      onLoad={() => setImageLoading(false)}
                      onError={() => {
                        setImageError(true);
                        setImageLoading(false);
                      }}
                      style={{ display: imageLoading ? 'none' : 'block' }}
                    />
                    {/* Poster overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 bg-gradient-to-br from-gray-700 to-gray-800">
                    <Image className="h-20 w-20 mb-4 opacity-50" />
                    <span className="text-sm text-center px-4 opacity-70">Poster unavailable</span>
                  </div>
                )}
                
                {/* Enhanced match percentage with glow */}
                <div className="absolute top-4 right-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-sm opacity-60"></div>
                    <span className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-2 rounded-xl text-sm font-bold shadow-lg">
                      {(movie.relevance * 100).toFixed(1)}% match
                    </span>
                  </div>
                </div>

                {/* Hover play indicator */}
                <div className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/20 `}>
                  {/* <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 border border-white/20">
                    <Sparkles className="h-6 w-6 text-white animate-pulse" />
                  </div> */}
                </div>
              </div>
            </div>

            {/* Enhanced Movie Information Section */}
            <div className="flex-1 flex flex-col relative">
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                  <h3 className="text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 group-hover:bg-clip-text transition-all duration-500">
                    {movie.title}
                  </h3>
                </div>
                
                {/* Enhanced metadata */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  {movie.origin && (
                    <div className="flex items-center bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-full px-4 py-2">
                      <Globe className="h-4 w-4 mr-2 text-blue-400" />
                      <span className="text-blue-300 font-medium">{movie.origin}</span>
                    </div>
                  )}
                  {movie.release_year && (
                    <div className="flex items-center bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/20 rounded-full px-4 py-2">
                      <Calendar className="h-4 w-4 mr-2 text-green-400" />
                      <span className="text-green-300 font-medium">{movie.release_year}</span>
                    </div>
                  )}
                  {movie.genre && (
                    <div className="flex items-center bg-gradient-to-r from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-full px-4 py-2">
                      <Clapperboard className="h-4 w-4 mr-2 text-purple-400" />
                      <span className="text-purple-300 font-medium">{movie.genre}</span>
                    </div>
                  )}
                </div>
                
                {/* Enhanced plot section */}
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mr-3">
                      <Film className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-lg font-semibold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                      Plot Summary
                    </span>
                  </div>
                  <div className="relative bg-gradient-to-br from-gray-700/30 to-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30 group-hover:border-purple-500/30 transition-colors duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <p className="text-gray-200 leading-relaxed text-base relative z-10">
                      {movie.snippet || 'No plot summary available'}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => handleAskAboutMovie(movie)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 font-semibold flex-1 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 relative overflow-hidden group/btn"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"></div>
                  <MessageCircle className="h-5 w-5 relative z-10" />
                  <span className="relative z-10">Ask About Movie</span>
                  <Sparkles className="h-4 w-4 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 relative z-10" />
                </button>
                <button 
                  onClick={() => handleGetMoreInfo(movie)}
                  className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 font-semibold flex-1 transform hover:scale-105 hover:shadow-lg hover:shadow-gray-500/25 border border-gray-600/50 hover:border-gray-500/50 relative overflow-hidden group/btn"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-700 opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"></div>
                  <Info className="h-5 w-5 relative z-10" />
                  <span className="relative z-10">More Details</span>
                  <TrendingUp className="h-4 w-4 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 relative z-10" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 animate-bounce">
        <div className="w-4 h-4 bg-purple-400 rounded-full opacity-30 shadow-lg shadow-purple-400/50"></div>
      </div>
      <div className="absolute top-40 right-20 animate-pulse">
        <div className="w-3 h-3 bg-pink-400 rounded-full opacity-40 shadow-lg shadow-pink-400/50"></div>
      </div>
      <div className="absolute bottom-20 left-20 animate-bounce delay-1000">
        <div className="w-5 h-5 bg-yellow-400 rounded-full opacity-20 shadow-lg shadow-yellow-400/50"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Enhanced Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-6 py-2 mb-6">
            <Zap className="h-4 w-4 text-purple-400 animate-bounce" />
            <span className="text-sm font-medium text-purple-300">AI-Powered Discovery</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Find Your Perfect
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Movie Match
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Describe what you remember and let our advanced AI search through thousands of movies to find exactly what you're looking for
          </p>
        </div>

        {/* Enhanced Search Section */}
        <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-3xl p-10 mb-12 border border-gray-700/50 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5 rounded-3xl"></div>
            
            <div className="space-y-8 relative z-10">
              {/* Enhanced Main Search Input */}
              <div className="relative">
                <label className="block text-lg font-semibold mb-4 text-gray-200 flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-purple-400" />
                  Describe the movie plot, characters, or scenes
                </label>
                <div className="relative group">
                  <Search className="absolute left-6 top-6 h-6 w-6 text-gray-400 group-focus-within:text-purple-400 transition-colors duration-300" />
                  <textarea
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g., A skilled thief who enters dreams to steal secrets but must plant an idea instead..."
                    className="w-full pl-16 pr-6 py-6 bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 resize-none text-lg leading-relaxed"
                    rows="4"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                        handleSearch();
                      }
                    }}
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Enhanced Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Origin Filter */}
                <div>
                  <label className="block text-lg font-semibold mb-4 text-gray-200 flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-blue-400" />
                    Origin (Optional)
                  </label>
                  <div className="relative group">
                    <select
                      value={selectedOrigin}
                      onChange={(e) => setSelectedOrigin(e.target.value)}
                      className="w-full px-6 py-4 bg-gray-700/100 backdrop-blur-sm border border-gray-600/50 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 appearance-none text-lg"
                    >
                      <option value="">All Origins</option>
                      {origins.map(origin => (
                        <option key={origin} value={origin}>{origin}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-4 h-6 w-6 text-gray-400 pointer-events-none group-focus-within:text-purple-400 transition-colors duration-300" />
                  </div>
                </div>

                {/* Year Filter */}
                <div>
                  <label className="block text-lg font-semibold mb-4 text-gray-200 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-green-400" />
                    Release Year (Optional)
                  </label>
                  <div className="relative group">
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full px-6 py-4 bg-gray-700/100 backdrop-blur-sm border border-gray-600/50 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 appearance-none text-lg"
                    >
                      <option value="">All Years</option>
                      {years.reverse().map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-4 h-6 w-6 text-gray-400 pointer-events-none group-focus-within:text-purple-400 transition-colors duration-300" />
                  </div>
                </div>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-6">
                <button
                  type="button"
                  onClick={handleSearch}
                  disabled={!searchQuery.trim() || isLoading}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 px-10 py-5 rounded-2xl transition-all duration-300 font-bold flex items-center justify-center space-x-3 text-xl transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  {isLoading ? (
                    <>
                      <Loader2 className="h-6 w-6 animate-spin relative z-10" />
                      <span className="relative z-10">Searching...</span>
                    </>
                  ) : (
                    <>
                      <Search className="h-6 w-6 relative z-10" />
                      <span className="relative z-10">Search Movies</span>
                      <Zap className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10" />
                    </>
                  )}
                </button>
                
                {(searchQuery || selectedOrigin || selectedYear || searchResults.length > 0) && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="px-8 py-5 bg-gray-700/50 hover:bg-gray-600/50 backdrop-blur-sm border border-gray-600/50 hover:border-gray-500/50 rounded-2xl transition-all duration-300 font-semibold text-lg transform hover:scale-105"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Error Display */}
        {error && (
          <div className={`transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-gradient-to-r from-red-900/20 to-red-800/20 backdrop-blur-sm border border-red-500/30 rounded-2xl p-6 mb-10 flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-red-400" />
                </div>
              </div>
              <p className="text-red-300 text-lg">{error}</p>
            </div>
          </div>
        )}

        {/* Enhanced Results Section */}
        {searchResults.length > 0 && (
          <div className="space-y-8">
            <div className={`transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-white flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mr-4">
                    <Star className="h-5 w-5 text-white" />
                  </div>
                  Search Results ({searchResults.length})
                </h2>
                <div className="text-lg text-gray-300 bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700/50">
                  Found {searchResults.length} matching movie{searchResults.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
            
            <div className="space-y-10">
              {searchResults.map((movie, index) => (
                <MovieCard key={index} movie={movie} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Empty State */}
        {searchResults.length === 0 && !isLoading && !error && (
          <div className={`text-center py-20 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="w-32 h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center mx-auto mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full animate-pulse"></div>
              <Search className="h-16 w-16 text-gray-500 relative z-10" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-300">Ready to Discover</h3>
            <p className="text-gray-400 max-w-lg mx-auto text-lg leading-relaxed">
              Describe a movie plot, characters, or memorable scenes. Our AI will help you find what you're looking for from our vast collection.
            </p>
          </div>
        )}
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-2xl shadow-purple-500/25 z-50 border border-purple-500/30"
        >
          <ArrowUp className="h-6 w-6 text-white" />
        </button>
      )}

       {/* ChatBot Modal */}
      {showChatBot && selectedMovie && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh]">
            <MovieChatBot movie={selectedMovie} onClose={handleCloseModals} />
          </div>
        </div>
      )}

      {/* Movie Details Modal */}
      {showMovieInfo && selectedMovie && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-2xl max-w-5xl w-full max-h-[90vh]">
            <MovieDetails movie={selectedMovie} onClose={handleCloseModals} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;