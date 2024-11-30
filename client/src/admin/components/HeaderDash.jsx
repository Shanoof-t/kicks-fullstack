import React, { useEffect, useState } from "react";
import logo from "../../assets/logo/Logo.png";
import { Outlet, useNavigate } from "react-router-dom";
import {
  faChevronDown,
  faUser,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dash from "../../assets/icons/dashboaard.svg";
import productImg from "../../assets/icons/albums.svg";
import orderListImg from "../../assets/icons/document-text.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProductsToheader } from "../../features/dashboard_header/dashboardHeaderApi";

const HeaderDash = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allitems = useSelector((state) => state.dashBoardHeader.items.data);
  const role = localStorage.getItem("role");
  
  useEffect(() => {
    dispatch(fetchAllProductsToheader());
  }, [navigate, dispatch]);

  const [casualCount, footballCount, runningCount] = allitems.reduce(
    (count, value) => {
      if (value.category === "CASUAL") {
        count[0]++;
      } else if (value.category === "FOOTBALL") {
        count[1]++;
      } else if (value.category === "RUNNING") {
        count[2]++;
      }
      return count;
    },
    [0, 0, 0]
  );

  const [categoryShow, setCategoryShow] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleCategory = () => setCategoryShow(!categoryShow);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleCategory = (type) => {
    navigate(`productlist/${type}`);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (role !== "admin") {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Access Denied</h1>
          <p className="text-gray-700 mt-2">
            You don't have permission to access this page.
          </p>
          <button
            className="px-4 py-2 mt-5 bg-gray-500 text-white rounded-md shadow hover:bg-gray-600 transition duration-200"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Mobile Menu Button */}
      <div className="fixed top-0  left-0 w-full bg-white flex justify-between p-4 md:hidden z-50">
        <img src={logo} alt="Logo" className="h-8" />
        <button onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`w-64 bg-white border-r shadow-lg flex flex-col py-6 px-4 fixed h-screen z-40 transition-transform duration-300 md:translate-x-0 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }  md:block md:relative md:translate-x-0`}
      >
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <img src={logo} alt="Logo" className="h-8" />
        </div>

        {/* Button Section */}
        <div className="space-y-2 flex-grow">
          <button
            className="w-full flex items-center justify-start px-4 py-3 rounded-md text-gray-700 hover:text-white hover:bg-secondaryBlue focus:bg-secondaryBlue focus:text-white transition duration-200"
            onClick={() => navigate("/admin")}
          >
            <img src={dash} alt="Dashboard Icon" className="mr-3 h-5 w-5" />
            <h1 className="text-sm font-semibold uppercase">Dashboard</h1>
          </button>

          <button
            className="w-full flex items-center justify-start px-4 py-3 rounded-md text-gray-700 hover:text-white hover:bg-secondaryBlue focus:bg-secondaryBlue focus:text-white transition duration-200"
            onClick={() => handleCategory("all")}
          >
            <img
              src={productImg}
              alt="All Products Icon"
              className="mr-3 h-5 w-5"
            />
            <h1 className="text-sm font-semibold uppercase">All Products</h1>
          </button>

          <button
            className="w-full flex items-center justify-start px-4 py-3 rounded-md text-gray-700 hover:text-white hover:bg-secondaryBlue focus:bg-secondaryBlue focus:text-white transition duration-200"
            onClick={() => navigate("orderlist")}
          >
            <img
              src={orderListImg}
              alt="Order List Icon"
              className="mr-3 h-5 w-5"
            />
            <h1 className="text-sm font-semibold uppercase">Order List</h1>
          </button>

          <button
            className="w-full flex items-center justify-start px-4 py-3 rounded-md text-gray-700 hover:text-white hover:bg-secondaryBlue focus:bg-secondaryBlue focus:text-white transition duration-200"
            onClick={() => navigate("users")}
          >
            <FontAwesomeIcon icon={faUser} className="mr-3 h-5 w-5" />
            <h1 className="text-sm font-semibold uppercase">Users</h1>
          </button>

          {/* Category Dropdown */}

          <div>
            <div
              className="flex justify-between items-center cursor-pointer mt-3"
              onClick={toggleCategory}
            >
              <h1 className="text-sm font-semibold text-gray-700">Category</h1>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`transition-transform duration-300 ${
                  categoryShow ? "rotate-180" : ""
                }`}
              />
            </div>

            {categoryShow && (
              <div className="space-y-2 mt-4">
                <div
                  className="flex justify-between cursor-pointer py-1 font-bold items-center hover:bg-gray-100 px-2 rounded transition"
                  onClick={() => handleCategory("CASUAL")}
                >
                  <h1 className="text-sm text-gray-600">Casual</h1>
                  <span className="text-white bg-secondaryBlue text-center rounded w-10 h-8 flex items-center justify-center">
                    {casualCount}
                  </span>
                </div>
                <div
                  className="flex justify-between cursor-pointer py-1 font-bold hover:bg-gray-100 items-center px-2 rounded transition"
                  onClick={() => handleCategory("FOOTBALL")}
                >
                  <h1 className="text-sm text-gray-600">Football</h1>
                  <span className="text-white bg-secondaryBlue text-center rounded w-10 h-8 flex items-center justify-center">
                    {footballCount}
                  </span>
                </div>
                <div
                  className="flex justify-between cursor-pointer items-center font-bold py-1 hover:bg-gray-100 px-2 rounded transition"
                  onClick={() => handleCategory("RUNNING")}
                >
                  <h1 className="text-sm text-gray-600">Running</h1>
                  <span className="text-white bg-secondaryBlue text-center rounded w-10 h-8 flex items-center justify-center">
                    {runningCount}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-10">
          <button
            className="w-full flex items-center justify-center px-4 py-3  bg-red-600 hover:bg-red-700 text-white rounded-md shadow  transition duration-200"
            onClick={handleLogout}
          >
            <h1 className="text-sm font-semibold uppercase">Logout</h1>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-0 flex-grow bg-gray-100 p-8 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default HeaderDash;
