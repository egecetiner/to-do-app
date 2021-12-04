const mongoose = require("mongoose");
const Post = require("./post");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods ={
  authenticate: function(plainText){
    return plainText === this.password;
  },
}

userSchema.pre("remove", function (next) {
  Post.remove({ postedBy: this._id }).exec();
  next();
});

module.exports = mongoose.model("User", userSchema);
