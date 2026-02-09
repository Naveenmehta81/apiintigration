import React, { useEffect, useState } from "react";
import axios from "axios";

const Carts = () => {
  const [cartsdata, setCartsdata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalpage, setTotalpages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteProductFromCart = (cartId, productId) => {
    // 1. Walk through every cart in the main list
    const updatedCarts = cartsdata.map((cart) => {
      // 2. Is this the cart we want to fix? (The "Target")
      if (cart.id === cartId) {
        // 3. YES! Perform Surgery.
        // Create a NEW object for this cart (Copy it)
        return {
          ...cart, // Copy title, total, userId, etc.

          // 4. Overwrite ONLY the 'products' list
          // Filter out the bad product
          products: cart.products.filter((p) => p.id !== productId),
        };
      }

      // 5. NO? This is not the cart. Keep it the same.
      return cart;
    });

    // 6. Update the state with the new street
    setCartsdata(updatedCarts);
  };

  const limit = 5;

  useEffect(() => {
    const fetchcarts = async () => {
      const skip = (currentPage - 1) * limit;

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://dummyjson.com/carts?limit=${limit}&skip=${skip}`,
        );
        // Correctly accessing data
        setCartsdata(response.data.carts);
        setTotalpages(Math.ceil(response.data.total / limit));
      } catch (error) {
        console.error("Fetch error :", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchcarts();
  }, [currentPage]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error)
    return (
      <div className="p-10 text-center text-red-500 font-bold bg-red-50 m-4 rounded-lg border border-red-200">
        ⚠️ Error : {error}
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
        🛒 Order History
      </h1>

      {cartsdata?.length > 0 ? (
        <div className="space-y-6">
          {cartsdata.map((cart) => (
            // CARD CONTAINER
            <div
              key={cart.id}
              className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100 transition hover:shadow-lg"
            >
              {/* CARD HEADER - Flexbox for mobile spacing */}
              <div className="bg-slate-800 text-white p-4 flex flex-col sm:flex-row justify-between items-center gap-2">
                <h2 className="text-lg font-bold">Order #{cart.id}</h2>
                <div className="text-sm opacity-90">User ID: {cart.userId}</div>
              </div>

              {/* PRODUCTS LIST */}
              <div className="p-4">
                <h3 className="text-sm font-bold text-gray-500 uppercase mb-3 tracking-wider">
                  Products Purchased
                </h3>
                <ul className="space-y-4">
                  {cart.products.map((product) => (
                    <li
                      key={product.id}
                      // Flex layout: Image left, Details right. Stack on very small screens.
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-gray-100 pb-4 last:border-0"
                    >
                      {/* Product Image */}
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full sm:w-20 h-20 object-cover rounded-md border border-gray-200"
                      />

                      {/* Product Details */}
                      <div className="flex-1 w-full">
                        <div className="flex justify-between items-start">
                          <span className="font-semibold text-gray-800 text-lg">
                            {product.title}
                          </span>
                          <span className="font-bold text-gray-900">
                            ${product.discountedTotal}
                          </span>
                        </div>

                        <div className="flex justify-between text-sm text-gray-500 mt-1">
                          <span>
                            Quantity:{" "}
                            <span className="text-gray-900 font-medium">
                              {product.quantity}
                            </span>
                          </span>
                          <span className="line-through text-xs">
                            ${product.total}
                          </span>
                        </div>

                        <div className="text-xs text-green-600 mt-1 font-medium">
                          Saved {product.discountPercentage}%
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          deleteProductFromCart(cart.id, product.id)
                        }
                        className="px-3 py-1 text-red-500 text-sm font-bold border border-red-200 rounded-lg hover:bg-red-500 hover:text-white hover:border-red-300 transition-all"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CART FOOTER / TOTALS */}
              <div className="bg-gray-50 p-4 border-t border-gray-100 flex flex-col sm:flex-row justify-end items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    Subtotal: ${cart.total}
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    Total: ${cart.discountedTotal}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500">
          <p className="text-xl">No orders found.</p>
        </div>
      )}

      {/* PAGINATION */}
      <div className="flex justify-center flex-wrap gap-2 mt-10 pb-10">
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm font-medium transition"
        >
          Prev
        </button>

        {/* The map logic is fine for small page counts, but adding flex-wrap prevents breaking on mobile */}
        {[...Array(totalpage)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-10 h-10 rounded-lg font-medium transition shadow-sm ${
              currentPage === i + 1
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalpage}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm font-medium transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carts;
