const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Candidat = sequelize.db.define(
  "candidats",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nomC: {
      type: DataTypes.STRING(50),
    },
    prenomC: {
      type: DataTypes.STRING(50),
    },
    partiPolitique: {
      type: DataTypes.STRING(50),
    },
    photo: {
      type: DataTypes.STRING(500),
    },
    idListeElec: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Candidat;
