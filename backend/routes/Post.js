const express = require("express");
const { postsByUser, createPost, deletePost, postById } = require("../controllers/post");
const { userById } = require("../controllers/user");
const router = express.Router();

router.post("/post/new/:userId", createPost);
router.get("/posts/by/:userId", postsByUser);
router.delete("/post/:postId", deletePost);

router.param("userId", userById);
router.param("postId", postById);

module.exports = router;
