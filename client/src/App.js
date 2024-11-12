import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Categorie from "./pages/Categorie";
import AddProduct from "./admin/AddProduct";
import DashboardHome from "./admin/DashboardHome";
import ProductsDash from "./admin/ProductsDash";
import UpdateProduct from "./admin/UpdateProduct";
import Users from "./admin/Users";
import OrderList from "./admin/OrderList";
import Order from "./admin/Order";
import UserProfile from "./admin/UserProfile";
import React, { lazy, Suspense, useEffect } from "react";
import Loading from "./components/Loading";
import Register from "./components/auth/Register/Register";
import Login from "./components/auth/Login/Login";
const OrderDetails = lazy(() => import("./pages/OrderDetails"));
const Home = React.lazy(() => import("./pages/Home"));
const HeaderDash = React.lazy(() => import("./admin/components/HeaderDash"));
const Checkout = React.lazy(() => import("./pages/checkout/Checkout"));
const CategorieDetails = React.lazy(() => import("./pages/CategorieDetails"));
const ProductDetails = React.lazy(() => import("./pages/ProductDetails"));
const AllProduct = React.lazy(() => import("./pages/AllProducts"));
function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const hideComponent =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname.startsWith("/admin");

  // useEffect(() => {
  //   const role = localStorage.getItem("role");
  //   if (role) {
  //     if (role === "admin") {
  //       navigate("/admin", { replace: true });
  //     } else if (role === "user") {
  //       navigate("/", { replace: true });
  //     }
  //   }
  // }, []);

  return (
    <>
      <div className={hideComponent ? "" : "container mx-auto"}>
        {!hideComponent && <Navbar />}
        <Routes>
          {/* User Routes */}
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                <Home />
              </Suspense>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="home" element={<Home />} />
          <Route path="categorie/:categorieGender" element={<Categorie />}>
            <Route
              path=":categrieType"
              element={
                <Suspense fallback={<Loading />}>
                  <CategorieDetails />
                </Suspense>
              }
            >
            </Route>
          </Route>
          <Route
            path="all"
            element={
              <Suspense fallback={<Loading />}>
                <AllProduct />
              </Suspense>
            }
          />
          <Route
            path="product/:productId"
            element={
              <Suspense fallback={<Loading />}>
                <ProductDetails />
              </Suspense>
            }
          />
          <Route path="cart" element={<Cart />} />
          <Route
            path="checkout"
            element={
              <Suspense fallback={<Loading />}>
                <Checkout />
              </Suspense>
            }
          />
          <Route path="profile" element={<Profile />} />
          <Route
            path="orderdetails"
            element={
              <Suspense fallback={<Loading />}>
                <OrderDetails />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />

          {/* Admin Routes */}

          <Route
            path="admin"
            element={
              <Suspense fallback={<Loading />}>
                <HeaderDash />
              </Suspense>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route
              path="productlist/:productCategory"
              element={<ProductsDash />}
            />
            <Route path="addproduct" element={<AddProduct />} />
            <Route path="updateproduct/:itemId" element={<UpdateProduct />} />
            <Route path="orderlist" element={<OrderList />} />
            <Route path="order/:orderID" element={<Order />} />
            <Route path="users" element={<Users />} />
            <Route path="userprofile/:userID" element={<UserProfile />} />
          </Route>
        </Routes>
      </div>
      {!hideComponent && <Footer />}
    </>
  );
}

export default App;
