import React, { useState } from 'react';
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
  Image
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

  

  // Configuration
  const API_BASE_URL = 'http://localhost:8000';
  const origins = ['American', 'Bollywood', 'British', 'Japanese', 'South_Korean'];
  const years = Array.from({ length: 18 }, (_, i) => 2000 + i);

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

    return (
      <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group">
        <div className="flex flex-col lg:flex-row lg:gap-6">
          {/* Movie Poster Section */}
          <div className="flex-shrink-0 mb-6 lg:mb-0">
            <div className="w-48 h-72 mx-auto lg:mx-0 bg-gray-700 rounded-lg overflow-hidden relative group-hover:shadow-2xl transition-shadow duration-300">
              {movie.poster_url && !imageError ? (
                <>
                  {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
                    </div>
                  )}
                  <img
                    src={movie.poster_url}
                    alt={`${movie.title} poster`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onLoad={() => setImageLoading(false)}
                    onError={() => {
                      setImageError(true);
                      setImageLoading(false);
                    }}
                    style={{ display: imageLoading ? 'none' : 'block' }}
                  />
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
                  <Image className="h-16 w-16 mb-2" />
                  <span className="text-sm text-center px-2">No poster available</span>
                </div>
              )}
              
              {/* Overlay with match percentage */}
              <div className="absolute top-3 right-3">
                <span className="bg-purple-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-sm font-medium">
                  {(movie.relevance * 100).toFixed(1)}% match
                </span>
              </div>
            </div>
          </div>

          {/* Movie Information Section */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                  {movie.title}
                </h3>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-400">
                {movie.origin && (
                  <span className="flex items-center">
                    <Globe className="h-4 w-4 mr-1" />
                    {movie.origin}
                  </span>
                )}
                {movie.release_year && (
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {movie.release_year}
                  </span>
                )}
                {movie.genre && (
                  <span className="flex items-center">
                    <Clapperboard className="h-4 w-4 mr-1" />
                    {movie.genre}
                  </span>
                )}
              </div>
              
              {/* Movie Description/Plot */}
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <Film className="h-4 w-4 text-purple-400 mr-2" />
                  <span className="text-sm font-medium text-purple-300">Plot Summary</span>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-4 border-l-4 border-purple-500">
                  <p className="text-gray-200 leading-relaxed text-base">
                    {movie.snippet || 'No plot summary available'}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => handleAskAboutMovie(movie)}
                className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 font-medium flex-1"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Ask About Movie</span>
              </button>
              <button 
                onClick={() => handleGetMoreInfo(movie)}
                className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 font-medium flex-1"
              >
                <Info className="h-4 w-4" />
                <span>More Details</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Movie Discovery
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Describe what you remember and let AI find your movie
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-gray-800 rounded-2xl p-8 mb-8 border border-gray-700">
          <div className="space-y-6">
            {/* Main Search Input */}
            <div className="relative">
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Describe the movie plot, characters, or scenes
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <textarea
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g., 'A skilled thief who enters dreams to steal secrets but must plant an idea instead...'"
                  className="w-full pl-12 pr-4 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                  rows="3"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                      handleSearch();
                    }
                  }}
                />
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Origin Filter */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  <Globe className="inline h-4 w-4 mr-1" />
                  Origin (Optional)
                </label>
                <div className="relative">
                  <select
                    value={selectedOrigin}
                    onChange={(e) => setSelectedOrigin(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 appearance-none"
                  >
                    <option value="">All Origins</option>
                    {origins.map(origin => (
                      <option key={origin} value={origin}>{origin}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Year Filter */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Release Year (Optional)
                </label>
                <div className="relative">
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 appearance-none"
                  >
                    <option value="">All Years</option>
                    {years.reverse().map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={handleSearch}
                disabled={!searchQuery.trim() || isLoading}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 px-8 py-4 rounded-xl transition-all duration-200 font-semibold flex items-center justify-center space-x-2 text-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5" />
                    <span>Search Movies</span>
                  </>
                )}
              </button>
              
              {(searchQuery || selectedOrigin || selectedYear || searchResults.length > 0) && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="px-6 py-4 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors duration-200 font-semibold"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-4 mb-8 flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {/* Results Section */}
        {searchResults.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <Star className="h-6 w-6 text-yellow-400 mr-2" />
                Search Results ({searchResults.length})
              </h2>
              <div className="text-sm text-gray-400">
                Found {searchResults.length} matching movie{searchResults.length !== 1 ? 's' : ''}
              </div>
            </div>
            
            <div className="space-y-8">
              {searchResults.map((movie, index) => (
                <MovieCard key={index} movie={movie} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {searchResults.length === 0 && !isLoading && !error && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-12 w-12 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-400">Ready to Search</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Describe a movie plot, characters, or memorable scenes. Our AI will help you find what you're looking for.
            </p>
          </div>
        )}
      </div>

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