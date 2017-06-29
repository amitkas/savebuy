var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// var IngredientsSchema = new mongoose.Schema({
//     text: String
// });


var FavRecipeSchema = new Schema({
  recipeName: String,
  recipeimage: String,
  ingredients: String,
  recipeid: String,
  rating: Number,
  cookingtime: Number,
  cuisine: String,
  course: String
});

// var FavIngre = mongoose.model('favIngre', IngredientsSchema)
var FavRecipe = mongoose.model('favrecipe', FavRecipeSchema)

// module.exports = FavIngre
module.exports = FavRecipe