"use strict";
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA;
}

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			"Memberships",
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				userId: {
					type: Sequelize.INTEGER,
					references: {
						model: "Users",
					},
					onDelete: "CASCADE",
				},
				groupId: {
					type: Sequelize.INTEGER,
					references: {
						model: "Groups",
					},
					onDelete: "CASCADE",
				},
				status: {
					type: Sequelize.ENUM,
					values: ["member", "pending", "co-host", "organizer"],
					defaultValue: "pending",
				},
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
			},
			options
		);
	},
	async down(queryInterface, Sequelize) {
		options.tableName = "Memberships";
		await queryInterface.dropTable(options);
	},
};
