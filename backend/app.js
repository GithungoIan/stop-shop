const express = require("express");
const morgan = require("morgan");

const userRouter = require("./routes/userRoutes");
const app = express();

// middlewares

// development logging
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

// body parser
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

//routes
app.use("/api/v1/users", userRouter);
module.exports = app;
