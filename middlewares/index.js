const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

const checkToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return res.status(403).json({ status: false, code: 403, message: "Go Find your Creds" })
    }

    const token = authHeader && authHeader.split(' ')[1]

    const isAuthorized = await jwt.verify(token, process.env.SECRET_TOKEN)

    req.user = {
      "username": isAuthorized.username,
      "access": isAuthorized.access
    }

    next()
  } catch (error) {
    return res.status(401).json({ status: false, code: 401, message: "Unauthorized" })
  }
}

module.exports = { checkToken }