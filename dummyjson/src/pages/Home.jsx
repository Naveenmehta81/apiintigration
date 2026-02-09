import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    // 1. MAIN CONTAINER: Full screen height, gradient background for depth
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 flex flex-col justify-center items-center p-6">
      
      {/* 2. HERO SECTION */}
      <div className="max-w-4xl w-full text-center space-y-8">
        
        {/* Badge (Optional visual polish) */}
        <div className="animate-bounce inline-block bg-blue-100 text-blue-700 py-1 px-4 rounded-full text-sm font-bold tracking-wide mb-4">
          🚀 New Stock Arrived!
        </div>

        {/* Main Headline with Gradient Text */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">My Store</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          The best place to manage your products and track your orders. 
          Built with React & Tailwind CSS.
        </p>

        {/* 3. CALL TO ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
          <Link 
            to="/product" 
            className="px-8 py-4 bg-orange-600 text-white text-lg font-bold rounded-full shadow-lg hover:bg-orange-700 hover:shadow-orange-500/30 transition transform hover:-translate-y-1 w-full sm:w-auto"
          >
            Browse Products
          </Link>
          
          <Link 
            to="/carts" 
            className="px-8 py-4 bg-white text-gray-800 text-lg font-bold border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 hover:border-gray-400 transition w-full sm:w-auto"
          >
            View Cart History
          </Link>
        </div>
      </div>

      {/* 4. FEATURES GRID (Fills empty space visually) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full max-w-5xl opacity-80">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition">
          <div className="text-4xl mb-3">⚡</div>
          <h3 className="font-bold text-lg">Fast Performance</h3>
          <p className="text-gray-500 text-sm">Data loads instantly using Axios.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition">
          <div className="text-4xl mb-3">📱</div>
          <h3 className="font-bold text-lg">Fully Responsive</h3>
          <p className="text-gray-500 text-sm">Optimized for mobile and desktop.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition">
          <div className="text-4xl mb-3">🔒</div>
          <h3 className="font-bold text-lg">Secure Data</h3>
          <p className="text-gray-500 text-sm">Safe and reliable API connections.</p>
        </div>
      </div>

    </div>
  );
}

export default Home;