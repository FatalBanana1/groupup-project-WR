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
	sequelize,
} = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

// routes

// --------------------validation--------------------------------------

// const validateInfo = (req, res, next) => {
// 	if (!req.body || !req.body.name) {
// 		const err = new Error("Must have a name");
// 		err.statusCode = 400;
// 		next(err);
// 	}
// 	next();
// };

const valid_group = async (req, res, next) => {
	const id = req.params.groupId;
	const info = await Group.findByPk(id);
	if (!info) {
		const err = new Error("Group couldn't be found");
		err.statusCode = 404;
		throw err;
		// return next(err); // alternative to throwing it
	}
	next();
};

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

// check keys + validate them
// checks req.body.credential + req.body.password = empty
// if empty >> error
// const validateLogin = [
// 	check("credential")
// 		.exists({ checkFalsy: true })
// 		.notEmpty()
// 		.withMessage("Email is required"),
// 	check("password")
// 		.exists({ checkFalsy: true })
// 		.withMessage("Password is required"),
// 	handleValidationErrors,
// ];

//-----------------get----------------------

//TODO: remove the attr associated through membership table down to just 'status'
// memberships - get all members of group by id
// get - /groupid/members
router.get("/:groupId/members", valid_group, async (req, res) => {
	let groupId = req.params.groupId;
	let members = await Group.scope(["defaultScope"]).findOne({
		attributes: [],
		where: { id: groupId },
		include: [
			{
				model: Membership,
				attributes: [],
				include: [
					{
						model: User,
						attributes: ["id", "firstName", "lastName"],
					},
				],
			},
		],
	});

	return res.json(members);
});

//TODO: add aggregate fxn
// groups - get all groups joined or organized by current user
// get - /groups/current
router.get("/current", requireAuth, async (req, res) => {
	let { user } = req;

	// await setTokenCookie(res, user);

	let organizers = await Group.scope(["defaultScope"]).findAll({
		where: { organizerId: user.id },
		attributes: [
			"id",
			"organizerId",
			"name",
			"about",
			"type",
			"private",
			"city",
			"state",
			"createdAt",
			"updatedAt",
			// [sequelize.fn("COUNT", sequelize.col("name")), "numMembers"],
		],
	});

	let groups = await Group.scope(["defaultScope"]).findAll({
		include: [
			{
				model: Membership,
				where: { userId: user.id },
				attributes: [],
			},
		],
		attributes: [
			"id",
			"organizerId",
			"name",
			"about",
			"type",
			"private",
			"city",
			"state",
			"createdAt",
			"updatedAt",
			// [sequelize.fn("COUNT", sequelize.col("name")), "numMembers"],
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

	// newarray = newarray.map((el, i) => {
	// 	el.numMembers = Membership.findAll({
	// 		attributes: [
	// 			[sequelize.fn("COUNT", sequelize.col("id")), "numMembers"],
	// 		],
	// 		where: { groupId: el.id },
	// 	});
	// 	console.log(el.numMembers);
	// 	return el;
	// });

	return res.json({ Groups: newarray });
});

//TODO: add numattending + previewImage attr to results
// groups - Get all Events of a Group specified by its id
// get - /api/groups/:groupId/events
router.get("/:groupId/events", valid_group, async (req, res) => {
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
router.get("/:groupId/venues", valid_group, async (req, res) => {
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
			Groups: group,
		});
	} else return res.json({ group: null });
});

// Get details of a Group from an id
// get - /api/groups/:groupId
router.get("/:groupId", valid_group, async (req, res) => {
	let groupId = req.params.groupId;

	let group = await Group.findOne({
		where: { id: groupId },
		include: [
			{
				model: GroupImage,
				attributes: ["id", "url", "preview"],
			},
			{
				model: User,
				as: "Organizer",

				attributes: ["id", "firstName", "lastName"],
			},
			{
				model: Venue,
				as: "Venues",
				attributes: ["id", "groupId", "city", "state", "lat", "lng"],
			},
		],
	});

	// if (group === null) {
	// 	res.status(404);
	// 	return res.json({
	// 		message: `Group couldn't be found`,
	// 		statusCode: 404,
	// 	});
	// }
	return res.json(group);
});

//----------------post-------------------------

//group images: add image
// post - api/groups.groupid/images
router.post("/:groupId/images", valid_group, async (req, res) => {
	let groupId = req.params.groupId;
	let { url, preview } = req.body;

	// check if group exists
	let check1 = await Group.findByPk(groupId);
	if (!check1) {
		return res.status(404).json({
			message: "Group couldn't be found",
			statusCode: 404,
		});
	}

	// check if event already exists
	let check2 = await GroupImage.findOne({
		where: { url, preview, groupId },
	});
	if (check2) {
		return res.status(400).json({
			message: "Validation Error",
			statusCode: 400,
			errors: {
				Error: `Group image already exists.`,
			},
		});
	}

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

// Create a Group
// post -  /api/groups
router.post("/", requireAuth, async (req, res) => {
	let { name, about, type, private, city, state } = req.body;
	let options = {
		message: "Validation Error",
		statusCode: 400,
		errors: [],
	};

	if (!name) options.errors.push(`Name must be 60 characters or less`);
	if (!about) options.errors.push(`About must be 50 characters or more`);
	if (!type) options.errors.push(`Type must be 'Online' or 'In person'`);
	if (!private) options.errors.push(`Private must be a boolean`);
	if (!city) options.errors.push(`City is required`);
	if (!state) options.errors.push(`State is required`);

	if (options.errors.length > 0) {
		return res.status(400).json(options);
	} else {
		let { user } = req;
		let organizerId = user.id;
		// all info provided
		// check if event already exists
		let check = await Group.findOne({
			where: { organizerId, name, about },
		});
		if (check) {
			return res.status(400).json({
				message: "Validation Error",
				statusCode: 400,
				errors: {
					Error: `Group already exists.`,
				},
			});
		}

		let group = await Group.create({
			name,
			about,
			type,
			private,
			city,
			state,
			organizerId,
		});

		return res.json(group);
	}
});

//----------------put-------------------------

//TODO: require auth, only owner can edit
// edit a group
// put - /api/groups/:groupId
router.put("/:groupId", valid_group, requireAuth, async (req, res) => {
	let groupId = req.params.groupId;
	let group = await Group.findByPk(groupId);

	let { name, about, type, private, city, state } = req.body;

	if (
		group.name === name &&
		group.about === about &&
		group.type === type &&
		group.private === private &&
		group.city === city &&
		group.state === state
	) {
		return res.status(400).json({
			message: "Validation Error",
			statusCode: 400,
			errors: {
				Error: `Group is already up to date`,
			},
		});
	}

	let newgroup = await Group.update(
		{
			name,
			about,
			type,
			private,
			city,
			state,
		},
		{
			where: { id: groupId },
		}
	);

	group = await Group.findByPk(groupId);

	return res.json(group);
});

// exports
module.exports = router;
