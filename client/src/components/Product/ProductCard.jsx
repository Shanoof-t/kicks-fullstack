import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ item }) {
  return (
    <Link to={`/product/${item._id}`}>
      <div className="border rounded-lg overflow-hidden duration-300">
        <img
          src={item.image_url}
          alt={`${item.name} image`}
          className="w-full h-60 object-cover border-5 border-white rounded-3xl"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
          <button className="w-full px-4 py-2 text-white bg-thirdColor font-bold rounded hover:bg-hoverColor transition-colors duration-300">
            VIEW PRODUCT - ${item.price}
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
