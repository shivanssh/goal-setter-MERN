const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const connectDB = require("./config/db");

const app = express();
const port = process.env.PORT || 5000;

connectDB();

// routes
const goalRoutes = require("./routes/goalRoutes");
const userRoutes = require("./routes/userRoutes");

// Middleware
const { errorHandler } = require("./middleware/errorHandlerMiddleware");

// middleware for routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/v1/goals", goalRoutes);
app.use("/v1/users", userRoutes);

app.use(errorHandler);

// server listening at port
app.listen(port, () => {
  console.log(`Serving is listening at port ${port}`.cyan.underline);
});
