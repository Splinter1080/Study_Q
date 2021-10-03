const express = require("express");
const router = express.Router();
const users = require("../controllers/users");

router.route("/register").post(users.register);

router.route("/login").post(users.login);

router.route("/confirm").get(users.confirm);

router.route("/reset").get(users.resetGet)
router.route("/resetPassword").post(users.resetPassword)



module.exports = router;
