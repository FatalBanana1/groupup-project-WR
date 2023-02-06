"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class EventImage extends Model {
		static associate(models) {
			// define association here

			EventImage.belongsTo(models.Event, {
				foreignKey: "eventId",
			});
		}
	}
	EventImage.init(
		{
			eventId: {
				type: DataTypes.INTEGER,
			},
			url: {
				type: DataTypes.STRING,
			},
			preview: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
		},
		{
			sequelize,
			modelName: "EventImage",
			defaultScope: {
				attributes: {
					exclude: ["updatedAt"],
				},
			},
		}
	);
	return EventImage;
};
