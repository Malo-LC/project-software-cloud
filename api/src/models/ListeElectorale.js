const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const ListeElectorale = sequelize.db.define(
  "listeElectorale",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nomListe: {
      type: DataTypes.STRING(50),
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = ListeElectorale;
