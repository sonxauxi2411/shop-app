import React from "react";
import { useFormik } from "formik";
import Input from "../../components/form/Input";
import * as Yup from "yup";
import axios from "axios";
import ProductAPI from "../../api/ProductAPI";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./products.css";

function NewProducts() {
  const navigate = useNavigate();
  const location = useLocation();
  const dataProduct = location.state;
  const [loading, setLoading] = useState(false);
  // console.log(dataProduct);

  const formik = useFormik({
    initialValues: {
      name: dataProduct?.name || "",
      category: dataProduct?.category || "",
      short_desc: dataProduct?.short_desc || "",
      long_desc: dataProduct?.long_desc || "",
      price: dataProduct?.price || "",
      photos: dataProduct?.photos || "",
      count: dataProduct?.count || 1,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Product Name is required"),
      category: Yup.string().required("Category is required"),
      short_desc: Yup.string().required("Short Description is required"),
      long_desc: Yup.string().required("Long Description is required"),
      price: Yup.string().required("Price is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const image = values.photos;
        // console.log(image);

        // console.log(valueSelect);
        const listImage = await Promise.all(
          //lập qua các image vừa thêm
          Object.values(image).map(async (file) => {
            const formData = new FormData();
            //  console.log(file);
            formData.append("file", file);
            formData.append("upload_preset", "uazrkxzi");
            formData.append("cloud_name", "dqmhwqfvz");
            //post image lên cloudinary
            const res = await axios.post(
              "https://api.cloudinary.com/v1_1/dqmhwqfvz/image/upload",
              formData
            );
            // console.log(res.data);

            const { url } = res.data;
            // console.log(res);

            return url || "";
          })
        );
        if (dataProduct) {
          console.log("update");
          await ProductAPI.updateProduct(dataProduct._id, {
            ...values,
            photos: listImage,
          });
          navigate("/products");
          setLoading(false);
        } else {
          console.log("add");
          await ProductAPI.addProduct({ ...values, photos: listImage });
        }
        console.log(1);
        navigate("/products");
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div>
      <h4>New Product</h4>
      {loading && (
        <div className="wrapper_loader">
          <div className="loader"></div>
        </div>
      )}

      <div>
        <form onSubmit={formik.handleSubmit}>
          <Input
            label="Product Name"
            placeholder="Enter Product Name"
            formik={formik}
            name="name"
          />
          <Input
            label="Category"
            placeholder="Enter Category"
            formik={formik}
            name="category"
          />
          <Input
            label="Price"
            placeholder="Enter Price"
            formik={formik}
            name="price"
            type="number"
          />
          <Input
            label=" Short Description"
            placeholder="Enter Short Description"
            formik={formik}
            name="short_desc"
          />
          <Input
            label="Long Description"
            placeholder="Enter Long Description"
            formik={formik}
            name="long_desc"
          />
          <Input
            label="Count"
            placeholder="Enter Count"
            formik={formik}
            name="count"
            type="number"
          />
          <div style={{ cursor: "pointer" }}>
            <label>Photo</label>
            <input
              className={`form-control ${formik.errors.photos && "is-invalid"}`}
              type="file"
              name="photos"
              multiple
              onChange={(e) => {
                formik.setFieldValue("photos", e.target.files);
              }}
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewProducts;
