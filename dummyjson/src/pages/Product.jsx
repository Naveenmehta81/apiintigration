import { useEffect, useState } from "react";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalpages] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state for UX

  const limitData = 8;

  const handlesearchproduct = (e) => {
    const value = e.target.value;
    setSearch(value);
    setCurrentPage(1); // Reset to page 1 on search
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const skip = (currentPage - 1) * limitData;

      // Logic: Use Search URL or Standard URL
      const baseUrl = search 
        ? `https://dummyjson.com/products/search?q=${search}` 
        : `https://dummyjson.com/products`;

      try {
        const res = await fetch(`${baseUrl}?limit=${limitData}&skip=${skip}`);
        const data = await res.json();
        
        setProducts(data.products);
        setTotalpages(Math.ceil(data.total / limitData));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    // Debounce simulation (optional but good practice)
    const timer = setTimeout(() => {
        fetchProducts();
    }, 300);

    return () => clearTimeout(timer);

  }, [currentPage, search]);

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* 1. Header Section */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
                🛍️ Exclusive Products
            </h1>

            {/* 2. Search Bar */}
            <div className="flex justify-center">
                <div className="relative w-full max-w-lg">
                    <input
                        className="w-full h-12 pl-12 pr-4 text-lg text-gray-700 bg-gray-100 border-2 border-transparent rounded-full focus:bg-white focus:border-blue-500 focus:outline-none transition-all duration-300 shadow-inner"
                        type="text"
                        placeholder="Search for products..."
                        value={search}
                        onChange={handlesearchproduct}
                    />
                    {/* Search Icon SVG */}
                    <svg className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>
        </div>
      </div>

      {/* 3. Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        
        {loading ? (
             <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
             </div>
        ) : products.length > 0 ? (
            <>
                {/* Product Grid */}
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((p) => (
                    <div
                        key={p.id}
                        className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
                    >
                        {/* Image Container */}
                        <div className="relative h-48 bg-gray-100 overflow-hidden">
                            <img
                                src={p.thumbnail}
                                alt={p.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <span className="absolute top-2 right-2 bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded-md shadow-sm text-gray-700">
                                {p.category}
                            </span>
                        </div>

                        {/* Content */}
                        <div className="p-5">
                            <h2 className="font-bold text-gray-800 text-lg mb-2 truncate" title={p.title}>
                                {p.title}
                            </h2>
                            <p className="text-sm text-gray-500 line-clamp-2 h-10 mb-4">
                                {p.description}
                            </p>
                            
                            <div className="flex justify-between items-center mt-auto">
                                <p className="text-xl font-extrabold text-blue-600">
                                    ${p.price}
                                </p>
                                <button className="px-3 py-1.5 bg-blue-50 text-blue-600 text-sm font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
                                    Add +
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                </div>

                {/* 4. Pagination */}
                <div className="flex justify-center items-center flex-wrap gap-2 mt-12 mb-8">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition"
                    >
                        Prev
                    </button>

                    {/* Page Numbers - Added flex-wrap safe container logic */}
                    <div className="hidden sm:flex flex-wrap gap-2">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                                currentPage === i + 1
                                    ? "bg-blue-600 text-white shadow-md transform scale-105"
                                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                    {/* Mobile Page Indicator */}
                    <span className="sm:hidden text-gray-600 font-medium">
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition"
                    >
                        Next
                    </button>
                </div>
            </>
        ) : (
            <div className="text-center py-20">
                <p className="text-2xl text-gray-400 font-semibold">No products found matching "{search}"</p>
                <button 
                    onClick={() => { setSearch(''); setCurrentPage(1); }}
                    className="mt-4 text-blue-600 underline"
                >
                    Clear Search
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default Product;