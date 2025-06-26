import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Loader2, 
  MessageCircle, 
  User, 
  Bot, 
  X, 
  Sparkles, 
  Zap,
  Brain,
  Star,
  Film,
  Quote,
  Eye,
  Heart,
  Lightbulb
} from 'lucide-react';

const MovieChatBot = ({ movie, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const API_BASE_URL = 'http://localhost:8000';

  // Animation effect
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 1,
          type: 'bot',
          content: `Hi! I'm here to answer any questions you have about "${movie.title}". What would you like to know?`,
          timestamp: new Date()
        }
      ]);
    }
  }, [movie.title, messages.length]);

  const sendQuestion = async () => {
    if (!currentQuestion.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: currentQuestion.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentQuestion('');
    setIsLoading(true);
    setError('');

    try {
      const requestBody = {
        title: movie.title,
        plot: movie.snippet,
        origin: movie.origin || 'Unknown',
        release_year: movie.release_year || 2000,
        question: userMessage.content
      };

      const response = await fetch(`${API_BASE_URL}/movie_insights`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Sorry, I couldn\'t find an answer to that question about this movie.');
        } else {
          throw new Error(`API error: ${response.status}`);
        }
      }

      const data = await response.json();
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: data.answer,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      setError(err.message || 'Failed to get answer. Please try again.');
      
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: 'Sorry, I encountered an error while trying to answer your question. Please try rephrasing or ask something else.',
        timestamp: new Date(),
        isError: true
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendQuestion();
    }
  };

  const suggestedQuestions = [
    { text: "What is the meaning of the ending?", icon: Eye },
    { text: "A famous quote from the movie?", icon: Quote },
    { text: "What are the key themes?", icon: Heart },
    { text: "What's the significance of the title?", icon: Lightbulb },
    { text: "Are there any hidden meanings or symbolism?", icon: Brain }
  ];

  const handleSuggestedQuestion = (question) => {
    setCurrentQuestion(question);
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-full max-h-[85vh] bg-gradient-to-br from-gray-800 via-gray-900 to-purple-900/20 rounded-2xl overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute top-10 right-10 animate-pulse">
        <div className="w-3 h-3 bg-purple-400 rounded-full opacity-30"></div>
      </div>
      <div className="absolute bottom-20 left-10 animate-bounce delay-1000">
        <div className="w-2 h-2 bg-pink-400 rounded-full opacity-40"></div>
      </div>
      
      {/* Enhanced Header */}
      <div className={`transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="relative bg-gradient-to-r from-purple-600/10 to-pink-600/10 backdrop-blur-sm border-b border-gray-700/50 p-6">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5"></div>
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 animate-pulse"></div>
                  <MessageCircle className="h-7 w-7 text-white relative z-10" />
                  <div className="absolute top-1 right-1 w-3 h-3 bg-green-400 rounded-full animate-bounce"></div>
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    AI Movie Expert
                  </h3>
                  <div className="flex items-center bg-purple-500/20 border border-purple-500/30 rounded-full px-2 py-1">
                    <Zap className="h-3 w-3 text-purple-400 mr-1" />
                    <span className="text-xs text-purple-300 font-medium">Online</span>
                  </div>
                </div>
                <p className="text-sm text-gray-300 flex items-center">
                  <Film className="h-4 w-4 mr-1 text-purple-400" />
                  Discussing: {movie.title}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-gray-700/50 hover:bg-gray-600/50 backdrop-blur-sm border border-gray-600/50 hover:border-gray-500/50 rounded-xl transition-all duration-300 flex items-center justify-center group transform hover:scale-110"
            >
              <X className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-purple-600/50 scrollbar-track-gray-800/50">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`transform transition-all duration-500 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            } flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className={`flex items-start space-x-3 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              {/* Enhanced Avatar */}
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 relative overflow-hidden ${
                message.type === 'user' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/25' 
                  : message.isError 
                    ? 'bg-gradient-to-r from-red-600 to-red-700 shadow-lg shadow-red-500/25' 
                    : 'bg-gradient-to-r from-gray-600 to-gray-700 shadow-lg shadow-gray-500/25'
              }`}>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-50"></div>
                {message.type === 'user' ? (
                  <User className="h-5 w-5 text-white relative z-10" />
                ) : (
                  <Bot className="h-5 w-5 text-white relative z-10" />
                )}
              </div>
              
              {/* Enhanced Message Bubble */}
              <div className={`rounded-2xl p-4 relative overflow-hidden backdrop-blur-sm ${
                message.type === 'user'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25 border border-purple-500/30'
                  : message.isError
                    ? 'bg-gradient-to-r from-red-900/50 to-red-800/50 text-red-200 border border-red-500/50 shadow-lg shadow-red-500/25'
                    : 'bg-gradient-to-br from-gray-700/80 to-gray-800/80 text-gray-100 border border-gray-600/50 shadow-lg shadow-gray-500/25'
              }`}>
                {/* Message background glow */}
                <div className={`absolute inset-0 ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20'
                    : message.isError
                      ? 'bg-gradient-to-r from-red-600/10 to-red-700/10'
                      : 'bg-gradient-to-r from-gray-600/10 to-gray-700/10'
                } rounded-2xl`}></div>
                
                <div className="relative z-10">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                  <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                    <span>{message.timestamp.toLocaleTimeString()}</span>
                    {message.type === 'bot' && !message.isError && (
                      <div className="flex items-center space-x-1">
                        <Sparkles className="h-3 w-3" />
                        <span>AI Generated</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Enhanced Loading State */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-3 max-w-[85%]">
              <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-gray-500/25 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 animate-pulse rounded-2xl"></div>
                <Bot className="h-5 w-5 text-white relative z-10" />
              </div>
              <div className="bg-gradient-to-br from-gray-700/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-4 flex items-center space-x-3 border border-gray-600/50 shadow-lg shadow-gray-500/25 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5 animate-pulse rounded-2xl"></div>
                <Loader2 className="h-5 w-5 animate-spin text-purple-400 relative z-10" />
                <span className="text-sm text-gray-300 relative z-10">AI is thinking...</span>
                <div className="flex space-x-1 relative z-10">
                  <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Enhanced Suggested Questions */}
      {messages.length === 1 && (
        <div className={`transform transition-all duration-700 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="p-6 border-t border-gray-700/50 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5"></div>
            
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center mr-2">
                  <Lightbulb className="h-3 w-3 text-white" />
                </div>
                <p className="text-sm font-semibold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                  Suggested Questions:
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {suggestedQuestions.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => handleSuggestedQuestion(item.text)}
                      className="group bg-gradient-to-r from-gray-700/50 to-gray-800/50 hover:from-purple-600/20 hover:to-pink-600/20 backdrop-blur-sm border border-gray-600/50 hover:border-purple-500/50 px-4 py-3 rounded-xl transition-all duration-300 text-left transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                      <div className="flex items-center space-x-3 relative z-10">
                        <div className="w-6 h-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 group-hover:from-purple-500/40 group-hover:to-pink-500/40 rounded-lg flex items-center justify-center transition-all duration-300">
                          <IconComponent className="h-3 w-3 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
                        </div>
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300 font-medium">
                          {item.text}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Input Section */}
      <div className={`transform transition-all duration-700 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="p-6 border-t border-gray-700/50 bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5"></div>
          
          <div className="relative z-10">
            {/* Enhanced Error Display */}
            {error && (
              <div className="mb-4 p-4 bg-gradient-to-r from-red-900/30 to-red-800/30 backdrop-blur-sm border border-red-500/50 rounded-xl text-red-200 text-sm flex items-center space-x-3 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-red-700/10 animate-pulse rounded-xl"></div>
                <div className="w-6 h-6 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0 relative z-10">
                  <Zap className="h-3 w-3 text-red-400" />
                </div>
                <span className="relative z-10">{error}</span>
              </div>
            )}
            
            {/* Enhanced Input Area */}
            <div className="flex space-x-4">
              <div className="flex-1 relative group">
                <textarea
                  ref={inputRef}
                  value={currentQuestion}
                  onChange={(e) => setCurrentQuestion(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask anything about this movie..."
                  className="w-full bg-gradient-to-r from-gray-900/90 to-gray-900/90 backdrop-blur-sm border border-gray-600/50 focus:border-purple-500/50 rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 resize-none text-base leading-relaxed"
                  rows={2}
                  disabled={isLoading}
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              
              <button
                onClick={sendQuestion}
                disabled={!currentQuestion.trim() || isLoading}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 px-6 py-4 rounded-2xl transition-all duration-300 flex items-center justify-center transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 relative overflow-hidden group min-w-[60px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin relative z-10" />
                ) : (
                  <div className="flex items-center space-x-2 relative z-10">
                    <Send className="h-5 w-5" />
                    <Sparkles className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}
              </button>
            </div>
            
            <div className="flex items-center justify-between mt-3">
              <p className="text-xs text-gray-500 flex items-center">
                <span>Press Enter to send, Shift+Enter for new line</span>
              </p>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>AI Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieChatBot;