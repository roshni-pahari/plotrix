import React, { useState } from 'react';

// Import components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import pages
import MainPage from './pages/MainPage';
import LandingPage from './pages/LandingPage';

function App() {
  // State to manage which page to show
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing' or 'main'

  // Function to switch between pages
  const navigateToPage = (page) => {
    setCurrentPage(page);
  };

  // Function to render the current page
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'main':
        return <MainPage />;
      case 'landing':
      default:
        return <LandingPage onNavigateToMain={() => navigateToPage('main')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Navigation Bar */}
      <Navbar 
        currentPage={currentPage}
        onNavigate={navigateToPage}
      />

      {/* Main Content */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;