import {
  faBagShopping,
  faCalendar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderUser, UpdateUserOrder } from "../features/order/orderAPI";
import { useEffect } from "react";
import Loading from "../components/Loading";
import { handleToast } from "../utils/handleToast";

function Order() {
  const { orderID } = useParams();
  const dispatch = useDispatch();

  const order = useSelector((state) => state.order.userData.data);
  const loading = useSelector((state) => state.order.userData.loading);

  useEffect(() => {
    dispatch(fetchOrderUser({ orderID }));
  }, [orderID]);

  const handleDelivered = (action) => {
    dispatch(UpdateUserOrder({ action, orderID })).then((res) => {
      console.log(res.payload)
      const { status, messsage } = res.payload;
      console.log("in order",status,messsage)
      if (status === "success") dispatch(fetchOrderUser({ orderID }))
      handleToast(status, messsage);
    });
  };

  if (loading) return <Loading />;

  if (order.length === 0)
    return <div className="text-center text-gray-700">Order not found.</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Order Details</h1>
      </div>

      <div className="bg-white p-6 shadow-md rounded-lg mb-8">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h2 className="font-semibold text-gray-700">
                Order ID: <span className="font-normal">{order._id}</span>
              </h2>
              <div className="bg-secondaryColor text-white p-2 rounded-md text-center ml-4">
                <span className="font-medium">{order.status}</span>
              </div>
            </div>
            <div>
              <button
                className="bg-blue-500 text-white p-2 rounded-md text-center hover:bg-blue-600 transition duration-300"
                onClick={() => handleDelivered("delivered")}
              >
                Mark as Delivered
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 mb-6">
          <FontAwesomeIcon icon={faCalendar} className="text-gray-500" />
          <span className="text-gray-700">{order.createdAt}</span>
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
                {`${order.shipping_address.first_name} ${order.shipping_address.last_name}`}
              </p>
              <p>
                <strong>Email:</strong> {order.shipping_address.email}
              </p>
              <p>
                <strong>Phone:</strong> {order.shipping_address.phone}
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
                <strong>Payment Method:</strong> {order.payment_method}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
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
                <strong>Address:</strong> {order.shipping_address.location}
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
            {order.products &&
              order.products.map((prdct) => (
                <tr key={prdct._id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">{prdct.name}</td>
                  <td className="py-3 px-4">{prdct._id}</td>
                  <td className="py-3 px-4">{prdct.quantity}</td>
                  <td className="py-3 px-4">${prdct.price}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="mt-4 text-right text-xl font-semibold text-gray-700">
          Total: ${order.total_amount}
        </div>
      </div>
    </div>
  );
}

export default Order;
