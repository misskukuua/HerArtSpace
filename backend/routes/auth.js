import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//user model
import User from "../models/user.js";

const router = express.Router();

// Register a User
router.post("/signup", async (req, res, next) => {
  try {
    const { email, name, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create new user document in MongoDB
    const newUser = new User({
      email,
      name,
      passwordHash: hashedPassword,
    });

    // Save to the database
    await newUser.save();

    return res.status(201).json({ message: "Signup successful" });

    // After saving the user to the database,
    // use the signup details to generate a token used on the frontend to login the new user
    const token = jwt.sign(
      { id: newUser._id, name: newUser.name },
      process.env.JWT_SECRET, // Use a secret key from environment variables
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "Signup successful",
      user: { id: newUser._id, name: newUser.name },
      token: token, // Return the JWT token
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      // Mongoose validation error
      return res
        .status(400)
        .json({ message: "Validation failed", errors: error.errors });
    }
    return res.status(500).json({ message: "Server error", error });
  }
});

// Login a User
router.post("/login", async (req, res) => {
  const { name, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password. Please try again.",
      });
    }

    // Get the hashed password from the database
    const hashedPassword = user.passwordHash;

    // Verify password
    const isPasswordValid = bcrypt.compareSync(password, hashedPassword);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid username or password. Please try again.",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET, // Use a secret key from environment variables
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, name: user.name },
      token: token, // Return the JWT token
    });
  } catch (error) {
    console.error("Error during login:", error); // Log the error
    return res.status(500).json({
      message: "Server error. Please try again later.",
    });
  }
});

// Export the router
export { router };
