import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartItems,
  fetchCartItems,
  updateCartQuantity,
} from "../features/cart/cartAPI";
import Loading from "../components/Loading";
import { handleToast } from "../utils/handleToast";

function Cart() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();

  const {
    cartItems,
    cartLoading,
    cartTotalPrice,
    CartProductCount,
    cartError,
  } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, []);

  const handleQuantity = (id, action) => {
    dispatch(updateCartQuantity({ id, action })).then((res) => {
      const { status, message } = res.payload;
      handleToast(status, message);
      dispatch(fetchCartItems());
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteCartItems({ id })).then((res) => {
      const { status, message } = res.payload;
      handleToast(status, message);
      dispatch(fetchCartItems());
    });
  };

  if (cartLoading) return <Loading />;

  return (
    <div className="container mx-auto p-8 ">
      {/* Page Heading */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold">Your Bag</h1>
        <p className="text-gray-600 mt-2">
          Items in your bag are not reserved. Check out now to make them yours.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items Section */}
        <div className="lg:w-2/3">
          {cartItems.length > 0 ? (
            cartItems.map((value) => {
              return (
                <div
                  key={value._id}
                  className="flex items-center justify-between border-b pb-4 mb-6  p-4 rounded-lg "
                >
                  <div className="w-24 me-3">
                    <img
                      src={value.image_url}
                      alt={value.name}
                      className="w-full rounded-lg shadow-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-2 w-1/2">
                    <h1 className="text-lg font-medium">{value.name}</h1>
                    <h2 className="text-gray-500">Size : {value.size}</h2>
                    <div className="flex items-center gap-2">
                      <button
                        className="bg-thirdColor hover:bg-hoverColor px-3 py-1 rounded"
                        onClick={() => {
                          if (value.quantity > 1) {
                            handleQuantity(value._id, "decrement");
                          }
                        }}
                      >
                        <span className="text-white">-</span>
                      </button>
                      <h1 className="font-bold mx-2">{value.quantity}</h1>
                      <button
                        className="bg-thirdColor hover:bg-hoverColor px-3 py-1 rounded"
                        onClick={() => {
                          handleQuantity(value._id, "increment");
                        }}
                      >
                        <span className="text-white">+</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <h1 className="text-xl font-semibold">${value.price}</h1>
                    <button onClick={() => handleDelete(value._id)}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-red-500 hover:text-red-700"
                      />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <h1 className="text-center text-gray-500">Cart is Empty</h1>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3  p-6 rounded-lg ">
          <h1 className="text-2xl font-bold mb-6">Order Summary</h1>
          <div className="flex justify-between text-lg mb-4">
            <h5>
              {CartProductCount} ITEM{CartProductCount > 1 ? "S" : ""}
            </h5>
            <h5>${cartTotalPrice}</h5>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-xl font-semibold">
            <h2>Total</h2>
            <h2>${cartTotalPrice}</h2>
          </div>

          <Link to={cartTotalPrice > 0 ? "/checkout" : ""}>
            <button
              className="w-full mt-6 bg-thirdColor text-white py-3 rounded-lg hover:bg-hoverColor transition"
              disabled={cartTotalPrice === 0}
            >
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
