const router = require('express').Router();
let Room = require("../models/room");

// put
router.post("/putData", (req, res) => {
  let room = new Room();
  const {x1, y1, x2, y2, build} = req.body;
  if (!x1 || !y1 || !x2 || !y2) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  room.x1 = x1;
  room.y1 = y1;
  room.x2 = x2;
  room.y2 = y2;
  room.build = build;
  room.save((err) => {
    if (err) return res.json({success: false, error: err});
    return res.json({success: true});
  });
});

// get
router.get("/getData", (req, res) => {
  Room.find((err, data) => {
    if (err) return res.json({success: false, error: err});
    return res.json({success: true, data: data});
  });
});

// update
router.post("/updateData", (req, res) => {
  const {id, update} = req.body;
  Room.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({success: false, error: err});
  });
});

// delete 
router.delete("/deleteData", (req, res) => {
  const {id} = req.body;
  Room.findByIdAndDelete(id, (err) => {
    if (err) return res.send(err);
    return res.json({success: true});
  });
});