var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var recipeSchema = new Schema({
  text: String,
  totalTimeInSeconds: Number,
  cuisine: String,
  ingredients: String
});

var Recipe = mongoose.model('recipe', recipeSchema)

module.exports = Recipe