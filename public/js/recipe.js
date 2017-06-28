$(document).on('change', ':file', function() {
    var input = $(this),
        numFiles = input.get(0).files ? input.get(0).files.length : 1,
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [numFiles, label]);
});

$(document).ready( function() {
    $(':file').on('fileselect', function(event, numFiles, label) {
        console.log(numFiles);
        console.log(label);
    });
});
$(document).on('change', ':file', function() {
    var input = $(this),
        numFiles = input.get(0).files ? input.get(0).files.length : 1,
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [numFiles, label]);
});

console.log("hello")

// collect the information from the recpie from
$(".btn-success").on('click', function () {
    var newRecipe={}
newRecipe.recipeName=$("#recipeNameInput").val();
newRecipe.totalTimeInSeconds=$("#cookingTimeInput").val();
newRecipe.cuisine="Mexican";
newRecipe.ingredients=$("#recipeInstuctionsInput").val();
// newRecipe.imageAddress=$(".imageSourceInput").val();
newRecipe.imageAddress="C:\Users\dvir\Desktop\db music";
console.log(newRecipe)
});