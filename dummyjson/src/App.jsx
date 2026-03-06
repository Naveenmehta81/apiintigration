import { useState } from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Carts from "./pages/Carts";
import Product from "./pages/Product";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      {/* 1. THE NAVIGATION BAR */}
      <nav className="bg-linear-to-r from-amber-500 to-orange-600 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-16 space-x-8">
            {/* 2. NAVIGATION LINKS */}
            {/* I converted Link to NavLink for better control (see tip below) */}
            <Link
              to="/"
              className="text-white text-xl font-bold hover:text-amber-100 transition duration-300 transform hover:scale-105"
            >
              Home
            </Link>

            <Link
              to="/product"
              className="text-white text-xl font-bold hover:text-amber-100 transition duration-300 transform hover:scale-105"
            >
              Product
            </Link>

            <Link
              to="/carts"
              className="text-white text-xl font-bold hover:text-amber-100 transition duration-300 transform hover:scale-105"
            >
              Carts
            </Link>
          </div>
        </div>
      </nav>

      {/* 3. MAIN CONTENT WRAPPER */}
      {/* This ensures your pages have padding and don't touch the screen edges */}
      <main className="container mx-auto p-6 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/carts" element={<Carts />} />
        </Routes>
      </main>
    </BrowserRouter>  
  );
}

export default App;
