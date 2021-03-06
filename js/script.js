'use strict';
import { RECIPES } from "/js/recipes.js";
import * as tagService from "/js/tags.js";

let resultListElement = document.querySelector('#result-list');

// Initialize the search
let recipes = RECIPES;
let searchValue = ''
let selectedIngredients = [];
let selectedAppliance = '';
let selectedUstencils = [];
let ingredientListToggle = false;
let applianceListToggle = false;
let ustencilListToggle = false;
// Display all recipes on load
displayRecipes(launchSearch(RECIPES, selectedIngredients, selectedUstencils, selectedAppliance, searchValue));

// Search when typing on main input search
let searchInput = document.querySelector('#search input');
searchInput.addEventListener('input', function(e){
  searchValue = e.target.value.trim().toLowerCase();
  if(searchValue.length >= 3){
    recipes = launchSearch(RECIPES, selectedIngredients, selectedUstencils, selectedAppliance, searchValue)
  }else{
    // display all when input value < 3 (working when wipe off)
    recipes = launchSearch(RECIPES, selectedIngredients, selectedUstencils, selectedAppliance, '')
  }
  displayRecipes(recipes);
})

// Get elements to filter by tag
let searchIngredientInput = document.querySelector('#ingredientInput');
let searchApplianceInput = document.querySelector('#applianceInput');
let searchUstensilInput = document.querySelector('#ustensilInput');
let searchIngredientInputLabel = document.querySelector('#ingredientInputLabel');
let searchApplianceInputLabel = document.querySelector('#applianceInputLabel');
let searchUstensilInputLabel = document.querySelector('#ustensilInputLabel');
let tags;


// Manage ingredient tags
let ingredientList = document.querySelector('#ingredientList');

searchIngredientInput.addEventListener('input', e => {
  // initialize the list
  ingredientList.innerHTML = '';
  // get the tags to dispay in function of current recipes
  tags = tagService.getIngredientForTags(recipes);
  tags = tags.filter(tag => !selectedIngredients.includes(tag))
  tags = filterSelectedTagList(tags, e.target.value);
  // limit to 30 elements
  if(tags.length > 30){
    tags = tags.slice(0, 30);
  }
  // set number of columns and size in function of tag array size
  if(tags.length === 1){
    ingredientList.style.width = '210px';
    ingredientList.style.gridTemplateColumns = '1fr';
    searchIngredientInput.style.width = '210px';
  }else if(tags.length === 2){
    ingredientList.style.width = '400px';
    ingredientList.style.gridTemplateColumns = '1fr 1fr';
    searchIngredientInput.style.width = '400px';
  }else{
    ingredientList.style.width = '600px';
    ingredientList.style.gridTemplateColumns = '1fr 1fr 1fr';
    searchIngredientInput.style.width = '600px';
  }
  // add tags in the HTML list element
  tags.forEach(tag => {
    ingredientList.insertAdjacentHTML('beforeend', `<li>${tag}</li>`)
  })
  // add events on tags 
  ingredientList.addEventListener("click", function(e) {
    // e.target is the clicked element!
    if(e.target && e.target.nodeName == "LI") {
      if(selectedIngredients.indexOf(e.target.innerHTML) === -1){
        selectedIngredients.push(e.target.innerHTML)
        recipes = launchSearch(RECIPES, selectedIngredients, selectedUstencils, selectedAppliance, searchValue);
        displayRecipes(recipes);
        displaySelectedTag(selectedIngredients, 'ingredient');
      }
    }
    searchIngredientInput.value = ""; // reset the input field
    ingredientList.innerHTML = "";
    ingredientList.style.display = 'none';
    searchIngredientInputLabel.classList = 'block';
    searchIngredientInput.classList = 'hide';
    ingredientListToggle = false;
  });
})

