import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Search, 
  MessageCircle, 
  Database, 
  Zap, 
  Globe, 
  Film, 
  Image,
  Server,
  Code,
  Sparkles,
  Star,
  Users,
  Clock,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const AboutPage = ({ onNavigateToMain, onNavigateToLanding }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Scroll to top and trigger animations on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <Brain className="h-8 w-8 text-purple-400" />,
      title: "AI-Powered Semantic Search",
      description: "Our advanced AI understands context and meaning, not just keywords. Describe a movie in your own words and watch the magic happen.",
      highlight: "MindsDB Integration"
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-blue-400" />,
      title: "Interactive Movie Chatbot",
      description: "Ask detailed questions about any movie in our database. Get insights about plot, characters, themes, and behind-the-scenes information.",
      highlight: "Real-time Conversations"
    },
    {
      icon: <Database className="h-8 w-8 text-green-400" />,
      title: "Rich Movie Database",
      description: "Access comprehensive information including cast, crew, box office data, ratings, and detailed plot summaries for over 7,000 movies.",
      highlight: "7,000+ Movies"
    },
    {
      icon: <Image className="h-8 w-8 text-pink-400" />,
      title: "Visual Movie Discovery",
      description: "High-quality movie posters and visual elements enhance your browsing experience and help you identify movies at a glance.",
      highlight: "Visual-First Design"
    }
  ];

  const techStack = [
    {
      category: "AI & Machine Learning",
      icon: <Brain className="h-6 w-6 text-purple-400" />,
      technologies: ["MindsDB", "Semantic Search", "Natural Language Processing", "AI Chatbot"],
      description: "Powered by cutting-edge AI technology for intelligent movie discovery"
    },
    {
      category: "Backend",
      icon: <Server className="h-6 w-6 text-green-400" />,
      technologies: ["FastAPI", "Python", "RESTful APIs", "Database Integration"],
      description: "High-performance backend built with modern Python frameworks"
    },
    {
      category: "Frontend",
      icon: <Code className="h-6 w-6 text-blue-400" />,
      technologies: ["React", "Tailwind CSS", "Vite", "Lucide Icons"],
      description: "Modern, responsive interface built with the latest web technologies"
    }
  ];

  const statistics = [
    { number: "7,000+", label: "Movies in Database", icon: <Film className="h-5 w-5" /> },
    { number: "5", label: "Global Origins", icon: <Globe className="h-5 w-5" /> },
    { number: "99%", label: "Search Accuracy", icon: <Search className="h-5 w-5" /> },
    { number: "24/7", label: "AI Assistant", icon: <MessageCircle className="h-5 w-5" /> }
  ];

  const benefits = [
    "Never lose track of a movie again - just describe what you remember",
    "Discover hidden gems through AI-powered recommendations",
    "Get instant answers to detailed questions about any movie",
    "Explore movies from different cultures and time periods",
    "Access comprehensive movie information in one place",
    "Enjoy a modern, intuitive user experience"
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-purple-900/50 to-gray-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium text-purple-300">About Plotrix</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Revolutionizing
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Movie Discovery
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Plotrix combines the power of artificial intelligence with an intuitive interface to help you rediscover movies 
              based on fragments of memory. No more frustrating searches - just describe what you remember.
            </p>
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
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Our Mission
                </span>
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                We believe that finding a movie shouldn't be a frustrating experience. Traditional search engines require exact titles or specific keywords, 
                but human memory doesn't work that way. We remember scenes, emotions, and fragments of plots.
              </p>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Plotrix bridges this gap by understanding natural language descriptions and matching them with our comprehensive movie database, 
                making movie discovery as intuitive as having a conversation with a knowledgeable friend.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Powered by MindsDB</h3>
                  <p className="text-gray-400">Advanced AI for intelligent movie matching</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {statistics.map((stat, index) => (
                <div key={index} className="bg-gray-900/50 border border-gray-700 rounded-xl p-6 text-center hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105">
                  <div className="flex justify-center mb-3 text-purple-400">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Key Features
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the next generation of movie discovery with our advanced AI-powered features
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:-translate-y-1 group"
              >
                <div className="flex items-center mb-4">
                  <div className="transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <span className="ml-3 px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-medium rounded-full">
                    {feature.highlight}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Built with Modern Technology
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our platform leverages cutting-edge technologies to deliver a seamless and intelligent user experience
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transform transition-all duration-1000 delay-1100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 group hover:transform hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <div className="transform group-hover:scale-110 transition-transform duration-300">
                    {tech.icon}
                  </div>
                  <h3 className="ml-3 text-lg font-semibold text-white">{tech.category}</h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">{tech.description}</p>
                <div className="space-y-2">
                  {tech.technologies.map((technology, idx) => (
                    <div key={idx} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      <span className="text-gray-300">{technology}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transform transition-all duration-1000 delay-1300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Why Choose Plotrix?
                </span>
              </h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Plotrix isn't just another movie database. It's an intelligent companion that understands how you think about movies 
                and helps you discover content in the most natural way possible.
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
                  Thousands of movie enthusiasts are already using Plotrix to rediscover their favorite films and find new ones.
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-purple-400">1000+</div>
                    <div className="text-sm text-gray-400">Happy Users</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-pink-400">50K+</div>
                    <div className="text-sm text-gray-400">Searches Performed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transform transition-all duration-1000 delay-1500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                How Plotrix Works
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our AI-powered system makes movie discovery simple and intuitive
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-4 gap-8 transform transition-all duration-1000 delay-1700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="text-center group">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-white">Describe</h3>
              <p className="text-gray-300 text-sm">Type what you remember about the movie in natural language</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <Brain className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-white">AI Analysis</h3>
              <p className="text-gray-300 text-sm">Our AI understands context and finds semantic matches</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-white">Smart Results</h3>
              <p className="text-gray-300 text-sm">Get ranked results with detailed movie information</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-white">Ask & Explore</h3>
              <p className="text-gray-300 text-sm">Chat with our AI to learn more about any movie</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900 to-pink-900">
        <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transform transition-all duration-1000 delay-1900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Discover Movies Like Never Before?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Experience the future of movie discovery. Start searching with natural language descriptions today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onNavigateToMain}
              className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-4 rounded-xl transition-all duration-200 font-bold text-lg flex items-center justify-center space-x-2 transform hover:scale-105"
            >
              <Search className="h-5 w-5" />
              <span>Try Plotrix</span>
            </button>
            <button 
              onClick={onNavigateToLanding}
              className="border border-white/30 hover:border-white/60 bg-white/10 hover:bg-white/20 px-8 py-4 rounded-xl transition-all duration-200 font-semibold text-lg flex items-center justify-center space-x-2 transform hover:scale-105"
            >
              <ArrowRight className="h-5 w-5 rotate-180" />
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;