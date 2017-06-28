var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/savebuy', function () {
  console.log("DB connection established!!!");
})


var Recipe = require('./addRecpies/models/recipeModel');
var FavRecipe = require('./addRecpies/models/favModel');


var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(express.static('bower_components'));
app.use(bodyParser.urlencoded({
  extended: false
}));



app.get("/recipe.html", function(req, res){
  res.sendFile(__dirname+'/addRecpies/recipe.html')
})

app.post('/newrecipe', function (req, res) {
  console.log(req.body)
  var newRecipe = Recipe.create(req.body, function (err, recipe) {
    if (err) {
      res.send('error saving new recipe')
    } else {
      console.log(recipe)
      res.send(recipe)
    }
  });
});

app.post('/favrecipe', function(req, res){
var newFavRecipe = new FavRecipe(req.body)
  newFavRecipe.save(function (err, data) {
    if (err) {
      return console.error(err)
    }
    console.log(data)
    // res.send(data)
  })})

app.get('/favrecipe', function(req, res){
  FavRecipe.find(function (error, result) {
    if (error) {
      return console.error(error);
    }
    res.send(result)
  });
})

app.listen(8000, function () {
  console.log("what do you want from me! get me on 8000 ;-)");
});