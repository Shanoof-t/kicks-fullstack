import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderDetailsFetch } from "../features/order_details/orderDetailsAPI";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import razorpayCheckoutFlow from "../utils/razorpayCheckoutFlow";

function OrderDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderdetails = useSelector((state) => state.orderDetails.orderData);

  const handleRepayment = (_id) => {
    const order = orderdetails.data.find((order) => order._id === _id);
    razorpayCheckoutFlow(order, dispatch, navigate);
  };

  useEffect(() => {
    window.scroll(0, 0);
    dispatch(orderDetailsFetch());
  }, []);

  if (orderdetails.loading) return <Loading />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Your Orders</h1>
      </div>
      <hr className="mb-6 border-gray-300" />
      {orderdetails.data.length === 0 ? (
        <div className="text-center">
          <h1 className="font-bold text-xl text-gray-700">
            {orderdetails.error || "No orders found!"}
          </h1>
        </div>
      ) : (
        orderdetails.data.map((order) => (
          <div
            key={order._id}
            className=" shadow-md rounded-lg mb-8 p-6 border border-gray-200"
          >
            <div className="mb-4">
              <h1 className="text-2xl font-semibold text-gray-800">
                Order ID:{" "}
                <span className="text-primary font-bold">{order._id}</span>
              </h1>
            </div>
            <hr className="my-4 border-gray-300" />
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-600 mb-2">
                Delivery Details
              </h2>
              <div className="text-gray-700 space-y-2">
                <p>
                  <span className="font-semibold">Address:</span>{" "}
                  {order.shipping_address.location}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span>{" "}
                  {order.shipping_address.phone}
                </p>
                <p>
                  <span className="font-semibold">Payment Method:</span>{" "}
                  {order.payment_method}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`${
                      order.status === "pending"
                        ? "text-yellow-500"
                        : "text-green-600"
                    } font-bold`}
                  >
                    {order.status}
                  </span>
                </p>
                {order.status === "pending" && (
                  <button
                    onClick={() => handleRepayment(order._id)}
                    className="w-32 px-4 py-2 text-white bg-thirdColor font-bold rounded hover:bg-hoverColor transition-colors duration-300"
                  >
                    Repay Now
                  </button>
                )}
              </div>
            </div>
            <h2 className="text-lg font-semibold text-gray-600 mb-4">
              Products
            </h2>
            {order.products.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center  p-4 mb-4 rounded-md border border-gray-200"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <h1 className="text-lg font-medium text-gray-800">
                      {item.name}
                    </h1>
                    <p className="text-gray-600">
                      Qty:{" "}
                      <span className="font-semibold text-gray-800">
                        {item.quantity}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <h1 className="text-lg font-bold text-gray-800">
                    ${item.price}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default OrderDetails;
