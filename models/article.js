const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  keyword: {
    type: [String],
    default: [],
  },
  imageUrl: {
    type: String,
    required: true
  }
})

const Article = mongoose.model("Article", ArticleSchema);

module.exports = { Article }