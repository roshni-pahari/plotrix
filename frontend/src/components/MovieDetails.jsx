import React, { useState, useEffect } from 'react';
import { 
  Loader2, 
  Star, 
  Calendar, 
  Globe, 
  DollarSign, 
  Award, 
  Users, 
  Film,
  Heart,
  AlertCircle,
  RotateCcw,
  Clapperboard,
  X,
  Sparkles,
  TrendingUp,
  Quote,
  Zap
} from 'lucide-react';

const MovieDetails = ({ movie, onClose }) => {
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const API_BASE_URL = 'http://localhost:8000';

  // Animation effect
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const fetchMovieDetails = async () => {
    setIsLoading(true);
    setError('');
    setMovieData(null);

    try {
      const requestBody = {
        title: movie.title,
        plot: movie.snippet,
        genre: movie.genre,
        origin: movie.origin || 'Unknown',
        release_year: movie.release_year || 2000
      };

      const response = await fetch(`${API_BASE_URL}/movie_metadata`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Movie details not found in our database.');
        } else {
          throw new Error(`API error: ${response.status}`);
        }
      }

      const data = await response.json();
      const parsedData = parseMovieResponse(data.response);
      setMovieData(parsedData);
      
    } catch (err) {
      console.error('Movie details error:', err);
      setError(err.message || 'Failed to fetch movie details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const parseMovieResponse = (response) => {
    const lines = response.split('\n');
    const data = {};
    
    lines.forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length > 0) {
        const value = valueParts.join(':').trim();
        const cleanKey = key.trim().toLowerCase().replace(/\s+/g, '_');
        data[cleanKey] = value;
      }
    });

    return data;
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [movie]);

  const DetailRow = ({ icon: Icon, label, value, isArray = false, color = 'purple' }) => {
    if (!value || value === 'Unknown' || value === '') return null;
    
    const colorClasses = {
      purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
      blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
      green: 'bg-green-500/10 border-green-500/20 text-green-400',
      yellow: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
      pink: 'bg-pink-500/10 border-pink-500/20 text-pink-400',
      red: 'bg-red-500/10 border-red-500/20 text-red-400'
    };
    
    return (
      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-500">
          <div className="flex items-start space-x-4">
            <div className={`w-12 h-12 ${colorClasses[color]} rounded-xl flex items-center justify-center border flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-2">{label}</p>
              {isArray ? (
                <div className="flex flex-wrap gap-2">
                  {value.split(',').map((item, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-gray-700/80 to-gray-800/80 backdrop-blur-sm px-3 py-2 rounded-full text-sm text-gray-200 border border-gray-600/50 hover:border-purple-500/50 transition-colors duration-300"
                    >
                      {item.trim()}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-white leading-relaxed text-lg">{value}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full max-h-[90vh] bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-10 right-10 animate-pulse">
        <div className="w-3 h-3 bg-purple-400 rounded-full opacity-30"></div>
      </div>
      <div className="absolute bottom-20 left-10 animate-bounce delay-1000">
        <div className="w-4 h-4 bg-pink-400 rounded-full opacity-20"></div>
      </div>

      {/* Enhanced Header */}
      <div className={`transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border-b border-gray-700/50 p-8">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5"></div>
          
          <div className="relative flex items-start justify-between">
            <div className="flex-1 pr-8">
              <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-4">
                <Sparkles className="h-4 w-4 text-purple-400" />
                <span className="text-sm font-medium text-purple-300">Movie Details</span>
              </div>
              
              <h2 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  {movie.title}
                </span>
              </h2>
              
              <div className="flex flex-wrap items-center gap-4 text-sm">
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
            </div>
            
            <button
              onClick={onClose}
              className="w-12 h-12 bg-gray-700/50 hover:bg-gray-600/50 backdrop-blur-sm border border-gray-600/50 hover:border-purple-500/50 rounded-xl transition-all duration-300 flex items-center justify-center group"
            >
              <X className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        {isLoading && (
          <div className={`transform transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <Loader2 className="h-8 w-8 animate-spin text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Loading Details</h3>
                <p className="text-gray-300">Gathering comprehensive movie information...</p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className={`transform transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex items-center justify-center py-20">
              <div className="text-center max-w-md">
                <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="h-8 w-8 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-red-200 mb-4">Unable to Load Details</h3>
                <p className="text-red-300 mb-6 leading-relaxed">{error}</p>
                <button
                  onClick={fetchMovieDetails}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 rounded-xl transition-all duration-300 flex items-center mx-auto space-x-2 transform hover:scale-105"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Try Again</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {movieData && (
          <div className={`space-y-8 transform transition-all duration-700 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Plot Summary */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-500">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                    <Film className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                    Plot Summary
                  </h3>
                </div>
                <p className="text-gray-200 leading-relaxed text-lg">{movie.snippet}</p>
              </div>
            </div>

            {/* Movie Details Grid */}
            <div className="grid gap-6">
              <DetailRow 
                icon={Users} 
                label="Director" 
                value={movieData.director}
                color="blue"
              />
              
              <DetailRow 
                icon={Users} 
                label="Lead Actors" 
                value={movieData.lead_actors}
                isArray={true}
                color="green"
              />
              
              <DetailRow 
                icon={DollarSign} 
                label="Box Office" 
                value={movieData.box_office}
                color="yellow"
              />
              
              <DetailRow 
                icon={Star} 
                label="IMDb Rating" 
                value={movieData.imdb_rating}
                color="yellow"
              />
              
              <DetailRow 
                icon={Award} 
                label="Awards" 
                value={movieData.awards}
                isArray={true}
                color="pink"
              />
              
              <DetailRow 
                icon={Heart} 
                label="Mood Tags" 
                value={movieData.mood_tags}
                isArray={true}
                color="red"
              />
              
              <DetailRow 
                icon={TrendingUp} 
                label="Similar Movies" 
                value={movieData.similar_movies}
                isArray={true}
                color="purple"
              />
            </div>

            {/* Iconic Line */}
            {movieData.iconic_line && (
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-sm opacity-60"></div>
                <div className="relative bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
                      <Quote className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-purple-300">Iconic Quote</h4>
                  </div>
                  <blockquote className="text-white italic text-xl leading-relaxed">
                    "{movieData.iconic_line}"
                  </blockquote>
                </div>
              </div>
            )}
          </div>
        )}

        {!isLoading && !error && !movieData && (
          <div className={`text-center py-20 transform transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="w-24 h-24 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center mx-auto mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full animate-pulse"></div>
              <Film className="h-12 w-12 text-gray-500 relative z-10" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-300">No Details Available</h3>
            <p className="text-gray-400 max-w-lg mx-auto text-lg leading-relaxed">
              Movie details are not available at the moment. Please try again later.
            </p>
          </div>
        )}
      </div>

      {/* Enhanced Footer */}
      <div className={`transform transition-all duration-700 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border-t border-gray-700/50 p-8">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5"></div>
          
          <div className="relative flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center text-sm text-gray-400">
              <Zap className="h-4 w-4 mr-2 text-purple-400" />
              <span>Powered by AI • Movie data may vary</span>
            </div>
            
            <div className="flex space-x-4">
              {movieData && (
                <button
                  onClick={fetchMovieDetails}
                  className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 px-6 py-3 rounded-xl transition-all duration-300 flex items-center space-x-2 border border-gray-600/50 hover:border-gray-500/50 transform hover:scale-105"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Refresh</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-3 rounded-xl transition-all duration-300 font-semibold transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;