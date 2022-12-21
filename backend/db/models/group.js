"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Group extends Model {
		static associate(models) {
			// define association here
			Group.hasMany(models.GroupImage);
			Group.belongsToMany(models.User, {
				through: models.Membership,
				as: "Members",
			});
			Group.belongsTo(models.User, {
				foreignKey: "organizerId",
			});
		}
	}
	Group.init(
		{
			organizerId: {
				type: DataTypes.INTEGER,
				references: {
					model: "Users",
				},
			},
			name: {
				type: DataTypes.STRING,
			},
			about: {
				type: DataTypes.STRING,
			},
			type: {
				type: DataTypes.ENUM,
				values: ("Online", "In person"),
				defaultValue: "Online",
			},
			private: {
				type: DataTypes.BOOLEAN,
			},
			city: {
				type: DataTypes.STRING,
			},
			state: {
				type: DataTypes.STRING,
			},
		},
		{
			sequelize,
			modelName: "Group",
			// defaultScope: {
			// 	attributes: {
			// 		exclude: ["updatedAt", "createdAt"],
			// 	},
			// },
		}
	);
	return Group;
};
