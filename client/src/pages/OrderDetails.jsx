import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderDetailsFetch } from "../features/order_details/orderDetailsAPI";
import Loading from "../components/Loading";
function OrderDetails() {
  const dispatch = useDispatch();
  const orderdetails = useSelector((state) => state.orderDetails.orderData);
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    dispatch(orderDetailsFetch(userId));
  }, [userId]);

  if (orderdetails.loading) return <Loading />;
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
      </div>
      <hr className="mb-8 border-gray-300" />
      {orderdetails.data.length === 0 ? (
        <div className="text-center">
          <h1 className="font-bold text-xl">No orders</h1>
        </div>
      ) : (
        orderdetails.data.map((order) => {
          return (
            <div key={order.orderId} className=" rounded-lg mb-8 p-6">
              <div>
                <h1 className="text-3xl font-bold text-thirdColor">
                  Order ID: {order.orderId}
                </h1>
              </div>
              <hr className="my-4 border-black" />
              <div className="mb-6">
                <div>
                  <h1 className="text-xl font-semibold text-thirdColor">
                    Delivery
                  </h1>
                </div>
                <div className="mt-3">
                  <h5 className="text-lg font-medium text-thirdColor">
                    Address
                  </h5>
                  <p className="text-gray-600">{order.address}</p>
                  <p className="text-gray-600">
                    <span className="text-thirdColor">Phone : </span>
                    {order.phone}
                  </p>
                  <p className="text-gray-600">
                    <span className="text-thirdColor">Payment : </span>
                    {order.paymentMethod}
                  </p>
                </div>
              </div>
              {order.product.map((item) => {
                return (
                  <div
                    key={item.productId}
                    className="flex justify-between items-center  pb-4 mb-4"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.imageURL}
                        alt={item.name}
                        className="w-40 h-40 object-cover rounded-lg"
                      />
                      <div>
                        <h1 className="text-lg  font-medium text-gray-700">
                          {item.name}
                        </h1>
                      </div>
                    </div>
                    <div className="text-right flex space-x-6 items-center">
                      <div>
                        <h1 className="text-xl font-semibold text-gray-800">
                          ${item.price}
                        </h1>
                        <h5 className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </h5>
                      </div>
                      {/* <div>
                        <button
                          className="bg-thirdColor p-4 rounded-xl text-white font-bold hover:bg-hoverColor"
                          onClick={() => handleCancel(order.id, item.productId)}
                        >
                          cancel order
                        </button>
                      </div> */}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })
      )}
    </div>
  );
}

export default OrderDetails;
