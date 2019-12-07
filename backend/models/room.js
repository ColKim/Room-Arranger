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

// // Virtual for author's URL
// AuthorSchema
// .virtual('url')
// .get(function () {
//   return '/catalog/author/' + this._id;
// });

module.exports = mongoose.model("Room", RoomSchema);