import React, { useEffect } from "react";
import { Field, Form, Formik } from "formik";
import { addProductValidation } from "./components/AddProductValidation";
import { itemsURL } from "../utils/API_URL";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setInitialInformation,
  updateImageUrl,
} from "../features/updateProduct/updateProductSlice";
import {
  fetchProduct,
  updateProduct,
} from "../features/updateProduct/updateProductAPI";

function UpdateProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { itemId } = useParams();

  const initialInformation = useSelector(
    (state) => state.updateProduct.initialDatas
  );

  useEffect(() => {
    dispatch(fetchProduct({ itemsURL, itemId })).then((res) => {
      const sizes = res.payload.available_sizes.join(",");
      dispatch(setInitialInformation(sizes));
    });
  }, [itemId]);

  const imageUrl = useSelector((state) => state.updateProduct.imageUrl);

  const handleSubmit = async (values) => {
    const imageUrlToUse = imageUrl ? imageUrl : values.imageURL;
    const itemData = {
      ...values,
      available_sizes: values.available_sizes.split(","),
      category: values.category.toUpperCase(),
      imageURL: imageUrlToUse,
    };
    dispatch(updateProduct({ itemsURL, itemId, itemData })).then((res) => {
      if (res.error) {
        console.log("this is in error", res.error);
        toast.error(res.error.message);
      } else {
        toast.success("Item updated successfully", {
          className: "mt-12",
          onClose: () => {
            navigate(-1);
            dispatch(updateImageUrl(null));
          },
        });
      }
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(updateImageUrl(reader.result));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-8">
      <ToastContainer />
      <Formik
        enableReinitialize={true}
        initialValues={initialInformation}
        validationSchema={addProductValidation(imageUrl)}
        onSubmit={handleSubmit}
      >
        {({ errors, handleChange, touched, values }) => (
          <Form>
            <div className="mb-6">
              <h1 className="text-3xl font-bold">Product Details</h1>
            </div>
            <div className="flex justify-evenly bg-white p-3 shadow-lg rounded-lg">
              <div className="w-1/2 p-4">
                <div className="mb-4">
                  <h2 className="font-semibold mb-1">Product Name</h2>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Type name here"
                    onChange={handleChange}
                    value={values.name}
                    className={`bg-transparent border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.name && touched.name
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.name && touched.name && (
                    <small className="text-red-600">{errors.name}</small>
                  )}
                </div>
                <div className="mb-4">
                  <h2 className="font-semibold mb-1">Description</h2>
                  <Field
                    type="text"
                    name="description"
                    placeholder="Type description here"
                    onChange={handleChange}
                    value={values.description}
                    className={`bg-transparent border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.description && touched.description
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.description && touched.description && (
                    <small className="text-red-600">{errors.description}</small>
                  )}
                </div>
                <div className="mb-4">
                  <h2 className="font-semibold mb-1">Category</h2>
                  <Field
                    type="text"
                    name="category"
                    placeholder="Type category here"
                    onChange={handleChange}
                    value={values.category}
                    className={`bg-transparent border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.category && touched.category
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.category && touched.category && (
                    <small className="text-red-600">{errors.category}</small>
                  )}
                </div>
                <div className="mb-4">
                  <h2 className="font-semibold mb-1">Brand Name</h2>
                  <Field
                    type="text"
                    name="brand"
                    placeholder="Type brand name here"
                    onChange={handleChange}
                    value={values.brand}
                    className={`bg-transparent border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.brand && touched.brand
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.brand && touched.brand && (
                    <small className="text-red-600">{errors.brand}</small>
                  )}
                </div>
                <div className="mb-4">
                  <h2 className="font-semibold mb-1">Select Group</h2>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <Field
                        type="radio"
                        name="gender"
                        value="MEN"
                        onChange={handleChange}
                        checked={values.gender === "MEN"}
                        className="me-2"
                      />
                      Men
                    </label>
                    <label className="flex items-center">
                      <Field
                        type="radio"
                        name="gender"
                        value="WOMEN"
                        onChange={handleChange}
                        checked={values.gender === "WOMEN"}
                        className="me-2"
                      />
                      Women
                    </label>
                    <label className="flex items-center">
                      <Field
                        type="radio"
                        name="gender"
                        value="KIDS"
                        onChange={handleChange}
                        checked={values.gender === "KIDS"}
                        className="me-2"
                      />
                      Kids
                    </label>
                    {errors.gender && touched.gender && (
                      <small className="text-red-600">{errors.gender}</small>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <h2 className="font-semibold mb-1">Stock Quantity</h2>
                  <Field
                    type="number"
                    name="items_left"
                    placeholder="Type quantity here"
                    onChange={handleChange}
                    value={values.items_left}
                    className={`bg-transparent border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.items_left && touched.items_left
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.items_left && touched.items_left && (
                    <small className="text-red-600">{errors.items_left}</small>
                  )}
                </div>
                <div className="mb-4">
                  <h2 className="font-semibold mb-1">
                    Sizes{" "}
                    <span className="text-sm text-gray-500">
                      (Enter sizes separated by commas)
                    </span>
                  </h2>
                  <Field
                    type="text"
                    name="available_sizes"
                    placeholder="Enter sizes here"
                    onChange={handleChange}
                    value={values.available_sizes}
                    className={`bg-transparent border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.available_sizes && touched.available_sizes
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.available_sizes && touched.available_sizes && (
                    <small className="text-red-600">
                      {errors.available_sizes}
                    </small>
                  )}
                </div>
                <div className="mb-4">
                  <h2 className="font-semibold mb-1">Regular Price</h2>
                  <Field
                    type="number"
                    name="price"
                    placeholder="Enter regular price here"
                    onChange={handleChange}
                    value={values.price}
                    className={`bg-transparent border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.price && touched.price
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.price && touched.price && (
                    <small className="text-red-600">{errors.price}</small>
                  )}
                </div>
                <div className="mb-4">
                  <h2 className="font-semibold mb-1">
                    Sale Price <span>(optional)</span>
                  </h2>
                  <Field
                    type="number"
                    name="offer_price"
                    placeholder="Enter sale price here"
                    onChange={handleChange}
                    value={values.offer_price}
                    className="bg-transparent border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="w-1/2 p-4">
                <div className="mb-4">
                  <h2 className="font-semibold mb-1">Preview</h2>
                  <div>
                    {values.imageURL || imageUrl ? (
                      <img
                        src={values.imageURL || imageUrl}
                        alt="Preview"
                        className="w-full  border border-gray-300 rounded-md object-cover"
                      />
                    ) : (
                      <h1 className="w-full h-40 border text-center content-center border-gray-300 rounded-md flex items-center justify-center">
                        Enter image URL or drop image
                      </h1>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <h2 className="font-semibold mb-1">Add Image</h2>
                  <div
                    className="border-dashed border-4 border-gray-400 p-8 text-center mb-4 cursor-pointer"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                  >
                    <p>Drop your image here</p>
                  </div>
                  <h2 className="text-center mb-2">OR</h2>
                  <h2 className="font-semibold mb-1">Image URL</h2>
                  <Field
                    type="text"
                    name="imageURL"
                    placeholder="Type image URL here"
                    onChange={handleChange}
                    value={values.imageURL}
                    className={`bg-transparent border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.imageURL && touched.imageURL
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.imageURL && touched.imageURL && (
                    <small className="text-red-600">{errors.imageURL}</small>
                  )}
                </div>
              </div>
            </div>
            <div className="text-center mt-6">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                type="submit"
              >
                Update Product
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default UpdateProduct;
