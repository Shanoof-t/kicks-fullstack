import React, { useEffect } from "react";
import { Field, Form, Formik } from "formik";
import { addProductValidation } from "./components/AddProductValidation";
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
import { handleToast } from "../utils/handleToast";
import Loading from "../components/Loading";

function UpdateProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { itemId } = useParams();

  const initialInformation = useSelector(
    (state) => state.updateProduct.initialDatas
  );
  const loading = useSelector(
    (state) => state.updateProduct.updateProduct.loading
  );

  useEffect(() => {
    dispatch(fetchProduct({ itemId }));
  }, [itemId]);

  const image_url = useSelector((state) => state.updateProduct.imageUrl);

  const handleSubmit = async (data) => {
    console.log("data", data);
    const formData = new FormData();
    formData.append("image", data.image);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("brand", data.brand);
    formData.append("gender", data.gender);
    formData.append("quantity", data.quantity);
    formData.append("available_sizes", data.available_sizes);
    formData.append("price", data.price);

    dispatch(updateProduct({ itemId, formData })).then((res) => {
      handleToast(res.payload.status, res.payload.message).then(() =>
        navigate(-1)
      );
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

  const handleImage = (e, setFieldValue) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFieldValue("image", file);
    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(updateImageUrl(reader.result));
    };
    reader.readAsDataURL(file);
  };

  if (loading) return <Loading />;
  return (
    <div className="p-8">
      <Formik
        enableReinitialize={true}
        initialValues={initialInformation}
        validationSchema={addProductValidation()}
        onSubmit={handleSubmit}
      >
        {({ errors, handleChange, values, setFieldValue }) => (
          <Form method="post" encType="multipart/form-data">
            <div className="mb-6">
              <h1 className="text-3xl font-bold">Product Details</h1>
            </div>
            <div className="flex justify-evenly  p-3">
              <div className="w-1/2 p-4">
                <div className="mb-4">
                  <h2 className="font-semibold mb-1">Product Name</h2>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Type name here"
                    onChange={handleChange}
                    value={values.name}
                    className={`bg-transparent border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 
              ${errors.name ? "border-red-500" : "border-gray-300"}`}
                  ></Field>

                  {errors.name && (
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
                    className={`bg-transparent border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 
                      ${errors.name ? "border-red-500" : "border-gray-300"}`}
                  ></Field>
                  {errors.description && (
                    <small className="text-red-600">{errors.description}</small>
                  )}
                </div>
                <div className="mb-4">
                  <h2 className="font-semibold mb-1">Category</h2>

                  <select
                    name="category"
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg p-2  w-full  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="" disabled selected>
                      Categories
                    </option>
                    <option value="CASUAL">Casual</option>
                    <option value="FOOTBALL">Football</option>
                    <option value="RUNNING">Running</option>
                  </select>

                  {errors.category && (
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
                    className={`bg-transparent border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 
                      ${errors.name ? "border-red-500" : "border-gray-300"}`}
                  ></Field>
                  {errors.brand && (
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
                      ></Field>
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
                      ></Field>
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
                      ></Field>
                      Kids
                    </label>
                    {errors.gender && (
                      <small className="text-red-600">{errors.gender}</small>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <h2 className="font-semibold mb-1">Stock Quantity</h2>

                  <Field
                    type="test"
                    name="quantity"
                    placeholder="Type quantity here"
                    onChange={handleChange}
                    value={values.quantity}
                    className={`bg-transparent border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 
                      ${errors.name ? "border-red-500" : "border-gray-300"}`}
                  ></Field>
                  {errors.quantity && (
                    <small className="text-red-600">{errors.quantity}</small>
                  )}
                </div>
                <div className="mb-4">
                  <h2 className="font-semibold mb-1">
                    Sizes{" "}
                    <span className="text-sm text-gray-500">
                      (Enter sizes with ",")
                    </span>
                  </h2>

                  <Field
                    type="text"
                    name="available_sizes"
                    placeholder="Enter sizes here"
                    onChange={handleChange}
                    value={values.available_sizes}
                    className={`bg-transparent border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 
                      ${errors.name ? "border-red-500" : "border-gray-300"}`}
                  ></Field>
                  {errors.available_sizes && (
                    <small className="text-red-600">
                      {errors.available_sizes}
                    </small>
                  )}
                </div>
                <div className="mb-4">
                  <h2 className="font-semibold mb-1">Regular Price</h2>

                  <Field
                    type="text"
                    name="price"
                    placeholder="Enter regular prices here"
                    onChange={handleChange}
                    value={values.price}
                    className={`bg-transparent border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 
                      ${errors.name ? "border-red-500" : "border-gray-300"}`}
                  ></Field>
                  {errors.price && (
                    <small className="text-red-600">{errors.price}</small>
                  )}
                </div>
              </div>
              <div className="w-1/2 p-4">
                <div className="mb-4">
                  <h2 className="font-semibold mb-1">Preview</h2>
                  <div>
                    {values.image_url || image_url ? (
                      <img
                        src={values.image_url || image_url}
                        alt="Preview"
                        className="w-full border border-gray-300 rounded-md object-cover"
                      />
                    ) : (
                      <h1 className="w-full h-40 border text-center content-center border-gray-300 rounded-md object-cover">
                        Enter image url
                      </h1>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <h2 className="font-semibold mb-1">Add Image</h2>
                  <div
                    className="border-2 border-dashed border-gray-400 p-10 text-center mb-4 cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition-colors duration-300 rounded-lg"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, setFieldValue)}
                  >
                    <p className="text-gray-500">
                      Drag and drop your image here
                    </p>
                    <p className="text-sm text-gray-400">
                      Supported formats: .jpg, .png
                    </p>
                  </div>

                  <h2 className="text-center mb-2 font-medium text-gray-600">
                    OR
                  </h2>

                  <label
                    htmlFor="fileInput"
                    className="block bg-blue-500 text-white text-center py-2 px-4 rounded-md cursor-pointer hover:bg-blue-600 transition duration-200"
                  >
                    Choose File
                  </label>
                  <input
                    type="file"
                    id="fileInput"
                    name="image"
                    className="hidden"
                    onChange={(e) => handleImage(e, setFieldValue)}
                  />
                  {errors.image && (
                    <small className="text-red-600 mt-1 block text-sm">
                      {errors.image}
                    </small>
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
