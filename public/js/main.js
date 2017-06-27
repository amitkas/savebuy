var FoodApp = function () {

    var foods = [];

    var recipeSearch = function (text) {
        $.ajax({
            method: "GET",
            url: 'http://api.yummly.com/v1/api/recipes?_app_id=06389aba&_app_key=5ac00c18990b0551a19a507887252268&q=' + [text] + '',
            success: function (data) {
                // console.log(data.matches[1].recipeName)
                for (var i = 0; i < data.matches.length; i++) {
                    debugger
                 var recipeName = data.matches[i].recipeName
                 console.log(recipeName)
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
    };

return {
    recipeSearch: recipeSearch
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


//   var $comment = $(this).siblings('.comment');
//   var $user = $(this).siblings('.name');

//   if ($comment.val() === "" || $user.val() === "") {
//     alert("Please enter your name and a comment!");
//     return;
//   }

//   var postIndex = $(this).closest('.post').index();
//   var postID= $(this).closest('div').parent('.post').data().id

//   var newComment = {
//     text: $comment.val(),
//     user: $user.val(),