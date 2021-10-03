const express = require("express");
const router = express.Router();
const groups = require("../controllers/groups");

router.route("/create").post(groups.create);

router.route("/join").get(groups.join);

router.route("/groups").get(groups.groups);

router.route("/oneGroup").get(groups.oneGroup);


router.route("/task").get(groups.task);

router.route("/messages").get(groups.message);

router.route("/payment").post(groups.payment);


module.exports = router;
