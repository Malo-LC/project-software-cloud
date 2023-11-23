const { Sequelize } = require("sequelize");

const db = new Sequelize("safevote", "root", "password", {
  host: "mysql-service",
  dialect: "mysql",
  logging: false,
});

db.authenticate()
  .then(() => console.log(`Connection has been established successfully to ${process.env.DB_HOST}`))
  .catch((err) => console.error("Unable to connect to the database DB_ENDPOINT:", err));

module.exports = { db };
