const { User } = require("../models/user")
const response = require("../resources/response")

const bcrypt = require("bcrypt")

const create = async (req, res, next) => {
  try {
    req.body.password = bcrypt.hashSync(String(req.body.password), 12)
    const newUser = new User({ ...req.body });
    const insertedUser = await newUser.save();
    return res.status(201).json(insertedUser)
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

module.exports = {
  create
}