"use strict";

// const events = require("../events/events");
// require("../pilot/pilot");

require("dotenv").config();
const { faker } = require("@faker-js/faker");
const client = require("socket.io-client");
const PORT = process.env.PORT || 3001;
let host = `http://localhost:${PORT}/`;
const airlineConnection = client.connect(`${host}airline`);
const managerConnection = client.connect(host);

//---------------------------
//---------------------------

// events.on("newFlight", newFlight);
// function newFlight(payload) {}
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
  // events.emit("new-flight", payload);
  managerConnection.emit("new-flight", flight);
}, 10000);

//---------------------------
// events.on("arrived", arrived);
airlineConnection.on("new-flight", (flight) => {
  setTimeout(() => {
    console.log(`Manager: we're greatly thankful for the amazing flight, "${flight.Details.pilot}"`);
  }, 7000);
});
