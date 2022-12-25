"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Attendance extends Model {
		static associate(models) {
			// define association here

			Attendance.belongsTo(models.User, {
				foreignKey: "userId",
			});

			Attendance.belongsTo(models.Event, {
				foreignKey: "eventId",
			});
		}
	}
	Attendance.init(
		{
			eventId: {
				type: DataTypes.INTEGER,
			},
			userId: {
				type: DataTypes.INTEGER,
			},
			status: {
				type: DataTypes.ENUM,
				values: ["attending", "waitlist", "pending"],
				defaultValue: "pending",
			},
		},
		{
			sequelize,
			modelName: "Attendance",
			defaultScope: {
				attributes: {
					exclude: ["updatedAt", "createdAt"],
				},
			},
		}
	);
	return Attendance;
};
