import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userURL } from "../utils/API_URL";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfileUser } from "../features/userProfile/userProfileSlice";
import { fetchUserProfile, updateBlockedUser } from "../features/userProfile/userProfileAPI";
import { allUsersFetch } from "../features/common/allUsers/allUsersAPI";
import { setUsers } from "../features/common/allUsers/allUsersSlice";

function UserProfile() {
  const { userID } = useParams();
  const dispatch = useDispatch();

  const users = useSelector((state) => state.allUsers.data);
  const user = useSelector((state) => state.userProfile.user);

  useEffect(() => {
    dispatch(allUsersFetch());
  }, []);

  useEffect(() => {
    const userData = users.find((value) => value.id === userID);
    if (userData) {
      dispatch(setUserProfileUser(userData));
    } else {
      dispatch(fetchUserProfile({ userURL, userID })).then((res) => {
        dispatch(setUserProfileUser(res.payload));
      });
    }
  }, [users, userID]);

  const handleBlock = (id) => {
    dispatch(updateBlockedUser({ userURL, id, user }))
      .then(() => {
        dispatch(
          setUsers(
            users.map((value) =>
              value.id === id
                ? { ...value, isAllowed: !value.isAllowed }
                : value
            )
          )
        );
      })
      
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <h1 className="text-xl text-gray-600">Loading....</h1>
      </div>
    );
  } else {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        {/* User Details Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-700">User Details</h1>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h1 className="font-bold text-xl text-gray-800">{`User ID: ${user.id}`}</h1>
          <div className="space-y-2 mt-4">
            <h1 className="text-lg text-gray-600">
              <span className="font-semibold">Name:</span>{" "}
              {`${user.firstName} ${user.lastName}`}
            </h1>
            <h1 className="text-lg text-gray-600">
              <span className="font-semibold">Email:</span> {user.email}
            </h1>
          </div>
          <div className="mt-4">
            {user.isAllowed ? (
              <button
                className="bg-red-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-800 transition duration-300"
                onClick={() => handleBlock(user.id)}
              >
                Block User
              </button>
            ) : (
              <button
                className="bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
                onClick={() => handleBlock(user.id)}
              >
                Unblock User
              </button>
            )}
          </div>
        </div>

        {/* User Cart Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">Cart</h1>
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
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2 text-sm text-gray-600">
                    {item.id}
                  </td>
                  <td className="border px-4 py-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.imageURL}
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
        </div>

        {/* User Orders Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">Orders</h1>
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
                order.product.map((product) => (
                  <tr key={product.productId} className="hover:bg-gray-100">
                    <td className="border px-4 py-2 text-sm text-gray-600">
                      {product.productId}
                    </td>
                    <td className="border px-4 py-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-4">
                        <img
                          src={product.imageURL}
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
        </div>
      </div>
    );
  }
}

export default UserProfile;
