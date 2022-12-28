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
					eventId: "6",
					url: "../../upload/moma/momafest.jpg",
					preview: false,
				},
				{
					eventId: "1",
					url: "../../upload/1/image-1.jpg",
					preview: false,
				},
				{
					eventId: "2",
					url: "../../upload/2/image-2.jpg",
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
					[Op.in]: [1, 2, 3, 4, 5],
				},
			},
			{}
		);
	},
};
