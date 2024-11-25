import * as Yup from "yup";

export const registerValidation = Yup.object({
  first_name: Yup.string().min(3).required("First Name is required!"),
  last_name: Yup.string().required("Last Name is required!"),
  email: Yup.string()
    .email("This is not a valid email")
    .required("Email is required!"),
  password: Yup.string().min(6).max(10).required("Password is required!"),
  confirm_password: Yup.string().oneOf(
    [Yup.ref("password")],
    "The passwords you entered do not match. Please try again."
  ),
  gender: Yup.string().required("Select your gender"),
});
