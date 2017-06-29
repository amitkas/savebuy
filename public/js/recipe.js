$(document).on('change', ':file', function() {
    var input = $(this),
        numFiles = input.get(0).files ? input.get(0).files.length : 1,
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');

    input.trigger('fileselect', [numFiles, label]);
});

console.log("hello")

// collect the information from the recpie from
$(".btn-success").on('click', function () {
    var x = $('.dropdown-toggle').attr("title");
  var newCuisine = x.toLowerCase().split(', ');
  // console.log(newCuisine);
    var newRecipe={}
newRecipe.recipeName=$("#recipeNameInput").val();
newRecipe.totalTimeInSeconds=$("#cookingTimeInput").val();
// newRecipe.cuisine=newCuisine;
newRecipe.cuisine='mexican';
newRecipe.ingredients=$("#recipeInstuctionsInput").val();
// newRecipe.imageRecipe=$("#imageSourceInput1").val();
// newRecipe.file=$("#imageSourceInput1").val();
newRecipe.imageRecipe="http://www.edtechsummit.org.il/wp-content/uploads/2016/06/Faces-Logos-400-56.png";
console.log(newRecipe);
saveNewRecipe(newRecipe);

});

  function saveNewRecipe(newRecipe) {
    $.ajax('/newrecipe', {
      method: "POST",
      data: newRecipe,
      success: function (data) {
          console.log("new recipe saved Thank you :)")
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
      }
    })
  }

