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
		options.tableName = "GroupImages";
		return queryInterface.bulkInsert(
			options,
			[
				{
					groupId: "1",
					url: "../../upload/skydiving/1.jpg",
					preview: true,
				},
				{
					groupId: "1",
					url: "../../upload/skydiving/2.jpg",
					preview: false,
				},
				{
					groupId: "1",
					url: "../../upload/skydiving/3.jpg",
					preview: false,
				},
				{
					groupId: "3",
					url: "../../upload/group3/image-1.jpg",
					preview: false,
				},
				{
					groupId: "3",
					url: "../../upload/group3/image-2.jpg",
					preview: true,
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		options.tableName = "GroupImages";
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
