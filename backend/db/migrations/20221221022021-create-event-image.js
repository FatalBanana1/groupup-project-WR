"use strict";
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA;
}

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			"EventImages",
			{
				id: {
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
					allowNull: false,
				},
				eventId: {
					type: Sequelize.INTEGER,
					references: {
						model: "Events",
					},
					onDelete: "CASCADE",
				},
				url: {
					type: Sequelize.STRING,
				},
				preview: {
					type: Sequelize.BOOLEAN,
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
		options.tableName = "EventImages";
		await queryInterface.dropTable(options);
	},
};
