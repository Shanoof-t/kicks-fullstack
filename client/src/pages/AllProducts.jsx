import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { fetchAllProducts } from "../features/common/allProducts/allProductAPI";
import ProductErrorDisplay from "../components/ProductErrorDisplay";

function AllProducts() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.allProducts.items.data);
  const loading = useSelector((state) => state.allProducts.items.loading);
  const error = useSelector((state) => state.allProducts.items.error);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <ProductErrorDisplay error={error} fallbackretryfun={fetchAllProducts} />
    );
  }
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 pt-16">
      <h1 className="text-3xl font-bold mb-4">ALL PRODUCTS</h1>
      <h5 className="text-lg mb-8">{items.length} items</h5>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <Link to={`/product/${item._id}`} key={`${item._id}${index}`}>
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
        ))}
      </div>
    </div>
  );
}

export default AllProducts;
