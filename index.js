"use strict";
require("dotenv").config();
const server = require("./server");
const { sequelize } = require("./models/indexmodel");
const PORT = process.env.PORT || 3030;
sequelize.sync().then(() => {
  server.listen(3000, () => {
    console.log(`Server UP on ${PORT}`);
  });
});
