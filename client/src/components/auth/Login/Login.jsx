import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { loginValidation } from "./loginValidationSchema";
import { userFetch } from "../../../features/login/loginAPI";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const LoginValues = useSelector((state) => state.login.formValues);
  const userFetchValues = useSelector((state) => state.login.userFetchValues);
  const handleSubmit = async (values) => {
    const loginData = {
      email: values.email,
      password: values.password,
    };
    dispatch(userFetch(loginData))

    // if (matchedUser.isAdmin) {
    //   localStorage.setItem("adminId", matchedUser.id);
    //   localStorage.setItem("isAdmin", matchedUser.isAdmin);
    //   navigate("/admin", { replace: true });
    // } else {
    //   localStorage.setItem("userId", matchedUser.id);
    //   localStorage.setItem("firstName", matchedUser.firstName);
    //   localStorage.setItem("lastName", matchedUser.lastName);
    //   localStorage.setItem("email", matchedUser.email);
    //   localStorage.setItem("isAllowed", matchedUser.isAllowed);
    //   navigate(-1, { replace: true });
    // }

  };
  return (
    <div className="flex flex-col items-center justify-center h-screen  ">
      <div className=" p-8 rounded-lg  w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-6">Login</h1>
        <Formik
          initialValues={LoginValues}
          onSubmit={handleSubmit}
          validationSchema={() => loginValidation()}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="mb-4">
                <Field
                  type="text"
                  placeholder="Email"
                  name="email"
                  className="w-full px-4 py-3 bg-transparent border border-black rounded-md text-gray-800 focus:outline-none focus:ring-0"
                ></Field>
                {touched.email && errors.email && (
                  <p className="text-red-600">{errors.email}</p>
                )}
              </div>
              <div className="mb-6">
                <Field
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="w-full px-4 py-3 bg-transparent border border-black rounded-md text-gray-800 focus:outline-none focus:ring-0"
                ></Field>
                {touched.password && errors.password && (
                  <p className="text-red-600">{errors.password}</p>
                )}
                {errors.blockError && (
                  <p className="text-red-600">{errors.blockError}</p>
                )}
                {userFetchValues.error && (
                  <p className="text-red-600">{userFetchValues.error}</p>
                )}
              </div>
              {errors.blockError && (
                <button
                  className="w-full  text-white py-3 rounded-md font-semibold bg-red-600 hover:bg-red-800 transition duration-300"
                  onClick={() => navigate("/")}
                >
                  Go Back
                </button>
              )}
              <button
                className="w-full mt-3 text-white py-3 rounded-md font-semibold bg-thirdColor hover:bg-hoverColor transition duration-300"
                type="submit"
              >
                Log In
              </button>
            </Form>
          )}
        </Formik>
        <div className="text-center mt-5">
          <p className="text-gray-700 mb-2">
            <span>Don't have an account? </span>
            <button
              onClick={() => navigate("/register")}
              className="text-thirdColor "
            >
              Create your <strong>Kicks</strong> account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
