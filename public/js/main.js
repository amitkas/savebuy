var FoodApp = function () {

    var foods = [];

    var favRecipe = function (recipeIndex) {
        var recindex = foods[recipeIndex]
        console.log(recindex)
        $.ajax('/favrecipe', {
            method: "POST",
            data: recindex,
            success: function (data) {
                console.log("new recipe saved Thank you :)")
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        })
    }

var addRecipeOptions = function (recipeName, recipeimage, ingredients, rating, cookingtime, recipeid, cuisine) {
    var food = {
        recipeName: recipeName,
        recipeimage: recipeimage,
        ingredients: ingredients,
        rating: rating,
        cookingtime: cookingtime,
        recipeid: recipeid,
        cuisine: cuisine
    }
    foods.push(food);
    renderRecipes()
}


var recipeSearch = function (text, recipetosearch, veggieCheck, allergyCheck) {
    foods = []
    $.ajax({
        method: "GET",
        url: 'http://api.yummly.com/v1/api/recipes?_app_id=06389aba&_app_key=5ac00c18990b0551a19a507887252268&q=' + [text] + [recipetosearch] + [veggieCheck] + [allergyCheck] + '&requirePictures=true',
        success: function (data) {
            for (var i = 0; i < data.matches.length; i++) {
                var recipeName = data.matches[i].recipeName
                var recipeimage = data.matches[i].smallImageUrls[0]
                var ingredients = data.matches[i].ingredients
                var rating = data.matches[i].rating
                var cookingtime = data.matches[i].totalTimeInSeconds / 60
                var recipeid = data.matches[i].id
                var cuisine = data.matches[i].attributes.cuisine


                addRecipeOptions(recipeName, recipeimage, ingredients, rating, cookingtime, recipeid, cuisine)
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
};


var renderRecipes = function () {
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
    favRecipe: favRecipe,
}
}


var app = FoodApp();

var $input = $(".compare-row");

var addVeggie

$input.on('click', '.search-recipes', function () {
    var $freesearch = $('.search-input');
    if ($freesearch.val() === "" || $freesearch.val() === "") {
        alert("Please enter an idea for recipe!");
        return;
    }
    var freeSearch = ($freesearch.val())
    var x = $('.dropdown-toggle').attr("title")
    y = x.toLowerCase().split(', ')

    var recipetosearchasarray = []

    for (var i = 0; i < y.length; i++) {
        if (y[i] !== undefined); {
            var cuisinewithajax = '&allowedCuisine[]=cuisine^cuisine-' + y[i]
            recipetosearchasarray.push(cuisinewithajax)
        }
    }
    var recipetosearch = recipetosearchasarray.join("")

    var veggieCheck = $('.veggie-input').attr('value')
    var allergyCheck = $('.allergy-input').attr('value')
    app.recipeSearch(freeSearch, recipetosearch, veggieCheck, allergyCheck)
})



$('.veggie-check :checkbox').change(function () {
    if (this.checked) {
        $(".veggie-input").attr({
            'value': '&allowedDiet[]=386^Vegan'
        })
    } else {
        $(".veggie-input").attr({
            'value': '&allowedDiet[]='
        })
    }
});

$('.allergy-check :checkbox').change(function () {
    if (this.checked) {
        $(".allergy-input").attr({
            'value': '&allowedAllergy[]=393^Gluten-Free&allowedAllergy[]=394^Peanut-Free'
        })
    } else {
        $(".allergy-input").attr({
            'value': '&allowedAllergy[]='
        })
    }
});


var $maindisplay = $(".main-row");

$maindisplay.on('click', '.add-favorite', function () {
    debugger
    $(this).addClass(disabled="disabled")
    $(this).addClass('btn-success').html("Added!");

    var recipeIndex = $(this).closest('.recipe-inside').index()
    app.favRecipe(recipeIndex)

})