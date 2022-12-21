// routes > api > Events

//imports
const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth.js");
const {
	Group,
	GroupImage,
	User,
	Membership,
	Event,
	EventImage,
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

//-----------------get----------------------

//TODO: add numattending + previewimage attrs
//		--add venues t
// events - get all events
// get - /events
router.get("/", async (req, res) => {
	let events = await Event.scope(["defaultScope"]).findAll({
		include: [
			{
				model: Group,
				attributes: ["id", "name", "city", "state"],
			},
		],
	});
	return res.json(events);
});

//----------------post-------------------------

// Add an Image to a Event based on the Event's id
// post - /api/events/:eventId/images
router.post("/:eventId/images", async (req, res) => {
	let eventId = req.params.eventId;
	let { url, preview } = req.body;

	// add img to groupimages table
	let newimage = await EventImage.create({
		eventId,
		url,
		preview,
	});
	newimage = await EventImage.scope(["defaultScope"]).findOne({
		where: {
			eventId,
			url,
			preview,
		},
	});
	return res.json(newimage);
});

// exports
module.exports = router;
