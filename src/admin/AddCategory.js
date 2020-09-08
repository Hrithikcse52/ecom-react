import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticate } from "../auth/helper";
import { Link } from "react-router-dom";

const AddCategoryTemplate = () => {
  return (
    <form action="">
      <div className="form-group">
        <p className="lead">Enter the Category</p>
        <input
          type="text"
          className="form-control my-3"
          autoFocus
          required
          placeholder="For Ex. Summer"
        />
        <button className="btn btn-outline-success">Create Category</button>
      </div>
    </form>
  );
};

const BackBtn = () => (
  <Link className="btn btn-success mb-2" to="/admin/dashboard">
    Back
  </Link>
);

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user, token } = isAuthenticate();

  return (
    <Base
      className="container bg-info p-4"
      title="Add category"
      description="One More To the DB"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          <AddCategoryTemplate />
          <BackBtn />
        </div>
      </div>
    </Base>
  );
};
export default AddCategory;
