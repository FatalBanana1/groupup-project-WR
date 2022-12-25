"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Event extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Event.belongsTo(models.Group, {
				foreignKey: "groupId",

			});

			Event.belongsTo(models.Venue, {
				foreignKey: "venueId",
			});

			Event.hasMany(models.EventImage, {
				foreignKey: "eventId",
				onDelete: "CASCADE",
				hooks: true,
			});

			Event.hasMany(models.Attendance, {
				foreignKey: "eventId",
				onDelete: "CASCADE",
				hooks: true,
			});
		}
	}
	Event.init(
		{
			venueId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			groupId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			type: {
				type: DataTypes.ENUM,
				allowNull: false,
				values: ["Online", "In person"],
				defaultValue: "Online",
			},
			capacity: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			price: {
				type: DataTypes.DECIMAL,
				allowNull: false,
			},
			startDate: {
				type: DataTypes.DATE,
				allowNull: false,
				validate: {
					isDate: true,
				},
			},
			endDate: {
				type: DataTypes.DATE,
				allowNull: false,
				validate: {
					isDate: true,
				},
			},
		},
		{
			sequelize,
			modelName: "Event",
			defaultScope: {
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
			},
		}
	);
	return Event;
};
