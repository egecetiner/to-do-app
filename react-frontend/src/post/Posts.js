import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { remove } from "./apiPost";

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
  }

  read = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/posts/by/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  loadPosts = (userId) => {
    const token = isAuthenticated().token;
    this.read(userId, token).then((data) => {
      this.setState({ posts: data });
    });
  };

  deletePost = (postId) => {
    const token = isAuthenticated().token;
    remove(postId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      }
    });
  };

  render() {
    const { posts } = this.state;
    const userId = isAuthenticated().user._id;

    return (
      <div className="container  ">
        <div className="row  ">
          {this.loadPosts(userId)}

          {posts.map((post, i) => {
            const postId = post._id;
            return (
              <div>
              <div className="card  " key={i}>
                <div className="card-body d-flex justify-content-between align-items-center ">
                  <h5 className="m-0 ">{post.title}</h5>
                  <button
                    type="button"
                    onClick={() => this.deletePost(postId)}
                    className="btn btn-danger "
                  >
                    Done
                  </button>
                  
                </div>
                
              </div>
              <br></br>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Posts;
