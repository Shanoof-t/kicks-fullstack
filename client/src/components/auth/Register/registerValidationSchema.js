import * as Yup from "yup";

export const registerValidation = Yup.object({
  firstName: Yup.string().min(3).required("First Name is required!"),
  lastName: Yup.string().required("Last Name is required!"),
  email: Yup.string()
    .email("This is not a valid email")
    .required("Email is required!"),
  password: Yup.string().min(6).max(10).required("Password is required!"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "The passwords you entered do not match. Please try again."
  ),
  gender: Yup.string().required("Select your gender"),
});
