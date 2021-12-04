import React, { Component } from "react";
import { signup } from "../auth";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      error: "",
      open: false,
    };
  }

  handleChange = (username) => (event) => {
    this.setState({ error: "" });
    this.setState({ [username]: event.target.value });
  };

  clickSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const user = {
      username,
      password,
    };

    signup(user).then((data) => {
      if (data.error) this.setState({ error: data.error });
      else
        this.setState({
          error: "",
          username: "",
          password: "",
          open: true,
        });
    });
  };

  signupForm = (username, password) => (
    <form >
      <div className="form-group ">
        <label className="text-muted">Username</label>
        <input
          onChange={this.handleChange("username")}
          type="text"
          className="form-control"
          value={username}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={this.handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <br></br>

      <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
        Submit
      </button>
    </form>
  );

  render() {
    const { username, password, error, open } = this.state;
    if (isAuthenticated()) {
      return <Redirect to={`/user/${isAuthenticated().user._id}`} />;
    } else {
      return (
        <div className="container">
          <h2 className="mt-5 mb-5">Sign up</h2>

          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>

          <div
            className="alert alert-info"
            style={{ display: open ? "" : "none" }}
          >
            New account is successfully created. Please{" "}
            <Link to="/signin">Sign In</Link>.
          </div>

          {this.signupForm(username, password)}
        </div>
      );
    }
  }
}

export default Signup;
