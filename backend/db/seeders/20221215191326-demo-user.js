"use strict";

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcryptjs");

let options = {};

if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA;
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		options.tableName = "Users";
		return queryInterface.bulkInsert(
			options,
			[
				{
					email: "h20@gmail.com",
					username: "heisenberg",
					hashedPassword: bcrypt.hashSync("password"),
					firstName: "Walter",
					lastName: "White",
				},

				{
					email: "billyb1@gmail.com",
					username: "baggins",
					hashedPassword: bcrypt.hashSync("password2"),
					firstName: "Bilbo",
					lastName: "Baggins",
				},

				{
					email: "rocks@yahoo.com",
					username: "stardazed",
					hashedPassword: bcrypt.hashSync("password3"),
					firstName: "Patrick",
					lastName: "Star",
				},

				{
					email: "british@gmail.com",
					username: "thebaby",
					hashedPassword: bcrypt.hashSync("password4"),
					firstName: "Stewie",
					lastName: "Griffin",
				},

				{
					firstName: "Al",
					lastName: "Gore",
					email: "globalwarming@aol.com",
					username: "goremania",
					hashedPassword: bcrypt.hashSync("password5"),
				},

				{
					firstName: "Hulk",
					lastName: "Hogan",
					email: "hulkamania@wwe.com",
					username: "hulkamania",
					hashedPassword: bcrypt.hashSync("password6"),
				},

				{
					email: "rr0100@user.io",
					username: "rrspeed",
					hashedPassword: bcrypt.hashSync("password7"),
					firstName: "Roger",
					lastName: "Rabbit",
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		options.tableName = "Users";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{
				username: {
					[Op.in]: [
						"heisenberg",
						"rrspeed",
						"baggins",
						"stardazed",
						"thebaby",
						"goremania",
						"hulkamania",
					],
				},
			},
			{}
		);
	},
};
