import React, { useState } from "react";
import { useEffect } from "react";
import { isAuthenticate } from "../auth/helper";
import Base from "../core/Base";
import { createProduct, getAllCategory } from "./helper/adminapicall";

const AddProductTest = () => {
  const { user, token } = isAuthenticate();

  const FromHandeler = () => {
    const [formValues, setformValues] = useState({
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
      photo: "",
    });

    const [componentValues, setComponentValues] = useState({
      categories: [],
      loading: false,
      success: false,
      error: "",
      createdProduct: "",
      formData: "",
    });

    const { name, description, price, stock } = formValues;
    const {
      categories,
      loading,
      success,
      error,
      createdProduct,
      formData,
    } = componentValues;

    const preLoad = () => {
      try {
        getAllCategory().then((cate) => {
          if (cate.error) {
            setComponentValues({
              ...componentValues,
              error: cate.error,
              success: false,
            });
          } else {
            setComponentValues({
              ...componentValues,
              formData: new FormData(),
              categories: cate,
            });
            // console.log(cate);
          }
        });
      } catch (err) {
        console.log(err);
      }
    };

    useEffect(() => {
      preLoad();
    });

    const handleChange = (event) => {
      //   console.log(typeof formData);

      const name = event.target.name;
      const value =
        event.target.name === "photo"
          ? event.target.files[0]
          : event.target.value;

      formData.set(name, value);
      setformValues({
        ...formValues,
        [name]: value,
      });
      // console.log(photo);
    };

    const onSubmit = async (event) => {
      event.preventDefault();
      setComponentValues({ ...componentValues, error: "", loading: true });
      try {
        const product = await createProduct(user._id, token, formData);
        console.log(product.name);
        if (product.err) {
          console.log(product.err);
          setComponentValues({
            ...setComponentValues,
            error: product.err,
            success: false,
            loading: false,
          });
        } else {
          setComponentValues({
            ...componentValues,
            loading: false,
            success: true,
            createdProduct: product.name,
          });

          setformValues({
            ...formValues,
            name: "",
            description: "",
            price: "",
            category: "",
            stock: "",
            photo: "",
          });
        }
      } catch (err) {
        console.log(err);
      }
    };

    const Msg = () => {
      return (
        <div
          className={
            error
              ? "alert alert-danger"
              : loading
              ? "alert alert-warning"
              : success
              ? "alert alert-info"
              : ""
          }
        >
          {error ? (
            <h3>Error On Creating Product </h3>
          ) : loading ? (
            <h3>Loading....</h3>
          ) : success ? (
            <h3> {createdProduct} Created Succesfully </h3>
          ) : (
            <></>
          )}
        </div>
      );
    };

    return (
      <>
        <form className="bg-dark p-5">
          {Msg()}
          <div className="from-group">
            <label className="btn btn-block btn-success rounded">
              <input
                type="file"
                name="photo"
                onChange={handleChange}
                placeholder="Upload Image"
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange}
              type="text"
              name="name"
              required
              valuea={name}
              className="form-control"
              placeholder="Name"
            />
          </div>
          {/* // name des price cate */}
          <div className="form-group">
            <textarea
              type="text"
              onChange={handleChange}
              value={description}
              name="description"
              required
              className="form-control"
              placeholder="Description"
            ></textarea>
          </div>
          <div className="form-group">
            <input
              type="number"
              value={price}
              onChange={handleChange}
              name="price"
              required
              className="form-control"
              placeholder="Price"
            />
          </div>
          <div className="form-group">
            <select
              className="form-control"
              onChange={handleChange}
              placeholder="Category"
              required
              name="category"
            >
              <option value="">Select Category</option>
              {categories &&
                categories.map((data, index) => (
                  <option key={index} value={data._id}>
                    {data.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <input
              type="number"
              value={stock}
              name="stock"
              onChange={handleChange}
              className="form-control"
              placeholder="Stock"
            />
          </div>
          <button onClick={onSubmit} className="btn btn-outline-success">
            Create Product
          </button>
        </form>
      </>
    );
  };

  return (
    <Base title="add product test" className="container bg-info p-4 mb-4">
      {FromHandeler()}
    </Base>
  );
};

export default AddProductTest;
