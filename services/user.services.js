const User = require("../models/user");

module.exports = {
  async findUser(email) {
    const user = await User.findOne({ email });

    if (user) {
      return user;
    } else {
      return null;
    }
  },

  async createUser(values) {
    const { fullname, email, avatar } = values;

    try {
      const newUser = new User({
        fullname,
        email,
        avatar,
      });
      return await newUser.save();
    } catch (error) {
      throw new Error("There was an server error!", error);
    }
  },
};
