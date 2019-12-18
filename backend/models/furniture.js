const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const furnitureSchema = new Schema(
  {
    x1: Number,
    y1: Number,
    x2: Number,
    y2: Number,
    x3: Number,
    y3: Number,
    x4: Number,
    y4: Number,
  },
  { timestamps: true }
);

const Furniture = mongoose.model("Furniture", furnitureSchema);

module.exports = Furniture;