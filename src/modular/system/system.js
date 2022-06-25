"use strict";
/*The system should:
Be notified when a new flight is scheduled.
Be notified when a flight took off.
Be notified when a flight has arrived.*/
const events = require("../events/events");
const faker = require("@faker-js/faker");

require("../manager/manager");
require("../pilot/pilot");

events.on("new-flight", newFlight);
function newFlight(payload) {
  console.log(payload.flight);
}

events.on("took-off", tookOff);
function tookOff(payload) {
  console.log(payload.flight);
}

events.on("arrived", arrived);
function arrived(payload) {
  console.log(payload.flight);
}
