const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Sondage = sequelize.db.define(
  "sondage",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    titre: {
      type: DataTypes.STRING(60),
    },
    descr: {
      type: DataTypes.STRING(500),
    },
    option1: {
      type: DataTypes.STRING(100),
    },
    option2: {
      type: DataTypes.STRING(100),
    },
    option3: {
      type: DataTypes.STRING(100),
    },
    option4: {
      type: DataTypes.STRING(100),
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Sondage;
