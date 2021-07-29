const express = require("express");
const { verifyToken } = require("restaurants-utils");

const { postRating, getRatings } = require("../controllers");
const { isValidData, validRatingData } = require("./helpers");

const router = express.Router();

router.post("/:restaurantId", verifyToken, validRatingData(), isValidData, postRating);

router.get("/:restaurantId", getRatings);

module.exports = { router };
