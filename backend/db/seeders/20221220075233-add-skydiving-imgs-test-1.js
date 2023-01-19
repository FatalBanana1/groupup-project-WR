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
					url: "https://www.skydivetwincities.com/index_htm_files/54523@2x.jpg",
					preview: false,
				},
				{
					groupId: "1",
					url: "https://www.thrillophilia.com/blog/wp-content/uploads/2017/05/Cornwall-skydiving-1024x577.jpg",
					preview: false,
				},
				{
					groupId: "2",
					url: "https://i0.wp.com/mytheatreweekend.com/wp-content/uploads/2018/06/LyricTheatreBroadway-1350x900.jpeg?fit=1350%2C900&ssl=1",
					preview: true,
				},
				{
					groupId: "2",
					url: "https://static.wixstatic.com/media/cb8960_e141cd6df2c64a8d9e33789a240791a0~mv2.jpg/v1/fill/w_748,h_438,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/cb8960_e141cd6df2c64a8d9e33789a240791a0~mv2.jpg",
					preview: false,
				},
				{
					groupId: "2",
					url: "https://www.nycgo.com/images/events/7054/bmn_offbroadway_3000x2000_1-2__large.jpg",
					preview: false,
				},
				{
					groupId: "3",
					url: "https://images.pexels.com/photos/3282515/pexels-photo-3282515.jpeg",
					preview: false,
				},
				{
					groupId: "3",
					url: "https://images.pexels.com/photos/9153531/pexels-photo-9153531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
					preview: false,
				},
				{
					groupId: "3",
					url: "https://images.pexels.com/photos/700413/pexels-photo-700413.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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
