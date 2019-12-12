const router = require('express').Router();
let Room = require("../models/room");

// put
router.post("/putData", (req, res) => {
  let room = new Room();
  const {x1, y1, x2, y2, build} = req.body;
  if (!x1 || !y1 || !x2 || !y2) {
    return res.status(400).json("INVALID INPUTS");
  }
  room.x1 = x1;
  room.y1 = y1;
  room.x2 = x2;
  room.y2 = y2;
  room.build = build;
  room.save()
    .then(() => res.status(200).json('Room Added'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// get
router.get("/getData", (req, res) => {
  Room.find()
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Error: ' + err));
});

// update
router.post("/updateData", (req, res) => {
  const {id, update} = req.body;
  Room.findById(id)
    .then(room => {
      room.x1 = update.x1;
      room.y1 = update.y1;
      room.x2 = update.x2;
      room.y2 = update.y2;
      room.build = update.build;

      room.save()
        .then(() => res.status(200).json('Room Updated'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// delete 
router.delete("/deleteData", (req, res) => {
  const {id} = req.body;
  Room.findByIdAndDelete(id)
    .then(() => res.status(200).json("Wall Deleted"))
    .catch(err => res.status(400).json("Error: " + err));
});
module.exports = router;