searchIngredientInputLabel.addEventListener('click', function(e){
  tags = tagService.getIngredientForTags(recipes);
  tags = tags.filter(tag => !selectedIngredients.includes(tag))
  filterSelectedTagList(tags, searchIngredientInput.value);
  if(tags.length > 0){
    ingredientListToggle = !ingredientListToggle;
    searchIngredientInputLabel.classList = 'hide';
    searchIngredientInput.classList = 'block';
    // hide other tag list if opened
    if(applianceListToggle){
      applianceListToggle = !applianceListToggle;
      searchApplianceInputLabel.classList = 'block';
      searchApplianceInput.classList = 'hide';
      applianceList.style.display = 'none';
    }else if(ustencilListToggle){
      ustencilListToggle = !ustencilListToggle;
      searchUstensilInputLabel.classList = 'block';
      searchUstensilInput.classList = 'hide';
      ustensilList.style.display = 'none';
    }
    //display ingredient tag list
    if(ingredientListToggle){
      ingredientList.style.display = 'grid';
      if(tags.length === 1){
        ingredientList.style.width = '210px';
        ingredientList.style.gridTemplateColumns = '1fr';
        searchIngredientInput.style.width = '210px';
      }else if(tags.length === 2){
        ingredientList.style.width = '400px';
        ingredientList.style.gridTemplateColumns = '1fr 1fr';
        searchIngredientInput.style.width = '400px';
      }else{
        ingredientList.style.width = '600px';
        ingredientList.style.gridTemplateColumns = '1fr 1fr 1fr';
        searchIngredientInput.style.width = '600px';
      }
      tags.forEach(tag => {
        ingredientList.insertAdjacentHTML('beforeend', `<li>${tag}</li>`)
      })
      ingredientList.addEventListener("click", function(e) {
        // e.target is the clicked element!
        if(e.target && e.target.nodeName == "LI") {
          if(selectedIngredients.indexOf(e.target.innerHTML) === -1){
            selectedIngredients.push(e.target.innerHTML)
            recipes = launchSearch(RECIPES, selectedIngredients, selectedUstencils, selectedAppliance, searchValue);
            displayRecipes(recipes);
            displaySelectedTag(selectedIngredients, 'ingredient');
          }
        }
        ingredientList.innerHTML = "";
        ingredientList.style.display = 'none';
        searchIngredientInput.style.width = '200px';
        searchIngredientInputLabel.classList = 'block';
        searchIngredientInput.classList = 'hide';
        ingredientListToggle = false;
      });
    }else{
      ingredientList.style.display = 'none';
      searchIngredientInput.style.width = '200px';
      searchIngredientInputLabel.classList = 'block';
      searchIngredientInput.classList = 'hide';
    }
  }
})

//appliance tag
let applianceList = document.querySelector('#applianceList');

searchApplianceInput.addEventListener('input', e => {
  applianceList.innerHTML = '';
  tags = tagService.getApplianceForTags(recipes);
  tags = tags.filter(tag => !selectedAppliance.includes(tag))
  tags = filterSelectedTagList(tags, e.target.value);
  if(tags.length === 1){
    applianceList.style.width = '210px';
    applianceList.style.gridTemplateColumns = '1fr';
    searchApplianceInput.style.width = '210px';
  }else if(tags.length === 2){
    applianceList.style.width = '400px';
    applianceList.style.gridTemplateColumns = '1fr 1fr';
    searchApplianceInput.style.width = '400px';
  }else{
    applianceList.style.width = '600px';
    applianceList.style.gridTemplateColumns = '1fr 1fr 1fr';
    searchApplianceInput.style.width = '600px';
  }
  tags.forEach(tag => {
    applianceList.insertAdjacentHTML('beforeend', `<li>${tag}</li>`)
  })
  applianceList.addEventListener("click", function(e) {
    // e.target is the clicked element!
    if(e.target && e.target.nodeName == "LI") {
      if(selectedAppliance.indexOf(e.target.innerHTML) === -1){
        selectedAppliance = e.target.innerHTML;
        recipes = launchSearch(RECIPES, selectedIngredients, selectedUstencils, selectedAppliance, searchValue);
        displayRecipes(recipes);
        displaySelectedTag([selectedAppliance], 'appliance');
      }
    }
    searchApplianceInput.value = ""; // reset the input field
    applianceList.innerHTML = "";
    applianceList.style.display = 'none';
    searchApplianceInputLabel.classList = 'block';
    searchApplianceInput.classList = 'hide';
    applianceListToggle = false;
  });
})

