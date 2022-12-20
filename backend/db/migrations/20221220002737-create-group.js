"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Groups", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			organizerId: {
				type: Sequelize.INTEGER,
				references: {
					model: "Users",
				},
				onDelete: "CASCADE",
			},
			name: {
				type: Sequelize.STRING,
			},
			about: {
				type: Sequelize.STRING,
			},
			type: {
				type: Sequelize.ENUM,
				values: ["Online", "In person"],
				defaultValue: "Online",
			},
			private: {
				type: Sequelize.BOOLEAN,
			},
			city: {
				type: Sequelize.STRING,
			},
			state: {
				type: Sequelize.STRING,
			},
			// previewImage: {
			// 	type: Sequelize.STRING,
			// 	// references: {
			// 	// 	model: "GroupImages",
			// 	// },
			// },
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Groups");
	},
};
