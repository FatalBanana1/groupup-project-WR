"use strict";

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcryptjs");
let options = {};

if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA;
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		options.tableName = "Attendances";
		return queryInterface.bulkInsert(
			options,
			[
				{
					eventId: 4,
					userId: 3,
					status: "member",
				},
				{
					eventId: 5,
					userId: 3,
					status: "member",
				},
				{
					eventId: 6,
					userId: 3,
					status: "member",
				},
				{
					eventId: 4,
					userId: 1,
					status: "member",
				},
				{
					eventId: 4,
					userId: 5,
					status: "pending",
				},
				{
					eventId: 1,
					userId: 5,
					status: "pending",
				},
				{
					eventId: 2,
					userId: 5,
					status: "pending",
				},
				{
					eventId: 4,
					userId: 2,
					status: "waitlisted",
				},
				{
					eventId: 4,
					userId: 4,
					status: "member",
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		options.tableName = "Attendances";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{
				id: {
					[Op.in]: [1, 2, 3, 4, 5, 6, 7, 8],
				},
			},
			{}
		);
	},
};