searchApplianceInputLabel.addEventListener('click', function(e){
  tags = tagService.getApplianceForTags(recipes);
  tags = tags.filter(tag => !selectedAppliance.includes(tag))
  filterSelectedTagList(tags, searchApplianceInput.value);
  if(tags.length > 0){
    applianceListToggle = !applianceListToggle;
    searchApplianceInputLabel.classList = 'hide';
    searchApplianceInput.classList = 'block';
    // hide other tag list if opened
    if(ingredientListToggle){
      ingredientListToggle = !applianceListToggle;
      searchIngredientInputLabel.classList = 'block';
      searchIngredientInput.classList = 'hide';
      ingredientList.style.display = 'none';
    }else if(ustencilListToggle){
      ustencilListToggle = !ustencilListToggle;
      searchUstensilInputLabel.classList = 'block';
      searchUstensilInput.classList = 'hide';
      ustensilList.style.display = 'none';
    }
    //display appliance tag list
    if(applianceListToggle){
      applianceList.style.display = 'grid';
      if(tags.length === 1){
        applianceList.style.width = '210px';
        applianceList.style.gridTemplateColumns = '1fr';
        searchApplianceInput.style.width = '210px';
      }else if(tags.length === 2){
        applianceList.style.width = '400px';
        applianceList.style.gridTemplateColumns = '1fr 1fr';
        searchApplianceInput.style.width = '400px';
      }else{
        applianceList.style.width = '600px';
        applianceList.style.gridTemplateColumns = '1fr 1fr 1fr';
        searchApplianceInput.style.width = '600px';
      }
      tags.forEach(tag => {
        applianceList.insertAdjacentHTML('beforeend', `<li>${tag}</li>`)
      })
      applianceList.addEventListener("click", function(e) {
        // e.target is the clicked element!
        if(e.target && e.target.nodeName == "LI") {
          if(selectedAppliance.indexOf(e.target.innerHTML) === -1){
            selectedAppliance = e.target.innerHTML;
            recipes = launchSearch(RECIPES, selectedIngredients, selectedUstencils, selectedAppliance, searchValue);
            displayRecipes(recipes);
            displaySelectedTag([selectedAppliance], 'appliance');
          }
        }
        applianceList.innerHTML = "";
        applianceList.style.display = 'none';
        searchApplianceInput.style.width = '200px';
        searchApplianceInputLabel.classList = 'block';
        searchApplianceInput.classList = 'hide';
        applianceListToggle = false;
      });
    }else{
      applianceList.style.display = 'none';
      searchApplianceInput.style.width = '200px';
      searchApplianceInputLabel.classList = 'block';
      searchApplianceInput.classList = 'hide';
    }
  }
})

// ustensil tag
let ustensilList = document.querySelector('#ustensilList');

searchUstensilInput.addEventListener('input', e => {
  ustensilList.innerHTML = '';
  tags = tagService.getUstensilForTags(recipes);
  tags = tags.filter(tag => !selectedUstencils.includes(tag))
  tags = filterSelectedTagList(tags, e.target.value);
  if(tags.length === 1){
    ustensilList.style.width = '210px';
    ustensilList.style.gridTemplateColumns = '1fr';
    searchUstensilInput.style.width = '210px';
  }else if(tags.length === 2){
    ustensilList.style.width = '400px';
    ustensilList.style.gridTemplateColumns = '1fr 1fr';
    searchUstensilInput.style.width = '400px';
  }else{
    ustensilList.style.width = '600px';
    ustensilList.style.gridTemplateColumns = '1fr 1fr 1fr';
    searchUstensilInput.style.width = '600px';
  }
  tags.forEach(tag => {
    ustensilList.insertAdjacentHTML('beforeend', `<li>${tag}</li>`)
  })
  ustensilList.addEventListener("click", function(e) {
    // e.target is the clicked element!
    if(e.target && e.target.nodeName == "LI") {
      if(selectedUstencils.indexOf(e.target.innerHTML) === -1){
        selectedUstencils.push(e.target.innerHTML)
        recipes = launchSearch(RECIPES, selectedIngredients, selectedUstencils, selectedAppliance, searchValue);
        displayRecipes(recipes);
        displaySelectedTag(selectedUstencils, 'ustensil');
      }
    }
    searchUstensilInput.value = ""; // reset the input field
    ustensilList.innerHTML = "";
    ustensilList.style.display = 'none';
    searchUstensilInputLabel.classList = 'block';
    searchUstensilInput.classList = 'hide';
    ustencilListToggle = false;
  });
})

