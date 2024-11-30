import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faEllipsis,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "../components/Loading";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  fetchAllProducts,
  fetchcategoryProducts,
} from "../features/common/allProducts/allProductAPI";
import { handleToast } from "../utils/handleToast";

function ProductsDash() {
  const [menuToggle, setMenuToggle] = useState(null);
  const { productCategory } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.allProducts.items.data);
  const loading = useSelector((state) => state.allProducts.items.loading);

  function loadProducts() {
    if (productCategory === "all") {
      dispatch(fetchAllProducts());
    } else if (productCategory === "CASUAL") {
      dispatch(fetchcategoryProducts({ productCategory }));
    } else if (productCategory === "FOOTBALL") {
      dispatch(fetchcategoryProducts({ productCategory }));
    } else if (productCategory === "RUNNING") {
      dispatch(fetchcategoryProducts({ productCategory }));
    }
  }

  useEffect(() => {
    loadProducts();
  }, [productCategory]);

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct({ id })).then((res) => {
      handleToast(res.payload.status, res.payload.message);
      loadProducts();
    });
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-6 lg:px-8 lg:py-8 min-h-screen bg-gray-100 ">
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {productCategory === "all" ? "ALL" : productCategory} PRODUCTS
        </h1>
        <button
          className="flex items-center bg-thirdColor text-white py-2 px-4 rounded-lg shadow-lg hover:bg-thirdColor-dark transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-thirdColor-light"
          onClick={() => navigate("/admin/addproduct")}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {products.map((item) => (
          <div
            key={`${item._id}`}
            className="bg-white shadow-md rounded-lg overflow-hidden relative"
          >
            <FontAwesomeIcon
              icon={faEllipsis}
              className="absolute top-2 right-2 px-2 py-1 bg-slate-100 rounded-md cursor-pointer"
              onClick={() =>
                setMenuToggle(menuToggle === item._id ? null : item._id)
              }
            />

            {menuToggle === item._id && (
              <div className="absolute top-10 right-2 w-32 bg-white border border-gray-200 shadow-md z-10">
                <div
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate(`/admin/updateproduct/${item._id}`)}
                >
                  Edit
                </div>
                <div
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleDeleteProduct(item._id)}
                >
                  Delete
                </div>
              </div>
            )}

            <div>
              <img
                src={item.image_url}
                alt={item.name}
                className="w-full h-40 object-cover"
              />
            </div>
            <div className="p-4">
              <h1 className="text-lg font-semibold mb-1">{item.name}</h1>
              <h2 className="text-gray-600 mb-1">{item.category}</h2>
              <h3 className="text-xl font-bold text-green-600">
                ${item.price}
              </h3>
              <h3>{item.gender}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsDash;
