const { RatingModal } = require("../../db");

const { publishUpdatedRatings } = require("./helpers");

const postRating = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;

    const record = new RatingModal({
      ...req.body,
      restaurantId,
      dateTime: new Date().toString()
    });

    const rating = await record.save();

    publishUpdatedRatings(restaurantId);

    res.status(200).json(rating);
  } catch (error) {
    next(error);
  }
};

const getRatings = async (req, res, next) => {
  try {
    const { offset = 0, limit = 10 } = req.query;
    const { restaurantId } = req.params;

    const count = await RatingModal.countDocuments({ restaurantId });
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
