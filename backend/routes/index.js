import express from "express";

//user model
import User from "../models/user.js";

const router = express.Router();

// Register a User
router.post("/signup", async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });

  user = await user.save();

  if (!user) return res.status(400).send("the user cannot be created!");

  res.send(user);
});

// Export the router
export { router };
