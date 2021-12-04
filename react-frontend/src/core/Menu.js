import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout } from "../auth";
import { isAuthenticated } from "../auth";

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "#ff9900" };
  else return { color: "black" };
};

const Menu = ({ history }) => (
  <div>
    <ul className="nav nav-tabs bg-secondary ">
      {isAuthenticated() ? (
        <React.Fragment>
          <li className="nav-item ">
            <span
              className="nav-link"
              style={{ cursor: "pointer", color: "black" }}
              onClick={() => signout(() => history.push("/"))}
            >
              Sign Out
            </span>
          </li>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/signup")}
              to="/signup"
            >
              Sign Up
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/signin")}
              to="/signin"
            >
              Sign In
            </Link>
          </li>
        </React.Fragment>
      )}
    </ul>
  </div>
);

export default withRouter(Menu);
