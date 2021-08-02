const { body, validationResult } = require("express-validator");
const { CustomError } = require("restaurants-utils");

const axios = require("axios");

const checkValidRestaurantMw = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;

    if (!restaurantId) {
      throw new CustomError(403, "Restaurant id id is missing in url");
    }

    const restaurant = await axios.get(`http://localhost:4000/restaurants/${restaurantId}`);
    if (restaurant) next();
  } catch ({ response }) {
    next(new CustomError(response.status, response.data));
  }
};

const validRatingData = () => [
  body("ratings").notEmpty().isInt({ min: 1, max: 5 }).withMessage("valid ratings is required")
];

const isValidData = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new CustomError(403, errors.array());
  }

  next();
};

module.exports = { validRatingData, isValidData, checkValidRestaurantMw };
