import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticate, signout } from "../auth/helper";

const currentTab = (history, path) => {
  return history.location.pathname === path
    ? { color: "#6ab04c" }
    : { color: "white" };
};

const Menu = ({ history }) => {
  return (
    <div>
      <ul className="nav nav-tab bg-dark ">
        <li className="nav-items">
          <Link className="nav-link" style={currentTab(history, "/")} to="/">
            Home
          </Link>
        </li>
        <li className="nav-items">
          <Link
            className="nav-link"
            style={currentTab(history, "/cart")}
            to="/cart"
          >
            Cart
          </Link>
        </li>
        <li className="nav-items">
          <Link
            className="nav-link"
            style={currentTab(history, "/dashboard")}
            to="/dashboard"
          >
            Dashboard
          </Link>
        </li>
        <li className="nav-items">
          <Link
            className="nav-link"
            style={currentTab(history, "/adminpanel")}
            to="/adminpanel"
          >
            A. Dashboard
          </Link>
        </li>

        {isAuthenticate() ? (
          <li className="nav-items">
            <span
              className="nav-link text-warning"
              style={{ cursor: "pointer" }}
              onClick={() => {
                signout(() => {
                  history.push("/");
                });
              }}
            >
              SignOut
            </span>
          </li>
        ) : (
          <>
            <li className="nav-items">
              <Link
                className="nav-link"
                style={currentTab(history, "/signup")}
                to="/signup"
              >
                Register
              </Link>
            </li>
            <li className="nav-items">
              <Link
                className="nav-link"
                style={currentTab(history, "/signin")}
                to="/signin"
              >
                Sign In
              </Link>
            </li>
          </>
        )}
        {/* <li className="nav-items">
          <Link
            className="nav-link"
            style={currentTab(history, "/signout")}
            to="/signout"
          >
            Sign Out
          </Link>
        </li> */}
      </ul>
      <hr style={{ backgroundColor: "white" }} />
    </div>
  );
};

export default withRouter(Menu);
