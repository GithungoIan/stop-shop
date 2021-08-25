const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception! 🔥 shutting down...");
  console.log(err.name, err.message, err.stack);
  server.close(() => {
    process.exit(1);
  });
});

dotenv.config({ path: "../.env" });
const app = require("./app");

const port = process.env.PORT;
const DB = process.env.DB_LOCAL;

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("DB connection established"));

const server = app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Unhandled Rejection! 🔥  shutting down ..`);
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
