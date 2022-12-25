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
					GroupId: 1,
					address: "Online",
					city: `N/A`,
					state: `N/A`,
					lat: 0,
					lng: 0,
				},
				{
					GroupId: 2,
					address: "1681 Broadway",
					city: "New York City",
					state: "NY",
					lat: 120.234,
					lng: 101.126,
				},
				{
					GroupId: 3,
					address: "1000 5th Ave",
					city: "New York City",
					state: "NY",
					lat: 427.232,
					lng: 946.182,
				},
				{
					GroupId: 3,
					address: "200 Central Park West",
					city: "New York City",
					state: "NY",
					lat: 104.956,
					lng: 537.654,
				},
				{
					GroupId: 3,
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
