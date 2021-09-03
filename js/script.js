'use stric';
import { RECIPES } from "/js/recipes.js";


console.log(RECIPES);

let resultListElement = document.querySelector('#result-list');
resultListElement.innerHTML = RECIPES[0]['name'];


function getIngredientForTags(array){
  let ingredients = [];
  array.forEach(element => {
    element.ingredients.forEach(ingredient => {
      if(!ingredients.includes(ingredient.ingredient)){
        ingredients.push(ingredient.ingredient)
      }
    })
  });
  return ingredients.sort();
}
console.log(getIngredientForTags(RECIPES));

function getUstensilForTags(array){
  let ustensils = [];
  array.forEach(element => {
    element.ustensils.forEach(ustensil => {
      if(!ustensils.includes(ustensil)){
        ustensils.push(ustensil)
      }
    })
  });
  return ustensils.sort();
}
console.log(getUstensilForTags(RECIPES));


function getApplianceForTags(array){
  let appliances = [];
  array.forEach(element => {
    if(!appliances.includes(element.appliance)){
      appliances.push(element.appliance)
    }
  });
  return appliances.sort();
}
console.log(getApplianceForTags(RECIPES));


// recipesSorted = recipes.filter((recipe) => {
//       return recipe.name.toLowerCase().includes(searchValue)  
//       recipe.ingredients.some((i) => i.ingredient.toLowerCase().includes(searchValue))  
//       recipe.description.toLowerCase().includes(searchValue);
//     });

// function research(request, appliance, ustensil, ingredients) {
//   let result = data.recipes.filter(recipe => 
//       matchAppliance(recipe, appliance) 
//       && matchUstensils(recipe, ustensil) 
//       && matchTagsIngredients(recipe, ingredients)
//       && ( matchName(recipe, request) || matchDescriptions(recipe, request) || matchIngredients(recipe, request))
//   );
//   return result;
// }
