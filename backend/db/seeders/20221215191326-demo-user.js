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
					avatar: "https://www.sosyncd.com/wp-content/uploads/2022/06/139.png",
				},
				{
					email: "kramer@user.io",
					username: "kramer",
					hashedPassword: bcrypt.hashSync("password2"),
					firstName: "Cosmo",
					lastName: "Kramer",
					avatar: "https://thenexus.one/storage/2022/05/Kramer-Seinfeld-How-Afford-Apartment.jpg",
				},

				{
					email: "rocks@yahoo.com",
					username: "stardazed",
					hashedPassword: bcrypt.hashSync("password3"),
					firstName: "Patrick",
					lastName: "Star",
					avatar: "https://i.pinimg.com/736x/55/0c/fe/550cfee9bad61f60c124d5ee340dbdb5.jpg",
				},

				{
					email: "british@gmail.com",
					username: "thebaby",
					hashedPassword: bcrypt.hashSync("password4"),
					firstName: "Stewie",
					lastName: "Griffin",
					avatar: "https://static1.personality-database.com/profile_images/e3fd4b52eeb84065943f77e7de75f374.png",
				},

				{
					firstName: "Al",
					lastName: "Gore",
					email: "globalwarming@aol.com",
					username: "goremania",
					hashedPassword: bcrypt.hashSync("password5"),
					avatar: "https://media.wired.com/photos/5c9cdd00d4c40803eec4451a/2:1/w_2000,h_1000,c_limit/Backchannel-AL-Gore-h_00000220423456.jpg",
				},

				{
					firstName: "Hulk",
					lastName: "Hogan",
					email: "hulkamania@wwe.com",
					username: "hulkamania",
					hashedPassword: bcrypt.hashSync("password6"),
					avatar: "https://static1.straitstimes.com.sg/s3fs-public/styles/large30x20/public/articles/2023/01/31/achogan310123_2.jpg?VersionId=UmIj8HI7Poyq0xqxMTV7tKB6s43SDcyt",
				},

				{
					email: "rr0100@user.io",
					username: "rrspeed",
					hashedPassword: bcrypt.hashSync("password7"),
					firstName: "Roger",
					lastName: "Rabbit",
				},
				{
					email: "billyb1@gmail.com",
					username: "baggins",
					hashedPassword: bcrypt.hashSync("password8"),
					firstName: "Bilbo",
					lastName: "Baggins",
					avatar: "https://cdn.costumewall.com/wp-content/uploads/2018/10/bilbo-baggins.jpg",
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
						"kramer",
					],
				},
			},
			{}
		);
	},
};
