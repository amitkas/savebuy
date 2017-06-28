var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FavRecipeSchema = new Schema({
  recipeName: String,
  recipeimage: String,
  ingredients: [String],
  rating: Number,
  cookingtime: Number,
  cuisine: [String]
});

var FavRecipe = mongoose.model('favrecipe', FavRecipeSchema)

module.exports = FavRecipe