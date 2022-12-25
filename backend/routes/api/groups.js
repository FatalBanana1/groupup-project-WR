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
const e = require("express");
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
	}
	next();
};

const valid_user = async (req, res, next) => {
	const { user } = req;
	let auth = await Membership.findOne({
		where: { userId: user.id },
		include: [
			{
				model: Group,
			},
		],
	});
	if (
		user.dataValues.id &&
		(auth.status === "co-host" || auth.Group.organizerId === user.id)
	) {
		next();
	} else {
		const err = new Error(
			`Current User must be the organizer of the group or a member of the group with a status of co-host`
		);
		err.statusCode = 403;
		throw err;
	}
};

const valid_delete = async (req, res, next) => {
	const { user } = req;
	const { memberId } = req.body;
	let auth = await Membership.findOne({
		where: { userId: user.id },
		include: [
			{
				model: Group,
			},
		],
	});
	if (!auth) {
		res.status(400);
		return res.json({
			message: "Validation Error",
			statusCode: 400,
			errors: {
				memberId: "User couldn't be found",
			},
		});
	}
	if (
		auth.status === "co-host" ||
		auth.Group.organizerId === user.id ||
		user.id === memberId
	) {
		next();
	} else {
		const err = new Error(
			`Current User must be the organizer of the group or a member of the group with a status of co-host`
		);
		err.statusCode = 403;
		throw err;
	}
};

