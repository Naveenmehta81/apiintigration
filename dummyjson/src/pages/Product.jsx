import { useEffect, useState } from "react";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalpages] = useState(0);

  const limitData = 8;
  //   const totalPages = 20;

  useEffect(() => {
    const skip = (currentPage - 1) * limitData;

    fetch(
      `https://dummyjson.com/products?limit=${limitData}&skip=${skip}&select=title,description,category,thumbnail,price`,
    )
      .then((res) => res.json())

      .then((data) => {
        setProducts(data.products);
        setTotalpages(Math.ceil(data.total / limitData))
        
      })

      .catch((error) => console.error(error));
  }, [currentPage]);

  return (
    <div className="min-h-screenb bg-sky-600 p-6">
      <h1 className="text-4xl font-bold text-center mb-8 bg-sky-300 py-3 rounded-lg ">
        Products
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
          >
            <img
              src={p.thumbnail}
              alt={p.title}
              className="w-full h-40 object-cover rounded-md mb-3"
            />

            <h2 className="font-semibold text-lg">{p.title}</h2>

            <p className="text-sm text-gray-600 line-clamp-2">
              {p.description}
            </p>

            <p className="text-sm text-gray-500">{p.category}</p>

            <p className="font-bold text-orange-500 mt-2">${p.price}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-2 rounded ${
              currentPage === i + 1
                ? "bg-orange-500 text-white"
                : "bg-white border"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Product;
