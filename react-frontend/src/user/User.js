import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import Posts from "../post/Posts";
import NewPost from "../post/NewPost";

class User extends Component {
  constructor() {
    super();
    this.state = {
      error: "",
    };
  }

  render() {
    const username = isAuthenticated().user.username;

    return (
      <div className="container ">
        <h2><center className="mt-5 mb-5">{username}'s To Do List</center></h2>

        <div>
          <NewPost />
        </div>
       
        <hr></hr>
       
        <div>
          <Posts />
        </div>
      </div>
    );
  }
}

export default User;