const valid_dates = async (req, res, next) => {
	const groupId = req.params.groupId;
	const startDate = req.body.startDate;
	const endDate = req.body.endDate;

	const info = await Event.findAll({
		where: { groupId },
	});

	if (info.startDate === startDate && info.endDate === endDate) {
		const err = new Error(
			`Event already exists for this group at the start and end dates`
		);
		err.statusCode = 400;
		throw err;
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
// memberships
// Get all Members of a Group specified by its id
// get - /groupid/members
router.get("/:groupId/members", valid_group, async (req, res) => {
	let groupId = req.params.groupId;
	let members = await Membership.scope(["defaultScope"]).findAll({
		attributes: ["status"],
		where: { groupId: groupId },
		include: [
			{
				model: User,
			},
		],
	});

	const { user } = req;
	let auth = await Membership.findOne({
		where: { userId: user.id },
		include: [
			{
				model: Group,
			},
		],
	});

	array = [];
	members.forEach((el, i) => {
		array.push(el.User);

		if (
			user.id &&
			(auth.status === "co-host" || auth.Group.organizerId === user.id)
		) {
			array[i].dataValues.status = el.status;
		}
	});
	return res.json({ Members: array });
});

//TODO: add aggregate fxn
// groups - get all groups joined or organized by current user
// get - /groups/current
router.get("/current", requireAuth, async (req, res) => {
	let { user } = req;

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

	//add nummembers for each group
	// find number of people in each group
	// go to memberships for group
	// count how many members are returned

	// const numMembers = await Membership.count({
	// 	where: { groupId: groups[0].id },
	// });

	newarray.forEach((el, i) => {
		// const numMembers2 = Membership.count({
		// 	where: { groupId: el.id },
		// });
		el.numMembers = 1;
		return el;
	});
	console.log(newarray[0].numMembers);

	// console.log(newarray2);

	// add preview image to each group

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
	if (!events.length) {
		return res.json({ message: `No events found for group.` });
	}
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

// Get details of a Group from an id
// get - /api/groups/:groupId
router.get("/:groupId", valid_group, async (req, res) => {
	let groupId = req.params.groupId;
	console.log(req.params);

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

	return res.json(group);
});

// get all groups
// get - /api/groups/
router.get("/", async (req, res) => {
	let all = await Group.findAll();
	if (all.length > 0) {
		return res.json({
			Groups: all,
		});
	} else return res.json({ group: null });
});

//----------------post-------------------------

// Request a Membership for a Group based on the Group's id
// post - /api/groups/:groupId/membership
//create a membership
router.post(
	"/:groupId/membership",
	valid_group,
	requireAuth,
	async (req, res) => {
		let groupId = req.params.groupId;

		let { user } = req;
		let userId = user.id;

		let check = await Membership.findOne({
			where: { userId, groupId },
		});

		if (check && check.status === "pending") {
			return res.status(400).json({
				message: `Membership has already been requested`,
				statusCode: 400,
			});
		} else if (check) {
			return res.status(400).json({
				message: `User is already a ${check.status} of the group.`,
				statusCode: 400,
			});
		}

		let member = await Membership.create({
			userId,
			groupId,
		});

		return res.json({
			memberId: member.userId,
			status: member.status,
		});
	}
);

// Create an Event for a Group specified by its id
// post - /api/groups/:groupId/events
router.post(
	"/:groupId/events",
	valid_group,
	valid_dates,
	requireAuth,
	valid_user,
	async (req, res) => {
		let groupId = req.params.groupId;

		let {
			venueId,
			name,
			type,
			capacity,
			price,
			description,
			startDate,
			endDate,
		} = req.body;

		let options = {
			message: "Validation Error",
			statusCode: 400,
			errors: {},
		};

		if (!venueId) options.errors.venueId = `Venue does not exist`;
		if (!name) options.errors.name = `Name must be at least 5 characters`;
		if (!type) options.errors.type = `Type must be Online or In person`;
		if (!capacity) options.errors.capacity = `Capacity must be an integer`;
		if (!price) options.errors.price = `Price is invalid`;
		if (!description)
			options.errors.description = `Description is required`;
		if (Date.parse(startDate) < Date.parse(new Date()) || !startDate) {
			options.errors.startDate = `Start date must be in the future`;
		}
		if (endDate < startDate || !endDate) {
			options.errors.endDate = `End date is less than start date`;
		}

		if (Object.values(options.errors).length > 0) {
			return res.status(400).json(options);
		} else {
			// check if venue already exists
			let check = await Event.findOne({
				where: { name, startDate, endDate, description },
			});
			if (check) {
				return res.status(400).json({
					message: "Validation Error",
					statusCode: 400,
					errors: {
						Error: `Event already exists.`,
					},
				});
			}

			let newevent = await Event.create({
				venueId,
				name,
				type,
				capacity,
				price,
				description,
				startDate,
				endDate,
				groupId,
			});

			return res.json(newevent);
		}
	}
);

// Create a new Venue for a Group specified by its id
// post - /api/groups/:groupId/venues
router.post("/:groupId/venues", valid_group, requireAuth, async (req, res) => {
	let groupId = req.params.groupId;

	let { address, city, state, lat, lng } = req.body;

	let options = {
		message: "Validation Error",
		statusCode: 400,
		errors: {},
	};

	if (!address) options.errors.address = `Street address is required`;
	if (!city) options.errors.name = `City is required`;
	if (!state) options.errors.state = `State is required`;
	if (!lat) options.errors.lat = `Latitude is not valid`;
	if (!lng) options.errors.lng = `Longitude is not valid`;

	if (Object.values(options.errors).length > 0) {
		return res.status(400).json(options);
	} else {
		// check if venue already exists
		let check = await Venue.findOne({
			where: { address, city, state, groupId },
		});
		if (check) {
			return res.status(400).json({
				message: "Validation Error",
				statusCode: 400,
				errors: {
					Error: `Venue already exists.`,
				},
			});
		}

		let newvenue = await Venue.create({
			address,
			city,
			state,
			lat,
			lng,
			groupId,
		});

		return res.json(newvenue);
	}
});

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

// Change the status of a membership for a group specified by id
// put - /api/groups/:groupId/membership
router.put(
	"/:groupId/membership",
	requireAuth,
	valid_group,
	valid_user,
	async (req, res) => {
		let groupId = req.params.groupId;

		let { status, memberId } = req.body;

		// if changing status to pending = reject
		if (status === "pending") {
			return res.status(400).json({
				message: "Validations Error",
				statusCode: 400,
				errors: {
					status: "Cannot change a membership status to pending",
				},
			});
		}
		let member = await Membership.findOne({
			where: { userId: memberId },
		});

		// if user not found
		if (!member) {
			return res.status(400).json({
				message: "Validation Error",
				statusCode: 400,
				errors: {
					memberId: "User couldn't be found",
				},
			});
		}

		//if membership does not exist
		let checked = await Membership.findOne({
			where: { userId: memberId, groupId },
		});
		if (!checked) {
			return res.status(400).json({
				message:
					"Membership between the user and the group does not exist",
				statusCode: 404,
			});
		}

		// only organizer can change to co-host
		let { user } = req;
		let group = await Group.findByPk(groupId);
		if (user.id !== group.organizerId && status === "co-host") {
			return res.status(400).json({
				message: "Validations Error",
				statusCode: 400,
				errors: {
					status: `Only organizers can change a membership status to co-host`,
				},
			});
		}

		await Membership.update(
			{
				status,
			},
			{ where: { userId: memberId, groupId } }
		);

		return res.json({
			id: member.id,
			groupId,
			memberId,
			status,
		});
	}
);

//TODO: test valid user on route
// edit a group
// put - /api/groups/:groupId
router.put(
	"/:groupId",
	valid_group,
	valid_user,
	requireAuth,
	async (req, res) => {
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

		await Group.update(
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
	}
);

//----------------delete-------------------------

// Delete membership to a group specified by id
// delete - /api/groups/:groupId/membership

router.delete(
	"/:groupId/membership",
	requireAuth,
	valid_group,
	valid_delete,
	async (req, res) => {
		let { memberId } = req.body;

		let groupId = req.params.groupId;
		let deleted = await Membership.findOne({
			where: { userId: memberId, groupId },
		});

		if (!deleted) {
			return res.status(400).json({
				message: "Validation Error",
				statusCode: 400,
				errors: {
					memberId: "User couldn't be found",
				},
			});
		}

		await deleted.destroy();
		return res.json({
			message: "Successfully deleted membership from group",
		});
	}
);

// Delete a Group
// delete - /api/groups/:groupId
router.delete("/:groupId", valid_group, async (req, res) => {
	let groupId = req.params.groupId;
	let deleted = await Group.findByPk(groupId);
	await deleted.destroy();

	return res.json({
		message: "Successfully deleted",
		statusCode: 200,
	});
});

//----------------error handling-------------------------

router.use((err, _req, res, _next) => {
	res.status(err.statusCode || 500);
	console.error(err);
	res.json({
		message: err.message,
		statusCode: err.statusCode,
	});
});

// exports
module.exports = router;
