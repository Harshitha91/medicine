// @flow
const app = require("./app");
const form = require("./form");
const user = require("./user");

module.exports = {
  ...app,
  ...form,
  ...user,
};
