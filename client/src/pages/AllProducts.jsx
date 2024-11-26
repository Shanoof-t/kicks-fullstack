import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { fetchAllProducts } from "../features/common/allProducts/allProductAPI";
import ProductErrorDisplay from "../components/ProductErrorDisplay";
import ProductList from "../components/Product/ProductList";

function AllProducts() {
  const dispatch = useDispatch();

  const { data, error, loading } = useSelector(
    (state) => state.allProducts.items
  );

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
      <h5 className="text-lg mb-8">{data.length} items</h5>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <ProductList items={data} />
      </div>
    </div>
  );
}

export default AllProducts;
