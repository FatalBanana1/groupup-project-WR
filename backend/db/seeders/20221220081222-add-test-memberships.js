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
					status: "co-host",
				},
				{
					userId: 1,
					groupId: 2,
					status: "co-host",
				},
				{
					userId: 2,
					groupId: 1,
					status: "member",
				},
				{
					userId: 2,
					groupId: 2,
					status: "member",
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
					userId: 5,
					groupId: 1,
					status: "member",
				},
				{
					userId: 5,
					groupId: 2,
					status: "member",
				},
				{
					userId: 5,
					groupId: 3,
					status: "member",
				},
				{
					userId: 6,
					groupId: 2,
					status: "member",
				},
				{
					userId: 7,
					groupId: 1,
					status: "member",
				},
				{
					userId: 3,
					groupId: 1,
					status: "member",
				},
				{
					userId: 4,
					groupId: 1,
					status: "member",
				},
				{
					userId: 4,
					groupId: 2,
					status: "member",
				},
				{
					userId: 4,
					groupId: 6,
					status: "pending",
				},
				{
					userId: 7,
					groupId: 3,
					status: "member",
				},
				{
					userId: 7,
					groupId: 2,
					status: "co-host",
				},
				{
					userId: 6,
					groupId: 1,
					status: "co-host",
				},
				{
					userId: 1,
					groupId: 4,
					status: "co-host",
				},
				{
					userId: 1,
					groupId: 5,
					status: "co-host",
				},
				{
					userId: 1,
					groupId: 6,
					status: "co-host",
				},
				{
					userId: 2,
					groupId: 4,
					status: "member",
				},
				{
					userId: 2,
					groupId: 3,
					status: "member",
				},
				{
					userId: 2,
					groupId: 5,
					status: "member",
				},
				{
					userId: 2,
					groupId: 6,
					status: "member",
				},
				{
					userId: 2,
					groupId: 7,
					status: "member",
				},
				{
					userId: 2,
					groupId: 8,
					status: "member",
				},
				{
					userId: 2,
					groupId: 9,
					status: "member",
				},
				{
					userId: 2,
					groupId: 10,
					status: "member",
				},
				{
					userId: 2,
					groupId: 11,
					status: "member",
				},
				{
					userId: 2,
					groupId: 12,
					status: "member",
				},
				{
					userId: 2,
					groupId: 13,
					status: "member",
				},
				{
					userId: 2,
					groupId: 14,
					status: "member",
				},
				{
					userId: 1,
					groupId: 7,
					status: "co-host",
				},
				{
					userId: 1,
					groupId: 8,
					status: "co-host",
				},
				{
					userId: 1,
					groupId: 9,
					status: "co-host",
				},
				{
					userId: 1,
					groupId: 10,
					status: "co-host",
				},
				{
					userId: 1,
					groupId: 11,
					status: "co-host",
				},
				{
					userId: 1,
					groupId: 12,
					status: "co-host",
				},
				{
					userId: 1,
					groupId: 13,
					status: "co-host",
				},
				{
					userId: 1,
					groupId: 14,
					status: "co-host",
				},
				{
					userId: 8,
					groupId: 7,
					status: "member",
				},
				{
					userId: 8,
					groupId: 3,
					status: "member",
				},
				{
					userId: 8,
					groupId: 9,
					status: "member",
				},
				{
					userId: 8,
					groupId: 10,
					status: "member",
				},
				{
					userId: 8,
					groupId: 11,
					status: "member",
				},
				{
					userId: 8,
					groupId: 12,
					status: "member",
				},
				{
					userId: 8,
					groupId: 13,
					status: "member",
				},
				{
					userId: 8,
					groupId: 14,
					status: "co-host",
				},
				{
					userId: 8,
					groupId: 1,
					status: "member",
				},
				{
					userId: 8,
					groupId: 2,
					status: "member",
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
					[Op.gte]: 0,
				},
			},
			{}
		);
	},
};
