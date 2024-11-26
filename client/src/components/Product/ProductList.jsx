import React from "react";
import ProductCard from "./ProductCard";

function ProductList({ items }) {
  return items.map((item) => <ProductCard key={item._id} item={item} />);
}

export default ProductList;
