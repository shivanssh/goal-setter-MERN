const { isProdEnv } = require("../utility/helper");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    message: err.message,
    stack: !isProdEnv(process.env.Node_ENV) ? err.stack : null,
  });
};

module.exports = {
  errorHandler,
};
