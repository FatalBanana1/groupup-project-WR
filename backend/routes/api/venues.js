// routes > api > Venues

//imports
const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth.js");
const {
	Group,
	GroupImage,
	User,
	Membership,
	Event,
	Venue,
} = require("../../db/models");
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

//----------------put-------------------------

//TODO:
// Edit a Venue specified by its id
// put - /api/venues/:venueId
router.put("/:venueId", async (req, res) => {
	let venueId = req.params.venueId;
	let { address, city, state, lat, lng } = req.body;
	let venue = await Venue.findByPk(venueId);

	venue.update({
		address,
		city,
		state,
		lat,
		lng,
	});
	return res.json({ Venue: venue });
});

//-----------------get----------------------

//----------------post-------------------------

// exports
module.exports = router;
