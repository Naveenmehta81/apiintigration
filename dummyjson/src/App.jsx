import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Carts from "./pages/Carts";
import Product from "./pages/Product";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      {/* NAVBAR */}
      <nav className="select-none cursor-default bg-gradient-to-r from-amber-500 to-orange-600 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-16 space-x-8">
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

      {/* ROUTES — no wrapper, each page controls its own layout */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/carts" element={<Carts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
