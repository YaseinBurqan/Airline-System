"use strict";

require("dotenv").config();
const PORT = process.env.PORT || 3001;

//---------------------------

const server = require("socket.io")(PORT);
const airline = server.of("/airline"); //namespace

//---------------------------
server.on("connection", (client) => {
  console.log("manager connected ", client.id);

  client.on("new-flight", (flight) => {
    console.log("Flight : ", flight);
    airline.emit("new-flight", flight);
    // server.emit("new-flight", flight);
  });

  client.on("arrived", (flight) => {
    console.log("Flight : ", flight);
    // airline.emit("new-flight", flight);
    server.emit("arrived", flight);
  });
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
