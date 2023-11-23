const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Utilisateur = sequelize.db.define(
  "utilisateurs",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(50),
    },
    nom: {
      type: DataTypes.STRING(50),
    },
    prenom: {
      type: DataTypes.STRING(50),
    },
    password: {
      type: DataTypes.STRING(60),
    },
    dateDeNaissance: {
      type: DataTypes.STRING(50),
    },
    genre: {
      type: DataTypes.STRING(50),
    },
    tel: {
      type: DataTypes.STRING(50),
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Utilisateur;
