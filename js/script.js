'use stric';
import { RECIPES } from "/js/recipes.js";
import * as tagService from "/js/tags.js";

console.log(RECIPES);

let resultListElement = document.querySelector('#result-list');
resultListElement.innerHTML = RECIPES[0]['name'];

let recipes = RECIPES;
let selectedIngredients = [];
let selectedAppliances = [];
let selectedUstencils = [];

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
      if(selectedAppliances.indexOf(e.target.innerHTML) === -1){
        selectedAppliances.push(e.target.innerHTML)
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

function matchIngredients(recipe, selectedIngredients){
  return selectedIngredients.every(ingredient => {
    return recipe.ingredients.includes(ingredient)
  })
}

function matchUstensils(recipe, selectedUstencils){
  return selectedUstencils.every(ingredient => {
    return recipe.ustencils.includes(ingredient)
  })
}

function matchAppliance(recipe, selectedAppliances){
  return selectedAppliances.every(ingredient => {
    return recipe.appliance.includes(ingredient)
  })
}

console.log(matchIngredients({ingredients: ['coco', 'lait']}, ['huile', 'truc']))
console.log(matchIngredients({ingredients: ['coco', 'lait']}, ['coco', 'lait', 'truc']))

let recipesSorted = recipes.filter((recipe) => {
  return recipe.name.toLowerCase().includes(searchValue) ||  
  recipe.ingredients.some((i) => i.ingredient.toLowerCase().includes(searchValue)) ||  
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
