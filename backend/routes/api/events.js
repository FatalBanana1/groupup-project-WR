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
		where: { status: "co-host", userId: user.id },
	});

	if (member.length < 1 && group.length < 1) {
		const err = new Error(
			`Current User must be the organizer of the group or a member of the group with a status of "co-host"`
		);
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

	let users = await User.scope(["defaultScope"]).findAll({
		attributes: ["id", "firstName", "lastName"],
		include: {
			model: Attendance,
			as: "Attendance",
			where: { eventId },
			attributes: ["status"],
		},
	});
	users.forEach((el, i) => {
		el.dataValues.Attendance = el.dataValues.Attendance[0];
		return el;
	});
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

// Delete an Event specified by its id
// delete - /api/events/:eventId
router.delete(
	"/:eventId",
	valid_event,
	valid_user,
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
	res.status(err.status || 500);
	console.error(err);
	res.json({
		message: err.message,
		statusCode: err.statusCode,
	});
});

// exports
module.exports = router;
