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
	Attendance,
} = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();
const { Op } = require("sequelize");

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

const valid_event = async (req, res, next) => {
	const id = req.params.eventId;
	const info = await Event.findByPk(id);
	req.event = info;
	if (!info) {
		const err = new Error("Event couldn't be found");
		err.statusCode = 404;
		throw err;
	}
	next();
};

const valid_attend = async (req, res, next) => {
	const eventId = req.params.eventId;
	const { userId } = req.body;
	const info = await Attendance.findOne({
		where: { userId, eventId },
	});
	if (!info) {
		const err = new Error(
			"Attendance between the user and the event does not exist"
		);
		err.statusCode = 404;
		throw err;
	}
	next();
};

const valid_venue = async (req, res, next) => {
	const id = req.params.eventId;
	const info = await Event.findByPk(id);
	const { venueId } = req.body;
	if (info.venueId !== venueId) {
		const err = new Error("Venue couldn't be found");
		err.statusCode = 404;
		throw err;
	}
	next();
};

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
	const eventId = req.params.eventId;

	//editing event
	// check for event by eventid
	let event = await Event.findByPk(eventId);

	//check if current user is either organizer or cohost
	let group = await Group.findAll({
		where: { id: event.groupId, organizerId: user.id },
	});

	//organizer - find group by groupid, check organizerId in groups t
	//cohost = find current users id and find the status of membership, check status in membership t
	let member = await Membership.findAll({
		where: { status: "co-host", userId: user.id, groupId: event.groupId },
	});

	if (member.length < 1 && group.length < 1) {
		const err = new Error(
			`Current User must be the organizer of the group or a member of the group with a status of co-host`
		);
		err.statusCode = 403;
		throw err;
	} else {
		next();
	}
};

// valid member to delete attendance
const valid_delete_attend = async (req, res, next) => {
	const { user } = req;
	const eventId = req.params.eventId;

	let event = await Event.findByPk(eventId);
	let group = await Group.findAll({
		where: { id: event.groupId, organizerId: user.id },
	});
	let member = await Membership.findAll({
		where: {
			status: { [Op.or]: ["co-host", "member"] },
			userId: user.id,
			groupId: event.groupId,
		},
	});
	if (member.length < 1 && group.length < 1) {
		const err = new Error(
			`Only the User or organizer may delete an Attendance`
		);
		err.statusCode = 403;
		throw err;
	} else {
		next();
	}
};

