const { signup, login, verify } = require("../controllers/auth.controller");
const { isAuthenticated } = require("./../middleware/jwt.middleware.js"); // <== IMPORT
const router = require("express").Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/verify", isAuthenticated, verify);
module.exports = router;
