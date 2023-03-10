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
		options.tableName = "Events";
		return queryInterface.bulkInsert(
			options,
			[
				{
					venueId: 2,
					groupId: 2,
					name: "Lion King",
					description: `A lively stage adaptation of the Academy Award-winning 1994 Disney film, The Lion King is the story of a young lion prince living in the flourishing African Pride Lands. There are 6 indigenous African languages
					sung and spoken throughout the show:
					Swahili, Zulu, Xhosa, Sotho, Tswana, Congolese`,
					type: "In person",
					capacity: 600,
					price: 100,
					startDate: new Date(2024, 1, 15, 12, 10, 10),
					endDate: new Date(2024, 1, 15, 15, 10, 10),
				},
				{
					venueId: 2,
					groupId: 2,
					name: "Harry Potter and the Cursed Child",
					description: `Experience the wizarding world like never before from the moment you arrive. Harry Potter and the Cursed Child is a play written by Jack Thorne, based on an original story written by J. K. Rowling, John Tiffany, and Thorne. The story takes place nineteen years after the events of Harry Potter and the Deathly Hallows.`,
					type: "In person",
					capacity: 550,
					price: 150,
					startDate: new Date(2023, 7, 10, 4, 10, 10),
					endDate: new Date(2023, 7, 10, 15, 10, 10),
				},
				{
					venueId: 2,
					groupId: 2,
					name: "Wicked",
					description: `Wicked, the Broadway sensation, looks at what happened in the Land of Oz…but from a different angle. Wicked is a 2003 musical with music and lyrics by Stephen Schwartz and book by Winnie Holzman. It is loosely based on the 1995 Gregory Maguire novel Wicked: The Life and Times of the Wicked Witch of the West, in turn based on L. Frank Baum's 1900 novel The Wonderful Wizard of Oz and its 1939 Metro-Goldwyn-Mayer film adaptation.`,
					type: "In person",
					capacity: 400,
					price: 80,
					startDate: new Date(2023, 11, 12, 12, 10, 10),
					endDate: new Date(2023, 11, 12, 15, 10, 10),
				},
				{
					venueId: 3,
					groupId: 3,
					name: "Start with Art at the Met.",
					description: `Fabulous museum educators engage children in conversations and activities related to a few works in the vast collection. Share ideas and enjoy stories, sketching, singing, and other gallery activities that bring works of art to life. (Also offered concurrently on Saturdays with Art Trek for families with children of multiple ages.) `,
					type: "In person",
					capacity: 20,
					price: 50,
					startDate: new Date(2023, 4, 20, 10, 10, 10),
					endDate: new Date(2023, 4, 20, 14, 10, 10),
				},
				{
					venueId: 4,
					groupId: 3,
					name: "Year in Review with Neil deGrasse Tyson.",
					description: `The annual news roundup from the universe with Neil deGrasse Tyson is back, live and in person.`,
					type: "In person",
					capacity: 15,
					price: 30,
					startDate: new Date(2023, 10, 3, 12, 10, 10),
					endDate: new Date(2023, 10, 3, 14, 10, 10),
				},
				{
					venueId: 5,
					groupId: 3,
					name: "The Best Bad Man (1925)",
					description: `The Best Bad Man. 1925. USA. Directed by John G. Blystone. Screenplay by Lillie Hayward, from a story by Max Brand. With Tom Mix, Clara Bow, Cyril Chadwick.`,
					type: "In person",
					capacity: 30,
					price: 60,
					startDate: new Date(2023, 9, 3, 12, 10, 10),
					endDate: new Date(2023, 9, 3, 14, 10, 10),
				},
				{
					venueId: 5,
					groupId: 3,
					name: "Outlaws of Red River (1927)",
					description: `Outlaws of Red River. 1927. USA. Directed by Lewis Seiler. With Tom Mix, Marjorie Daw, Arthur Clayton, William Conklin.`,
					type: "In person",
					capacity: 15,
					price: 15,
					startDate: new Date(2023, 7, 3, 12, 10, 10),
					endDate: new Date(2023, 7, 3, 14, 10, 10),
				},
				{
					venueId: 1,
					groupId: 3,
					name: "Cavalcade (1933)",
					description: `Cavalcade. 1933. USA. Directed by Frank Lloyd. Screenplay by Reginald Berkeley, based on a play by Noël Coward. With Diana Wynyard, Clive Brook, Una OConnor, Herbert Mundin, Beryl Mercer.`,
					type: "Online",
					capacity: 100,
					price: 20,
					startDate: new Date(2023, 8, 3, 16, 10, 10),
					endDate: new Date(2023, 8, 3, 18, 10, 10),
				},
				{
					venueId: 2,
					groupId: 1,
					name: "International Conference on Extreme Tourism ICET",
					description: `Extreme tourism
					Dangerous places
					Extreme tourism hospitality and management
					Sustainable extreme tourism
					Mountains, jungles, deserts, caves, canyons
					Dangerous events
					Extreme sports and adrenaline rush
					Trekking, hiking, via ferrata
					Canyoning, river trekking
					Paragliding, bungee jumping, skydiving, base jumping
					Canoeing, rafting, scuba diving, snorkeling, boating
					Mountaineering, skiing, snowboarding, speed riding
					Storm chasing`,
					type: "Online",
					capacity: 20,
					price: 10,
					startDate: new Date(2024, 6, 3, 21, 10, 10),
					endDate: new Date(2024, 6, 4, 22, 10, 10),
				},
				{
					venueId: 7,
					groupId: 4,
					name: "Cars & Croissants",
					description: `Join the fun on Father's Day and enjoy a morning in Downtown Summit
					Hundreds of cars and car enthusiasts from all over the region
					Bring the family and also visit the Summit Farmers Market
					Event is canceled in the event of inclement weather`,
					type: "In person",
					capacity: 200,
					price: 143,
					startDate: new Date(2023, 6, 23, 8, 0, 0),
					endDate: new Date(2023, 6, 4, 11, 0, 0),
				},
				{
					venueId: 8,
					groupId: 5,
					name: "lil Dove Cafe",
					description: `Join us in lil' dove cafe for a Galentine's inspired floral arrangement making class just in time for the holiday. Class will be lead by Meghan of Made of Leaves (@madeofleaves) and we will offer a complimentary glass of wine and light snacks. Ticket includes all materials needed for the event.`,
					type: "In person",
					capacity: 35,
					price: 34,
					startDate: new Date(2023, 4, 23, 9, 0, 0),
					endDate: new Date(2023, 4, 23, 13, 0, 0),
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		options.tableName = "Events";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{
				id: {
					[Op.gte]: 1,
				},
			},
			{}
		);
	},
};
