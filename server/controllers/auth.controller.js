const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const saltRounds = 10;

const signup = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    // Check if the email or password or name is provided as an empty string
    if (email === "" || password === "" || fullName === "") {
      res.status(400).json({ message: "Provide email, password and name" });
      return;
    }

    // Use regex to validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: "Provide a valid email address." });
      return;
    }

    // Use regex to validate the password format
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
      res.status(400).json({
        message:
          "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
      });
      return;
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }
    //hash password
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password: hashedPassword,
      fullName,
    });
    if (newUser) {
      await newUser.save();
      res.status(201).json({ _id: newUser._id });
    } else {
      res.status(400).json({ error: "invalid user data" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email or password are provided as empty string
    if (email === "" || password === "") {
      res.status(400).json({ message: "Provide email and password." });
      return;
    }
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      // If the user is not found, send an error response
      res.status(401).json({ message: "User not found." });
      return;
    }
    // Compare the provided password with the one saved in the database
    const passwordCorrect = bcrypt.compareSync(password, foundUser.password);
    if (passwordCorrect) {
      // Deconstruct the user object to omit the password
      const { _id, email, fullName } = foundUser;

      // Create an object that will be set as the token payload
      const payload = { _id, email, fullName };

      // Create and sign the token
      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "6h",
      });

      // Send the token as the response
      res.status(200).json({ authToken: authToken });
    } else {
      res.status(401).json({ message: "Unable to authenticate the user" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const verify = async (req, res) => {
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and made available on `req.payload`
  console.log(`req.payload`, req.payload);

  // Send back the object with user data
  // previously set as the token payload
  res.status(200).json(req.payload);
};

module.exports = { signup, login, verify };
