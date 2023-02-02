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
				// 	preview: false,
				// },
				{
					eventId: 1,
					url: "https://thesmithcenter.com/media/xmrg2mrb/lion-king-for-blog.png",
					preview: false,
				},
				{
					eventId: 1,
					url: "https://www.gannett-cdn.com/presto/2020/01/24/PMJS/3a7376b8-289e-43b9-86ca-531aa646f2bb-2Brandon_A._McCall_and_Kayla_Cyphers._Disney._Photo_by_Deen_van_Meer.jpg",
					preview: false,
				},
				{
					eventId: 1,
					url: "http://www.twincities.com/wp-content/uploads/2016/06/lionking-aaron-nelson-simba-c2a9disney-photo-by-matthew-murphy_.jpg",
					preview: false,
				},
				{
					eventId: 1,
					url: "https://bloximages.newyork1.vip.townnews.com/postandcourier.com/content/tncms/assets/v3/editorial/0/66/066bb674-9e4f-11ec-a3ae-3b2215e564a3/622660a6e3840.image.jpg?resize=1200%2C801",
					preview: false,
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
