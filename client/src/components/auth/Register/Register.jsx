import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerDataPost } from "../../../features/register/registerAPI";
import { Field, Form, Formik } from "formik";
import { registerValidation } from "./registerValidationSchema";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerValues = useSelector((state) => state.register.formValues);
  const dataPostValue = useSelector((state) => state.register.dataPostValue);
  const handleRegistration = (values, { resetForm }) => {
    dispatch(registerDataPost(values)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/login");
        resetForm();
      }
    });
  };

  useEffect(() => {
    if (dataPostValue.error) {
      toast.error(dataPostValue.error);
    }
  }, [dataPostValue.error]);

  return (
    <div className="flex justify-center">
      <ToastContainer />
      <div className="w-2/4 mt-5">
        <h1 className="text-4xl font-bold text-center">Register</h1>
        <Formik
          initialValues={registerValues}
          validationSchema={registerValidation}
          onSubmit={handleRegistration}
        >
          {({ errors, touched, values, setFieldValue, handleChange }) => (
            <Form>
              <div className="mb-6">
                <h2 className="text-xl font-bold my-2 mb-4">Your Name</h2>
                <div className="flex flex-col gap-4">
                  <div>
                    <Field
                      type="text"
                      name="first_name"
                      onChange={handleChange}
                      placeholder="First Name"
                      className="w-full px-4 py-3 bg-transparent border border-black rounded-md text-gray-800 focus:outline-none focus:ring-0"
                    ></Field>
                    {touched.first_name && errors.first_name && (
                      <p className="text-red-600 my-1 ">{errors.first_name}</p>
                    )}
                  </div>
                  <div>
                    <Field
                      type="text"
                      name="last_name"
                      placeholder="Last Name"
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-transparent border border-black rounded-md text-gray-800 focus:outline-none focus:ring-0"
                    ></Field>
                    {touched.last_name && errors.last_name && (
                      <p className="text-red-600 my-1 ">{errors.last_name}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <h2 className="text-xl font-bold my-2 mb-4">Gender</h2>
                <div className="items-center ">
                  <label className="inline-flex items-center space-x-2">
                    <Field
                      type="checkbox"
                      name="gender"
                      value="male"
                      checked={values.gender === "male"}
                      onChange={() => setFieldValue("gender", "male")}
                      className="form-checkbox h-4 w-4"
                    ></Field>
                    <span className="font-medium">Male</span>
                  </label>
                  <label className="inline-flex items-center space-x-2 ms-5">
                    <Field
                      type="checkbox"
                      name="gender"
                      value="female"
                      checked={values.gender === "female"}
                      onChange={() => setFieldValue("gender", "female")}
                      className="form-checkbox h-4 w-4"
                    ></Field>
                    <span className="font-medium">Female</span>
                  </label>
                  {touched.gender && errors.gender && (
                    <p className="text-red-600 my-1 ">{errors.gender}</p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-bold my-2 mb-4">Login Details</h2>
                <div className="flex flex-col gap-4">
                  <div>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email"
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-transparent border border-black rounded-md text-gray-800 focus:outline-none focus:ring-0"
                    ></Field>
                    {touched.email && errors.email && (
                      <p className="text-red-600 my-1 ">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <Field
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-transparent border border-black rounded-md text-gray-800 focus:outline-none focus:ring-0"
                    ></Field>
                    {touched.password && errors.password && (
                      <p className="text-red-600 my-1 ">{errors.password}</p>
                    )}
                  </div>
                  <div>
                    <Field
                      type="password"
                      name="confirm_password"
                      placeholder="Confirm Password"
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-transparent border border-black rounded-md text-gray-800 focus:outline-none focus:ring-0"
                    ></Field>

                    {touched.confirm_password && errors.confirm_password && (
                      <p className="text-red-600 my-1 ">
                        {errors.confirm_password}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full  text-white py-3 rounded-md font-semibold bg-thirdColor hover:bg-hoverColor transition duration-300"
                >
                  Register
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Register;
