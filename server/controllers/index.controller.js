const Post = require("../models/Post.model");

const home = async (req, res) => {
  try {
    const posts = await Post.find();

    return res.status(201).json({ posts });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const createPost = async (req, res) => {
  const payload = { ...req.body };

  if (req.file) {
    payload.picture = req.file.path;
  } else {
    delete payload.picture;
  }

  try {
    const response = await Post.create(payload);
    return res.status(201).json({ message: "post Created" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getOnePost = async (req, res) => {
  try {
    const response = await Post.findById(req.params.id).populate("owner");

    return res.status(201).json({ post: response });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const deletePost = async (req, res) => {
  try {
    const response = await Post.findByIdAndDelete(req.params.id);
    return res.status(201).json({ message: "post deleted" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const editPost = async (req, res) => {
  try {
    const payload = { ...req.body };

    console.log(payload);
    if (req.file) {
      payload.picture = req.file.path;
    } else {
      delete payload.picture;
    }

    const response = await Post.findByIdAndUpdate(req.params.id, payload);
    return res.status(201).json({ message: "post edited" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = { home, createPost, deletePost, getOnePost, editPost };
