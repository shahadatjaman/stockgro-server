const router = require("express").Router();

const { login } = require("../controller/auth");
const { validateData, createUser } = require("../dto/user.dto");

router.post("/login", validateData, createUser, login);

module.exports = router;
