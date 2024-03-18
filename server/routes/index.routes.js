const router = require("express").Router();
const fileUploader = require("../config/cloudinary.config");
const {
  createPost,
  home,
  deletePost,
  getOnePost,
  editPost,
} = require("../controllers/index.controller");

router.get("/", home);

router.post("/create", fileUploader.single("picture"), createPost);

router.get("/post/:id", getOnePost);

router.delete("/delete/:id", deletePost);

router.put("/edit/:id", fileUploader.single("picture"), editPost);

module.exports = router;
