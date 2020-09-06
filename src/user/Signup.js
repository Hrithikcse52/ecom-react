import React, { useState } from "react";
import Base from "../core/Base";
import { signup } from "../auth/helper";
import { Link } from "react-router-dom";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, lastname, email, password, success, error } = values;

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      error: false,
      [name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({
      ...values,
      error: false,
    });

    signup({ name, lastname, email, password })
      .then((data) => {
        data.error
          ? setValues({ ...values, error: data.error, success: false })
          : setValues({
              ...values,
              name: "",
              lastname: "",
              email: "",
              password: "",
              error: "",
              success: true,
            });
      })
      .catch(console.log("Something went Wrong ft rt"));
  };

  const SignupTemplate = () => {
    return (
      <div className="row ">
        <div className="col-md-6 offset-sm-3">
          <form action="">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text-light">First Name</label>
                  <input
                    onChange={handleChange("name")}
                    className="form-control"
                    type="text"
                    value={name}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text-light">Last Name</label>
                  <input
                    onChange={handleChange("lastname")}
                    className="form-control"
                    type="text"
                    value={lastname}
                  />
                </div>
              </div>
            </div>
            {/* <div className="form-group">
              <label className="text-light">Name</label>
              <input
                onChange={handleChange("name")}
                className="form-control"
                type="text"
              />
            </div> */}
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                onChange={handleChange("email")}
                className="form-control"
                type="email"
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                onChange={handleChange("password")}
                className="form-control"
                type="password"
                value={password}
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  const message = () => {
    return success ? (
      <div className="row">
        <div className="col-md-6 offset-3">
          <div className="alert alert-success">
            SuccessFully LoggedIn <Link to="/signin">Sign In Page.</Link>
          </div>
        </div>
      </div>
    ) : error ? (
      <div className="row">
        <div className="col-md-6 offset-3">
          <div className="alert alert-warning">{error}</div>
        </div>
      </div>
    ) : (
      <></>
    );
  };
  return (
    <div>
      <Base title="Sign Up" description="User Can Register, Create Account">
        {/* <SignupTemplate /> */}
        {message()}
        {SignupTemplate()}
        <p className="text-white text-center">{JSON.stringify(values)}</p>
      </Base>
    </div>
  );
};

export default Signup;
