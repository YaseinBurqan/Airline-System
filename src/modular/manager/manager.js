"use strict";

const { faker } = require("@faker-js/faker");

const events = require("../events/events");
const flight = require("../system/system");
require("../pilot/pilot");

// he manager should:
// Alert the pilot and the system when there is a new flight.
// Be notified when a flight has arrived.

events.on("newFlight", newFlight);

function newFlight(payload) {}

setInterval(() => {
  let id = faker.datatype.number();
  let name = faker.name.findName();
  let destination = faker.address.country();

  let flight = {
    event: "new-flight",
    time: new Date(),
    Details: {
      airLine: "Royal Jordanian Airlines",
      destination: destination,
      pilot: name,
      flightID: id,
    },
  };

  console.log(`Manager: new flight with ID '${flight.Details.flightID}' have been scheduled`);
  let payload = { flight: flight };
  events.emit("new-flight", payload);
}, 10000);

events.on("arrived", arrived);

function arrived(payload) {
  setTimeout(() => {
    console.log(`Manager: we're greatly thankful for the amazing flight, "${payload.flight.Details.pilot}"`);
  }, 10);
}
