
const express = require("express");
const {getPost,getAllPosts,editPost,updatePost,deletePost, addPost,locationPost} = require("../controllers/post-controller");


const router = express.Router();

router.post('/add-post',addPost);
router.get('/post/:id', getPost);
router.get('/edit/:id', editPost);
router.put('/edit/:id', updatePost);
router.delete('/posts/:id', deletePost);
router.get('/posts', getAllPosts);
router.get('/add-post', locationPost);

module.exports = router;