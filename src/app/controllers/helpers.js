const { publishMessage } = require("../message-queue");
const { RatingModal } = require("../../db");
const { logger } = require("restaurants-utils");

const publishUpdatedRatings = async (restaurantId) => {
  try {
    const records = await RatingModal.find({ restaurantId });
    const totalRatings = records.length;

    const sumRatings = records.reduce((acc, curr) => acc + curr.ratings, 0);

    const avgRating = Number.parseFloat(sumRatings / totalRatings).toFixed(1);

    publishMessage({ restaurantId, avgRating, totalRatings });
  } catch (error) {
    logger.error(error);
  }
};

module.exports = { publishUpdatedRatings };
