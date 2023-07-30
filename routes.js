const express = require('express');
const router = express.Router();
require('express-router-group');

const articleHandler = require("./handlers/article.handler")
const userHandler = require("./handlers/user.handler")
const authHandler = require("./handlers/auth.handler")

const middlewares = require("./middlewares")

router.group('/auth', router => {
  router.post('/login', authHandler.login)
})

router.group('/article', router => {
  router.get("/", articleHandler.getAll)
  router.get("/:id", articleHandler.getOne)
  router.post("/", middlewares.checkToken, articleHandler.create)
  router.put("/:id", middlewares.checkToken, articleHandler.update)
  router.delete("/:id", middlewares.checkToken, articleHandler.destroy)
})

router.group('/user', router => {
  router.post("/", middlewares.checkToken, userHandler.create)
})

module.exports = router;