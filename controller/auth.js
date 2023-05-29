const User = require("../models/user");

const generateToken = require("../utils/generate.token");

module.exports = {
  async login(req, res) {
    const { fullname, email, avatar } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      const token = generateToken(user);
      return res.json({
        message: "login success",
        accessToken: token,
      });
    } else {
      try {
        const newUser = new User({ fullname, email, avatar });
        await newUser.save();
        const accessToken = generateToken({
          _id: newUser._id,
          email: newUser.email,
          avatar: newUser.avatar ? newUser.avatar : "",
        });
        return res.json({
          message: "User created",
          accessToken: accessToken,
        });
      } catch (error) {
        throw new Error("There was an server error");
      }
    }
  },
};
