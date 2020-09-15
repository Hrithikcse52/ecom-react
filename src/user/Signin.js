import React, { useState } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticate } from "../auth/helper";

const Signin = () => {
  const [values, setValues] = useState({
    email: "test@test.com",
    password: "admin@12",
    error: false,
    loading: false,
    didRedirect: false,
  });

  const { email, password, loading, didRedirect, error } = values;

  const { user } = isAuthenticate();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });

    try {
      const signCheck = await signin({ email, password });
      console.log(signCheck);

      if (signCheck.error) {
        setValues({ ...values, error: signCheck.error, loading: false });
      } else {
        authenticate(signCheck, () => {
          setValues({ ...values, didRedirect: true, loading: false });
        });
      }
    } catch (error) {
      console.log(error, "sign in failed ftrt");
    }
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticate()) {
      return <Redirect to="/" />;
    }
  };

  const message = () => {
    return loading ? (
      <div className="row">
        <div className="col-md-6 offset-3">
          <div className="alert alert-info">Loading...</div>
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

  const SigninTemplate = () => {
    return (
      <div className="row ">
        <div className="col-md-6 offset-sm-3">
          <form action="">
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                type="email"
                value={email}
                onChange={handleChange("email")}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                type="password"
                value={password}
                onChange={handleChange("password")}
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  };
  return (
    <div>
      <Base title="Sign In Page" description="Just Sign In">
        {message()}
        {SigninTemplate()}
        {performRedirect()}
        <p className="text-white text-center">{JSON.stringify(values)}</p>
      </Base>
    </div>
  );
};

export default Signin;
