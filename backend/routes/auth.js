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

// Export the router
export { router };
