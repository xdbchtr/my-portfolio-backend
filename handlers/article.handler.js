const { Article } = require("../models/article")
const response = require("../resources/response")

const getAll = async (req, res, next) => {
  try {
    const articles = await Article.find();
    return res.status(200).send(response.successGet(articles))
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

const getOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const article = await Article.findById(id);
    return res.status(200).json(article);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

const create = async (req, res, next) => {
  try {
    const newArticle = new Article({ ...req.body });
    const insertedArticle = await newArticle.save();
    return res.status(201).json(insertedArticle)
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Article.updateOne({ _id: id }, req.body);
    const updatedArticle = await Article.findById(id);
    return res.status(200).json(updatedArticle)
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedArticle = await Article.findByIdAndDelete(id);
    return res.status(200).json(deletedArticle);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  destroy
}