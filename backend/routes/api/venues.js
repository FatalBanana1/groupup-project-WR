// routes > api > Venues

//imports
const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth.js");
const { Group, GroupImage, User, Membership, Event, Venue } = require("../../db/models");
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

//TODO: remove the attr associated through membership table down to just 'status'
// memberships - get all members of group by id
// get - /groupid/members
router.get("/:groupId/members", async (req, res) => {
	let groupId = req.params.groupId;
	let members = await Group.scope(["defaultScope"]).findOne({
		attributes: [],
		where: { id: groupId },
		include: [
			{
				model: User,
				as: "Members",
				attributes: ["id", "firstName", "lastName"],
			},
		],
	});

	return res.json(members);
});



//----------------post-------------------------

//group images: add image
// post - api/groups.groupid/images
router.post("/:groupId/images", async (req, res) => {
	let groupId = req.params.groupId;
	let { url, preview } = req.body;

	// add img to groupimages table
	let newimage = await GroupImage.create({
		groupId,
		url,
		preview,
	});
	newimage = await GroupImage.scope(["defaultScope"]).findOne({
		where: {
			groupId,
			url,
			preview,
		},
	});
	return res.json(newimage);
});


// exports
module.exports = router;
