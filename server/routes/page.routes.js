const router = require("express").Router();
const fileUploader = require("../config/cloudinary.config");
const {
  getOnePage,
  createPage,
  getAllPages,
  deletePage,
} = require("../controllers/page.controller");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.get("/:id", getOnePage);

router.get("/", getAllPages);

router.post(
  "/create",
  //isAuthenticated,
  fileUploader.single("picture"),
  createPage
);

router.delete("/delete/:id", deletePage);

module.exports = router;
