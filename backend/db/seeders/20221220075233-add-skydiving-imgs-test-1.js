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
					url: "https://skydivemonroe.com/wp-content/uploads/3-Way-Formation-Skydive.jpg",
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
					groupId: "2",
					url: "https://i0.wp.com/mytheatreweekend.com/wp-content/uploads/2018/06/LyricTheatreBroadway-1350x900.jpeg?fit=1350%2C900&ssl=1",
					preview: true,
				},
				{
					groupId: "3",
					url: "../../upload/group3/image-1.jpg",
					preview: false,
				},
				{
					groupId: "3",
					url: "https://thedali.org/wp-content/uploads/2020/08/1200x500-James-Family-Wing-Groups.jpg",
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
