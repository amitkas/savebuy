var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var recipeSchema = new Schema({
  text: String,
  totalTimeInSeconds: Number,
  cuisine: [],
  ingredients: String,
  imageRecipe: { data: Buffer, contentType: String }
});

var Recipe = mongoose.model('recipe', recipeSchema)

module.exports = Recipe