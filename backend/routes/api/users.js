// routes > api > users

//imports
const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

// routes

/*
//testing post route
fetch('/api/users', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `sxvI7aLo-k4ORa8dzJYGQ1lqwGpxcMFSnSS8`
  },
  body: JSON.stringify({
    email: 'spidey@spider.man',
    username: 'Spidey',
    password: 'password'
  })
}).then(res => res.json()).then(data => console.log(data));
*/

const validateSignup = [
	check("email")
		.exists({ checkFalsy: true })
		.isEmail()
		.withMessage("Please provide a valid email."),
	check("username")
		.exists({ checkFalsy: true })
		.isLength({ min: 4 })
		.withMessage("Please provide a username with at least 4 characters."),
	check("username")
		.not()
		.isEmail()
		.withMessage("Username cannot be an email."),
	check("password")
		.exists({ checkFalsy: true })
		.isLength({ min: 6 })
		.withMessage("Password must be 6 characters or more."),
	handleValidationErrors,
];

// Sign up
router.post("/", validateSignup, async (req, res) => {
	const { firstName, lastName, email, username, password } = req.body;
	let user = await User.signup({
		firstName,
		lastName,
		email,
		username,
		password,
	});
	await setTokenCookie(res, user);
	user = await User.scope(["defaultScope"]).findOne({
		attributes: ["id", "firstName", "lastName", "email"],
		where: { email: user.email },
	});
	return res.json(user);
});

/*
// testing singup error handling

fetch('/api/users', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `OBpTO4SP-yXA7pc7gP6e5ClbDm7OEi22o7kY`
  },
  body: JSON.stringify({
    email: 'firestar@spider.man',
    username: 'Firestar',
    password: ''
  })
}).then(res => res.json()).then(data => console.log(data));
*/

// exports
module.exports = router;
