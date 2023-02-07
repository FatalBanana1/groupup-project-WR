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
	const id = req.params.venueId;
	const info = await Venue.findByPk(id);
	if (!info) {
		const err = new Error("Venue couldn't be found");
		err.statusCode = 404;
		throw err;
	}
	next();
};

const valid_user = async (req, res, next) => {
	const { user } = req;
	const venueId = req.params.venueId;

	//editing event
	// check for event by eventid
	let venue = await Venue.findByPk(venueId);

	//check if current user is either organizer or cohost
	let group = await Group.findAll({
		where: { id: venue.groupId, organizerId: user.id },
	});

	//organizer - find group by groupid, check organizerId in groups t
	//cohost = find current users id and find the status of membership, check status in membership t
	let member = await Membership.findAll({
		where: { status: "co-host", userId: user.id, groupId: venue.groupId },
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

//----------------put-------------------------

// Edit a Venue specified by its id
// put - /api/venues/:venueId
router.put(
	"/:venueId",
	valid_venue,
	valid_user,
	requireAuth,
	async (req, res) => {
		let venueId = req.params.venueId;
		let { address, city, state, lat, lng } = req.body;
		let venue = await Venue.findByPk(venueId);

		//error handle
		let options = {
			message: "Validation Error",
			statusCode: 400,
			errors: {},
		};

		if (!address || address.length < 4)
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
		}

		await venue.update({
			address,
			city,
			state,
			lat,
			lng,
		});

		return res.json({
			id: venue.id,
			groupId: venue.groupId,
			address,
			city,
			state,
			lat,
			lng,
		});
	}
);

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
