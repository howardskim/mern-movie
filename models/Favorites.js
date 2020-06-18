const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const { Schema } = mongoose;
const FavoriteSchema = new Schema({
  id: {
    type: Number,
  },
  userID: {
    type: String,
  },
  title: String,
  overview: String,
  poster_path: String,
  release_date: String,
  vote_average: Number
});
// FavoriteSchema.plugin(uniqueValidator);
module.exports = mongoose.model("favorites", FavoriteSchema);
