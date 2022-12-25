"use strict";

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcryptjs");
let options = {};

if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA;
}

// join 1-many: group-groupimages

module.exports = {
	up: async (queryInterface, Sequelize) => {
		options.tableName = "Memberships";
		return queryInterface.bulkInsert(
			options,
			[
				{
					userId: 1,
					groupId: 1,
					status: "co-host",
				},
				{
					userId: 1,
					groupId: 3,
					status: "member",
				},
				{
					userId: 2,
					groupId: 1,
					status: "member",
				},
				{
					userId: 2,
					groupId: 2,
					status: "pending",
				},
				{
					userId: 3,
					groupId: 2,
					status: "co-host",
				},
				{
					userId: 3,
					groupId: 3,
					status: "co-host",
				},
				{
					userId: 4,
					groupId: 1,
					status: "member",
				},
				{
					userId: 5,
					groupId: 1,
					status: "pending",
				},
				{
					userId: 5,
					groupId: 2,
					status: "pending",
				},
				{
					userId: 5,
					groupId: 3,
					status: "pending",
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		options.tableName = "Memberships";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{
				id: {
					[Op.in]: [1, 2, 3],
				},
			},
			{}
		);
	},
};
