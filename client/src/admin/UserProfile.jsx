import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfileUser } from "../features/userProfile/userProfileSlice";
import {
  fetchUserProfileBYId,
  updateBlockedUser,
} from "../features/userProfile/userProfileAPI";
import { allUsersFetch } from "../features/common/allUsers/allUsersAPI";
import { setUsers } from "../features/common/allUsers/allUsersSlice";
import Loading from "../components/Loading";
import { handleToast } from "../utils/handleToast";

function UserProfile() {
  const { userID } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userProfile.userProfile.data);
  const loading = useSelector((state) => state.userProfile.userProfile.loading);

  useEffect(() => {
    dispatch(fetchUserProfileBYId(userID));
  }, [userID]);

  const handleBlock = (action) => {
    dispatch(updateBlockedUser({ userID, action })).then((res) => {
      console.log("thos is res block", res);
      const { status, message } = res.payload;
      handleToast(status, message).then(() => {
        dispatch(fetchUserProfileBYId(userID));
      });
    });
    // .then(() => {
    //   dispatch(
    //     setUsers(
    //       users.map((value) =>
    //         value.id === id ? { ...value, isAllowed: !value.isAllowed } : value
    //       )
    //     )
    //   );
    // });
  };

  if (loading) return <Loading />;
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* User Details Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-700">User Details</h1>
      </div>

      <div className=" p-6  mb-8">
        <h1 className="font-bold text-xl text-gray-800">{`User ID: ${user._id}`}</h1>
        <div className="space-y-2 mt-4">
          <h1 className="text-lg text-gray-600">
            <span className="font-semibold">Name:</span>{" "}
            {`${user.first_name} ${user.last_name}`}
          </h1>
          <h1 className="text-lg text-gray-600">
            <span className="font-semibold">Email:</span> {user.email}
          </h1>
        </div>
        <div className="mt-4">
          {user.isAllowed ? (
            <button
              className="bg-red-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-800 transition duration-300"
              onClick={() => handleBlock("block")}
            >
              Block User
            </button>
          ) : (
            <button
              className="bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
              onClick={() => handleBlock("unblock")}
            >
              Unblock User
            </button>
          )}
        </div>
      </div>

      {/* User Cart Section */}
      <div className="p-6 mt-8">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Cart</h1>
        {user.cart && user.cart.length > 0 ? (
          <table className="min-w-full table-auto border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  ID
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Product Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Quantity
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {user.cart.map((item) => (
                <tr key={item._id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2 text-sm text-gray-600">
                    {item._id}
                  </td>
                  <td className="border px-4 py-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td className="border px-4 py-2 text-sm text-gray-600">
                    {item.quantity}
                  </td>
                  <td className="border px-4 py-2 text-sm text-gray-600">
                    ${item.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className=" p-4 rounded-md text-gray-700">
            <h2 className="font-semibold text-xl">No items in the cart</h2>
            <p className="mt-2 text-sm">
              This user has no items in their cart yet.
            </p>
          </div>
        )}
      </div>

      {/* User Orders Section */}
      <div className="p-6 mt-8">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Orders</h1>
        {user.order && user.order.length > 0 ? (
          <table className="min-w-full table-auto border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  ID
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Product Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Quantity
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {user.order.map((order) =>
                order.products.map((product) => (
                  <tr key={product.productId} className="hover:bg-gray-100">
                    <td className="border px-4 py-2 text-sm text-gray-600">
                      {product._id}
                    </td>
                    <td className="border px-4 py-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-4">
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <span>{product.name}</span>
                      </div>
                    </td>
                    <td className="border px-4 py-2 text-sm text-gray-600">
                      {product.quantity}
                    </td>
                    <td className="border px-4 py-2 text-sm text-gray-600">
                      ${product.price}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        ) : (
          <div className=" p-4 rounded-md text-gray-700">
            <h2 className="font-semibold text-xl">No orders placed yet</h2>
            <p className="mt-2 text-sm">
              This user has not placed any orders yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
