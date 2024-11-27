import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setSize,
  setSizeError,
} from "../features/product_details/productDetailsSlice";
import {
  addToCart,
  fetchCartItem,
  fetchItem,
} from "../features/product_details/productDetailsAPI";
import { fetchCartItems } from "../features/cart/cartAPI";
import Loading from "../components/Loading";
import ProductErrorDisplay from "../components/ProductErrorDisplay";
import { handleToast } from "../utils/handleToast";
function ProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchItem(productId));
    dispatch(fetchCartItem(productId));
  }, [productId, dispatch]);

  const {
    item,
    size,
    productDetailsLoading,
    sizeError,
    updateError,
    fetchError,
    addCartError,
    cartExistingItem,
    cartExistingItemError,
  } = useSelector((state) => state.productDetails);

  const handleCart = async () => {
    if (!localStorage.getItem("role")) {
      navigate("/login");
    }

    if (!size) {
      return dispatch(setSizeError("Choose shoe size"));
    } else {
      dispatch(setSizeError(""));
    }
    const { available_sizes, __v, ...cartData } = item;
    const dataToSend = {
      ...cartData,
      size,
    };

    const res = await dispatch(addToCart(dataToSend));
    handleToast(res.payload.status, res.payload.message);
    dispatch(fetchCartItem(productId));
    // dispatch(fetchCartItems());
  };

  if (productDetailsLoading) return <Loading />;

  if (fetchError)
    return (
      <ProductErrorDisplay
        error={fetchError}
        fallbackretryfun={() => fetchItem(productId)}
      />
    );

  return (
    <>
      <div className="container mx-auto flex p-4 sm:p-6 lg:p-8">
        <div className="md:flex justify-evenly md:space-x-6">
          <div className="md:w-2/4  mb-6 md:mb-0">
            <img
              src={item.image_url}
              alt={item.name}
              className="w-full h-4/5 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">{item.name}</h1>
            <h5 className="text-xl text-blueColor font-bold mb-4">
              ${item.price}.00
            </h5>
            <div className="mb-4">
              <h5 className="text-lg font-bold mb-2">Size</h5>
              <div className="flex flex-wrap gap-2 mb-4">
                {item.available_sizes &&
                  item.available_sizes.map((value, index) => (
                    <button
                      key={index}
                      className={`px-4 py-2 rounded-lg text-white font-bold ${
                        size === value
                          ? "bg-thirdColor"
                          : "bg-sizeColor  hover:bg-hoverColor"
                      } shadow-md transition-transform transform hover:scale-105`}
                      onClick={() => dispatch(setSize(value))}
                    >
                      {value}
                    </button>
                  ))}
              </div>
              {sizeError && <p className="text-red-500 mt-2">{sizeError}</p>}
            </div>
            <div className="mb-4">
              {cartExistingItem ? (
                <button
                  className="bg-thirdColor hover:bg-hoverColor text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                  onClick={() => navigate("/cart")}
                >
                  GO TO CART
                </button>
              ) : (
                <button
                  className="bg-thirdColor hover:bg-hoverColor text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                  onClick={handleCart}
                >
                  ADD TO CART
                </button>
              )}
            </div>
            <div>
              <h5 className="text-lg font-bold mb-2">ABOUT THE PRODUCT</h5>
              <p className="text-gray-700">{item.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
