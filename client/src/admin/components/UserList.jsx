import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserList({ value }) {
  const navigate = useNavigate();
  const { userType, users, activeUsers, nonActiveUsers } = value;
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (userType === "allusers") {
      setUser(users);
    } else if (userType === "activeUsers") {
      setUser(activeUsers);
    } else if (userType === "nonActiveUser") {
      setUser(nonActiveUsers);
    }
  }, [userType, value]);

  return user.map((value) => {
    return (
      <tr
        key={value._id}
        className="hover:bg-gray-100 cursor-pointer"
        onClick={() => navigate(`/admin/userprofile/${value._id}`)}
      >
        <td className="border px-4 py-2 text-sm text-gray-600">{value._id}</td>
        <td className="border px-4 py-2 text-sm text-gray-600">{`${value.first_name} ${value.last_name}`}</td>
        <td className="border px-4 py-2 text-sm text-gray-600">
          {value.email}
        </td>
        <td className="border px-4 py-2 text-sm">
          <span
            className={`${
              value.isAllowed
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            } px-2 py-1 rounded-full text-xs`}
          >
            {value.isAllowed ? "Active" : "NonActive"}
          </span>
        </td>
      </tr>
    );
  });
}

export default UserList;
