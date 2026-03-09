import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

const Carts = () => {
  const [cartsdata, setCartsdata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const limitData = 5;

  // 1. Fetching data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["cartsdata", currentPage],
    queryFn: async () => {
      const skip = (currentPage - 1) * limitData;
      const response = await fetch(
        `https://dummyjson.com/carts?limit=${limitData}&skip=${skip}`,
      );
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
  });

  // 2. Sync React Query data to local state whenever 'data' changes
  useEffect(() => {
    if (data?.carts) {
      setCartsdata(data.carts);
    }
  }, [data]);

  const totalpage = data ? Math.ceil(data.total / limitData) : 0;

  // 3. Local Delete Logic
  const deleteProductFromCart = (cartId, productId) => {
    const updatedCarts = cartsdata.map((cart) => {
      if (cart.id === cartId) {
        return {
          ...cart,
          products: cart.products.filter((p) => p.id !== productId),
        };
      }
      return cart;
    });
    setCartsdata(updatedCarts);
  };

  // 4. Use React Query's native isLoading/isError
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isError)
    return <div className="p-10 text-red-500">Error: {error.message}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
        🛒 Order History
      </h1>

      {/* 5. Map over LOCAL STATE (cartsdata) so deletes reflect immediately */}
      {cartsdata.length > 0 ? (
        <div className="space-y-6">
          {cartsdata.map((cart) => (
            <div
              key={cart.id}
              className="bg-white shadow-md rounded-xl border border-gray-100"
            >
              <div className="bg-slate-800 text-white p-4 flex justify-between">
                <h2 className="text-lg font-bold">Order #{cart.id}</h2>
                <span>User: {cart.userId}</span>
              </div>

              <div className="p-4">
                {cart.products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 border-b py-4"
                  >
                    <img
                      src={product.thumbnail}
                      className="w-20 h-20 object-cover"
                      alt=""
                    />
                    <div className="flex-1">
                      <p className="font-bold">{product.title}</p>
                      <p>${product.discountedTotal}</p>
                    </div>
                    <button
                      onClick={() => deleteProductFromCart(cart.id, product.id)}
                      className="text-red-500 border border-red-500 px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center py-20">No orders found.</p>
      )}

      {/* PAGINATION (Simplified) */}
      <div className="flex justify-center gap-2 mt-10">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-4 py-2 border rounded"
        >
          Prev
        </button>

        {[...Array(totalpage)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-10 h-10 rounded ${currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-white"}`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalpage}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-4 py-2 border rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carts;
