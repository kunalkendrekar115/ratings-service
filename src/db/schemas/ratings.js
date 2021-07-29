const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ratingSchema = new Schema({
  restaurantId: String,
  userId: String,
  comment: String,
  name: String,
  ratings: Number,
  dateTime: String
});

module.exports = mongoose.model("RatingModal", ratingSchema, "ratings");
