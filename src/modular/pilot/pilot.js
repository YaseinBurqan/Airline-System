"use strict";

// const events = require("../events/events");

require("dotenv").config();
const client = require("socket.io-client");
const { faker } = require("@faker-js/faker");
const PORT = process.env.PORT || 3001;
let host = `http://localhost:${PORT}/airline`;
const pilotConnection = client.connect(host);

//---------------------------

// events.on("new-flight", newFlight);
pilotConnection.on("new-flight", (flight) => {
  setTimeout(() => {
    flight.event = "took-off";
    console.log(` Pilot: Hello, I am "${flight.Details.pilot}" I will be your pilot today,the flight with ID'${flight.Details.flightID}' will took off in a minute, The wither outside is good`);
    console.log(" ");
    // events.emit("took-off", payload);
    pilotConnection.emit("took-off", flight);
  }, 4000);

  setTimeout(() => {
    flight.event = "arrived";
    console.log(`Pilot: Here is your favorite pilot" ${flight.Details.pilot}", the flight with ID'${flight.Details.flightID}' has been safely landed,  The wither outside is good, thank you for using our company, Have a good day`);
    console.log(" ");
    // events.emit("arrived", payload);
    pilotConnection.emit("arrived", flight);
  }, 7000);
});
