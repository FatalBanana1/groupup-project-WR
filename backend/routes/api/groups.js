// routes > api > groups

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

//TODO:
// groups - get all groups joined or organized bvy current user
// get - /groups/current
router.get("/current", async (req, res) => {
	let { user } = req;

	let organizers = await Group.scope(["defaultScope"]).findAll({
		where: { organizerId: user.id },
	});

	let groups = await Group.scope(["defaultScope"]).findAll({
		include: [
			{
				model: User,
				as: "Members",
				attributes: [],
				where: { id: user.id },
			},
		],
	});

	// filter duplicate groups included in results
	let array = [...organizers, ...groups];
	let newarray = [];
	let visited = new Set();
	array.forEach((el) => {
		if (!visited.has(el.id)) {
			newarray.push(el);
			visited.add(el.id);
		}
	});

	return res.json({ Groups: newarray });
});

//TODO: add numattending + previewImage attr to results
// groups - Get all Events of a Group specified by its id
// get - /api/groups/:groupId/events
router.get("/:groupId/events", async (req, res) => {
	let groupId = req.params.groupId;

	let events = await Event.scope(["defaultScope"]).findAll({
		attributes: [
			"id",
			"groupId",
			"venueId",
			"name",
			"type",
			"startDate",
			"endDate",
		],
		include: [
			{
				model: Group,
				where: { id: groupId },
				attributes: ["id", "name", "city", "state"],
			},
		],
	});
	return res.json({ Events: events });
});

//TODO:
// Get All Venues for a Group specified by its id
// get /api/groups/:groupId/venues
router.get("/:groupId/venues", async (req, res) => {
	let groupId = req.params.groupId;

	let venues = await Venue.scope(["defaultScope"]).findAll({
		attributes: ["id", "groupId", "address", "city", "state", "lat", "lng"],
		where: { groupId },
	});
	return res.json({ Venues: venues });
});

// get all groups
// get - /api/groups/
router.get("/", async (req, res) => {
	let { group } = req;
	group = await Group.findAll();
	if (group) {
		return res.json({
			group: group,
		});
	} else return res.json({ group: null });
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

router.post("/", async (req, res) => {
	return res.json(`inside the response`);
});

// exports
module.exports = router;
