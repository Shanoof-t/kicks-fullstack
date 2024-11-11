import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setSize,
  setSizeError,
} from "../features/product_details/productDetailsSlice";
import {
  addToCart,
  fetchItem,
  updateCartSize,
} from "../features/product_details/productDetailsAPI";
import { fetchCartItems } from "../features/cart/cartAPI";
function ProductDetails() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { productId } = useParams();
  const dispatch = useDispatch();
  // const cartItems = useSelector((state) => state.cart.cartItems);
  const errors = useSelector((state) => state.productDetails.error);
  const productDetails = useSelector((state) => state.productDetails);
  const [user, setUser] = useState("");
  useEffect(() => {
    const user = localStorage.getItem("role");
    setUser(user);
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchItem(productId));
    if (errors.fetchError) {
      toast.error(errors.fetchError, { className: "mt-12" });
    }
  }, [productId, dispatch]);

  const handleCart = () => {
    if (!user) {
      navigate("/login");
    }

    const cartData = {
      ...productDetails.items,
      size: productDetails.size,
    };

    if (!productDetails.size) {
      return dispatch(setSizeError("Choose shoe size"));
    }

    if (productDetails.size > 0) {
      dispatch(setSizeError(""));
    }

    dispatch(addToCart(cartData));

    if (errors.addCartError) {
      toast.error(errors.addCartError, { className: "mt-12" });
    } else {
      toast.success("Product added to cart", { className: "mt-12" });
    }
    // productDetails.size === 0
    //   ? dispatch(setSizeError("Choose shoe size"))
    //   : dispatch(updateCartSize({ user, cartItems, cartData })).then(() => {
    //       dispatch(fetchCartItems(user)).then(() => {
    //         if (!errors.UpdateCartError) {
    //           toast.success("Product added to cart", { className: "mt-12" });
    //         }
    //       });
    //     });

    // if (errors.UpdateCartError) {
    //   toast.error(errors.UpdateCartError, { className: "mt-12" });
    // } else if (errors.fetchError) {
    //   toast.error(errors.fetchError, { className: "mt-12" });
    // }
  };

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto flex p-4 sm:p-6 lg:p-8">
        <div className="md:flex justify-evenly md:space-x-6">
          <div className="md:w-2/4  mb-6 md:mb-0">
            <img
              src={productDetails.items.imageURL}
              alt={productDetails.items.name}
              className="w-full h-4/5 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              {productDetails.items.name}
            </h1>
            <h5 className="text-xl text-blueColor font-bold mb-4">
              ${productDetails.items.price}.00
            </h5>
            <div className="mb-4">
              <h5 className="text-lg font-bold mb-2">Size</h5>
              <div className="flex flex-wrap gap-2 mb-4">
                {productDetails.sizes.map((value, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-lg text-white font-bold ${
                      productDetails.size === value
                        ? "bg-thirdColor"
                        : "bg-sizeColor  hover:bg-hoverColor"
                    } shadow-md transition-transform transform hover:scale-105`}
                    onClick={() => dispatch(setSize(value))}
                  >
                    {value}
                  </button>
                ))}
              </div>
              {errors.sizeError && (
                <p className="text-red-500 mt-2">{errors.sizeError}</p>
              )}
            </div>
            <div className="mb-4">
              <button
                className="bg-thirdColor hover:bg-hoverColor text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                onClick={handleCart}
              >
                ADD TO CART
              </button>
            </div>
            <div>
              <h5 className="text-lg font-bold mb-2">ABOUT THE PRODUCT</h5>
              <p className="text-gray-700">
                {productDetails.items.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
