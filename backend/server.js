const express = require("express");
const doten = require("dotenv").config();
const colors = require("colors");

const app = express();
const port = process.env.PORT || 5000;

// routes
const goalRoutes = require("./routes/goalRoutes");

//Middlewares
const { errorHandler } = require("./middleware/errorHandlerMiddleware");

// middleware for routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/v1/goals", goalRoutes);

app.use(errorHandler);

// server listening at port
app.listen(port, () => {
  console.log(colors.green(`Serving is listening at port ${port}`));
});
