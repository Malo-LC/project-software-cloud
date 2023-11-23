// models/voteListe.js
const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const VoteListe = sequelize.db.define(
  "voteListe",
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
    idCandidat: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idListe: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = VoteListe;
