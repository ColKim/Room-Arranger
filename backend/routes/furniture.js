const router = require('express').Router();
let Furniture = require("../models/furniture");

// put
router.post("/putData", (req, res) => {
  let furniture = new Furniture();
  const {x1, y1, x2, y2, x3, y3, x4, y4} = req.body;
  if (!x1 || !y1 || !x2 || !y2 || !x3 || !y3 || !x4 || !y4) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  furniture.x1 = x1;
  furniture.y1 = y1;
  furniture.x2 = x2;
  furniture.y2 = y2;
  furniture.x3 = x3;
  furniture.y3 = y3;
  furniture.x4 = x4;
  furniture.y4 = y4;
  furniture.save((err) => {
    if (err) return res.json({success: false, error: err});
    return res.json({success: true});
  });
});

// get
router.get("/getData", (req, res) => {
  Furniture.find((err, data) => {
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
  Furniture.findByIdAndDelete(id, (err) => {
    if (err) return res.send(err);
    return res.json({success: true});
  });
});