const valid_member = async (req, res, next) => {
	const { user } = req;
	const eventId = req.params.eventId;

	// attend event
	// check for event by eventid
	let event = await Event.findByPk(eventId);

	//check if current user is either organizer or cohost
	let group = await Group.findAll({
		where: { id: event.groupId, organizerId: user.id },
	});

	//organizer - find group by groupid, check organizerId in groups t
	//find current users id and find the status of membership, check status in membership t
	let member = await Membership.findAll({
		where: {
			status: { [Op.or]: ["co-host", "member"] },
			userId: user.id,
			groupId: event.groupId,
		},
	});

	if (member.length < 1 && group.length < 1) {
		const err = new Error(`Current User must be a member of the group`);
		err.statusCode = 403;
		throw err;
	} else {
		next();
	}
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

//-----------------get----------------------

//TODO:
// Get all Attendees of an Event specified by its id
// get - /api/events/:eventId/attendees
router.get("/:eventId/attendees", valid_event, async (req, res) => {
	let eventId = req.params.eventId;

	const { user, event } = req;
	// let auth = await Membership.findOne({
	// 	where: { userId: user.id },
	// 	include: [
	// 		{
	// 			model: Group,
	// 		},
	// 	],
	// });
	// let users;
	// let attends;

	// if (
	// 	user.id &&
	// 	(auth.status === "co-host" || auth.Group.organizerId === user.id)
	// ) {
	let users = await User.findAll({
		attributes: ["id", "firstName", "lastName", "avatar", "username"],
		include: [
			{
				model: Attendance,
				where: {
					eventId,
				},
				attributes: ["userId", "status", "createdAt"],
				include: {
					model: Event,
					where: { id: eventId },
				},
			},
			{
				model: Membership,
				where: { status: { [Op.in]: ["member", "co-host"] } },
				attributes: ["groupId", "status", "createdAt"],
			},
		],
	});

	// 	// attends = await Attendance.findAll({
	// 	// 	where: {
	// 	// 		eventId,
	// 	// 	},
	// 	// 	attributes: ["status", "createdAt"],
	// 	// });
	// } else {
	// 	users = await User.scope(["defaultScope"]).findAll({
	// 		attributes: ["id", "firstName", "lastName"],
	// 		include: [
	// 			{
	// 				model: Attendance,
	// 				where: {
	// 					eventId,
	// 					status: { [Op.or]: ["waitlist", "attending"] },
	// 				},
	// 				attributes: [],
	// 			},
	// 		],
	// 	});

	// 	attends = await Attendance.findAll({
	// 		where: {
	// 			eventId,
	// 			status: { [Op.or]: ["waitlist", "pending"] },
	// 		},
	// 		attributes: ["status"],
	// 	});
	// }

	// users.forEach((el, i) => {
	// 	el.dataValues.Attendance = attends[i];
	// });
	return res.json({ Attendees: users });
});

// Get details of an Event specified by its id
// get - api/events/:eventId
router.get("/:eventId", valid_event, async (req, res) => {
	let eventId = req.params.eventId;

	let event = await Event.findByPk(eventId, {
		include: [
			{
				model: Group,
				attributes: ["id", "organizerId", "name", "private"],
				include: [
					{
						model: User,
						as: "Organizer",
						attributes: ["id", "firstName", "lastName", "avatar"],
					},
					{
						model: Membership,
						where: { status: "co-host" },
						attributes: ["userId", "status"],
					},
					{
						model: GroupImage,
						attributes: ["url"],
						where: { preview: true },
					},
				],
			},
			{
				model: Venue,
				attributes: ["id", "address", "city", "state", "lat", "lng"],
			},
			{
				model: EventImage,
				attributes: ["id", "url", "preview"],
			},
		],
	});

	//add numattending
	let member = await Event.findByPk(eventId, {
		attributes: ["id"],
		include: [
			{
				model: Attendance,
				attributes: ["userId"],
				// where: { status: "attending" },
			},
		],
	});

	//add preview image
	let image = await EventImage.findOne({
		where: { preview: true, eventId },
		attributes: ["eventId", "url"],
	});

	//add numattending
	if (member) {
		event.dataValues.numAttending = member.dataValues.Attendances.length;
	} else {
		event.dataValues.numAttending = 0;
	}

	//add preview image
	if (image) {
		event.dataValues.previewImage = image.dataValues.url;
	} else {
		event.dataValues.previewImage = null;
	}

	return res.json(event);
});

// events - get all events
// get - /events
router.get("/", async (req, res) => {
	//pagination
	let { page, size, name, type, startDate } = req.query;
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
			queries.name = { [Op.like]: `%${name}%` };
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
	//startdate
	if (startDate) {
		if (Date.parse(startDate) > Date.parse(new Date())) {
			queries.startDate = startDate;
		} else {
			errors.startDate = `Start date must be a valid datetime`;
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

	date = new Date();

	//query
	let events = await Event.findAll({
		include: [
			{
				model: Group,
				attributes: ["id", "name", "city", "state"],
			},
			{
				model: Venue,
				attributes: ["id", "city", "state"],
			},
		],
		where: { startDate: { [Op.gte]: date } },
		order: [["startDate", "DESC"]],
		where: { ...queries },
		...pagination,
	});
	if (!events.length) {
		return res.json(
			`0 results ... well this is embarassing, try a different query`
		);
	}
	//add numattending
	let members = await Event.findAll({
		attributes: ["id"],
		include: [
			{
				model: Attendance,
				attributes: ["userId"],
				// where: { status: "attending" },
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
	events.forEach((el) => {
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

	return res.json({ Events: newarray });
});

//----------------post-------------------------

// Request to Attend an Event based on the Event's id
// post - /api/events/:eventId/attendance
router.post(
	"/:eventId/attendance",
	valid_event,
	requireAuth,
	async (req, res) => {
		let eventId = req.params.eventId;
		let { user } = req;

		// check if attendance exists = if yes dont add
		let check = await Attendance.findOne({
			where: { eventId, userId: user.id },
		});
		if (check) {
			if (check.status === "pending") {
				return res.status(400).json({
					message: "Attendance has already been requested",
					statusCode: 400,
				});
			}

			if (check.status === "member") {
				return res.status(400).json({
					message: "User is already an attendee of the event",
					statusCode: 400,
				});
			}
		}

		// if not added, create new attendance
		let attend = await Attendance.create(
			{
				userId: user.id,
				eventId,
			},
			{ where: { eventId, userId: user.id } }
		);

		return res.json({
			userId: user.id,
			status: attend.status,
		});
	}
);

// Add an Image to a Event based on the Event's id
// post - /api/events/:eventId/images
router.post("/:eventId/images", valid_event, requireAuth, async (req, res) => {
	let eventId = req.params.eventId;
	let { url, preview } = req.body;

	let { user } = req;

	console.log(`------`);
	console.log(url, preview);

	// check if venue already exists
	let check = await EventImage.findOne({
		where: { eventId, url, preview },
	});
	if (check) {
		return res.json({
			id: check.id,
			url,
			preview,
		});
	}

	// add img to eventimages table
	let newimage = await EventImage.create({
		eventId,
		url,
		preview,
	});

	return res.json({
		id: newimage.id,
		url,
		preview,
	});
});

//----------------put-------------------------

// Change the status of an attendance for an event specified by id
// post - /api/events/:eventId/attendance
router.put(
	"/:eventId/attendance",
	valid_event,
	valid_user,
	requireAuth,
	valid_attend,
	async (req, res) => {
		let eventId = req.params.eventId;
		let { userId, status } = req.body;

		// if changing status to pending
		if (status === "pending") {
			return res.status(400).json({
				message: "Cannot change an attendance status to pending",
				statusCode: 400,
			});
		}

		let attend = await Attendance.update(
			{
				status,
			},
			{ where: { userId, eventId } }
		);

		return res.json({
			id: attend.id,
			eventId,
			userId,
			status,
		});
	}
);

// Edit an Event specified by its id
// put - /api/events/:eventId
router.put(
	"/:eventId",
	valid_event,
	requireAuth,
	valid_user,
	async (req, res) => {
		let id = req.params.eventId;

		let {
			venueId,
			venue,
			name,
			type,
			capacity,
			price,
			description,
			startDate,
			endDate,
			groupId,
			image,
		} = req.body;

		let defaultImage = await EventImage.findOne({
			where: {
				eventId: id,
				url: image.url,
			},
		});

		//deal with event img
		let previewer = false;
		let { url, preview } = image;

		let options = {
			message: "Validation Error",
			statusCode: 400,
			errors: {},
		};

		if (!venueId && !venue) options.errors.venueId = `Venue does not exist`;
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
		if (defaultImage) options.errors.image = `Image already exists`;

		if (Object.values(options.errors).length > 0) {
			return res.status(400).json(options);
		} else {
			let editVenue = { id: venueId };

			if (!venueId) {
				editVenue = await Venue.create({
					groupId,
					address: venue.address,
					city: venue.city,
					state: venue.state,
					lat: 100,
					lng: 100,
				});
			}

			if (
				venueId !== 1 &&
				((venueId && venue.city) ||
					(venueId && venue.address) ||
					(venueId && venue.state))
			) {
				editVenue = await Venue.update(
					{
						address: venue.address,
						city: venue.city,
						state: venue.state,
					},
					{ where: { id: venueId } }
				);
			}

			//check add image
			//event images add and change defaults
			if (preview && url) {
				await EventImage.update(
					{ preview: false },
					{
						where: { eventId: id, preview: true },
					}
				);
				previewer = true;
			}
			if (url) {
				await EventImage.create({
					url,
					preview: previewer,
					eventId: id,
				});
			}

			await Event.update(
				{
					venueId: editVenue.id,
					name,
					type,
					capacity,
					price,
					description,
					startDate,
					endDate,
				},
				{ where: { id } }
			);

			let event = await Event.findByPk(id);

			return res.json(event);
		}
	}
);

//----------------delete-------------------------

// Delete attendance to an event specified by id
// delete - /api/events/:eventId/attendance
router.delete(
	"/:eventId/attendance",
	valid_delete_attend,
	valid_event,
	valid_attend,
	requireAuth,
	async (req, res, next) => {
		let eventId = req.params.eventId;
		let { userId } = req.body;
		let deleted = await Attendance.findOne({
			where: { eventId, userId },
		});

		if (!deleted) {
			return res.status(404).json({
				message: "Attendance does not exist for this User",
				statusCode: 404,
			});
		}

		await deleted.destroy();
		return res.json({
			userId,
			message: "Successfully deleted attendance from event",
		});
	}
);

// Delete an Event specified by its id
// delete - /api/events/:eventId
router.delete("/:eventId", valid_event, requireAuth, async (req, res) => {
	//valid_user
	const { user } = req;
	const eventId = req.params.eventId;
	let event = await Event.findByPk(eventId);

	//check if current user is either organizer or cohost
	let group = await Group.findAll({
		where: { id: event.groupId, organizerId: user.id },
	});

	//organizer - find group by groupid, check organizerId in groups t
	//cohost = find current users id and find the status of membership, check status in membership t
	let member = await Membership.findAll({
		where: { status: "co-host", userId: user.id, groupId: event.groupId },
	});

	if (member.length < 1 && group.length < 1) {
		const err = new Error(
			`Current User must be the organizer of the group or a member of the group with a status of co-host`
		);
		err.statusCode = 403;
		throw err;
	} else {
		await event.destroy();

		return res.json({
			eventId,
			message: "Successfully deleted",
		});
	}
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
