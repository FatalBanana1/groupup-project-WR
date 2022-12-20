"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class GroupImage extends Model {
		static associate(models) {
			// define association here
			//1-many with groups
			// GroupImage.belongsTo(models.Group);
		}
	}
	GroupImage.init(
		{
			groupId: {
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
			modelName: "GroupImage",
		}
	);
	return GroupImage;
};
