const { User } = require("../models/user")

require('dotenv').config()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username }).exec();

    if (!user) {
      return res.status(401).json({ status: true, code: 401, message: 'Invalid username or password' });
    }

    const checkPassword = bcrypt.compareSync(req.body.password, user.password)

    if (!checkPassword) {
      return res.status(401).json({ status: true, code: 401, message: 'Invalid username or password' });
    }

    const token = jwt.sign({
      access: true,
      username: user.username,

    }, process.env.SECRET_TOKEN, {
      expiresIn: '1m'
    })
    return res.status(200).json({ status: true, code: 200, message: "success login", token })
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

module.exports = {
  login
}