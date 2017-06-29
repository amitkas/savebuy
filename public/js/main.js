var FoodApp = function () {

    var foods = [];
    // var favs = []

    var getmyFavorites = function () {
        var favs = []
        $.ajax('/favrecipe', {
            method: "GET",
            success: function (data) {
                favs = data
                renderFavs(favs)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('sry, you do not have favorites');
            }
        })
    }


    var getmyRecipes = function () {
        var myrec = []
        $.ajax('/newrecipe', {
            method: "GET",
            success: function (data) {
                myrec = data
                console.log(myrec)
                renderMyRecipes(myrec)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('sry, you do not any recepies of your own!');
            }
        })
    }



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

    var addRecipeOptions = function (recipeName, recipeimage, ingredients, rating, cookingtime, recipeid, course) {
        var food = {
            recipeName: recipeName,
            recipeimage: recipeimage,
            ingredients: ingredients,
            rating: rating,
            cookingtime: cookingtime,
            recipeid: recipeid,
            // cuisine: cuisine,
            course: course
        }
        foods.push(food);
        renderRecipes()
    }


    var recipeSearch = function (text, recipetosearch, veggieCheck, allergyCheck) {
        foods = []
        $.ajax({
            method: "GET",
            url: 'http://api.yummly.com/v1/api/recipes?_app_id=06389aba&_app_key=5ac00c18990b0551a19a507887252268&q=' + [text] + [recipetosearch] + [veggieCheck] + [allergyCheck] + '&requirePictures=true&maxResult=20&start=20',
            success: function (data) {
                for (var i = 0; i < data.matches.length; i++) {
                    var recipeName = data.matches[i].recipeName
                    var recipeimage = data.matches[i].smallImageUrls[0]
                    var ing = data.matches[i].ingredients
                    var rating = data.matches[i].rating
                    var cookingtime = data.matches[i].totalTimeInSeconds / 60
                    var recipeid = data.matches[i].id
                    // var cuisine = data.matches[i].attributes.cuisine[0]
                    var course = data.matches[i].attributes.course[0]

                    // var course = coursedraft.toString();
                    var ingredients = ing.toString();
                    addRecipeOptions(recipeName, recipeimage, ingredients, rating, cookingtime, recipeid, course)
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
    };

    var removeFavorite = function (removeid) {
        $.ajax({
            type: "DELETE",
            url: '/favrecipe/' + removeid,
            data: (removeid),
            success: function (result) {
                //   posts[postIndex] = result
                //   getmyFavorites()
                alert('removed')
            }
        })
    }


    var renderRecipes = function () {
        $('.main-row').empty();
        console.log(foods)
        var source = $('#recipe-template').html();
        var template = Handlebars.compile(source);
        for (var i = 0; i < foods.length; i++) {
            var newHTML = template(foods[i]);
            $('.main-row').append(newHTML);
        }
    }


    var renderFavs = function (myfavs) {
        var favs = myfavs
        console.log(favs)
        $('.favs-main-row').empty();
        var source = $('#fav-recipe-template').html();
        var template = Handlebars.compile(source);
        for (var i = 0; i < favs.length; i++) {
            var newHTML = template(favs[i]);
            $('.favs-main-row').append(newHTML);
        }
    }

    var renderMyRecipes = function (myrecp) {
        var myrec = myrecp
        $('.myrec-main-row').empty();
        var source = $('#my-recipe-template').html();
        var template = Handlebars.compile(source);
        for (var i = 0; i < myrec.length; i++) {
            var newHTML = template(myrec[i]);
            $('.myrec-main-row').append(newHTML);
        }
    }


    return {
        recipeSearch: recipeSearch,
        favRecipe: favRecipe,
        getmyFavorites: getmyFavorites,
        getmyRecipes: getmyRecipes,
        removeFavorite: removeFavorite
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


$('.my-favs :checkbox').change(function () {
    if (this.checked) {
        app.getmyFavorites()
    } else {
        $('.favs-main-row').empty();
    }
})

$('.my-recps :checkbox').change(function () {
    if (this.checked) {
        app.getmyRecipes()
    } else {
        $('.myrec-main-row').empty();
    }
})

var $maindisplay = $(".main-row");

$maindisplay.on('click', '.add-favorite', function () {
    $(this).addClass(disabled = "disabled")
    $(this).addClass('btn-success').html("Added!");

    var recipeIndex = $(this).closest('.recipe-inside').index()
    app.favRecipe(recipeIndex)

})

var $favDisplay = $('.favs-main-row');

$favDisplay.on('click', '.remove-favorite', function () {
    var favID = $(this).parents('.thumbnail').data().id
    $(this).addClass(disabled = "disabled")
    $(this).addClass('btn-success').html("Removed!");
    // app.removeFavorite(removeID)
})