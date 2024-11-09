import {
  faBagShopping,
  faCalendar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import { userURL } from "../utils/API_URL";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../features/common/allOrders/allOrdersSlice";
import { fetchOrderUser, UpdateUserOrder } from "../features/order/orderAPI";
import { useEffect } from "react";
import { fetchAllOrder } from "../features/common/allOrders/allOrdersAPI";
import { allUsersFetch } from "../features/common/allUsers/allUsersAPI";

function Order() {
  const { orderID } = useParams();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.allOrders.data);
  const order = orders.find((value) => value.orderId === orderID);
  useEffect(() => {
    dispatch(fetchAllOrder());
    dispatch(allUsersFetch());
  }, []);
  const handleDelivered = (orderId, userId) => {
    dispatch(fetchOrderUser({ userURL, userId }))
      .then((res) => {
        const currData = res.payload;
        const updatedData = currData.order.map((value) =>
          value.orderId === orderId ? { ...value, status: false } : value
        );
        dispatch(UpdateUserOrder({ userURL, userId, updatedData }))
          .then(() => {
            dispatch(
              setOrders(
                orders.map((value) =>
                  value.orderId === orderId
                    ? { ...value, status: false }
                    : value
                )
              )
            );
            toast.success("Order Delivered!");
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  if (!order)
    return <div className="text-center text-gray-700">Order not found.</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <ToastContainer />
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Order Details</h1>
      </div>

      <div className="bg-white p-6 shadow-md rounded-lg mb-8">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h2 className="font-semibold text-gray-700">
                Order ID:{" "}
                <span className="font-normal">{order.orderId.slice(0, 5)}</span>
              </h2>
              <div className="bg-secondaryColor text-white p-2 rounded-md text-center ml-4">
                <span className="font-medium">
                  {order.status ? "Pending" : "Delivered"}
                </span>
              </div>
            </div>
            <div>
              <button
                className="bg-blue-500 text-white p-2 rounded-md text-center hover:bg-blue-600 transition duration-300"
                onClick={() => handleDelivered(order.orderId, order.userId)}
              >
                Mark as Delivered
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 mb-6">
          <FontAwesomeIcon icon={faCalendar} className="text-gray-500" />
          <span className="text-gray-700">{order.date}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Customer Info */}
          <div className="bg-gray-100 p-4 shadow rounded-md">
            <div className="flex items-center space-x-2 mb-4">
              <FontAwesomeIcon icon={faUser} className="text-blue-500" />
              <h2 className="font-bold text-gray-700">Customer</h2>
            </div>
            <div>
              <p>
                <strong>Full Name:</strong>{" "}
                {`${order.firstName} ${order.lastName}`}
              </p>
              <p>
                <strong>Email:</strong> {order.email}
              </p>
              <p>
                <strong>Phone:</strong> {order.phone}
              </p>
            </div>
            <Link to={`/admin/userprofile/${order.userId}`}>
              <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow">
                View Profile
              </button>
            </Link>
          </div>

          {/* Order Info */}
          <div className="bg-gray-100 p-4 shadow rounded-md">
            <div className="flex items-center space-x-2 mb-4">
              <FontAwesomeIcon icon={faBagShopping} className="text-blue-500" />
              <h2 className="font-bold text-gray-700">Order Info</h2>
            </div>
            <div>
              <p>
                <strong>Payment Method:</strong> {order.paymentMethod}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {order.status ? "Pending" : "Delivered"}
              </p>
            </div>
            <Link to={`/admin/userprofile/${order.userId}`}>
              <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow">
                View Profile
              </button>
            </Link>
          </div>

          {/* Delivery Info */}
          <div className="bg-gray-100 p-4 shadow rounded-md">
            <div className="flex items-center space-x-2 mb-4">
              <FontAwesomeIcon icon={faBagShopping} className="text-blue-500" />
              <h2 className="font-bold text-gray-700">Deliver to</h2>
            </div>
            <div>
              <p>
                <strong>Address:</strong> {order.address}
              </p>
            </div>
            <Link to={`/admin/userprofile/${order.userId}`}>
              <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow">
                View Profile
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Products</h2>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-4 font-semibold text-gray-600 border-b text-left">
                Product Name
              </th>
              <th className="py-3 px-4 font-semibold text-gray-600 border-b text-left">
                Product ID
              </th>
              <th className="py-3 px-4 font-semibold text-gray-600 border-b text-left">
                Quantity
              </th>
              <th className="py-3 px-4 font-semibold text-gray-600 border-b text-left">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {order.product.map((prdct) => (
              <tr key={prdct.productId} className="border-b hover:bg-gray-100">
                <td className="py-3 px-4">{prdct.name}</td>
                <td className="py-3 px-4">{prdct.productId}</td>
                <td className="py-3 px-4">{prdct.quantity}</td>
                <td className="py-3 px-4">${prdct.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 text-right text-xl font-semibold text-gray-700">
          Total: ${order.amount}
        </div>
      </div>
    </div>
  );
}

export default Order;
