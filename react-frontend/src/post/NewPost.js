import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { create } from "./apiPost";

class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      error: "",
      loading: false,
    };
  }

  handleChange = (title) => (event) => {
    this.setState({ error: "" });
    const value = event.target.value;
    this.setState({ [title]: value });
  };

  clickSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    const { title } = this.state;
    const postTitle = { title: `${title}` };

    create(userId, token, postTitle).then(() => {
      this.setState({
        loading: false,
        title: "",
      });
    });
  };

  newPostForm = (title) => (
    <form className="row d-flex justify-content-center">
      <div className="form-group col-8  ">
        <input
          onChange={this.handleChange("title")}
          type="text"
          className="form-control"
          value={title}
          placeholder="Create a new To Do"
        />
      </div>
      <br></br>

      <button
        onClick={this.clickSubmit}
        className="btn btn-raised btn-primary col-2"
      >
        Post
      </button>
    </form>
  );

  render() {
    const { title, error, loading } = this.state;

    return (
      <div className="container ">
       
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>

        {this.newPostForm(title)}
        {loading ? (
          <div className="jumbotron text-center pt-3 ">
            <h3>Loading...</h3>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default NewPost;
