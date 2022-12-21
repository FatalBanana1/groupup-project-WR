"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Membership extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Membership.init(
		{
			userId: {
				type: DataTypes.INTEGER,
			},
			groupId: {
				type: DataTypes.INTEGER,
			},
			status: {
				type: DataTypes.ENUM,
				values: ("member", "pending", "co-host"),
				defaultValue: "pending",
			},
		},
		{
			sequelize,
			modelName: "Membership",
			defaultScope: {
				attributes: {
					exclude: ["userId", "groupId", "createdAt", "updatedAt"],
				},
			},
		}
	);
	return Membership;
};
