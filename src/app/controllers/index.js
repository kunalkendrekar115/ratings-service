const { RatingModal } = require("../../db");
const { CustomError } = require("restaurants-utils");

const postRating = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    const { userId, name } = req;

    if (!restaurantId) {
      throw new CustomError(403, "Restaurant id id is missing in url");
    }

    const record = new RatingModal({
      ...req.body,
      restaurantId,
      userId,
      name,
      dateTime: new Date().toString()
    });

    const rating = await record.save();

    res.status(200).json(rating);
  } catch (error) {
    next(error);
  }
};

const getRatings = async (req, res, next) => {
  try {
    const { offset = 0, limit = 10 } = req.query;
    const { restaurantId } = req.params;

    if (!restaurantId) {
      throw new CustomError(403, "Restaurant id id is missing in url");
    }

    const count = await RatingModal.count({ restaurantId });
    const ratings = await RatingModal.find({ restaurantId }, null, {
      skip: +offset,
      limit: +limit
    });

    const responseData = { totalRecords: count, ratings };

    res.status(200).json(responseData);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postRating,
  getRatings
};
