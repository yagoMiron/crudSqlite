const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Tutorial = sequelize.define("Tutorial", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
});
module.exports = Tutorial;
