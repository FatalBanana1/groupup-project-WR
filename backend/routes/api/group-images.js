// routes > api > Group Images

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

const valid_groupImage = async (req, res, next) => {
	const id = req.params.imageId;
	const info = await GroupImage.findByPk(id);
	if (!info) {
		const err = new Error("Group Image couldn't be found");
		err.statusCode = 404;
		throw err;
	}
	next();
};

const valid_user = async (req, res, next) => {
	const { user } = req;
	const imageId = req.params.imageId;

	let image = await GroupImage.findByPk(imageId);
	//check if current user is either organizer or cohost
	let group = await Group.findAll({
		where: { id: image.groupId, organizerId: user.id },
	});

	//organizer - find group by groupid, check organizerId in groups t
	//cohost = find current users id and find the status of membership, check status in membership t
	let member = await Membership.findAll({
		where: { status: "co-host", userId: user.id, groupId: image.groupId },
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
	const groupId = req.params.groupId;

	let group = await Group.findAll({
		where: { id: groupId, organizerId: user.id },
	});
	let member = await Membership.findAll({
		where: {
			status: { [Op.or]: ["co-host", "member"] },
			userId: user.id,
			groupId,
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

//-----------------delete----------------------

// Delete an Image for a Group
// delete - /api/group-images/:imageId
router.delete(
	"/:imageId",
	valid_groupImage,
	valid_user,
	requireAuth,
	async (req, res) => {
		let imageId = req.params.imageId;

		let image = await GroupImage.findOne({
			where: { id: imageId },
		});

		await image.destroy();

		return res.json({
			message: "Successfully deleted",
			statusCode: 200,
		});
	}
);

//----------------error handling-------------------------

router.use((err, _req, res, _next) => {
	res.status(err.statusCode || 500);
	console.error(err);
	res.json({
		errors: [err.message],
		statusCode: err.statusCode,
	});
});

// exports
module.exports = router;
