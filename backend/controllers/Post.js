const Post = require("../models/post");

exports.postById = (req, res, next, _id) => {
  Post.findById(_id).exec((err, post) => {
    if (err || !post) {
      return res.status(400).json({ error: err });
    }
    req.post = post;
    next();
  });
};

exports.postsByUser = (req, res) => {
  Post.find({ postedBy: req.profile._id }).exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(posts);
  });
};

exports.createPost = (req, res) => {
  
  let post = new Post(req.body);
  post.postedBy = req.profile;
 
  post.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(result);
  });
};

exports.deletePost = (req, res) => {
  let post = req.post;
  post.remove((err, post) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    res.json({ message: "Deleted successfully" });
  });
};
