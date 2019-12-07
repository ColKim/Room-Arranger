const mongoose = require("mongoose");
const express = require("express");
var cors = require('cors');
const bodyParser = require("body-parser");
const logger = require("morgan");

const getMango = require("./config");

const API_PORT = 3001;
const app = express();
app.use(cors());

// set up connection between backend and mongodb
mongoose.connect(getMango('url'));
let db = mongoose.connection;

// check if database connection is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// optional logging and request body parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// get routers
const roomRouter = require('./routes/room');
const furnitureRouter = require('./routes/furniture');

// append api for http requests
app.use("/room", roomRouter);
app.use("/furniture", furnitureRouter);

// launch backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));