"use strict";

process.env.SECRET = "toes";

const bearer = require("../middleware/bearer.middleware");
const { sequelize, DataTypes } = require("../models/indexmodel");
const jwt = require("jsonwebtoken");

let userInfo = {
  admin: { username: "admin", password: "password" },
};

// beforeAll(async (done) => {
//   await sequelize.sync();
//   await users.create(userInfo.admin);
//   done();
// });
// afterAll(async (done) => {
//   await sequelize.drop();
//   done();
// });

describe("test bearer auth", () => {
  const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res),
  };
  const next = jest.fn();

  describe("user authentication", () => {
    it("fails a login for a user (admin) with an incorrect token", () => {
      req.headers = {
        authorization: "Bearer thisisabadtoken",
      };

      return bearer(req, res, next).then(() => {
        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(403);
      });
    });

    it("logs in a user with a proper token", () => {
      const user = { username: "admin" };
      const token = jwt.sign(user, process.env.SECRET);

      req.headers = {
        authorization: `Bearer ${token}`,
      };

      return bearer(req, res, next).then(() => {
        expect(next).toHaveBeenCalledWith();
      });
    });
  });
});
