import React from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const email = localStorage.getItem("email");

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
          <p className="text-gray-800 text-xl">{`${firstName} ${lastName}`}</p>
        </div>
        <div className="mb-6">  
          <h2 className="text-lg font-medium text-thirdColor ">Email:</h2>
          <p className="text-gray-800 text-xl">{email}</p>
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
