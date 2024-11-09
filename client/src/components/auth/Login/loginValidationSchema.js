import * as Yup from "yup";
export const loginValidation = () =>
  Yup.object({
    email: Yup.string()
      .required("Please enter your email")
      .email("Enter valid email format"),
    password: Yup.string()
      .required("Please enter your password")
      .min(6, "Password must be at least 6 characters long"),
  });
