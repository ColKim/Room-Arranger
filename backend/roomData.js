const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Line = require("./Line.js")

const roomSchema = new Schema(
  {
    id: String,
    walls: {
    	type: Array,
    	lines: Line
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);