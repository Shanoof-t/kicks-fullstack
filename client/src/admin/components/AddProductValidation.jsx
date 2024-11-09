import * as Yup from "yup";

export const addProductValidation = (imageUrl) => {
  return Yup.object({
    name: Yup.string().required("Product name is required!"),
    description: Yup.string().required("Description is required!"),
    category: Yup.string().required("Category is required!"),
    brand: Yup.string().required("Brand name is required!"),
    gender: Yup.string().required("Select any group!"),
    items_left: Yup.number().required("Enter stock count!"),
    available_sizes: Yup.string()
      .required("Enter available sizes!")
      .matches(
        /^(\d{1,2})(,\d{1,2})*$/,
        "input must be 2 digit number and separated by comma"
      ),
    price: Yup.number().required("Enter Regular product price"),
    imageURL: Yup.string().test(
      "imageUrl-or-imageURL",
      "Image is required", 
      function (value) {
        return !!value || !!imageUrl;
      }
    )
    // .url("Must be a valid URL!")
  });
};
