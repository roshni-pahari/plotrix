import React, { useState, useEffect } from 'react';
import { 
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
  Zap,
  BookOpen,
  Image,
  Users,
  CheckCircle
} from 'lucide-react';

// Import movie posters - keeping your original imports
import movie1 from '../assets/movie1.jpg';
import movie2 from '../assets/movie2.jpg';
import movie3 from '../assets/movie3.jpg';
import movie4 from '../assets/movie4.jpg';
import movie5 from '../assets/movie5.jpg';
import movie6 from '../assets/movie6.jpg';
import movie7 from '../assets/movie7.jpg';
import movie8 from '../assets/movie8.jpg';
import movie9 from '../assets/movie9.jpg';
import movie10 from '../assets/movie10.jpg';

const LandingPage = ({ onNavigateToMain, onNavigateToAbout }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [currentPlotIndex, setCurrentPlotIndex] = useState(0);

  // Movie posters array - keeping your original array
  const moviePosters = [movie1, movie2, movie3, movie4, movie5, movie6, movie7, movie8, movie9, movie10];

  // Movie plot examples (2000-2017)
  const moviePlots = [
    "A movie about dreams within dreams",
    "Teenagers trapped in a deadly game show",
    "A man who ages backwards through time",
    "Superhero who loses his memory and lives in reverse",
    "Wall-E robot falls in love in space dystopia",
    "Social network created by Harvard students",
    "Passengers wake up early on space journey"
  ];

  // Scroll to top and trigger animations on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Enhanced movie poster rotation with smoother transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % moviePosters.length);
    }, 2000); // Slower transition for better viewing
    return () => clearInterval(interval);
  }, [moviePosters.length]);

  // Plot examples rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlotIndex((prevIndex) => (prevIndex + 1) % moviePlots.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [moviePlots.length]);

  const features = [
    {
      icon: <Brain className="h-8 w-8 text-purple-400" />,
      title: "AI-Powered Search",
      description: "Describe what you remember in natural language - our AI understands context and finds the perfect match from over 7,000 movies"
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-blue-400" />,
      title: "Interactive Movie Chat",
      description: "Ask detailed questions about any movie and get intelligent, contextual answers about plot, cast, and behind-the-scenes info"
    },
    {
      icon: <Database className="h-8 w-8 text-green-400" />,
      title: "Rich Movie Database",
      description: "Access comprehensive details including cast, box office data, ratings, and plot summaries with visual movie discovery"
    },
    {
      icon: <Image className="h-8 w-8 text-pink-400" />,
      title: "Visual Discovery",
      description: "High-quality posters and visual elements enhance your browsing experience and help identify movies at a glance"
    }
  ];

  const origins = [
    { name: "American", count: "3,785", flag: "🇺🇸" },
    { name: "Bollywood", count: "1,105", flag: "🇮🇳" },
    { name: "British", count: "971", flag: "🇬🇧" },
    { name: "Japanese", count: "680", flag: "🇯🇵" },
    { name: "South Korean", count: "395", flag: "🇰🇷" }
  ];

  const benefits = [
    "Never lose track of a movie again - just describe what you remember",
    "Get instant answers to detailed questions about any movie",
    "Discover hidden gems through AI-powered recommendations",
    "Access comprehensive movie information in one place"
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900/50 to-gray-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          {/* Content Section */}
          <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            

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
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-4xl mx-auto">
              Can't remember a movie title? Just describe the plot, characters, or scenes you remember. 
              Our AI will find it instantly from over <span className="text-purple-400 font-semibold">7,000 movies</span>.
            </p>

            {/* Scrolling Plot Examples */}
            <div className="mb-8 max-w-2xl mx-auto">
              <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 min-h-[100px] flex flex-col items-center justify-center overflow-hidden">
                <p className="text-sm text-purple-300 font-medium mb-3">Try searching for:</p>
                <div className="relative h-8 w-full overflow-hidden">
                  {moviePlots.map((plot, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out ${
                        index === currentPlotIndex 
                          ? 'opacity-100 transform translate-y-0' 
                          : 'opacity-0 transform translate-y-8'
                      }`}
                    >
                      <span className="text-lg text-white font-medium text-center">"{plot}"</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={onNavigateToMain}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-xl transition-all duration-200 font-semibold flex items-center justify-center space-x-2 text-lg transform hover:scale-105"
              >
                <Zap className="h-5 w-5" />
                <span>Start Smart Search</span>
              </button>
              <button 
                onClick={onNavigateToAbout}
                className="border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 px-8 py-4 rounded-xl transition-all duration-200 font-semibold flex items-center justify-center space-x-2 text-lg transform hover:scale-105"
              >
                <BookOpen className="h-5 w-5" />
                <span>Learn More</span>
              </button>
            </div>

            {/* Hero Badge */}
            <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-8 mt-8">
              <span className="text-sm font-medium text-purple-300 animate-pulse">Powered by MindsDB AI</span>
            </div>
          </div>

          

          {/* Enhanced Movie Poster Carousel Section */}
          <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative max-w-7xl mx-auto">
              {/* Main Carousel Container */}
              <div className="flex items-center justify-center space-x-6 overflow-hidden px-4">
                {/* Display 5 posters for better flow */}
                {[-2, -1, 0, 1, 2].map((offset) => {
                  const posterIndex = (currentMovieIndex + offset + moviePosters.length) % moviePosters.length;
                  const isCenter = offset === 0;
                  const isAdjacent = Math.abs(offset) === 1;
                  const isFar = Math.abs(offset) === 2;
                  
                  return (
                    <div
                      key={`${posterIndex}-${offset}`}
                      className={`relative transition-all duration-800 ease-out transform cursor-pointer ${
                        isCenter 
                          ? 'w-72 h-[432px] scale-110 z-30 opacity-100' 
                          : isAdjacent 
                          ? 'w-72 h-[432px] scale-90 z-20 opacity-70' 
                          : 'w-72 h-[432px] scale-75 z-10 opacity-40'
                      }`}
                      onClick={() => setCurrentMovieIndex(posterIndex)}
                    >
                      <div className={`relative w-full h-full overflow-hidden rounded-3xl shadow-2xl transition-all duration-800 ${
                        isCenter ? 'shadow-purple-500/30' : 'shadow-black/50'
                      }`}>
                        <img
                          src={moviePosters[posterIndex]}
                          alt={`Movie ${posterIndex + 1}`}
                          className="w-full h-full object-cover transition-transform duration-800"
                        />
                        
                        {/* Enhanced gradient overlays */}
                        <div className={`absolute inset-0 transition-all duration-800 ${
                          isCenter 
                            ? 'bg-gradient-to-t from-black/10 via-transparent to-transparent' 
                            : isAdjacent
                            ? 'bg-gradient-to-t from-black/30 via-transparent to-black/10'
                            : 'bg-gradient-to-t from-black/50 to-black/20'
                        }`}></div>
                        
                        {/* Glow effect for center poster */}
                        {isCenter && (
                          <>
                            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-3xl blur-lg -z-10"></div>
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-sm -z-10"></div>
                          </>
                        )}

                        {/* Hover play button */}
                        <div className={`absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 ${
                          isCenter ? 'bg-black/20' : 'bg-black/40'
                        }`}>
                          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transform scale-75 hover:scale-100 transition-transform duration-200">
                            <Play className="h-6 w-6 text-white ml-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Enhanced poster indicators */}
              <div className="flex justify-center mt-10 space-x-2">
                {moviePosters.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentMovieIndex(index)}
                    className={`transition-all duration-500 rounded-full ${
                      index === currentMovieIndex 
                        ? 'w-16 h-4 bg-gradient-to-r from-purple-400 to-pink-400 shadow-lg shadow-purple-500/30' 
                        : 'w-4 h-4 bg-gray-600 hover:bg-gray-500 hover:scale-110'
                    }`}
                  />
                ))}
              </div>

              {/* Sleeker navigation arrows */}
              <button
                onClick={() => setCurrentMovieIndex((prev) => (prev - 1 + moviePosters.length) % moviePosters.length)}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 bg-gradient-to-r from-black/60 to-black/40 hover:from-black/80 hover:to-black/60 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group z-40 border border-white/10"
              >
                <ArrowRight className="h-6 w-6 text-white rotate-180 group-hover:scale-125 transition-transform duration-200" />
              </button>
              <button
                onClick={() => setCurrentMovieIndex((prev) => (prev + 1) % moviePosters.length)}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-14 h-14 bg-gradient-to-l from-black/60 to-black/40 hover:from-black/80 hover:to-black/60 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group z-40 border border-white/10"
              >
                <ArrowRight className="h-6 w-6 text-white group-hover:scale-125 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Floating Elements */}
        <div className="absolute top-20 left-10 animate-bounce">
          <div className="w-4 h-4 bg-purple-400 rounded-full opacity-70 shadow-lg shadow-purple-400/50"></div>
        </div>
        <div className="absolute top-40 right-20 animate-pulse">
          <div className="w-3 h-3 bg-pink-400 rounded-full opacity-60 shadow-lg shadow-pink-400/50"></div>
        </div>
        <div className="absolute bottom-20 left-20 animate-bounce delay-1000">
          <div className="w-5 h-5 bg-yellow-400 rounded-full opacity-50 shadow-lg shadow-yellow-400/50"></div>
        </div>
        <div className="absolute top-60 left-1/3 animate-pulse delay-500">
          <div className="w-2 h-2 bg-blue-400 rounded-full opacity-40"></div>
        </div>
        <div className="absolute bottom-40 right-1/4 animate-bounce delay-700">
          <div className="w-3 h-3 bg-green-400 rounded-full opacity-30"></div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:-translate-y-2 group"
              >
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Plotrix Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Why Choose Plotrix?
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Plotrix isn't just another movie database. It's an intelligent companion that understands 
                how you think about movies and helps you discover content naturally.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20 rounded-2xl p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Join the Community</h3>
                <p className="text-gray-300 mb-6">
                  Thousands of movie enthusiasts are already using Plotrix to rediscover their favorite films.
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-purple-400">1000+</div>
                    <div className="text-sm text-gray-400">Happy Users</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-pink-400">50K+</div>
                    <div className="text-sm text-gray-400">Searches</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Movie Origins Section */}
      <section className="py-20 bg-gray-800">
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
      <section className="py-20 bg-gray-900">
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
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transform hover:scale-110 transition-transform duration-300">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Describe</h3>
              <p className="text-gray-300">Tell us what you remember about the movie - plot, actors, scenes, or any details</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transform hover:scale-110 transition-transform duration-300">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4">AI Search</h3>
              <p className="text-gray-300">Our AI analyzes your description and finds matching movies using semantic search</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transform hover:scale-110 transition-transform duration-300">
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
            Join thousands of movie lovers who've already found their forgotten favorites through AI-powered search
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onNavigateToMain}
              className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-4 rounded-xl transition-all duration-200 font-bold text-lg flex items-center justify-center space-x-2 transform hover:scale-105"
            >
              <Zap className="h-5 w-5" />
              <span>Start Your Search Journey</span>
            </button>
            <button 
              onClick={onNavigateToAbout}
              className="border border-white/30 hover:border-white/60 bg-white/10 hover:bg-white/20 px-8 py-4 rounded-xl transition-all duration-200 font-semibold text-lg flex items-center justify-center space-x-2 transform hover:scale-105"
            >
              <BookOpen className="h-5 w-5" />
              <span>Learn More</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;