const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite", //Deline o tipo de banco de dados como SQLite
  storage: "database.sqlite", //arquivo aonde o banco de dados será armazenado
});

module.exports = sequelize;
