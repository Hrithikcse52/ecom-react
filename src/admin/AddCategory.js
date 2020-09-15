import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticate } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";

const AddCategoryTemplate = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user, token } = isAuthenticate();

  const handelChange = (event) => {
    setError(false);
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError(false);
    setSuccess(false);
    createCategory(user._id, token, { name }).then((response) => {
      console.log(response);
      if (response.err) {
        console.log("error");
        setError(true);
        setSuccess(false);
      } else {
        console.log("success");
        setError(false);
        setSuccess(true);
        setName("");
      }
    });
  };

  console.log(error, success);
  return (
    <>
      <Message error={error} success={success} />
      <form action="">
        <div className="form-group">
          <p className="lead">Enter the Category</p>
          <input
            type="text"
            className="form-control my-3"
            value={name}
            onChange={handelChange}
            autoFocus
            required
            placeholder="For Ex. Summer"
          />
          <button onClick={onSubmit} className="btn btn-outline-success">
            Create Category
          </button>
        </div>
      </form>
    </>
  );
};
const Message = ({ error, success }) => {
  if (error && !success) {
    return <div className="text-warning">Failed To Create the Category</div>;
  } else if (success && !error) {
    return <div className="text-success">SuccessFully Created Category</div>;
  } else {
    return <></>;
  }
};

const BackBtn = () => (
  <Link className="btn btn-success mb-2" to="/admin/dashboard">
    Back
  </Link>
);

const AddCategory = () => {
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
