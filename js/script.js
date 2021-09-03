'use stric';
import { RECIPES } from "/js/recipes.js";
import * as tagModule from "/js/tags.js";

console.log(RECIPES);

let resultListElement = document.querySelector('#result-list');
resultListElement.innerHTML = RECIPES[0]['name'];

let recipes = RECIPES;
let searchValue = 'chocolat'

let recipesSorted = recipes.filter((recipe) => {
  return recipe.name.toLowerCase().includes(searchValue) &&  
  recipe.ingredients.some((i) => i.ingredient.toLowerCase().includes(searchValue)) &&  
  recipe.description.toLowerCase().includes(searchValue);
});

console.log(recipesSorted)

console.log(tagModule.getIngredientForTags(recipesSorted));
console.log(tagModule.getUstensilForTags(recipesSorted));
console.log(tagModule.getApplianceForTags(recipesSorted));



// function research(request, appliance, ustensil, ingredients) {
//   let result = data.recipes.filter(recipe => 
//       matchAppliance(recipe, appliance) 
//       && matchUstensils(recipe, ustensil) 
//       && matchTagsIngredients(recipe, ingredients)
//       && ( matchName(recipe, request) || matchDescriptions(recipe, request) || matchIngredients(recipe, request))
//   );
//   return result;
// }
