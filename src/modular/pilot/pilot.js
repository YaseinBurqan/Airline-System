"use strict";
// The pilot should:

// Alert the system when a flight took-off.
// Alert the manager and the system when a flight has arrived.
// Be notified when a new flight is scheduled.

const events = require("../events/events");

events.on("new-flight", newFlight);

function newFlight(payload) {
  setTimeout(() => {
    console.log(` Pilot: Hello, I am ${payload.flight.Details.pilot} I will be your pilot today,the flight with ID'${payload.flight.Details.flightID}'  will took off in a minute, The wither outside is good`);
    events.emit("took-off", payload);
  }, 4000);

  setTimeout(() => {
    console.log(`Pilot: Here is your favorite pilot ${payload.flight.Details.pilot}  , the flight with ID'${payload.flight.Details.flightID}' has been safely landed,  The wither outside is good, thank you for using our company, Have a good day`);
    events.emit("arrived", payload);
  }, 7000);
}
