const mongoose = require("mongoose");
const express = require("express");
var cors = require('cors');
const bodyParser = require("body-parser");
const logger = require("morgan");

const Data = require("./data");

const Room = require("./roomData");
const Furniture = require("./furniture");

const getMango = require("./config");

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// set up connection between backend and mongodb
mongoose.connect(getMango('url'));
let db = mongoose.connection;

// check if database connection is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// optional logging and request body parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// methods for ROOM and FURNITURE

// update method for room and furniture
router.post("/updateData", (req, res) => {
  const {id, update} = req.body;
  Data.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({success: false, error: err});
  });
});


// methods for ROOM



// TODO FURNITURE
// get method
router.get("/getData", (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({success: false, error: err});
    return res.json({success: true, data: data});
  });
});

// delete method for room and furniture
router.delete("/deleteData", (req, res) => {
  const {id} = req.body;
  Data.findByIdAndDelete(id, (err) => {
    if (err) return res.send(err);
    return res.json({success: true});
  });
});

// put method for room
router.post("/putDataRoom", (req, res) => {
  let data = new Room();
  const {x1, y1, x2, y2, build} = req.body;
  if (!x1 || !y1 || !x2 || !y2) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.x1 = x1;
  data.y1 = y1;
  data.x2 = x2;
  data.y2 = y2;
  data.build = build;
  data.save((err) => {
    if (err) return res.json({success: false, error: err});
    return res.json({success: true});
  });
});

// TODO: put method for furniture
router.post("/putData", (req, res) => {
  let data = new Data();
  const {id, message} = req.body;
  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.message = message;
  data.id = id;
  data.save((err) => {
    if (err) return res.json({success: false, error: err});
    return res.json({success: true});
  });
});

// append api for http requests
app.use("/api", router);

// launch backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));