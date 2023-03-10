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
					eventId: 1,
					userId: 1,
					status: "attending",
				},
				{
					eventId: 2,
					userId: 1,
					status: "attending",
				},
				{
					eventId: 3,
					userId: 1,
					status: "attending",
				},
				{
					eventId: 4,
					userId: 1,
					status: "attending",
				},
				{
					eventId: 5,
					userId: 1,
					status: "attending",
				},
				{
					eventId: 6,
					userId: 1,
					status: "attending",
				},
				{
					eventId: 7,
					userId: 1,
					status: "attending",
				},
				{
					eventId: 8,
					userId: 1,
					status: "attending",
				},
				{
					eventId: 9,
					userId: 1,
					status: "attending",
				},
				{
					eventId: 10,
					userId: 1,
					status: "attending",
				},
				{
					eventId: 11,
					userId: 1,
					status: "attending",
				},
				{
					eventId: 1,
					userId: 2,
					status: "attending",
				},
				{
					eventId: 2,
					userId: 2,
					status: "attending",
				},
				{
					eventId: 3,
					userId: 2,
					status: "attending",
				},
				{
					eventId: 4,
					userId: 2,
					status: "attending",
				},
				{
					eventId: 5,
					userId: 2,
					status: "attending",
				},
				{
					eventId: 6,
					userId: 2,
					status: "attending",
				},
				{
					eventId: 7,
					userId: 2,
					status: "attending",
				},
				{
					eventId: 8,
					userId: 2,
					status: "attending",
				},
				{
					eventId: 9,
					userId: 2,
					status: "attending",
				},
				{
					eventId: 10,
					userId: 2,
					status: "attending",
				},
				{
					eventId: 11,
					userId: 2,
					status: "attending",
				},
				{
					eventId: 1,
					userId: 3,
					status: "waitlist",
				},
				{
					eventId: 2,
					userId: 3,
					status: "waitlist",
				},
				{
					eventId: 3,
					userId: 3,
					status: "waitlist",
				},
				{
					eventId: 4,
					userId: 3,
					status: "waitlist",
				},
				{
					eventId: 5,
					userId: 3,
					status: "waitlist",
				},
				{
					eventId: 6,
					userId: 3,
					status: "waitlist",
				},
				{
					eventId: 7,
					userId: 3,
					status: "waitlist",
				},
				{
					eventId: 8,
					userId: 3,
					status: "waitlist",
				},
				{
					eventId: 9,
					userId: 3,
					status: "waitlist",
				},
				{
					eventId: 10,
					userId: 3,
					status: "waitlist",
				},
				{
					eventId: 11,
					userId: 3,
					status: "waitlist",
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
					[Op.lte]: 16,
				},
			},
			{}
		);
	},
};
