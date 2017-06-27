var FoodApp = function () {

    var foods = [];

    var favRecipe = function(recipeIndex){
        var recindex = foods[recipeIndex]
        console.log(recindex)
    }

    var addRecipeOptions = function(recipeName, recipeimage, ingredients, rating, cookingtime, recipeid){
           var food = {
            recipeName: recipeName,
            recipeimage: recipeimage,
            ingredients: ingredients,
            rating: rating,
            cookingtime: cookingtime,
            recipeid:recipeid
        }
        foods.push(food);
        renderRecipes()
    }


    var recipeSearch = function (text) {
        foods = []
        $.ajax({
            method: "GET",
            url: 'http://api.yummly.com/v1/api/recipes?_app_id=06389aba&_app_key=5ac00c18990b0551a19a507887252268&q=' + [text] + '',
            success: function (data) {
                for (var i = 0; i < data.matches.length; i++) {
                 var recipeName = data.matches[i].recipeName
                 var recipeimage = data.matches[i].smallImageUrls[0]
                 var ingredients = data.matches[i].ingredients
                 var rating = data.matches[i].rating
                 var cookingtime = data.matches[i].totalTimeInSeconds/60
                 var recipeid = data.matches[i].id

                 addRecipeOptions(recipeName, recipeimage, ingredients, rating, cookingtime, recipeid)
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
    };


   var renderRecipes =  function() {
    $('.main-row').empty();
    var source = $('#recipe-template').html();
    var template = Handlebars.compile(source);
    for (var i = 0; i < foods.length; i++) {
      var newHTML = template(foods[i]);
      $('.main-row').append(newHTML);
    }
  }



return {
    recipeSearch: recipeSearch,
    favRecipe:favRecipe
}
}


var app = FoodApp();

var $input = $(".input-group");

$input.on('click', '.search-recipes', function () {
    var $freesearch = $('.search-input');
    if ($freesearch.val() === "" || $freesearch.val() === "") {
        alert("Please enter an idea for recipe!");
        return;
    }
    var freeSearch = ($freesearch.val())
    app.recipeSearch(freeSearch)

})


var $maindisplay = $(".main-row");

    $maindisplay.on('click', '.add-favorite', function(){
        debugger
        var recipeIndex = $(this).closest('.recipe-inside').index()
        // var recipehere2 = $(this).closest('div').closest('.recipe-inside')
        app.favRecipe(recipeIndex)

    })

