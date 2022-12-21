"use strict";

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcryptjs");
let options = {};

if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA;
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		options.tableName = "Venues";
		return queryInterface.bulkInsert(
			options,
			[
				{
					groupId: 1,
					address: null,
					city: null,
					state: null,
					lat: null,
					lng: null,
				},
				{
					groupId: 2,
					address: "1681 Broadway",
					city: "New York City",
					state: "NY",
					lat: 120.234,
					lng: 101.126,
				},
				{
					groupId: 3,
					address: "1000 5th Ave",
					city: "New York City",
					state: "NY",
					lat: 427.232,
					lng: 946.182,
				},
				{
					groupId: 3,
					address: "200 Central Park West",
					city: "New York City",
					state: "NY",
					lat: 104.956,
					lng: 537.654,
				},
				{
					groupId: 3,
					address: "11 W 53rd St",
					city: "New York City",
					state: "NY",
					lat: 662.39,
					lng: 413.296,
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		options.tableName = "Venues";
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
