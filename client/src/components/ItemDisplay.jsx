import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  setCategrieType,
  setItems,
} from "../features/categorie_details/categorieDetailsSlice";
import { fetchAllProducts } from "../features/common/allProducts/allProductAPI";
import { setCategorieGender } from "../features/Categorie/categorieSlice";
import Loading from "./Loading";
function ItemDisplay() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const catogrieProducts = useSelector(
    (state) => state.categorieDetails.items.data
  );
  const catogrieProductsLoading = useSelector(
    (state) => state.categorieDetails.items.loading
  );
  const type = useSelector((state) => state.categorieDetails.categrieType);
  const gender = useSelector((state) => state.categorie.categorieGender);
  const allproducts = useSelector((state) => state.allProducts.items.data);
  const allproductsLoading = useSelector(
    (state) => state.allProducts.items.loading
  );

  useEffect(() => {
    if (pathname === "/all") {
      dispatch(setCategrieType("ALL"));
      dispatch(setCategorieGender(""));
      dispatch(fetchAllProducts());
    }
  }, [pathname, dispatch, fetchAllProducts, setItems]);

  const items = pathname === "/all" ? allproducts : catogrieProducts;
  if (allproductsLoading || catogrieProductsLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 pt-16">
      <h1 className="text-3xl font-bold mb-4">
        {gender} {type} PRODUCTS
      </h1>
      <h5 className="text-lg mb-8">{items.length} items</h5>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <Link to={`/product/${item.id}`} key={`${item.id}${index}`}>
            <div className="border rounded-lg overflow-hidden duration-300">
              <img
                src={item.imageURL}
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

export default ItemDisplay;
