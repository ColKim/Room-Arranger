const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    x1: Number,
    y1: Number,
    x2: Number,
    y2: Number,
    build: Number,	// 1: wall, 2: window, 3: door
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", RoomSchema);