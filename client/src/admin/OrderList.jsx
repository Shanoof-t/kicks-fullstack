import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setOrderList } from "../features/orderList/orderListSlice";
import { fetchAllOrder } from "../features/common/allOrders/allOrdersAPI";
import { allUsersFetch } from "../features/common/allUsers/allUsersAPI";
function OrderList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.allOrders.data);
  const users = useSelector((state) => state.allUsers.data);
  const orderList = useSelector((state) => state.orderList.orderList);

  useEffect(() => {
    dispatch(fetchAllOrder());
    dispatch(allUsersFetch());
  }, []);
  useEffect(() => {
    if (orders) {
      dispatch(setOrderList(orders));
    }
  }, [users]);
  const handleStatusSelector = (e) => {
    const { value } = e.target;
    if (value === "allorder") {
      dispatch(setOrderList(orders));
    } else if (value === "delivered") {
      const deliveredOrders = orders.filter((value) => !value.status);
      dispatch(setOrderList(deliveredOrders));
    } else if (value === "pending") {
      const pendingOrders = orders.filter((value) => value.status);
      dispatch(setOrderList(pendingOrders));
    }
  };
  return (
    <div className="min-h-screen p-6 ">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Order List</h1>
      </div>
      <div className="mb-4">
        <select
          className="px-4 py-2 border border-gray-300 rounded-md"
          onChange={handleStatusSelector}
        >
          <option value="allorder">All Orders</option>
          <option value="delivered">Delivered</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold">Purchases</h1>
        </div>
        <hr />
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
              <th className="py-3 px-4">Customer Name</th>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Payment Method</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Amount</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {orderList.map((order) => (
              <tr
                key={order.orderId}
                onClick={() => navigate(`/admin/order/${order.orderId}`)}
                className="cursor-pointer hover:bg-gray-100 transition duration-200"
              >
                <td className="border-b border-gray-200 py-3 px-4">
                  {`${order.firstName} ${order.lastName}`}
                </td>
                <td className="border-b border-gray-200 py-3 px-4">
                  {order.orderId.slice(0, 5)}
                </td>
                <td className="border-b border-gray-200 py-3 px-4">
                  {order.date}
                </td>
                <td className="border-b border-gray-200 py-3 px-4">
                  {order.paymentMethod}
                </td>
                <td className="border-b border-gray-200 py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-lg text-sm font-medium ${
                      order.status
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {order.status ? "Pending" : "Delivered"}
                  </span>
                </td>
                <td className="border-b border-gray-200 py-3 px-4">
                  ${order.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderList;
