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
					eventId: 6,
					url: "https://m.media-amazon.com/images/M/MV5BZjU4NDg5ZjEtNDc1MC00NmJmLWI4MTItNWNjYWFlZjQ0ZDVlXkEyXkFqcGdeQXVyMjUxODE0MDY@._V1_.jpg",
					preview: true,
				},
				{
					eventId: 1,
					url: "https://media.timeout.com/images/100618517/image.jpg",
					preview: true,
				},
				{
					eventId: 3,
					url: "https://s1.ticketm.net/dam/a/881/dd224eeb-5c9b-4340-bdbf-57351bf04881_1734241_TABLET_LANDSCAPE_LARGE_16_9.jpg",
					preview: true,
				},
				{
					eventId: 2,
					url: "https://media.timeout.com/images/105313595/image.jpg",
					preview: true,
				},
				{
					eventId: 4,
					url: "https://media.cntraveler.com/photos/55d362f337284fb1079ccc4b/16:9/w_2560%2Cc_limit/metropolitan-museum-of-art-new-york-city.jpg",
					preview: true,
				},
				{
					eventId: 5,
					url: "https://i.insider.com/571913d1dd08950a218b47ac?width=1000&format=jpeg&auto=webp",
					preview: true,
				},
				{
					eventId: 7,
					url: "https://m.media-amazon.com/images/M/MV5BODhkMDhhN2MtNjU0Ny00MTQwLWI3NzQtNWNjMjQ3YTE4ZGZhXkEyXkFqcGdeQXVyNjg2Mjk2MDg@._V1_.jpg",
					preview: true,
				},
				{
					eventId: 8,
					url: "https://upload.wikimedia.org/wikipedia/en/3/3f/Cavalcade_film_poster.jpg",
					preview: true,
				},
				// {
				// 	eventId: 4,
				// 	url: "",
				// 	preview: true,
				// },
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
