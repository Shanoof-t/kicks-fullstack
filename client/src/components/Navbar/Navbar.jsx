import React, { useCallback, useContext, useEffect, useState } from "react";
import logo from "../../assets/logo/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUser,
  faCartShopping,
  faTimes,
  faBars,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../../features/cart/cartAPI";
import { fetchAllItem_navbar } from "../../features/navbar/navbarAPI";
import {
  setFillteredItems,
  setIsSubmit,
  setSearchText,
  setUiFlags,
} from "../../features/navbar/navbarSlice";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const searchText = useSelector((state) => state.navbar.searchText);
  const allItems = useSelector((state) => state.navbar.allItems);
  const filteredItems = useSelector((state) => state.navbar.filteredItems);
  const isSubmit = useSelector((state) => state.navbar.isSubmit);
  const uiFlags = useSelector((state) => state.navbar.navbarUiFlags);


  const [user, setUser] = useState("");
  useEffect(() => {
    const user = localStorage.getItem("userId");
    setUser(user);
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(fetchCartItems(user));
    }
  }, [user, fetchCartItems]);

  useEffect(() => {
    dispatch(fetchAllItem_navbar());
    if (allItems.error) {
      console.log(allItems.error);
    }
  }, [allItems.error, dispatch]);

  useEffect(() => {
    if (searchText.trim().length > 0) {
      const filtered = allItems.data.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
      dispatch(setFillteredItems(filtered));
    } else {
      dispatch(setFillteredItems([]));
    }
  }, [allItems, searchText]);

  const handleProfile = () => {
    localStorage.length === 0 ? navigate("/login") : navigate("/profile");
  };

  const toggleDropdown = () => {
    dispatch(
      setUiFlags({ name: "showDropdown", value: !uiFlags.showDropdown })
    );
  };

  const toggleMobileMenu = () => {
    dispatch(
      setUiFlags({ name: "showMobileMenu", value: !uiFlags.showMobileMenu })
    );
    if (uiFlags.showMobileMenu) {
      dispatch(setUiFlags({ name: "showMobileCategories", value: false }));
    }
  };

  const toggleMobileCategories = () => {
    dispatch(
      setUiFlags({
        name: "showMobileCategories",
        value: !uiFlags.showMobileCategories,
      })
    );
  };

  const toggleSearch = () => {
    dispatch(
      setUiFlags({
        name: "searchVisible",
        value: !uiFlags.searchVisible,
      })
    );
    if (uiFlags.searchVisible) {
      dispatch(setIsSubmit(false));
      dispatch(setSearchText(""));
      dispatch(setFillteredItems([]));
    }
  };

  const handleSearchSubmit = useCallback((e) => {
    e.preventDefault();
    dispatch(setIsSubmit(true));
  }, []);

  const handleItemClick = () => {
    dispatch(
      setUiFlags({
        name: "searchVisible",
        value: false,
      })
    );
    dispatch(setSearchText(""));
    dispatch(setIsSubmit(false));
  };

  return (
    <header className="container bg-white shadow-md py-3 rounded-b-2xl z-10 w-full ">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center space-x-8 ">
          <ul className="hidden md:flex space-x-8 text-sm font-semibold">
            <li className="hover:text-secondaryColor">
              <Link to="/">Home</Link>
            </li>
            <li className="relative cursor-pointer " onClick={toggleDropdown}>
              <span className="hover:text-secondaryColor">Categories</span>
              <FontAwesomeIcon icon={faCaretDown} className="ms-1.5" />

              <Transition
                show={uiFlags.showDropdown}
                enter="transition ease-out duration-200 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-150 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <ul className="absolute top-full left-0 bg-white shadow-md mt-2 rounded-lg w-48">
                  <Link to="/categorie/MEN" onClick={toggleDropdown}>
                    <li className="px-4 py-2 hover:bg-gray-100">Men</li>
                  </Link>
                  <Link to="/categorie/WOMEN" onClick={toggleDropdown}>
                    <li className="px-4 py-2 hover:bg-gray-100">Women</li>
                  </Link>
                  <Link to="/categorie/KIDS" onClick={toggleDropdown}>
                    <li className="px-4 py-2 hover:bg-gray-100">Kids</li>
                  </Link>
                </ul>
              </Transition>
            </li>
            <li className="hover:text-secondaryColor">
              <Link to="/all">All</Link>
            </li>
          </ul>

          <div className="md:hidden relative">
            <button
              onClick={toggleMobileMenu}
              className="p-2 focus:outline-none text-2xl"
              aria-label="Toggle Menu"
            >
              <FontAwesomeIcon
                icon={uiFlags.showMobileMenu ? faTimes : faBars}
              />
            </button>
            <Transition
              show={uiFlags.showMobileMenu}
              enter="transition ease-out duration-200 transform"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-150 transform"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <ul className="absolute top-full left-0 bg-white shadow-md mt-2 rounded-lg w-48">
                <Link to="/" onClick={toggleMobileMenu}>
                  <li className="px-4 py-2 hover:bg-gray-100">Home</li>
                </Link>

                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer relative flex items-center justify-between"
                  onClick={toggleMobileCategories}
                >
                  <span>Categories</span>
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    className={`ms-1.5 transform ${
                      uiFlags.showMobileCategories ? "rotate-180" : "rotate-0"
                    } transition-transform duration-200`}
                  />
                </li>

                <Transition
                  show={uiFlags.showMobileCategories}
                  enter="transition ease-out duration-200 transform"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="transition ease-in duration-150 transform"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <ul className="bg-white shadow-md rounded-lg w-full">
                    <Link to="/categorie/MEN" onClick={toggleMobileMenu}>
                      <li className="px-8 py-2 hover:bg-gray-100">Men</li>
                    </Link>
                    <Link to="/categorie/WOMEN" onClick={toggleMobileMenu}>
                      <li className="px-8 py-2 hover:bg-gray-100">Women</li>
                    </Link>
                    <Link to="/categorie/KIDS" onClick={toggleMobileMenu}>
                      <li className="px-8 py-2 hover:bg-gray-100">Kids</li>
                    </Link>
                  </ul>
                </Transition>
                <Link to="/all" onClick={toggleMobileMenu}>
                  <li className="px-4 py-2 hover:bg-gray-100">All</li>
                </Link>
              </ul>
            </Transition>
          </div>
        </div>

        <div className="flex items-center">
          <Link to="/">
            <img src={logo} alt="KICKS Logo" className="h-6 md:h-6" />
          </Link>
        </div>

        {/* Right Section: Search, Cart, User */}
        <div className="flex items-center space-x-3 ">
          {/* Search */}
          <div className="relative">
            <button
              onClick={toggleSearch}
              className="focus:outline-none"
              aria-label="Toggle Search"
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-lg p-2"
              />
            </button>

            {/* Search Input */}
            <Transition
              show={uiFlags.searchVisible}
              enter="transition ease-out duration-200 transform"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-150 transform"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                className={`absolute top-full right-0 mt-2 bg-white text-black rounded-md shadow-md overflow-hidden w-64`}
              >
                <form onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    value={searchText}
                    onChange={(e) => dispatch(setSearchText(e.target.value))}
                    placeholder="Search..."
                    className="w-full px-4 py-2 bg-thirdColor text-white focus:outline-none"
                  />
                </form>
                {isSubmit && filteredItems.length > 0 && (
                  <div className="max-h-60 overflow-auto">
                    {filteredItems.map((value) => (
                      <div className="m-1 p-1" key={value.id}>
                        <Link
                          to={`/product/${value.id}`}
                          onClick={handleItemClick}
                        >
                          <h6 className="text-gray-700 hover:text-secondaryColor">
                            {value.name}
                          </h6>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
                {isSubmit && filteredItems.length === 0 && (
                  <div className="m-1 p-1 text-gray-700">No results found.</div>
                )}
              </div>
            </Transition>
          </div>

          <Link to="/cart">
            <button className="relative p-2" aria-label="View Cart">
              <FontAwesomeIcon icon={faCartShopping} className="text-lg" />
              <span className="absolute -top-1 -right-1 bg-secondaryColor text-white rounded-full text-xs px-1.5 py-0.5">
                {cartItems.length}
              </span>
            </button>
          </Link>

          <button
            className="p-2"
            onClick={handleProfile}
            aria-label="User Profile"
          >
            <FontAwesomeIcon icon={faUser} className="text-lg" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
