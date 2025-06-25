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
  Clapperboard
} from 'lucide-react';

const MovieDetails = ({ movie, onClose }) => {
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const API_BASE_URL = 'http://localhost:8000';

  const fetchMovieDetails = async () => {
    setIsLoading(true);
    setError('');
    setMovieData(null);

    try {
      // For the metadata endpoint, we need all required fields
      // We'll use placeholder values for missing data
      const requestBody = {
        title: movie.title,
        plot: movie.snippet,
        genre: movie.genre, // Placeholder since we don't have genre from search results
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
      
      // Parse the response string into structured data
      const parsedData = parseMovieResponse(data.response);
      setMovieData(parsedData);
      
    } catch (err) {
      console.error('Movie details error:', err);
      setError(err.message || 'Failed to fetch movie details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Parse the AI response into structured data
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

  // Load data on component mount
  useEffect(() => {
    fetchMovieDetails();
  }, [movie]);

  const DetailRow = ({ icon: Icon, label, value, isArray = false }) => {
    if (!value || value === 'Unknown' || value === '') return null;
    
    return (
      <div className="flex items-start space-x-3 p-3 bg-gray-800/50 rounded-lg">
        <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon className="h-4 w-4 text-purple-400" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-300 mb-1">{label}</p>
          {isArray ? (
            <div className="flex flex-wrap gap-2">
              {value.split(',').map((item, index) => (
                <span
                  key={index}
                  className="bg-gray-700 px-2 py-1 rounded text-sm text-gray-200"
                >
                  {item.trim()}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-white leading-relaxed">{value}</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full max-h-[80vh]">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        <div>
          <h2 className="text-2xl font-bold text-white">{movie.title}</h2>
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
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
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors p-2"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-purple-400 mx-auto mb-4" />
              <p className="text-gray-300">Loading movie details...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center max-w-md">
              <AlertCircle className="h-8 w-8 text-red-400 mx-auto mb-4" />
              <p className="text-red-300 mb-4">{error}</p>
              <button
                onClick={fetchMovieDetails}
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors flex items-center mx-auto space-x-2"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Try Again</span>
              </button>
            </div>
          </div>
        )}

        {movieData && (
          <div className="space-y-4">
            {/* Plot Summary */}
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                <Film className="h-5 w-5 mr-2 text-purple-400" />
                Plot Summary
              </h3>
              <p className="text-gray-300 leading-relaxed">{movie.snippet}</p>
            </div>

            {/* Movie Details Grid */}
            <div className="grid gap-4">
              <DetailRow 
                icon={Users} 
                label="Director" 
                value={movieData.director} 
              />
              
              <DetailRow 
                icon={Users} 
                label="Lead Actors" 
                value={movieData.lead_actors}
                isArray={true}
              />
              
              <DetailRow 
                icon={DollarSign} 
                label="Box Office" 
                value={movieData.box_office} 
              />
              
              <DetailRow 
                icon={Star} 
                label="IMDb Rating" 
                value={movieData.imdb_rating} 
              />
              
              <DetailRow 
                icon={Award} 
                label="Awards" 
                value={movieData.awards}
                isArray={true}
              />
              
              <DetailRow 
                icon={Heart} 
                label="Mood Tags" 
                value={movieData.mood_tags}
                isArray={true}
              />
              
              <DetailRow 
                icon={Film} 
                label="Similar Movies" 
                value={movieData.similar_movies}
                isArray={true}
              />

              {/* Iconic Line */}
              {movieData.iconic_line && (
                <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-purple-300 mb-2">Iconic Line</h4>
                  <blockquote className="text-white italic text-lg">
                    "{movieData.iconic_line}"
                  </blockquote>
                </div>
              )}
            </div>

            {/* Raw Data Debug (can be removed in production) */}
            {process.env.NODE_ENV === 'development' && (
              <details className="bg-gray-800/30 rounded-lg p-4">
                <summary className="text-gray-400 cursor-pointer text-sm">
                  Raw API Response (Debug)
                </summary>
                <pre className="text-xs text-gray-500 mt-2 overflow-x-auto">
                  {JSON.stringify(movieData, null, 2)}
                </pre>
              </details>
            )}
          </div>
        )}

        {!isLoading && !error && !movieData && (
          <div className="text-center py-12">
            <Film className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No movie details available</p>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t border-gray-700">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Powered by AI • Movie data may vary
          </div>
          <div className="flex space-x-3">
            {movieData && (
              <button
                onClick={fetchMovieDetails}
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Refresh</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;