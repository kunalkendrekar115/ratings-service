const { logger } = require("restaurants-utils");

const queue_name = "rating_reviews_update";

const amqp = require("amqplib/callback_api");

const connect = () => {
  return new Promise((resolve, reject) => {
    amqp.connect(process.env.RABIT_MQ, (err, conn) => {
      if (err != null) {
        logger.error(err);
        reject(err);
        return;
      }
      logger.info("Connected Message Queue");
      resolve(conn);
    });
  });
};

const publishMessage = async (rating_update) => {
  const connection = await connect();
  connection.createChannel((err, ch) => {
    if (err != null) {
      logger.error(err);
      return;
    }
    ch.assertQueue(queue_name);
    ch.sendToQueue(queue_name, Buffer.from(JSON.stringify(rating_update)));
    logger.info(`message published ${JSON.stringify(rating_update)}`);
    // connection.close(() => logger.info(`message queue connection closed`));
  });
};

module.exports = {
  publishMessage
};
