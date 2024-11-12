import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Field, Form, Formik } from "formik";
import { checkoutValidationSchema } from "./checkoutValidationSchema";
import {
  addOrder,
  fetchUserCartDetails,
} from "../../features/checkout/checkoutAPI";
import { fetchCartItems } from "../../features/cart/cartAPI";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartDetails = useSelector((state) => state.checkout.cartDetails);
  const contactDetails = useSelector((state) => state.checkout.contactDetails);

  useEffect(() => {
    dispatch(fetchUserCartDetails());
  }, [dispatch]);

  const handlePlaceOrder = (values) => {
    const user = localStorage.getItem("role");
    if (user !== "user") {
      navigate("/login");
    } else {
      dispatch(addOrder({ values }))
        .then(() => {
          toast.success("Your Order is Placed", {
            className: "mt-12",
            onClose: () => {
              navigate("/");
              dispatch(fetchCartItems());
            },
          });
        })
        .catch((err) => {
          toast.error(err.message, { className: "mt-12" });
        });
    }
  };

  return (
    <div className="min-h-screen py-10 px-6">
      <ToastContainer />
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">
        {/* Left: Contact Form */}
        <div className="lg:col-span-1 w-full">
          <Formik
            initialValues={contactDetails}
            validationSchema={checkoutValidationSchema}
            onSubmit={handlePlaceOrder}
          >
            {({ errors, touched, handleChange, setFieldValue, values }) => (
              <Form className="space-y-8">
                {/* Contact Details Section */}
                <div className="space-y-4">
                  <h1 className="text-2xl font-bold">Contact Details</h1>
                  <Field
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 bg-transparent border border-black rounded-md"
                    name="email"
                  ></Field>
                  {errors.email && touched.email && (
                    <p className="text-red-600">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-4">
                  <h1 className="text-2xl font-bold">Shipping Address</h1>
                  <Field
                    type="text"
                    placeholder="First Name*"
                    className="w-full px-4 py-3 bg-transparent border border-black rounded-md"
                    name="firstName"
                  ></Field>
                  {errors.firstName && touched.firstName && (
                    <p className="text-red-600">{errors.firstName}</p>
                  )}

                  <Field
                    type="text"
                    placeholder="Last Name*"
                    className="w-full px-4 py-3 bg-transparent border border-black rounded-md"
                    name="lastName"
                  ></Field>
                  {errors.lastName && touched.lastName && (
                    <p className="text-red-600">{errors.lastName}</p>
                  )}

                  <Field
                    type="text"
                    placeholder="Delivery Address*"
                    className="w-full px-4 py-3 bg-transparent border border-black rounded-md"
                    name="address"
                  ></Field>
                  {errors.address && touched.address && (
                    <p className="text-red-600">{errors.address}</p>
                  )}

                  <Field
                    type="number"
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 bg-transparent border border-black rounded-md"
                    name="phone"
                  ></Field>
                  {errors.phone && touched.phone && (
                    <p className="text-red-600">{errors.phone}</p>
                  )}
                </div>

                <div className="space-y-4">
                  <h1 className="text-2xl font-bold">Payment Methods</h1>
                  <div className="flex space-x-6">
                    <label className="inline-flex items-center space-x-2">
                      {/* <Field
                        type="checkbox"
                        className="form-checkbox h-4 w-4"
                        checked={values.paymentMethod === "cash"}
                        onChange={() => setFieldValue("paymentMethod", "cash")}
                      ></Field> */}
                      <Field
                        type="radio"
                        name="paymentMethod"
                        className="form-radio h-4 w-4"
                        value="cash"
                      ></Field>

                      <span>Cash</span>
                    </label>

                    <label className="inline-flex items-center space-x-2">
                      {/* <Field
                          type="checkbox"
                          className="form-checkbox h-4 w-4"
                          checked={values.paymentMethod === "UPI"}
                          onChange={() => setFieldValue("paymentMethod", "UPI")}
                        ></Field> */}
                      <Field
                        type="radio"
                        name="paymentMethod"
                        className="form-radio h-4 w-4"
                        value="UPI"
                      ></Field>
                      <span>UPI</span>
                    </label>
                  </div>

                  {errors.paymentMethod && touched.paymentMethod && (
                    <p className="text-red-600">{errors.paymentMethod}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  className="w-full mt-6 px-6 py-3 bg-thirdColor text-white text-lg font-semibold rounded-lg hover:bg-hoverColor transition duration-300"
                  type="submit"
                >
                  Place Order ${cartDetails.totalAmount}
                </button>
              </Form>
            )}
          </Formik>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-1 w-full space-y-6">
          {/* Order Summary Section */}
          <div className="p-6 rounded-lg border border-gray-300">
            <h1 className="text-2xl font-semibold mb-4">Order Summary</h1>
            <div className="flex justify-between text-lg mb-4">
              <span>{cartDetails.cartProductCount} ITEMS</span>
              <span>${cartDetails.totalAmount}</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between text-xl font-semibold">
              <h2>Total</h2>
              <h2>${cartDetails.totalAmount}</h2>
            </div>
          </div>

          {/* Order Details Section */}
          <div className="p-6 rounded-lg border border-gray-300 space-y-4">
            <h1 className="text-2xl font-semibold mb-2">Your Order</h1>
            <div className="space-y-2">
              {cartDetails.cartProducts.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center"
                >
                  <div className="text-lg">{item.name}</div>
                  <div className="text-lg font-medium">
                    {item.quantity} x ${item.price}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${cartDetails.totalAmount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
