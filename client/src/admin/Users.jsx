import React, { useEffect, useState } from "react";
import UserList from "./components/UserList";
import { useDispatch, useSelector } from "react-redux";
import { allUsersFetch } from "../features/common/allUsers/allUsersAPI";

function Users() {
  const users = useSelector((state) => state.allUsers.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allUsersFetch());
  }, []);

  const [userType, setUserType] = useState("allusers");
  const activeUsers = users.filter((value) => value.isAllowed);
  const nonActiveUsers = users.filter((value) => !value.isAllowed);

  const handleUserType = (e) => {
    const { value } = e.target;
    setUserType(value);
  };

  return (
    <div className=" p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-700">Users</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold text-gray-600">
            Total Customers
          </h2>
          <h3 className="text-2xl font-bold text-gray-800">{users.length}</h3>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold text-gray-600">
            Active Customers
          </h2>
          <h3 className="text-2xl font-bold text-green-600">
            {activeUsers.length}
          </h3>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold text-gray-600">
            Nonactive Customers
          </h2>
          <h3 className="text-2xl font-bold text-red-600">
            {nonActiveUsers.length}
          </h3>
        </div>
      </div>

      <div className="mb-4">
        <select
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleUserType}
        >
          <option value="allusers">All Users</option>
          <option value="activeUsers">Active Users</option>
          <option value="nonActiveUser">Non Active User</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Email
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <UserList
              value={{ userType, users, activeUsers, nonActiveUsers }}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
