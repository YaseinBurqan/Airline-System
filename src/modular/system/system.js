"use strict";
// const { socket } = require("server/router");
// const events = require("../events/events");
// require("../manager/manager");
// require("../pilot/pilot");

require("dotenv").config();
const PORT = process.env.PORT || 3001;

//---------------------------

const server = require("socket.io")(PORT);
const airline = server.of("/airline"); //namespace

//---------------------------
server.on("connection", (client) => {
  console.log("connected ", client.id);

  // events.on("new-flight", newFlight);
  client.on("new-flight", (flight) => {
    console.log(flight);
    airline.emit("new-flight", flight);
  });
});

//---------------------------

server.on("connection", (client) => {
  console.log("connected to airline system ", client.id);

  //---------------------------

  // events.on("took-off", tookOff);
  client.on("took-off", (flight) => {
    console.log(flight);
  });

  //---------------------------

  // events.on("arrived", arrived);
  client.on("arrived", (flight) => {
    console.log(flight);
  });
});

//---------------------------
