var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var recipeSchema = new Schema({
  recipeName: String,
  totalTimeInSeconds: String,
  cuisine: String,
  ingredients: String,
  imageRecipe: String
});

var Recipe = mongoose.model('recipe', recipeSchema)

module.exports = Recipe

// { data: Buffer, contentType: String };