searchUstensilInputLabel.addEventListener('click', function(e){
  tags = tagService.getUstensilForTags(recipes);
  tags = tags.filter(tag => !selectedUstencils.includes(tag))
  filterSelectedTagList(tags, searchUstensilInput.value);
  if(tags.length > 0){
    ustencilListToggle = !ustencilListToggle;
    searchUstensilInputLabel.classList = 'hide';
    searchUstensilInput.classList = 'block';
    // hide other tag list if opened
    if(ingredientListToggle){
      ingredientListToggle = !applianceListToggle;
      searchIngredientInputLabel.classList = 'block';
      searchIngredientInput.classList = 'hide';
      ingredientList.style.display = 'none';
    }else if(applianceListToggle){
      applianceListToggle = !applianceListToggle;
      searchApplianceInputLabel.classList = 'block';
      searchApplianceInput.classList = 'hide';
      applianceList.style.display = 'none';
    }
    //display ustensil tag list
    if(ustencilListToggle){
      ustensilList.style.display = 'grid';
      if(tags.length === 1){
        ustensilList.style.width = '210px';
        ustensilList.style.gridTemplateColumns = '1fr';
        searchUstensilInput.style.width = '210px';
      }else if(tags.length === 2){
        ustensilList.style.width = '400px';
        ustensilList.style.gridTemplateColumns = '1fr 1fr';
        searchUstensilInput.style.width = '400px';
      }else{
        ustensilList.style.width = '600px';
        ustensilList.style.gridTemplateColumns = '1fr 1fr 1fr';
        searchUstensilInput.style.width = '600px';
      }
      tags.forEach(tag => {
        ustensilList.insertAdjacentHTML('beforeend', `<li>${tag}</li>`)
      })
      ustensilList.addEventListener("click", function(e) {
        // e.target is the clicked element!
        if(e.target && e.target.nodeName == "LI") {
          if(selectedUstencils.indexOf(e.target.innerHTML) === -1){
            selectedUstencils.push(e.target.innerHTML)
            recipes = launchSearch(RECIPES, selectedIngredients, selectedUstencils, selectedAppliance, searchValue);
            displayRecipes(recipes);
            displaySelectedTag(selectedUstencils, 'ustensil');
          }
        }
        ustensilList.innerHTML = "";
        ustensilList.style.display = 'none';
        searchUstensilInput.style.width = '200px';
        searchUstensilInputLabel.classList = 'block';
        searchUstensilInput.classList = 'hide';
        ustencilListToggle = false;
      });
    }else{
      ustensilList.style.display = 'none';
      searchUstensilInput.style.width = '200px';
      searchUstensilInputLabel.classList = 'block';
      searchUstensilInput.classList = 'hide';
    }
  }
})

// close all when click outside menu (->header for now)
document.querySelector('header').addEventListener('click', () => {
  searchIngredientInput.value = "";
  ingredientList.innerHTML = "";
  ingredientList.style.display = 'none';
  searchIngredientInputLabel.classList = 'block';
  searchIngredientInput.classList = 'hide';
  ingredientListToggle = false;
  //
  applianceList.innerHTML = "";
  applianceList.style.display = 'none';
  searchApplianceInputLabel.classList = 'block';
  searchApplianceInput.classList = 'hide';
  applianceListToggle = false;
  //
  ustensilList.innerHTML = "";
  ustensilList.style.display = 'none';
  searchUstensilInputLabel.classList = 'block';
  searchUstensilInput.classList = 'hide';
  ustencilListToggle = false;
})

// FUNCTIONS
function filterSelectedTagList(list, searchTagValue){
  if(list){
    return list.filter((tag) => tag.toLowerCase().includes(searchTagValue.trim().toLowerCase()))
  }
}

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

  //v1
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
  if(recipes.length === 0){
    resultListElement.innerHTML = "<div id='noResult'><p>Aucune recette ne correspond ?? votre recherche.</p></div>"
  }
}

function displaySelectedTag(arr, type){
  let tagList = document.querySelector('#selected_items_'+type);
  tagList.innerHTML = "";
  arr.forEach((tag, index) => {
    if(tag){
      tag = tag[0].toUpperCase() + tag.substring(1);
      tagList.insertAdjacentHTML('beforeend', `
      <div>${tag} <i class="las la-times-circle" id=tag_${type}_${index}></i></div>
      `)
      document.querySelector(`#tag_${type}_${index}`).style.borderRadius = '10px';
      document.querySelector(`#tag_${type}_${index}`).addEventListener('click', () =>{
        arr.splice(arr.indexOf(tag), 1);
        tagList.innerHTML = "";
        displaySelectedTag(arr, type);
        switch(type){
          case 'ingredient':
            recipes = launchSearch(RECIPES, arr, selectedUstencils, selectedAppliance, searchValue);
            break;
          case 'appliance':
            selectedAppliance = '';
            recipes = launchSearch(RECIPES, selectedIngredients, selectedUstencils, '', searchValue);
            break;
          case 'ustensil':
            recipes = launchSearch(RECIPES, selectedIngredients, arr, selectedAppliance, searchValue);
            break;
        }
        displayRecipes(recipes);
      })
    }
  })
}




