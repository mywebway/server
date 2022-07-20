const Post = require("../models/post");
const createPath = require('../helpers/create-path');

const getPost = (req,res) => {
    Post
        .findById(req.params.id)
        .then((post)=>{
            res.render(createPath('post'),{post})
        })
        .catch((error)=> {
            console.log(error)
            res.render(createPath('error'))
        })
}

const getAllPosts = (req,res) => {
    Post
        .find()
        .sort({createdAt: -1})
        .then((posts)=>{
            res.render(createPath('posts'),{posts})
        })
        .catch((error)=> {
            console.log(error)
            res.render(createPath('error'))
        })
}

const editPost = (req,res) => {
    Post
        .findById(req.params.id)
        .then((post)=>{
            res.render(createPath('edit-post'),{post})
        })
        .catch((error)=> {
            console.log(error)
            res.render(createPath('error'))
        })
}

const updatePost = (req,res) => {
    const {title, author,text} = req.body;
    const {id} = req.params;
    Post
        .findByIdAndUpdate(id, {title, author,text})
        .then((post)=>{
            res.redirect(`/post/${id}`)
        })
        .catch((error)=> {
            console.log(error)
            res.render(createPath('error'))
        })
}

const deletePost = (req,res) => {
    Post
        .findByIdAndDelete(req.params.id)
        .then((result)=>{
            res.sendStatus(200);
        })
        .catch((error)=> {
            console.log(error)
            res.render(createPath('error'))
        })
}

const addPost = (req,res) => {
    const {title, author,text} = req.body;
    const post = new Post({title, author,text})
    post
        .save()
        .then((result) => res.redirect('/posts'))
        .catch((error)=> {
            console.log(error)
            res.render(createPath('error'))
        })
}

const locationPost = (req,res) => {
    res.render(createPath('add-post'));
}

module.exports = {
    getPost,
    getAllPosts,
    editPost,
    updatePost,
    deletePost,
    addPost,
    locationPost
}