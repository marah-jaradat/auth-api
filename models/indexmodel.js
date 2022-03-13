"use strict";

require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL);
// const Users = require("./users.model");
module.exports = { sequelize, DataTypes };

// module.exports = {
//   db: sequelize,
//   Users: Users(sequelize, DataTypes),
// };
