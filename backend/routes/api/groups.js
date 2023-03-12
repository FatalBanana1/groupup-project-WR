// routes > api > groupsvalid_user

//imports
const express = require("express");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { setTokenCookie, requireAuth } = require("../../utils/auth.js");
const {
	Group,
	GroupImage,
	User,
	Membership,
	Event,
	Venue,
	Attendance,
	EventImage,
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

const valid_group_only = async (req, res, next) => {
	const id = req.params.groupId;

	if (id) {
		const info = await Group.findByPk(id);
		if (!info) {
			return res.status(404).json({
				message: "Validation Error",
				statusCode: 404,
				errors: {
					groupId: "Group couldn't be found",
				},
			});
		}
		req.group = info;
		next();
	} else {
		let usersgroup = await Group.findOne({
			where: { organizerId: user.id },
		});
		if (!usersgroup) {
			return res.status(404).json({
				message: "Validation Error",
				statusCode: 404,
				errors: {
					groupId: "Group couldn't be found",
				},
			});
		}
		req.group = usersgroup;
		next();
	}
};

const valid_group = async (req, res, next) => {
	let { user } = req;

	if (!user) {
		return res.status(400).json({
			message: "Validation Error",
			statusCode: 400,
			errors: {
				memberId: "User must be signed in.",
			},
		});
	}

	const id = req.params.groupId;

	if (id) {
		const info = await Group.findByPk(id);
		if (!info) {
			return res.status(404).json({
				message: "Validation Error",
				statusCode: 404,
				errors: {
					groupId: "Group couldn't be found",
				},
			});
		}
		req.group = info;
		next();
	} else {
		let usersgroup = await Group.findOne({
			where: { organizerId: user.id },
		});
		if (!usersgroup) {
			return res.status(404).json({
				message: "Validation Error",
				statusCode: 404,
				errors: {
					groupId: "Group couldn't be found",
				},
			});
		}
		req.group = usersgroup;
		next();
	}
};

const valid_user = async (req, res, next) => {
	console.log(`inside edite valid user - back `, req.params);

	const { user } = req;
	const { groupId } = req.params;

	if (!user) {
		return res.status(400).json({
			message: "Validation Error",
			statusCode: 400,
			errors: {
				memberId: "User must be signed in.",
			},
		});
	}

	//check if organizer or cohost
	let auth = await Membership.findOne({
		where: {
			userId: user.id,
			groupId,
			status: "co-host",
		},
	});

	if (!auth) {
		return res.status(400).json({
			message: "Authentication Error",
			statusCode: 403,
			errors: {
				memberId: `Current User must be the organizer of the group or a member of the group with a status of co-host`,
			},
		});
	} else {
		next();
	}
};

//----

////old user validation
// const valid_user = async (req, res, next) => {
// 	const { user } = req;

// 	if (!user) {
// 		return res.status(400).json({
// 			message: "Validation Error",
// 			statusCode: 400,
// 			errors: {
// 				memberId: "User must be signed in.",
// 			},
// 		});
// 	}

// 	let auth = await Membership.findOne({
// 		where: { userId: user.dataValues.id },
// 		include: [
// 			{
// 				model: Group,
// 			},
// 		],
// 	});

// 	if (!auth) {
// 		return res.status(400).json({
// 			message: "Authentication Error",
// 			statusCode: 403,
// 			errors: {
// 				memberId: `Current User must be the organizer of the group or a member of the group with a status of co-host`,
// 			},
// 		});
// 	}

// 	if (
// 		user.dataValues.id &&
// 		(auth.status === "co-host" || auth.Group.organizerId === user.id)
// 	) {
// 		next();
// 	} else {
// 		return res.status(403).json({
// 			message: "Authentication Error",
// 			statusCode: 403,
// 			errors: {
// 				memberId: `Current User must be the organizer of the group or a member of the group with a status of co-host`,
// 			},
// 		});
// 	}
// };

const valid_delete = async (req, res, next) => {
	const { user } = req;

	if (!user) {
		return res.status(400).json({
			message: "Validation Error",
			statusCode: 400,
			errors: {
				memberId: "User must be signed in.",
			},
		});
	}
	const { memberId, groupId } = req.body;
	let auth = await Membership.findOne({
		where: { userId: user.id, groupId: groupId },
		include: [
			{
				model: Group,
			},
		],
	});

	if (!auth || auth === {}) {
		res.status(400);
		return res.json({
			message: "Authentication Error",
			statusCode: 403,
			errors: {
				memberId: `Current User must be the organizer of the group or a member of the group with a status of co-host`,
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
		return res.status(403).json({
			message: "Authentication Error",
			statusCode: 403,
			errors: {
				memberId: `Current User must be the organizer of the group or a member of the group with a status of co-host`,
			},
		});
	}
};

const valid_delete_member = async (req, res, next) => {
	const { user } = req;

	if (!user) {
		return res.status(400).json({
			message: "Validation Error",
			statusCode: 400,
			errors: {
				memberId: "User must be signed in.",
			},
		});
	}
	const { memberId, groupId } = req.body;
	let auth = await Membership.findOne({
		where: { userId: user.id, groupId: groupId },
		include: [
			{
				model: Group,
			},
		],
	});

	if (!auth || auth === {}) {
		res.status(400);
		return res.json({
			message: "Authentication Error",
			statusCode: 403,
			errors: {
				memberId: `Current User must be a member of the group.`,
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
		return res.status(403).json({
			message: "Authentication Error",
			statusCode: 403,
			errors: {
				memberId: `Current User must be the organizer of the group or a member of the group with a status of co-host`,
			},
		});
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

// memberships
// Get all Members of a Group specified by its id
// get - /:groupid/members
router.get("/:groupId/members", async (req, res) => {
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

	// const { user } = req;
	// let auth = await Membership.findOne({
	// 	where: { userId: user.id },
	// 	include: [
	// 		{
	// 			model: Group,
	// 		},
	// 	],
	// });

	array = [];
	members.forEach((el, i) => {
		array.push(el.User);

		array[i].dataValues.status = el.status;

		// if (
		// 	user.id &&
		// 	(auth.status === "co-host" || auth.Group.organizerId === user.id)
		// ) {
		// 	array[i].dataValues.status = el.status;
		// }
	});
	return res.json({ Members: array, groupId });
});

// Get all Groups joined or organized by the Current User
// get - /api/groups/current
router.get("/current", requireAuth, async (req, res) => {
	let { user } = req;

	let organizers = await Group.findAll({
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

	let groups = await Group.findAll({
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
	if (!groups.length) {
		return res.json({ Groups: null });
	}

	let members = await Group.findAll({
		attributes: ["id"],
		include: [
			{
				model: Membership,
				attributes: ["userId"],
			},
		],
	});

	let images = await GroupImage.findAll({
		where: { preview: true },
		attributes: ["groupId", "url"],
		include: {
			model: Group,
			attributes: [],
			include: {
				model: Membership,
				attributes: [],
				where: { userId: user.id },
			},
		},
	});

	// filter duplicate groups included in results
	let array = [...organizers, ...groups];
	let newarray = [];
	let visited = new Set();
	array.forEach((el, i) => {
		if (!visited.has(el.id)) {
			//add nummembers
			for (let j in members) {
				if (el.id === members[j].dataValues.id) {
					el.dataValues.numMembers =
						members[j].dataValues.Memberships.length;
					break;
				}
				el.dataValues.previewImage = null;
			}
			// add preview image
			for (let k = 0; k < images.length; k++) {
				if (images[k].dataValues.groupId === el.id) {
					el.dataValues.previewImage = images[k].dataValues.url;
					break;
				}
			}
			visited.add(el.id);
			newarray.push(el);
		}
	});

	return res.json({ Groups: newarray });
});

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

	//add numattending
	let members = await Event.scope(["defaultScope"]).findAll({
		attributes: ["id"],
		include: [
			{
				model: Attendance,
				attributes: ["userId"],
				where: { status: "attending" },
			},
		],
	});
	//add preview image
	let images = await EventImage.findAll({
		where: { preview: true },
		attributes: ["eventId", "url"],
	});
	// filter duplicate events
	let newarray = [];
	let visited = new Set();
	events.forEach((el, i) => {
		if (!visited.has(el.id)) {
			//add numattending
			for (let j in members) {
				if (el.id === members[j].dataValues.id) {
					el.dataValues.numAttending =
						members[j].dataValues.Attendances.length;
					break;
				} else {
					el.dataValues.numAttending = 0;
				}
				el.dataValues.previewImage = null;
			}
			//add preview image
			for (let k in images) {
				if (el.id === images[k].dataValues.eventId) {
					el.dataValues.previewImage = images[k].dataValues.url;
					break;
				}
			}
			visited.add(el.id);
			newarray.push(el);
		}
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
router.get("/:groupId", valid_group_only, async (req, res) => {
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
				attributes: ["id", "firstName", "lastName", "avatar"],
			},
			{
				model: Venue,
				as: "Venues",
				attributes: ["id", "groupId", "city", "state", "lat", "lng"],
			},
			{
				model: Event,
				include: [
					{
						model: EventImage,
						where: { preview: true },
						attributes: ["url"],
					},
					{
						model: Venue,
						attributes: ["city", "state"],
					},
					{
						model: Attendance,
					},
				],
			},
		],
	});

	let members = await Group.findOne({
		where: { id: groupId },
		attributes: ["id"],
		include: [
			{
				model: Membership,
				attributes: ["userId"],
				where: { groupId },
			},
		],
	});

	group.dataValues.numMembers = members.dataValues.Memberships.length;

	return res.json(group);
});

//-------------

// // get all groups
// // get - /api/groups/
// router.get("/", async (req, res) => {
// 	let groups = await Group.findAll({
// 		attributes: [
// 			"id",
// 			"organizerId",
// 			"name",
// 			"about",
// 			"type",
// 			"private",
// 			"city",
// 			"state",
// 			"createdAt",
// 			"updatedAt",
// 		],
// 	});

// 	if (!groups.length) {
// 		return res.json({ Groups: null });
// 	}

// 	let members = await Group.findAll({
// 		attributes: ["id"],
// 		include: [
// 			{
// 				model: Membership,
// 				attributes: ["userId"],
// 			},
// 		],
// 	});

// 	let images = await GroupImage.findAll({
// 		where: { preview: true },
// 		attributes: ["groupId", "url"],
// 	});

// 	//filter duplicates
// 	let newarray = [];
// 	let visited = new Set();
// 	groups.forEach((el, i) => {
// 		if (!visited.has(el.id)) {
// 			//add nummembers
// 			for (let j in members) {
// 				if (el.id === members[j].dataValues.id) {
// 					el.dataValues.numMembers =
// 						members[j].dataValues.Memberships.length;
// 					break;
// 				}
// 				el.dataValues.previewImage = null;
// 			}
// 			// add preview image
// 			for (let k = 0; k < images.length; k++) {
// 				if (images[k].dataValues.groupId === el.id) {
// 					el.dataValues.previewImage = images[k].dataValues.url;
// 					break;
// 				}
// 			}
// 			visited.add(el.id);
// 			newarray.push(el);
// 		}
// 	});

// 	return res.json({ Groups: newarray });
// });

//-------------

// get all groups - WITH QUERY
// get - /api/groups/
router.get("/", async (req, res) => {
	//pagination
	let { page, size, name, type } = req.query;
	let errors = {};
	let queries = {};

	//optional queries
	//name
	if (name) {
		if (
			typeof name === "string" &&
			name !== " " &&
			!(parseInt(name) < 10 ** 10)
		) {
			// queries.name = name;
			//yield results with part of a name
			queries.name = { [Op.iLike]: `%${name}%` };
		} else {
			errors.name = `Name must be a string`;
		}
	}
	//type
	if (type) {
		if (type == "Online" || type == "In Person") {
			queries.type = type;
		} else {
			errors.type = `Type must be 'Online' or 'In Person'`;
		}
	}

	//page error handle
	if (page < 1) {
		errors.page = `Page must be greater than or equal to 1`;
	} else if (page > 10) {
		errors.page = `Page must be less than or equal to 10`;
	}
	//size error handle
	if (size < 1) {
		errors.size = `Size must be greater than or equal to 1`;
	} else if (size > 10) {
		errors.size = `Size must be less than or equal to 10`;
	}

	//check errors
	if (Object.values(errors).length) {
		return res.status(400).json({
			message: "Validation Error",
			statusCode: 400,
			errors: errors,
		});
	}

	//defaults
	if (!page) page = 1;
	if (!size) size = 10;
	page = +page;
	size = parseInt(size);
	const pagination = {};
	if (page >= 1 && size >= 1 && page <= 10 && size <= 10) {
		pagination.limit = size;
		pagination.offset = size * (page - 1);
	}

	//query
	let groups = await Group.findAll({
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
		where: { ...queries },
		...pagination,
	});

	if (!groups.length) {
		return res.json({ Groups: `No Groups were found.` });
	}

	let members = await Group.findAll({
		attributes: ["id"],
		include: [
			{
				model: Membership,
				attributes: ["userId"],
			},
		],
	});

	let images = await GroupImage.findAll({
		where: { preview: true },
		attributes: ["groupId", "url"],
	});

	//filter duplicates
	let newarray = [];
	let visited = new Set();
	await groups.forEach((el, i) => {
		if (!visited.has(el.id)) {
			//add nummembers
			for (let j in members) {
				if (el.id === members[j].dataValues.id) {
					el.dataValues.numMembers =
						members[j].dataValues.Memberships.length;
					break;
				}
				el.dataValues.previewImage = null;
			}
			// add preview image
			for (let k = 0; k < images.length; k++) {
				if (images[k].dataValues.groupId === el.id) {
					el.dataValues.previewImage = images[k].dataValues.url;
					break;
				}
			}
			visited.add(el.id);
			newarray.push(el);
		}
	});

	return res.json({ Groups: newarray });
});

//-------------------

//-------------------

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
			return res.json({
				errors: {
					memberId: check.userId,
				},
				status: check.status,
			});
		} else if (check) {
			return res.status(400).json({
				errors: {
					message: `User is already a(n) ${check.status} of the group.`,
				},
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
			groupId,
			user,
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
	// valid_user,
	async (req, res) => {
		let { user } = req;

		let {
			venue,
			venueId,
			name,
			type,
			capacity,
			price,
			description,
			startDate,
			endDate,
			groupId,
		} = req.body;

		let options = {
			message: "Validation Error",
			statusCode: 400,
			errors: {},
		};

		// if (!venueId) options.errors.venue = `Venue does not exist`;
		if (!venue && !venueId) options.errors.venue = `Venue does not exist`;
		if (!name || name.length < 2)
			options.errors.name = `Name must be at least 2 characters`;
		if (description && description.length > 1000)
			options.errors.description = `Description must be at less than 1000 characters`;
		if (!type || (type !== "Online" && type !== "In person"))
			options.errors.type = `Type must be Online or In person`;
		if (!capacity || capacity < 0 || capacity > 400000000)
			options.errors.capacity = `Capacity must be a valid number`;
		if (!price || price < 0)
			options.errors.price = `Price must be a valid number`;
		if (
			venue &&
			(!venue.state || venue.state.length > 2 || venue.state.length < 2)
		)
			options.errors.state = `State must be 2 characters`;
		if (Date.parse(startDate) < Date.parse(new Date()) || !startDate) {
			options.errors.startDate = `Start date must be in the future`;
		}
		if (Date.parse(endDate) < Date.parse(startDate) || !endDate) {
			options.errors.endDate = `End date must be after start date`;
		}

		if (Object.values(options.errors).length > 0) {
			return res.status(400).json(options);
		} else {
			// check if venue already exists
			let check = await Event.findOne({
				where: { name, startDate, endDate, description },
			});
			if (check) {
				return res.json(check);
			}

			let newvenue = { id: venueId };
			if (!venueId) {
				newvenue = await Venue.create({
					groupId,
					address: venue.address,
					city: venue.city,
					state: venue.state,
					lat: 100,
					lng: 100,
				});
			}
			let newevent = await Event.create({
				venueId: newvenue.id,
				name,
				type,
				capacity,
				price,
				description,
				startDate,
				endDate,
				groupId,
			});

			let event = await Event.findOne({
				where: { name, startDate, endDate, description, groupId },
			});

			if (req.body.image.url) {
				await EventImage.create({
					url: req.body.image.url,
					preview: true,
					eventId: event.id,
				});
			}

			let attending = await Attendance.create({
				eventId: event.id,
				userId: user.id,
				status: "attending",
			});

			return res.json(newevent);
		}
	}
);

// Create a new Venue for a Group specified by its id
// post - /api/groups/:groupId/venues
router.post(
	"/:groupId/venues",
	valid_group,
	valid_user,
	requireAuth,
	async (req, res) => {
		let groupId = req.params.groupId;

		let { address, city, state, lat, lng } = req.body;

		let options = {
			message: "Validation Error",
			statusCode: 400,
			errors: {},
		};

		if (!address || address.length < 5)
			options.errors.address = `Street address is required`;
		if (!city || city.length < 3) options.errors.name = `City is required`;
		if (!state || state.length !== 2)
			options.errors.state = `State is required`;
		if (
			!lat ||
			parseFloat(lat) > 10 ** 4 ||
			typeof parseFloat(lat) !== "number"
		)
			options.errors.lat = `Latitude is not valid`;
		if (
			!lng ||
			parseFloat(lng) > 10 ** 4 ||
			typeof parseFloat(lng) !== "number"
		)
			options.errors.lng = `Longitude is not valid`;

		if (Object.values(options.errors).length > 0) {
			return res.status(400).json(options);
		} else {
			// check if venue already exists
			let check = await Venue.findOne({
				where: { address, city, state, groupId },
			});
			if (check) {
				return res.json({
					id: check.id,
					groupId,
					address,
					city,
					state,
					lat,
					lng,
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

			return res.json({
				id: newvenue.id,
				groupId,
				address,
				city,
				state,
				lat,
				lng,
			});
		}
	}
);

//Add an Image to a Group based on the Group's id
// post - api/groups/:groupId/images
router.post("/:groupId/images", valid_group, valid_user, async (req, res) => {
	let groupId = req.group.id;
	let { url, preview } = req.body;

	// check if image already exists
	let check = await GroupImage.findOne({
		where: { url, preview, groupId },
	});
	if (check) {
		return res.json({
			id: check.id,
			url,
			preview,
		});
	}

	// add img to groupimages table
	let newimage = await GroupImage.create({
		groupId,
		url,
		preview,
	});

	return res.json({
		id: newimage.id,
		url,
		preview,
	});
});

// Create a Group
// post -  /api/groups
router.post("/", requireAuth, async (req, res) => {
	let { name, about, type, private, city, state, image } = req.body;
	let errors = {};

	if (!name || name.length > 60)
		errors.name = `Name must be 60 characters or less`;
	if (!about || about.length < 50)
		errors.about = `About must be 50 characters or more`;
	if (!about || about.length > 1000)
		errors.about = `About must be less than 1000 characters`;
	if (!type || (type !== "Online" && type !== "In person"))
		errors.type = `Type must be 'Online' or 'In person'`;
	if (typeof Boolean(private) !== "boolean")
		errors.private = `Private must be a boolean`;
	if (!city) errors.city = `City is required`;
	if (city.length < 2) errors.city = `City must be 2 characters or more`;
	if (!state) errors.state = `State is required`;
	if (state.length !== 2) errors.state = `State must be 2 characters.`;

	if (Object.values(errors).length) {
		return res.status(400).json({
			message: "Validation Error",
			statusCode: 400,
			errors: errors,
		});
	}

	let { user } = req;
	let organizerId = user.id;

	// check if group already exists
	let check = await Group.findOne({
		where: { name, about, type, private, city, state },
	});
	if (check) {
		return res.json(check);
	}

	if (!private) private = false;

	let group = await Group.create({
		name,
		about,
		type,
		private,
		city,
		state,
		organizerId,
	});

	let member = await Membership.create({
		userId: user.id,
		groupId: group.id,
		status: "co-host",
	});

	//deal with group img
	let { url } = req.body.image;

	if (url) {
		await GroupImage.create({
			url,
			preview: true,
			groupId: group.id,
		});
	}

	return res.json(group);
});

//----------------put-------------------------

// Change the status of a membership for a group specified by id
// put - /api/groups/:groupId/membership
router.put(
	"/:groupId/membership",
	requireAuth,
	valid_group,
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
		if (memberId === null) {
			return res.status(400).json({ extraUserId: memberId });
		}

		let member = await User.findByPk(memberId);

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
			return res.status(404).json({
				statusCode: 404,
				errors: {
					message:
						"Membership between the user and the group does not exist",
				},
			});
		}

		// change organizers
		let { user } = req;
		let group = await Group.findByPk(groupId);
		if (user.id !== group.organizerId && status === "organizer") {
			return res.status(400).json({
				statusCode: 400,
				errors: {
					message:
						"Only the current group Organizer can change status of a member to Organizer",
				},
			});
		}
		if (user.id === group.organizerId && status === "organizer") {
			await Group.update(
				{ organizerId: memberId },
				{ where: { id: groupId } }
			);
			status = "co-host";
		}

		//change membership status
		let updated = await Membership.update(
			{
				status,
			},
			{ where: { userId: memberId, groupId } }
		);

		return res.json({
			id: updated.id,
			groupId,
			memberId,
			status,
			member,
		});
	}
);

// edit a group
// put - /api/groups/:groupId
router.put(
	"/:groupId",
	valid_group,
	valid_user,
	requireAuth,
	async (req, res) => {
		let groupId = req.params.groupId;
		let defaultImage = await GroupImage.findOne({
			where: {
				groupId,
				url: req.body.image.url,
			},
		});
		let { name, about, type, private, city, state, image } = req.body;

		//deal with group img
		let previewer = false;
		let { url, preview } = image;

		//errors
		let errors = {};
		if (name && name.length > 60)
			errors.name = `Name must be 60 characters or less`;
		if (about && about.length < 50)
			errors.about = `About must be 50 characters or more`;
		if (about && about.length > 1000)
			errors.about = `About must be less than 1000 characters`;
		if (type && type !== "Online" && type !== "In person")
			errors.type = `Type must be 'Online' or 'In person'`;
		if (private && typeof Boolean(private) !== "boolean")
			errors.private = `Private must be a boolean`;
		if (city && city.length < 3) errors.city = `City is required`;
		if (state && state.length !== 2) errors.state = `State is required`;
		if (defaultImage) errors.image = `Group Image already exists`;

		if (Object.values(errors).length) {
			return res.status(400).json({
				message: "Validation Error",
				statusCode: 400,
				errors: errors,
			});
		}

		//check add image

		//group images add and change defaults
		if (preview && url) {
			await GroupImage.update(
				{ preview: false },
				{
					where: { groupId, preview: true },
				}
			);
			previewer = true;
		}
		if (url) {
			await GroupImage.create({
				url,
				preview: previewer,
				groupId,
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

		newgroup = await Group.findOne({
			where: { name, about, type, private, city, state },
		});

		return res.json(newgroup);
	}
);

//----------------delete-------------------------

// Delete membership to a group specified by id
// delete - /api/groups/:groupId/membership

router.delete(
	"/:groupId/membership",
	requireAuth,
	valid_group,
	valid_delete_member,
	async (req, res) => {
		let { memberId, groupId } = req.body;

		let deleted = await Membership.findOne({
			where: { userId: memberId, groupId: +groupId },
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
			id: memberId,
			groupId,
			message: "Successfully deleted membership from group",
		});
	}
);

// Delete a Group
// delete - /api/groups/:groupId
router.delete("/:groupId", valid_group, valid_delete, async (req, res) => {
	let groupId = req.body.groupId;
	let deleted = await Group.findByPk(groupId);
	await deleted.destroy();

	return res.json({
		id: groupId,
		message: "Successfully deleted",
		statusCode: 200,
	});
});

//----------------error handling-------------------------

router.use((err, _req, res, _next) => {
	res.status(err.statusCode || 500);
	console.error(err);
	res.json({
		errors: {
			error: err.message,
		},
		statusCode: err.statusCode,
	});
});

// exports
module.exports = router;
