"use strict";

const events = require("../events/events");
const flight = require("../system/system");
require("../pilot/pilot");

events.on("newFlight", newFlight);

function newFlight(payload) {}
