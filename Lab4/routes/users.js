const express = require("express");
const User = require("../models/User");

const router = express.Router();

const formatValidationErrors = (err) => {
  const result = {};
  if (!err || !err.errors) {
    return result;
  }

  Object.keys(err.errors).forEach((key) => {
    result[key] = err.errors[key].message;
  });

  return result;
};

router.post("/", async (req, res) => {
  try {
    const created = await User.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        errors: formatValidationErrors(err),
      });
    }

    if (err.code === 11000) {
      return res.status(400).json({
        message: "Duplicate key error",
        errors: err.keyValue,
      });
    }

    console.error("Unexpected error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
