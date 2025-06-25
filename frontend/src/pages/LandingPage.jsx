import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  Film, 
  Brain, 
  Globe, 
  Clock, 
  Star, 
  ArrowRight, 
  Play,
  MessageCircle,
  Database,
  Zap
} from 'lucide-react';

const LandingPage = ({ onNavigateToMain }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const features = [
    {
      icon: <Brain className="h-8 w-8 text-purple-400" />,
      title: "AI-Powered Search",
      description: "Describe what you remember - our AI understands context and finds the perfect match"
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-blue-400" />,
      title: "Movie Insights",
      description: "Ask questions about any movie and get intelligent, contextual answers"
    },
    {
      icon: <Database className="h-8 w-8 text-green-400" />,
      title: "Rich Metadata",
      description: "Get detailed info including cast, box office, ratings, and similar movies"
    }
  ];

  const origins = [
    { name: "American", count: "3,785", flag: "🇺🇸" },
    { name: "Bollywood", count: "1,105", flag: "🇮🇳" },
    { name: "British", count: "971", flag: "🇬🇧" },
    { name: "Japanese", count: "680", flag: "🇯🇵" },
    { name: "South Korean", count: "395", flag: "🇰🇷" }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to main page when search is submitted
    if (searchQuery.trim()) {
      onNavigateToMain();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            {/* Hero Badge */}
            <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-8">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium text-purple-300">Powered by MindsDB AI</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Rediscover Movies
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Through AI Magic
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Can't remember a movie title? Just describe the plot, characters, or scenes you remember. 
              Our AI will find it instantly from over <span className="text-purple-400 font-semibold">7,000 movies</span>.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g., 'A movie about dreams within dreams with Leonardo DiCaprio...'"
                  className="w-full pl-12 pr-32 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 pr-2 flex items-center"
                >
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-2 rounded-xl transition-all duration-200 font-medium flex items-center space-x-2">
                    <span>Search</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </button>
              </div>
            </form>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={onNavigateToMain}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-xl transition-all duration-200 font-semibold flex items-center justify-center space-x-2 text-lg"
              >
                <Play className="h-5 w-5" />
                <span>Try Demo Search</span>
              </button>
              <button 
                onClick={onNavigateToMain}
                className="border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 px-8 py-4 rounded-xl transition-all duration-200 font-semibold flex items-center justify-center space-x-2 text-lg"
              >
                <Film className="h-5 w-5" />
                <span>Browse Movies</span>
              </button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-bounce">
          <div className="w-3 h-3 bg-purple-400 rounded-full opacity-70"></div>
        </div>
        <div className="absolute top-40 right-20 animate-pulse">
          <div className="w-2 h-2 bg-pink-400 rounded-full opacity-60"></div>
        </div>
        <div className="absolute bottom-20 left-20 animate-bounce delay-1000">
          <div className="w-4 h-4 bg-yellow-400 rounded-full opacity-50"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Powered by Advanced AI
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the future of movie discovery with our intelligent search and analysis tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:-translate-y-2"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-white">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Movie Origins Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Global Cinema Collection
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore movies from around the world with our diverse collection
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {origins.map((origin, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6 text-center hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="text-3xl mb-3">{origin.flag}</div>
                <h3 className="font-semibold mb-2 text-white">{origin.name}</h3>
                <div className="text-2xl font-bold text-purple-400 mb-1">{origin.count}</div>
                <div className="text-sm text-gray-400">movies</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Three simple steps to rediscover your favorite movies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Describe</h3>
              <p className="text-gray-300">Tell us what you remember about the movie - plot, actors, scenes, or any details</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4">AI Search</h3>
              <p className="text-gray-300">Our AI analyzes your description and finds matching movies using semantic search</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Discover</h3>
              <p className="text-gray-300">Get detailed movie information, ask questions, and explore similar recommendations</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900 to-pink-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Rediscover Movies?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of movie lovers who've already found their forgotten favorites
          </p>
          <button 
            onClick={onNavigateToMain}
            className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-4 rounded-xl transition-all duration-200 font-bold text-lg flex items-center justify-center space-x-2 mx-auto"
          >
            <Search className="h-5 w-5" />
            <span>Start Your Search Journey</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;