"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Group extends Model {
		static associate(models) {
			// define association here
			Group.hasMany(models.GroupImage, { onDelete: "CASCADE" });

			Group.hasMany(models.Membership, { onDelete: "CASCADE" });

			Group.belongsTo(models.User, {
				foreignKey: "organizerId",
				as: "Organizer",
				onDelete: "CASCADE",
			});

			Group.hasMany(models.Event, { onDelete: "CASCADE" });

			Group.hasMany(models.Venue, { onDelete: "CASCADE" });
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
				allowNull: false,
				validate: {
					len: [2, 60],
				},
			},
			about: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [50, 200],
				},
			},
			type: {
				type: DataTypes.ENUM,
				allowNull: false,
				values: ["Online", "In person"],
				defaultValue: "Online",
			},
			private: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			city: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			state: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [2, 2],
					isAlpha: true,
					isUppercase: true,
				},
			},
		},
		{
			sequelize,
			modelName: "Group",
			defaultScope: {
				attributes: {
					exclude: ["updatedAt", "createdAt"],
				},
			},
		}
	);
	return Group;
};
