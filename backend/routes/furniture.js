const router = require('express').Router();
let Furniture = require("../models/furniture");

// put
router.post("/putData", (req, res) => {
  let furniture = new Furniture();
  const {x1, y1, x2, y2, x3, y3, x4, y4} = req.body;
  if (!x1 || !y1 || !x2 || !y2 || !x3 || !y3 || !x4 || !y4) {
    return res.status(400).json("INVALID INPUTS");
  }
  furniture.x1 = x1;
  furniture.y1 = y1;
  furniture.x2 = x2;
  furniture.y2 = y2;
  furniture.x3 = x3;
  furniture.y3 = y3;
  furniture.x4 = x4;
  furniture.y4 = y4;
  furniture.save()
    .then(() => res.status(200).json("Furniture Added"))
    .catch(err => res.status(400).json("Error: " + err));
});

// get
router.get("/getData", (req, res) => {
  Furniture.find()
    .then(data => res.json(data))
    .catch(err => res.json(400).json("Error: " + err));
});

// update
router.post("/updateData", (req, res) => {
  const {id, update} = req.body;
  Furniture.findById(id)
    .then(furniture => {
      furniture.x1 = update.x1;
      furniture.y1 = update.y1;
      furniture.x2 = update.x2;
      furniture.y2 = update.y2;
      furniture.x3 = update.x3;
      furniture.y3 = update.y3;
      furniture.x4 = update.x4;
      furniture.y4 = update.y4;

      furniture.save()
        .then(() => res.status(200).json("Furniture Updated"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

// delete
router.delete("/deleteData", (req, res) => {
  const {id} = req.body;
  Furniture.findByIdAndDelete(id)
    .then(() => res.status(200).json("Furniture Deleted"))
    .catch(err => res.status(400).json("Error: " + err));
});
module.exports = router;