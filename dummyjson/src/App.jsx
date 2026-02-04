import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Carts from "./pages/Carts";
import Product from "./pages/Product";

import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
            <nav className="m-2 bg-amber-500 h-9 flex  justify-center items-center ">
                <Link className="text-black m-2 text-2xl gap-8" to="/">Home</Link>
                <Link className="text-black m-2  text-2xl gap-8" to="/carts">Carts</Link>
                <Link className="text-black m-2  text-2xl gap-8" to="/product">Product</Link>
            </nav>
   
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carts" element={<Carts />} />
          <Route path="/product" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
