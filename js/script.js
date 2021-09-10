'use strict';
import { RECIPES } from "/js/recipes.js";
import * as tagService from "/js/tags.js";

let resultListElement = document.querySelector('#result-list');
resultListElement.innerHTML = RECIPES[0]['name'];

let recipes = RECIPES;
let selectedIngredients = [];
let selectedAppliance = '';
let selectedUstencils = [];

let searchValue = document.querySelector('#search input').value

document.querySelector('#ingredientInput').addEventListener('click', function(){
  let list = document.querySelector('#ingredientList');
  let tags = tagService.getIngredientForTags(RECIPES);
  tags.forEach(tag => {
    list.insertAdjacentHTML('beforeend', `<li>${tag}</li>`)
  })
  list.addEventListener("click", function(e) {
    // e.target is the clicked element!
    if(e.target && e.target.nodeName == "LI") {
      if(selectedIngredients.indexOf(e.target.innerHTML) === -1){
        selectedIngredients.push(e.target.innerHTML)
      }
    }
  });
})

document.querySelector('#applianceInput').addEventListener('click', function(){
  let list = document.querySelector('#applianceList');
  let tags = tagService.getUstensilForTags(RECIPES);
  tags.forEach(tag => {
    list.insertAdjacentHTML('beforeend', `<li>${tag}</li>`)
  })
  list.addEventListener("click", function(e) {
    // e.target is the clicked element!
    if(e.target && e.target.nodeName == "LI") {
      if(selectedAppliance.indexOf(e.target.innerHTML) === -1){
        selectedAppliance = e.target.innerHTML;
      }
    }
  });
})

document.querySelector('#ustensilInput').addEventListener('click', function(){
  let list = document.querySelector('#ustensilList');
  let tags = tagService.getUstensilForTags(RECIPES);
  tags.forEach(tag => {
    list.insertAdjacentHTML('beforeend', `<li>${tag}</li>`)
  })
  list.addEventListener("click", function(e) {
    // e.target is the clicked element!
    if(e.target && e.target.nodeName == "LI") {
      if(selectedUstencils.indexOf(e.target.innerHTML) === -1){
        selectedUstencils.push(e.target.innerHTML)
      }
    }
  });
})

// function matchIngredients(recipe, selectedIngredients){
//   return selectedIngredients.every(ingredient => recipe.ingredients.includes(ingredient));
// }

// function matchIngredients(recipe, selectedIngredients){
//   return selectedIngredients.every(ingredient => {
//     recipe.ingredients.forEach(ingredientOfRecipe => {
//       console.log(ingredientOfRecipe.ingredient, ingredient)
//       return ingredientOfRecipe.ingredient === ingredient
//     })
//   });
// }

function matchIngredients(recipe, selectedIngredients){
  let reducedRecipeIngredients = [];
  recipe.ingredients.forEach(ing => reducedRecipeIngredients.push(ing.ingredient))
  //console.log(reducedRecipeIngredients)
  return selectedIngredients.every(ingredient => reducedRecipeIngredients.includes(ingredient));
}

// let exRecipe = {
//   "id": 50,
//   "name": "Frangipane",
//   "servings": 2,
//   "ingredients": [
//     {
//       "ingredient": "Pâte feuilletée",
//       "quantity": 400,
//       "unit": "grammes"
//     },
//     {
//       "ingredient": "Oeuf",
//       "quantity": 6
//     },
//     {
//       "ingredient": "Poudre d'amendes",
//       "quantity": 500,
//       "unit": "grammes"
//     },
//     {
//       "ingredient": "Beurre",
//       "quantity": 500,
//       "unit": "grammes"
//     },
//     {
//       "ingredient": "Sucre glace",
//       "quantity": 500,
//       "unit": "grammes"
//     }
//   ],
//   "time": 60,
//   "description": "Préparer la frangipane : Mélanger le sucre la poudre d'amander, le beurre et les oeufs. Etaler la moitier de la pate feuilleté et mettre dans un moule à tarte. Garnir de frangipane et recouvrir du reste de pate feuilletée. Mettre au four 30 minutes",
//   "appliance": "Four",
//   "ustensils": [
//     "rouleau à patisserie",
//     "fouet"
//   ]
// }
// let exSelectedIng = ['Beurre', 'Oeuf']
// console.log('exTest', matchIngredients(exRecipe, exSelectedIng))

function matchUstensils(recipe, selectedUstencils){
  return selectedUstencils.every(ustencil => recipe.ustensils.includes(ustencil))
}

function matchAppliance(recipe, selectedAppliance){
  if(selectedAppliance){
    return selectedAppliance === recipe.appliance;
  }else{
    return true;
  }
}

selectedIngredients = [];
selectedUstencils = []
searchValue = 'coco';
selectedAppliance = 'Saladier'

let recipesSortedByTags = recipes.filter((recipe) => {
  //console.log(recipe)
  //console.log(matchIngredients(recipe, selectedIngredients))
  return matchIngredients(recipe, selectedIngredients) && matchUstensils(recipe, selectedUstencils) && matchAppliance(recipe, selectedAppliance);
});

console.log('recipesSortedByTags', recipesSortedByTags)

let recipesSorted = recipesSortedByTags.filter((recipe) => {
  return recipe.name.toLowerCase().includes(searchValue) ||  
  recipe.ingredients.some((i) => i.ingredient.toLowerCase().includes(searchValue)) ||  
  recipe.description.toLowerCase().includes(searchValue);
});

console.log(recipesSorted)

//console.log(tagService.getIngredientForTags(recipesSorted));
//console.log(tagService.getUstensilForTags(recipesSorted));
//console.log(tagService.getApplianceForTags(recipesSorted));






// function research(request, appliance, ustensil, ingredients) {
//   let result = data.recipes.filter(recipe => 
//       matchAppliance(recipe, appliance) 
//       && matchUstensils(recipe, ustensil) 
//       && matchTagsIngredients(recipe, ingredients)
//       && ( matchName(recipe, request) || matchDescriptions(recipe, request) || matchIngredients(recipe, request))
//   );
//   return result;
// }


//refacto create tag list (not working on click)
// function createTagList(listElement, getFunction){
//   let list = document.querySelector(listElement);
//   let tags = getFunction(RECIPES);
//   tags.forEach(tag => {
//     list.insertAdjacentHTML('beforeend', `<li>${tag}</li>`)
//   })
//   list.addEventListener("click", function(e) {
//     // e.target is the clicked element!
//     if(e.target && e.target.nodeName == "LI") {
//       if(selectedTag.indexOf(e.target.innerHTML) === -1){
//         selectedTag.push(e.target.innerHTML)
//       }
//     }
//   });
// }

// document.querySelector('#ingredientInput').addEventListener('click', createTagList('#ingredientList', tagService.getIngredientForTags));
// document.querySelector('#applianceInput').addEventListener('click', createTagList('#applianceList', tagService.getApplianceForTags));
// document.querySelector('#ustensilInput').addEventListener('click', createTagList('#ustensilList', tagService.getUstensilForTags));

// // composant pour les tags
// class TagInput extends HTMLElement{
//   constructor(){
//     super();
//     this.innerHTML = 'Hello Input'
//   }
// }

// customElements.define('tag-input', TagInput)
