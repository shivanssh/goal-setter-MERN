const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { generateToken } = require("../utility/helper");

/**
 * @desc Register User
 * @route POST/v1/users
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // validate users field
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  // check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // add user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      message: "User regitered successfully",
      data: {
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id)
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/**
 * @desc Authenticate User
 * @route POST/v1/users
 * @access Public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      message: "User logged-in successfully",
      data: {
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

/**
 * @desc Current User Details
 * @route GET/v1/users
 * @access Private(Protected Route)
 */
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);
  res.status(201).json({
    message: "User Info",
    data: {
      id: _id,
      name,
      email,
    },
  });
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
