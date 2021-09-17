'use strict';
import { RECIPES } from "/js/recipes.js";
import * as tagService from "/js/tags.js";

let resultListElement = document.querySelector('#result-list');
// resultListElement.innerHTML = RECIPES[0]['name'];

let recipes = RECIPES;
let searchValue = ''
let selectedIngredients = [];
let selectedAppliance = '';
let selectedUstencils = [];
// Display all recipes on load
displayRecipes(launchSearch(recipes, selectedIngredients, selectedUstencils, selectedAppliance, searchValue));

let searchInput = document.querySelector('#search input');
searchInput.addEventListener('input', function(e){
  searchValue = e.target.value.trim();
  if(searchValue.length >= 3){
    console.log('launchSearch?')
    displayRecipes(launchSearch(recipes, selectedIngredients, selectedUstencils, selectedAppliance, searchValue));
  }
})

document.querySelector('#ingredientInput').addEventListener('click', function(){
  let list = document.querySelector('#ingredientList');
  list.style.display = 'block';
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
    displayRecipes(launchSearch(recipes, selectedIngredients, selectedUstencils, selectedAppliance, searchValue));
    list.style.display = 'none';
  });
})

document.querySelector('#applianceInput').addEventListener('click', function(){
  let list = document.querySelector('#applianceList');
  let tags = tagService.getApplianceForTags(RECIPES);
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
    displayRecipes(launchSearch(recipes, selectedIngredients, selectedUstencils, selectedAppliance, searchValue));
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
    displayRecipes(launchSearch(recipes, selectedIngredients, selectedUstencils, selectedAppliance, searchValue));
  });
})

function matchIngredients(recipe, selectedIngredients){
  let reducedRecipeIngredients = [];
  recipe.ingredients.forEach(ing => reducedRecipeIngredients.push(ing.ingredient))
  return selectedIngredients.every(ingredient => reducedRecipeIngredients.includes(ingredient));
}

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

function launchSearch(recipes, selectedIngredients, selectedUstencils, selectedAppliance, searchValue){
  let recipesSortedByTags = recipes.filter((recipe) => matchIngredients(recipe, selectedIngredients) && matchUstensils(recipe, selectedUstencils) && matchAppliance(recipe, selectedAppliance));

  let recipesSorted = recipesSortedByTags.filter((recipe) => {
    return recipe.name.toLowerCase().includes(searchValue) ||  
    recipe.ingredients.some((i) => i.ingredient.toLowerCase().includes(searchValue)) ||  
    recipe.description.toLowerCase().includes(searchValue);
  });

  return recipesSorted;
}

function displayRecipes(recipes){
  resultListElement.innerHTML = "";
  recipes.forEach((recipe, index) => {
    resultListElement.insertAdjacentHTML('beforeend', `
    <article class="recipe">
        <div class="recipe_image"><img src='/images/recipe-placeholder.jpg' alt=""></div>
        <div>
            <div class="recipe_header">
                <h2>${recipe.name}</h2>
                <p><i class="las la-clock"></i> ${recipe.time} min</p>
            </div>
            <div class="recipe_content">
                <ul id="ingredientsList_${index}" class="recipe_content_ingredients">
                </ul>
                <p>${recipe.description}</p>
            </div>
        </div>
    </article>`);
    let ingredientList = document.querySelector(`#ingredientsList_${index}`);
    recipe.ingredients.forEach(ingredient => {
      let unit = ingredient.unit || "";
      let quantity = ingredient.quantity || "nd";
      ingredientList.insertAdjacentHTML('beforeend', `<li><strong>${ingredient.ingredient} :</strong> ${quantity} ${unit}</li>`)
    })
  });

  console.log('selectedIngredients', selectedIngredients)
  console.log('selectedAppliance', selectedAppliance)
  console.log('selectedUstencils', selectedUstencils)

  displaySelectedTag(selectedIngredients, 'ingredientTag')
  displaySelectedTag([selectedAppliance], 'applianceTag');
  displaySelectedTag(selectedUstencils, 'ustensilTag')
}

function displaySelectedTag(arr, type){
  let tagList = document.querySelector('#selected_items');
  arr.forEach((tag, index) => {
    if(tag){
      tag = tag[0].toUpperCase() + tag.substring(1);
      tagList.insertAdjacentHTML('beforeend', `
      <div class='${type}'>${tag} <i class="las la-times-circle" id=tag_${index}></i></div>
      `)
      document.querySelector(`#tag_${index}`).addEventListener('click', () =>{
        arr.splice(arr.indexOf(tag), 1);
        tagList.innerHTML = "";
        console.log(arr)
      })
    }
  })
}




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
