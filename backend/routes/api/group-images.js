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
		let { groupId } = req.body;

		let image = await GroupImage.findOne({
			where: { id: imageId },
		});

		await image.destroy();

		let group = await Group.findOne({
			where: { id: groupId },
			include: [
				{
					model: GroupImage,
					attributes: [
						"id",
						"url",
						"preview",
						"createdAt",
						"updatedAt",
					],
				},
				{
					model: User,
					as: "Organizer",
					attributes: ["id", "firstName", "lastName", "avatar"],
				},
				{
					model: Venue,
					as: "Venues",
					attributes: [
						"id",
						"groupId",
						"city",
						"state",
						"lat",
						"lng",
					],
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
