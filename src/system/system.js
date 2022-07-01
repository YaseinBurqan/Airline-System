"use strict";

require("dotenv").config();
const PORT = process.env.PORT || 3001;

//---------------------------

const server = require("socket.io")(PORT);
const airline = server.of("/airline"); //namespace

//---------------------------
let queue = {
  flights: {},
};
//---------------------------

server.on("connection", (client) => {
  console.log("connected ", client.id);

  client.on("new-flight", (flight) => {
    console.log("Flight : ", flight);
    const id = flight.Details.flightID;
    queue.flights[id] = flight;
    airline.emit("new-flight", flight);
    // server.emit("new-flight", flight);
  });

  //---------------------------

  client.on("arrived", (flight) => {
    console.log("Flight : ", flight);
    // airline.emit("new-flight", flight);
    server.emit("arrived", flight);
  });

  //---------------------------

  client.on("get-all", () => {
    Object.keys(queue.flights).forEach((id) => {
      client.emit("flight", {
        id: id,
        flight: queue.flights[id],
      });
      delete queue.flights[id];
    });
    console.log(queue);
  });
  client.on("delete", (id) => {
    delete queue.flights[id];
  });

  //---------------------------
});

//---------------------------
airline.on("connection", (client) => {
  client.on("took-off", (flight) => {
    console.log("Flight : ", flight);
  });
});

//---------------------------

airline.on("connection", (client) => {
  client.on("arrived", (flight) => {
    console.log("Flight : ", flight);
  });
});
