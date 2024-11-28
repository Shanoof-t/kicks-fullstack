import * as Yup from "yup";
export const checkoutValidationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required!")
    .email("Invalid email format!"),
  first_name: Yup.string().required("First Name is required!"),
  last_name: Yup.string().required("Last Name is required!"),
  location: Yup.string().required("Address is required!"),
  phone: Yup.string()
    .required("Phone Number is required!")
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  payment_method: Yup.string().required("Choose any payment method"),
});
