import React from "react";
import { useDispatch } from "react-redux";

function ProductErrorDisplay({ error, fallbackretryfun }) {
  const dispatch = useDispatch();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold text-red-600">
        Failed to load products.
      </h2>
      <p className="text-lg mb-4">{error}</p>
      <button
        className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
        onClick={() => dispatch(fallbackretryfun())}
      >
        Retry
      </button>
    </div>
  );
}

export default ProductErrorDisplay;
