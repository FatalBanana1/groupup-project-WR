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
					address: "Online",
					city: `N/A`,
					state: `N/A`,
					lat: 0,
					lng: 0,
				},
				{
					groupId: 1,
					address: "39th St",
					city: `New York City`,
					state: `NY`,
					lat: 237.69,
					lng: 359.6,
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
				{
					groupId: 4,
					address: "356 Springfield Ave",
					city: "Summit",
					state: "NJ",
					lat: 122.39,
					lng: 313.296,
				},
				{
					groupId: 5,
					address: " 589 Palisade Ave",
					city: "Springfield",
					state: "NJ",
					lat: 552.39,
					lng: 310.296,
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
					[Op.in]: [1, 2, 3, 4, 5],
				},
			},
			{}
		);
	},
};
