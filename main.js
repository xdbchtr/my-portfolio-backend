const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const router = require('./routes')

const app = express();

const requestLogger = require('./resources/requestLogger');

app.use(requestLogger);

app.use(express.json());

app.get("/", async (req, res) => {
  return res.json({ message: "Hello, World ✌️" });
});

app.use("/api", router);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  return res.status(status).send({
    error: "something went wrong"
  })
})

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_ADDRESS}/${process.env.DB_NAME}`
    );
    app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`))
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

start();