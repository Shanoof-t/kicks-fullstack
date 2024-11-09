import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { ProductContext } from "../context/ProductProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faEllipsis,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { itemsURL } from "../utils/API_URL";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../features/common/allProducts/allProductAPI";

function ProductsDash() {
  const [menuToggle, setMenuToggle] = useState(null);
  const { productCategory } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { allitems } = useContext(ProductContext);
  const allitems = useSelector((state) => state.allProducts.items.data);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);
  useEffect(() => {
    if (productCategory === "allitems") {
      setProducts(allitems);
    } else if (productCategory === "CASUAL") {
      const casualFiltered = allitems.filter(
        (value) => value.category === productCategory
      );
      setProducts(casualFiltered);
    } else if (productCategory === "FOOTBALL") {
      const footballFiltered = allitems.filter(
        (value) => value.category === productCategory
      );
      setProducts(footballFiltered);
    } else if (productCategory === "RUNNING") {
      const runningFiltered = allitems.filter(
        (value) => value.category === productCategory
      );
      setProducts(runningFiltered);
    }
  }, [productCategory, allitems]);

  const handleDeleteProduct = (id) => {
    axios
      .delete(`${itemsURL}/${id}`)
      .then(() => {
        toast.success("Item deleted");
        setProducts(products.filter((item) => item.id !== id));
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <div className="max-w-screen-lg mx-auto px-4 py-6 lg:px-8 lg:py-8 min-h-screen bg-gray-100 ">
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {productCategory === "allitems" ? "ALL" : productCategory} PRODUCTS
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
        {products.map((item, index) => (
          <div
            key={`${item.id}${index}`}
            className="bg-white shadow-md rounded-lg overflow-hidden relative"
          >
            <FontAwesomeIcon
              icon={faEllipsis}
              className="absolute top-2 right-2 px-2 py-1 bg-slate-100 rounded-md cursor-pointer"
              onClick={() =>
                setMenuToggle(menuToggle === item.id ? null : item.id)
              }
            />

            {menuToggle === item.id && (
              <div className="absolute top-10 right-2 w-32 bg-white border border-gray-200 shadow-md z-10">
                <div
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate(`/admin/updateproduct/${item.id}`)}
                >
                  Edit
                </div>
                <div
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleDeleteProduct(item.id)}
                >
                  Delete
                </div>
              </div>
            )}

            <div>
              <img
                src={item.imageURL}
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
