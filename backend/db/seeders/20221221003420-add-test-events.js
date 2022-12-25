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
					description: `A lively stage adaptation of the Academy Award-winning 1994 Disney film, The Lion King is the story of a young lion prince living in the flourishing African Pride Lands.`,
					type: "In person",
					capacity: 600,
					price: 100,
					startDate: new Date(2023, 1, 15, 12, 10, 10),
					endDate: new Date(2023, 1, 15, 15, 10, 10),
				},
				{
					venueId: 2,
					groupId: 2,
					name: "Harry Potter and the Cursed Child",
					description: `Experience the wizarding world like never before from the moment you arrive.`,
					type: "In person",
					capacity: 550,
					price: 150,
					startDate: new Date(2023, 1, 10, 12, 10, 10),
					endDate: new Date(2023, 1, 10, 15, 10, 10),
				},
				{
					venueId: 2,
					groupId: 2,
					name: "Wicked",
					description: `Wicked, the Broadway sensation, looks at what happened in the Land of Oz…but from a different angle.`,
					type: "In person",
					capacity: 400,
					price: 80,
					startDate: new Date(2023, 2, 12, 12, 10, 10),
					endDate: new Date(2023, 2, 12, 15, 10, 10),
				},
				{
					venueId: 3,
					groupId: 3,
					name: "Start with Art at the Met.",
					description: `Fabulous museum educators engage children in conversations and activities related to a few works in the vast collection.`,
					type: "In person",
					capacity: 20,
					price: 50,
					startDate: new Date(2023, 2, 20, 10, 10, 10),
					endDate: new Date(2023, 2, 20, 14, 10, 10),
				},
				{
					venueId: 4,
					groupId: 3,
					name: "Year in Review with Neil deGrasse Tyson.",
					description: `The annual news roundup from the universe with Neil deGrasse Tyson is back, live and in person.Find out what is new in the cosmos.`,
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
					description: `The Best Bad Man. 1925. USA. Directed by John G. Blystone. Screenplay by Lillie Hayward, from a story by Max Brand. With Tom Mix, Clara Bow, Cyril Chadwick. Silent, with original music score by Ben Model.`,
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
					description: `Outlaws of Red River. 1927. USA. Directed by Lewis Seiler. With Tom Mix, Marjorie Daw, Arthur Clayton, William Conklin. Silent, with original music score by Ben Model.`,
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
					description: `Cavalcade. 1933. USA. Directed by Frank Lloyd. Screenplay by Reginald Berkeley, based on a play by Noël Coward. With Diana Wynyard, Clive Brook, Una OConnor, Herbert Mundin, Beryl Mercer. Digital restoration by Walt Disney Pictures in partnership with The Film Foundation.`,
					type: "Online",
					capacity: 100,
					price: 20,
					startDate: new Date(2023, 4, 3, 16, 10, 10),
					endDate: new Date(2023, 4, 3, 18, 10, 10),
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
					[Op.in]: [1, 2, 3, 4, 5, 6, 7, 8],
				},
			},
			{}
		);
	},
};
