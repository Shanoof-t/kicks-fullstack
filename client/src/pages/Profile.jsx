import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../features/userProfile/userProfileAPI";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.userProfile.userProfile.data);
  
  useEffect(() => {
    dispatch(fetchUserProfile(localStorage.getItem("userId")));
  }, []);
  
  const handleOrderNavigation = () => {
    navigate("/orderdetails");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="  rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-thirdColor mb-4">Profile</h1>
        <hr className="mb-4 border-black" />
        <div className="mb-4">
          <h2 className="text-lg font-medium text-thirdColor ">Full Name:</h2>
          <p className="text-gray-800 text-xl">{`${userData.first_name} ${userData.last_name}`}</p>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-medium text-thirdColor ">Email:</h2>
          <p className="text-gray-800 text-xl">{userData.email}</p>
        </div>
        <div className="flex justify-evenly">
          <div>
            <button
              onClick={handleOrderNavigation}
              className="bg-thirdColor w-36 text-white px-6 py-2 rounded-lg shadow-md hover:bg-hoverColor transition duration-300"
            >
              Your Orders
            </button>
          </div>
          <div>
            <button
              onClick={handleLogout}
              className="bg-red-600 w-36 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
