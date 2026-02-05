import React, { useEffect, useState } from "react";

const Carts = () => {
  const [cartsdata, setCartsdata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalpage, setTotalpages] = useState(0);

  const limit = 5;

  useEffect(() => {
    const skip = currentPage - 1 + limit;

    fetch(`https://dummyjson.com/carts/?limit=${limit}&skip=${skip}`)
      .then((res) => res.json())

      .then((data) => {
        console.log(data);
        setCartsdata(data.carts);
        setTotalpages(Math.ceil(data.total / limit));
      })
      .catch((err) => console.log("error fetching ", err));
  }, [currentPage]);

  return (
    <div>
      <h1>Carts data </h1>

      {cartsdata?.map((data) => (
        <div key={data.id}>
          <p>Total: {data.discountedTotal}</p>
          <p>total products : {data.totalProducts}</p>
        </div>
      ))}
      <div>
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1} // it use beacuse to prevet action if we stand 1 page and click prev so it stop to go 0 page
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        {[...Array(totalpage)].map((_, i) => (     // make a array for 
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
          disabled={currentPage === 50}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carts;
