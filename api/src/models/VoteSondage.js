const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const VoteSondage = sequelize.db.define(
  "VoteSondage",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idSondage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    choix: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = VoteSondage;
