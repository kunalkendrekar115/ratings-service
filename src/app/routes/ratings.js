const express = require("express");
const { verifyToken } = require("restaurants-utils");

const { postRating, getRatings } = require("../controllers");
const { isValidData, validRatingData, checkValidRestaurantMw } = require("./helpers");

const router = express.Router();

router.post(
  "/:restaurantId",
  checkValidRestaurantMw,
  verifyToken,
  validRatingData(),
  isValidData,
  postRating
);

router.get("/:restaurantId", checkValidRestaurantMw, getRatings);

module.exports = { router };
