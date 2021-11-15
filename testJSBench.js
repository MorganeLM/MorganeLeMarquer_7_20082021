function search(recipes, searchValue){
    return recipes.filter((recipe) => {
      return recipe.name.toLowerCase().includes(searchValue) ||  
      recipe.ingredients.some((i) => i.ingredient.toLowerCase().includes(searchValue)) ||  
      recipe.description.toLowerCase().includes(searchValue);
    });
  }
return search(recipes, "coco");

function search(recipes, searchValue){
var recipesSorted = [];
    recipes.forEach((recipe) => {
    if(recipe.name.toLowerCase().includes(searchValue) ||  
    recipe.ingredients.some((i) => i.ingredient.toLowerCase().includes(searchValue)) ||  
    recipe.description.toLowerCase().includes(searchValue)) {
        recipesSorted.push(recipe);
    }
    });
    return recipesSorted;
}
return search(recipes, "coco");
    