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
router.get(
	"/:eventId/attendees",
	requireAuth,
	valid_event,
	async (req, res) => {
		let eventId = req.params.eventId;

		const { user } = req;
		let auth = await Membership.findOne({
			where: { userId: user.id },
			include: [
				{
					model: Group,
				},
			],
		});
		let users;
		let attends;

		if (
			user.id &&
			(auth.status === "co-host" || auth.Group.organizerId === user.id)
		) {
			users = await User.scope(["defaultScope"]).findAll({
				attributes: ["id", "firstName", "lastName"],
				include: [
					{
						model: Attendance,
						where: {
							eventId,
						},
						attributes: [],
					},
				],
			});

			attends = await Attendance.findAll({
				where: {
					eventId,
				},
				attributes: ["status"],
			});
		} else {
			users = await User.scope(["defaultScope"]).findAll({
				attributes: ["id", "firstName", "lastName"],
				include: [
					{
						model: Attendance,
						where: {
							eventId,
							status: { [Op.or]: ["waitlist", "member"] },
						},
						attributes: [],
					},
				],
			});

			attends = await Attendance.findAll({
				where: {
					eventId,
					status: { [Op.or]: ["waitlist", "member"] },
				},
				attributes: ["status"],
			});
		}

		users.forEach((el, i) => {
			el.dataValues.Attendance = attends[i];
		});
		return res.json({ Attendees: users });
	}
);

// Get details of an Event specified by its id
// get - api/events/:eventId
router.get("/:eventId", valid_event, async (req, res) => {
	let eventId = req.params.eventId;

	let event = await Event.findByPk(eventId, {
		include: [
			{
				model: Group,
				attributes: ["id", "name", "private", "city", "state"],
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

	return res.json(event);
});

//TODO: add numattending + previewimage attrs
//		--add venues t
// events - get all events
// get - /events
router.get("/", async (req, res) => {
	//pagination

	let events = await Event.scope(["defaultScope"]).findAll({
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
	});

	return res.json({ Events: events });
});

//----------------post-------------------------

// Request to Attend an Event based on the Event's id
// post - /api/events/:eventId/attendance
router.post(
	"/:eventId/attendance",
	valid_event,
	requireAuth,
	valid_member,
	async (req, res) => {
		let eventId = req.params.eventId;
		let { user } = req;

		// check if attendance exists = if yes dont add
		let check = await Attendance.findOne({
			where: { eventId, userId: user.id },
		});
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
router.post("/:eventId/images", valid_event, async (req, res) => {
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
	valid_venue,
	requireAuth,
	valid_user,
	async (req, res) => {
		let id = req.params.eventId;

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
				where: {
					venueId,
					name,
					type,
					capacity,
					price,
					description,
					startDate,
					endDate,
				},
			});
			if (check) {
				return res.status(400).json({
					message: "Validation Error",
					statusCode: 400,
					errors: {
						Error: `Event has already been updated.`,
					},
				});
			}

			await Event.update(
				{
					venueId,
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

		await deleted.destroy();
		return res.json({
			message: "Successfully deleted attendance from event",
		});
	}
);

// Delete an Event specified by its id
// delete - /api/events/:eventId
router.delete(
	"/:eventId",
	valid_user,
	valid_event,
	requireAuth,
	async (req, res) => {
		let eventId = req.params.eventId;

		let event = await Event.findByPk(eventId);

		await event.destroy();

		return res.json({
			message: "Successfully deleted",
		});
	}
);

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