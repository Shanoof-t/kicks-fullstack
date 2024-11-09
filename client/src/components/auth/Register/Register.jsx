import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerDataPost } from "../../../features/register/registerAPI";
import { Field, Form, Formik } from "formik";
import { registerValidation } from "./registerValidationSchema";
function Register() {
  const dispatch = useDispatch();
  const navigateToHome = useNavigate();
  const registerValues = useSelector((state) => state.register.formValues);
  const dataPostValue = useSelector((state) => state.register.dataPostValue);
  const handleRegistration = (values, { resetForm }) => {
    const data = {
      first_name: values.firstName,
      last_name: values.lastName,
      gender: values.gender,
      email: values.email,
      password: values.password,
      confirm_password: values.confirmPassword,
    };

    dispatch(registerDataPost(data)).then(() => {
      if (dataPostValue.error) {
        console.log(dataPostValue.error);
      } else {
        navigateToHome("/login");
        resetForm();
      }
    });
  };

  return (
    <div className="flex justify-center">
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
                      name="firstName"
                      onChange={handleChange}
                      placeholder="First Name"
                      className="w-full px-4 py-3 bg-transparent border border-black rounded-md text-gray-800 focus:outline-none focus:ring-0"
                    ></Field>
                    {touched.firstName && errors.firstName && (
                      <p className="text-red-600 my-1 ">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <Field
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-transparent border border-black rounded-md text-gray-800 focus:outline-none focus:ring-0"
                    ></Field>
                    {touched.lastName && errors.lastName && (
                      <p className="text-red-600 my-1 ">{errors.lastName}</p>
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
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-transparent border border-black rounded-md text-gray-800 focus:outline-none focus:ring-0"
                    ></Field>

                    {touched.confirmPassword && errors.confirmPassword && (
                      <p className="text-red-600 my-1 ">
                        {errors.confirmPassword}
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
