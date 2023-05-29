const { findUser, createUser } = require("../services/user.services");

const generateToken = require("../utils/generate.token");

module.exports = {
  async login(req, res) {
    const { fullname, email, avatar } = req.body;

    const user = await findUser({ email });

    if (user) {
      const token = generateToken(user);
      return res.json({
        message: "login success",
        accessToken: token,
      });
    } else {
      try {
        const newUser = await createUser({ fullname, email, avatar });

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
