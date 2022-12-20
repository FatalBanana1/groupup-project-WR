// routes > api > groups

//imports
const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth.js");
const { Group } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

// routes

// todo: update validation:

// const validateSignup = [
// 	check("email")
// 		.exists({ checkFalsy: true })
// 		.isEmail()
// 		.withMessage("Please provide a valid email."),
// 	check("username")
// 		.exists({ checkFalsy: true })
// 		.isLength({ min: 4 })
// 		.withMessage("Please provide a username with at least 4 characters."),
// 	check("username")
// 		.not()
// 		.isEmail()
// 		.withMessage("Username cannot be an email."),
// 	check("password")
// 		.exists({ checkFalsy: true })
// 		.isLength({ min: 6 })
// 		.withMessage("Password must be 6 characters or more."),
// 	handleValidationErrors,
// ];

router.post("/", async (req, res) => {
	console.log(`inside post---------------------`);
	return res.json(`inside the response`);
});

// get all groups
router.get("/", async (req, res) => {
	let { group } = req;
	group = await Group.findAll();
	if (group) {
		return res.json({
			group: group,
		});
	} else return res.json({ group: null });
});

// exports
module.exports = router;
