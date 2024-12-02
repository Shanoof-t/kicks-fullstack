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
    // dispatch(allUsersFetch());
  }, []);

  useEffect(() => {
    if (orders) {
      dispatch(setOrderList(orders));
    }
  }, [orders]);

  const handleStatusSelector = (e) => {
    const { value } = e.target;
    if (value === "allorder") {
      dispatch(setOrderList(orders));
    } else if (value === "delivered") {
      const deliveredOrders = orders.filter(
        (value) => value.status === "delivered"
      );
      dispatch(setOrderList(deliveredOrders));
    } else if (value === "placed") {
      const placedOrders = orders.filter((value) => value.status === "placed");
      dispatch(setOrderList(placedOrders));
    } else if (value === "pending") {
      const pendingOrders = orders.filter(
        (value) => value.status === "pending"
      );
      dispatch(setOrderList(pendingOrders));
    }
  };

  // if (orderList.length === 0)
  //   return (
  //     <div className="min-h-screen p-6 flex justify-center items-center ">
  //       <div className="text-center">
  //         <h1 className="text-xl font-semibold text-gray-700 mb-4">
  //           Order List
  //         </h1>
  //         <p className="text-sm text-gray-500">
  //           No orders have been placed yet.
  //         </p>
  //       </div>
  //     </div>
  //   );

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
          <option value="placed">Placed</option>
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
                key={order._id}
                onClick={() => navigate(`/admin/order/${order._id}`)}
                className="cursor-pointer hover:bg-gray-100 transition duration-200"
              >
                <td className="border-b border-gray-200 py-3 px-4">
                  {`${order.shipping_address.first_name} ${order.shipping_address.last_name}`}
                </td>
                <td className="border-b border-gray-200 py-3 px-4">
                  {order._id.slice(0, 5)}
                </td>
                <td className="border-b border-gray-200 py-3 px-4">
                  {order.createdAt}
                </td>
                <td className="border-b border-gray-200 py-3 px-4">
                  {order.payment_method}
                </td>
                <td className="border-b border-gray-200 py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-lg text-sm font-medium ${
                      order.status
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="border-b border-gray-200 py-3 px-4">
                  ${order.total_amount}
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
