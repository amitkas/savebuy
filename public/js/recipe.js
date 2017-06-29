$(document).on('change', ':file', function () {
  var input = $(this),
    numFiles = input.get(0).files ? input.get(0).files.length : 1,
    label = input.val().replace(/\\/g, '/').replace(/.*\//, '');

  input.trigger('fileselect', [numFiles, label]);
});


// collect the information from the recpie from
$(".btn-success").on('click', function () {
  var x = $('.dropdown-toggle').attr("title");
  var newRecipe = {};
  newRecipe.recipeName = $("#recipeNameInput").val();
  newRecipe.totalTimeInSeconds = $("#cookingTimeInput").val();
  newRecipe.cuisine = x;
  newRecipe.ingredients = $("#recipeInstuctionsInput").val();
  newRecipe.imageRecipe = "http://www.edtechsummit.org.il/wp-content/uploads/2016/06/Faces-Logos-400-56.png";
  saveNewRecipe(newRecipe);

});

function saveNewRecipe(newRecipe) {
  $.ajax('/newrecipe', {
    method: "POST",
    data: newRecipe,
    success: function (data) {
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  })
}