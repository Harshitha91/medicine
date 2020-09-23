// @flow
const app = require("./app");
const form = require("./form");
const user = require("./user");
const doctor = require("./doctor");
const home = require("./home");
const lab = require("./lab");
const medicine = require("./medicine");
const schedule = require("./schedule");
const careGiver = require("./careGiver");

module.exports = {
  ...app,
  ...form,
  ...user,
  ...home,
  ...doctor,
  ...lab,
  ...medicine,
  ...schedule,
  ...careGiver,
};
