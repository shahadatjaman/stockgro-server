const { check, validationResult } = require("express-validator");

// Validate the request data
const validateData = [
  check("fullname").notEmpty().withMessage("Full Name(fullname) is required"),
  check("email").isEmail().withMessage("Invalid email"),
  check("avatar").optional().isString("Avatar must be (avatar) string"),
];

// Route handler or controller function
const createUser = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      return next();
    }

    // Continue with creating the user
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

module.exports = {
  validateData,
  createUser,
};
