"use strict";

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcryptjs");

let options = {};

if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA;
}

//todo: add previewimage prop
// join 1-many: group-groupimages
// join many-many: groups-users in memberships
// join 1-many: groups-venues
// join 1-many: groups-events

module.exports = {
	up: async (queryInterface, Sequelize) => {
		options.tableName = "Groups";
		return queryInterface.bulkInsert(
			options,
			[
				{
					organizerId: "1",
					name: "Skydiving Enthusiasts",
					about: "Experience the thrill of skydiving without any of the danger.",
					type: "In person",
					private: true,
					city: "Philadelphia",
					state: "PA",
				},
				{
					organizerId: "3",
					name: "Broadway Watchers",
					about: "Watching a Broadway show is an experience like no other, fun guaranteed.",
					type: "In person",
					private: true,
					city: "NYC",
					state: "NY",
				},
				{
					organizerId: "3",
					name: "Museum Explorers",
					about: "Come face to face with dinosaurs at the American Natural History Museum.",
					type: "In person",
					private: false,
					city: "NYC",
					state: "NY",
				},
				{
					organizerId: "1",
					name: "Classy Cars",
					about: "Defining the age of a classic car is more complex than you might imagine. The three classifications for older car models are classic, antique, and vintage, and the qualifiers for each type of car vary based on who or what organization you are talking to.",
					type: "Online",
					private: false,
					city: "NYC",
					state: "NY",
				},
				{
					organizerId: "1",
					name: "Coffee and Chill",
					about: "What we're about I thought meeting over coffee / tea would be a simple way to make new friends. Each month, we'll host an event at a coffee shop in the city and have a conversation over an interesting topic. Everyone will have an opportunity to share their thoughts and contribute to the discussion.",
					type: "In person",
					private: false,
					city: "NYC",
					state: "NY",
				},
				{
					organizerId: "1",
					name: "World History Enthusiasts",
					about: "We discuss history, ask many questions and give opinions.Whomever would love to learn about history or just a subject that interests them. Even though we have many professionals that come to present, most of the presentations are done by group members on volunteer bases about topics they are passionate about.",
					type: "Online",
					private: false,
					city: "NYC",
					state: "NY",
				},
				{
					organizerId: "1",
					name: "Progressive Gamers",
					about: "Looking for online gaming buddies, but tired of all the casual bigotry and toxicity you find in online games? Want to hang out with like-minded folks in a friendly atmosphere? If you'd like to help grow our community, feel free to drop by and apply!",
					type: "In person",
					private: false,
					city: "NYC",
					state: "NY",
				},
				{
					organizerId: "1",
					name: "NY Board Game Club",
					about: "Nyeek is a social get together for board game enthusiasts in the New York City area. If that sounds kind of geeky let me assure you that it absolutely is. We play all types of board games (abstract, party, thematic). Games that usually have simple rules, so they’re pretty accessible to newcomers.",
					type: "In person",
					private: true,
					city: "NYC",
					state: "NY",
				},
				{
					organizerId: "1",
					name: "Zumba Latina",
					about: "Welcome, Zumba and Spanish language Lovers! Do you want to dance to Latino music while you doing cardio and practicing Spanish? If so, this is the perfect event for you, we have an instructor from Colombia, who will make this event a lot of fun, RSVP NOW and bring water, we look forward to seeing you. The event is for all levels.",
					type: "In person",
					private: false,
					city: "NYC",
					state: "NY",
				},
				{
					organizerId: "1",
					name: "I Meditate",
					about: `A movement empowering New Yorkers to do more of the things they love by recharging through meditation, a practical way to refresh every day. Discovered thousands of years ago, reinvented in 2011. Learn how you can use the tools of meditation and breath to take you to a calm and centered mind and gain access to an unlimited storehouse of energy. Our free 1h workshops will introduce you to the Art of Living Courses and give you an experience of meditation and breath work.`,
					type: "Online",
					private: false,
					city: "NYC",
					state: "NY",
				},
				{
					organizerId: "1",
					name: "Snowboarding with New Friends",
					about: "Make new friends and learn to snowboarding together.",
					type: "In person",
					private: false,
					city: "NYC",
					state: "NY",
				},
				{
					organizerId: "1",
					name: "The New York City Drum & Bass Group",
					about: "Meet other junglists and DnB fanatics in the NYC area. Also, catch up on the latest DnB parties, check out tunes or just talk about music.",
					type: "In person",
					private: false,
					city: "NYC",
					state: "NY",
				},
				{
					organizerId: "1",
					name: "NYC Cat Walking Group",
					about: "This group is for cat owners who want to socialize, enrich and exercise their cat but may not feel comfortable in off leash group settings. The goal is to socialize our cats in a safe and controlled way and spice up our daily walks with some adventure. We will map out a route in advance and go for a jog or walk. There will be ample time for treats, training and exploring along the way. If you love cats and love talking about cats then this group is for you!",
					type: "In person",
					private: false,
					city: "NYC",
					state: "NY",
				},
				{
					organizerId: "1",
					name: "Ping Pong Group",
					about: "TOPSPIN is where Ping Pong enthusiasts of all levels come to play a friendly game and make new acquaintances & friends. Formerly the Fat Cat meetup, here you can expect great matches and delicious food & drink specials that are exclusive to our group. $10 for 3 hours of play. Please RSVP to secure your spot!",
					type: "In person",
					private: false,
					city: "NYC",
					state: "NY",
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		options.tableName = "Groups";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{
				id: {
					[Op.gt]: 0,
				},
			},
			{}
		);
	},
};
