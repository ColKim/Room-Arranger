const mongoose = require("mongoose");
const express = require("express");
var cors = require('cors');
const bodyParser = require("body-parser");
const logger = require("morgan");

const Data = require("./data");
const Line = require("./Line");

const Room = require("./roomData");

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

// TODO ROOM, FURNITURE
// get method
router.get("/getData", (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({success: false, error: err});
    return res.json({success: true, data: data});
  });
});

// TODO FURNITURE
// update method
router.post("/updateData", (req, res) => {
  const {id, walls, type} = req.body;
  Data.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({sucess: false, error: err});
    return res.json({success: true});
  });


  // const {id, update} = req.body;
  // Data.findByIdAndUpdate(id, update, (err) => {
  //   if (err) return res.json({success: false, error: err});
  //   return res.json({success: true});
  // });
});

// TODO FURNITURE
// delete method
router.delete("/deleteData", (req, res) => {
  const {id} = req.body;
  Data.findByIdAndDelete(id, (err) => {
    if (err) return res.send(err);
    return res.json({success: true});
  });
});


// TODO FURNITURE
// add method
router.post("/putData", (req, res) => {
  let data;
  const {id, walls, type} = req.body;   // room
  // const {id, walls, type} = req.body;   // furniture
  if (type == 1) {          // type room
    data = new Room();
  }
  // else if (typpe == 2) {   // type furniture

  // }
  else {
    return res.json({
      success: false,
      error: "INVALID TYPE"
    });
  }

  // assumes type is handled by frontend
  if ((!id && id !== 0) || !walls) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.id = id;
  data.walls = walls;
  data.type = type;
  data.save((err) => {
    if (err) return res.json({success: false, error: err});
    return res.json({success:true});
  });

  // let data = new Data();

  // const {id, message} = req.body;

  // if ((!id && id !== 0) || !message) {
  //   return res.json({
  //     success: false,
  //     error: "INVALID INPUTS"
  //   });
  // }
  // data.message = message;
  // data.id = id;
  // data.save((err) => {
  //   if (err) return res.json({success: false, error: err});
  //   return res.json({success: true});
  // });
});

// append api for http requests
app.use("/api", router);

// launch backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));