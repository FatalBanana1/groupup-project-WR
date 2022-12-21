"use strict";

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcryptjs");
let options = {};

if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA;
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		options.tableName = "EventImages";
		return queryInterface.bulkInsert(
			options,
			[
				{
					eventId: "6",
					url: "../../upload/moma/bigMuseum.jpg",
					preview: true,
				},
				{
					eventId: "6",
					url: "../../upload/moma/momawinter.jpg",
					preview: false,
				},
				{
					eventId: "7",
					url: "../../upload/moma/momafest.jpg",
					preview: true,
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		options.tableName = "EventImages";
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
