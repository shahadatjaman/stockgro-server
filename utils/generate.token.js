const jwt = require("jsonwebtoken");

// Generate a JWT token
const generateToken = (user) => {
  const payload = {
    _id: user._id,
    fullname: user.fullname,
    email: user.email,
    avatar: user.avatar ? user.avatar : "",
  };
  const options = {
    expiresIn: process.env.JWT_EX, // Token expiration time
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, options);

  return token;
};
module.exports = generateToken;
