const isProdEnv = (env) => {
  return env === "production";
};

module.exports = {
  isProdEnv,
};
