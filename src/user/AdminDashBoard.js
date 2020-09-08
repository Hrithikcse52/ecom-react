import React from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticate } from "../auth/helper";

const AdminDashBoard = () => {
  const leftSide = () => {
    return (
      <div>
        <div className="card">
          <h4 className="card-header bg-dark text-white">Admin Options</h4>
          <ul className="list-group ">
            <li className="list-group-item bg-primary">
              <Link to="/admin/create/category" className="nav-link text-white">
                Create Category
              </Link>
            </li>
            <li className="list-group-item bg-primary">
              <Link to="/admin/manage/product" className="nav-link text-white">
                Manage Products
              </Link>
            </li>
            <li className="list-group-item bg-primary">
              <Link to="/admin/manage/order" className="nav-link text-white">
                Manage Orders
              </Link>
            </li>
            <li className="list-group-item bg-primary">
              <Link to="/admin/......" className="nav-link text-white">
                BLah
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  };
  const rightSide = () => {
    const { user } = isAuthenticate();
    return (
      <div className="card">
        <div className="card-header bg-dark text-white">Admin Information</div>
        <ul className="list-group ">
          <li className="list-group-item bg-primary">
            <span className="badge badge-success mr-2">Name:</span>
            {user.name}
          </li>
          <li className="list-group-item bg-primary">
            <span className="badge badge-success mr-2">Email:</span>
            {user.email}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base title="Admin" description="Admin is Here">
      <div className="row bg-success p-2">
        <div className="col-3">{leftSide()}</div>
        <div className="col-9">{rightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
