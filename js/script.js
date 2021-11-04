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
displayRecipes(launchSearch(recipes, selectedIngredients, selectedUstencils, selectedAppliance, searchValue));

// Search when typing on main input search
let searchInput = document.querySelector('#search input');
searchInput.addEventListener('input', function(e){
  searchValue = e.target.value.trim();
  if(searchValue.length >= 3){
    recipes = launchSearch(RECIPES, selectedIngredients, selectedUstencils, selectedAppliance, searchValue)
  }else{
    recipes = launchSearch(RECIPES, selectedIngredients, selectedUstencils, selectedAppliance, '')
  }
  displayRecipes(recipes);
})

let searchIngredientInput = document.querySelector('#ingredientInput');
let searchApplianceInput = document.querySelector('#applianceInput');
let searchUstensilInput = document.querySelector('#ustensilInput');
let searchIngredientInputLabel = document.querySelector('#ingredientInputLabel');
let searchApplianceInputLabel = document.querySelector('#applianceInputLabel');
let searchUstensilInputLabel = document.querySelector('#ustensilInputLabel');
let tags;
searchIngredientInput.addEventListener('change', filterSelectedTagList(tags, searchIngredientInput.value))

// generic function for event on input -> not working
function displayTags(tagListToggle, inputElement, inputLabelElement, listElement, getItemsForTag, selectedItems, type){
  console.log('before', tagListToggle)
  tagListToggle = !tagListToggle;
  console.log('after', tagListToggle)
  inputLabelElement.classList = 'hide';
  inputElement.classList = 'block';
  let list = document.querySelector(listElement);
  if(tagListToggle){
    list.style.display = 'block';
    tags = getItemsForTag(recipes);
    filterSelectedTagList(tags, inputValue);
    console.log(tags)
    tags.forEach(tag => {
      list.insertAdjacentHTML('beforeend', `<li>${tag}</li>`)
    })
    list.addEventListener("click", function(e) {
      // e.target is the clicked element!
      if(e.target && e.target.nodeName == "LI") {
        if(selectedItems.indexOf(e.target.innerHTML) === -1){
          selectedItems.push(e.target.innerHTML)
          recipes = launchSearch(RECIPES, selectedIngredients, selectedUstencils, selectedAppliance, searchValue);
          displayRecipes(recipes);
          displaySelectedTag(selectedItems, type)
        }
      }
      list.innerHTML = "";
      list.style.display = 'none';
      inputLabelElement.classList = 'block';
      inputElement.classList = 'none';
      tagListToggle = false;
    });
  }else{
    list.style.display = 'none';
    inputLabelElement.classList = 'block';
    inputElement.classList = 'none';
  }
}

//document.querySelector('#ingredientInputLabel').addEventListener('click', displayTags(ingredientListToggle, '#ingredientList', tagService.getIngredientForTags, selectedIngredients, 'ingredient'))


//let ingredientInputValue = '';
searchIngredientInput.addEventListener('input', e => {
  //ingredientInputValue = e.target.value;
  let ingredientList = document.querySelector('#ingredientList');
  ingredientList.innerHTML = '';
  tags = tagService.getIngredientForTags(recipes);
  tags = filterSelectedTagList(tags, e.target.value);
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
    searchIngredientInput.value = ""; // reset the input field
    ingredientList.innerHTML = "";
    ingredientList.style.display = 'none';
    searchIngredientInputLabel.classList = 'block';
    searchIngredientInput.classList = 'none';
    ingredientListToggle = false;
  });
})

searchIngredientInputLabel.addEventListener('click', function(e){
  ingredientListToggle = !ingredientListToggle;
  searchIngredientInputLabel.classList = 'hide';
  searchIngredientInput.classList = 'block';
  let ingredientList = document.querySelector('#ingredientList');
  if(ingredientListToggle){
    ingredientList.style.display = 'block';
    tags = tagService.getIngredientForTags(recipes);
    filterSelectedTagList(tags, searchIngredientInput.value);
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
      searchIngredientInputLabel.classList = 'block';
      searchIngredientInput.classList = 'none';
      ingredientListToggle = false;
    });
  }else{
    ingredientList.style.display = 'none';
    searchIngredientInputLabel.classList = 'block';
    searchIngredientInput.classList = 'none';
  }
})

// //appliance tag
// let applianceInputValue = "";
// searchApplianceInput.addEventListener('input', e => {
//   applianceInputValue = e.target.value;
//   let list = document.querySelector('#applianceList');
//   list.innerHTML = '';
//   tags = tagService.getApplianceForTags(recipes);
//   tags = filterSelectedTagList(tags, applianceInputValue);
//   tags.forEach(tag => {
//     list.insertAdjacentHTML('beforeend', `<li>${tag}</li>`)
//   })
//   list.addEventListener("click", function(e) {
//     // e.target is the clicked element!
//     if(e.target && e.target.nodeName == "LI") {
//       if(selectedAppliance.indexOf(e.target.innerHTML) === -1){
//         selectedAppliance.push(e.target.innerHTML)
//         recipes = launchSearch(RECIPES, selectedIngredients, selectedUstencils, selectedAppliance, searchValue);
//         displayRecipes(recipes);
//         displaySelectedTag(selectedAppliance, 'appliance');
//       }
//     }
//     searchApplianceInput.value = ""; // reset the input field
//     list.innerHTML = "";
//     list.style.display = 'none';
//     searchApplianceInputLabel.classList = 'block';
//     searchApplianceInput.classList = 'none';
//     applianceListToggle = false;
//   });
// })

// searchApplianceInputLabel.addEventListener('click', function(e){
//   applianceListToggle = !applianceListToggle;
//   searchApplianceInputLabel.classList = 'hide';
//   searchApplianceInput.classList = 'block';
//   let list = document.querySelector('#applianceList');
//   if(applianceListToggle){
//     list.style.display = 'block';
//     tags = tagService.getApplianceForTags(recipes);
//     filterSelectedTagList(tags, applianceInputValue);
//     tags.forEach(tag => {
//       list.insertAdjacentHTML('beforeend', `<li>${tag}</li>`)
//     })
//     list.addEventListener("click", function(e) {
//       // e.target is the clicked element!
//       if(e.target && e.target.nodeName == "LI") {
//         if(selectedAppliance.indexOf(e.target.innerHTML) === -1){
//           selectedAppliance.push(e.target.innerHTML)
//           recipes = launchSearch(RECIPES, selectedIngredients, selectedUstencils, selectedAppliance, searchValue);
//           displayRecipes(recipes);
//           displaySelectedTag(selectedAppliance, 'appliance');
//         }
//       }
//       list.innerHTML = "";
//       list.style.display = 'none';
//       searchApplianceInputLabel.classList = 'block';
//       searchApplianceInput.classList = 'none';
//       applianceListToggle = false;
//     });
//   }else{
//     list.style.display = 'none';
//     searchApplianceInputLabel.classList = 'block';
//     searchApplianceInput.classList = 'none';
//   }
// })

// // ustensil tag
// searchIngredientInput.addEventListener('input', e => {
//   inputValue = e.target.value;
//   let list = document.querySelector('#ingredientList');
//   list.innerHTML = '';
//   tags = tagService.getIngredientForTags(recipes);
//   tags = filterSelectedTagList(tags, inputValue);
//   tags.forEach(tag => {
//     list.insertAdjacentHTML('beforeend', `<li>${tag}</li>`)
//   })
//   list.addEventListener("click", function(e) {
//     // e.target is the clicked element!
//     if(e.target && e.target.nodeName == "LI") {
//       if(selectedIngredients.indexOf(e.target.innerHTML) === -1){
//         selectedIngredients.push(e.target.innerHTML)
//         recipes = launchSearch(RECIPES, selectedIngredients, selectedUstencils, selectedAppliance, searchValue);
//         displayRecipes(recipes);
//         displaySelectedTag(selectedIngredients, 'ingredient');
//       }
//     }
//     searchIngredientInput.value = ""; // reset the input field
//     list.innerHTML = "";
//     list.style.display = 'none';
//     searchIngredientInputLabel.classList = 'block';
//     searchIngredientInput.classList = 'none';
//     ingredientListToggle = false;
//   });
// })

// searchIngredientInputLabel.addEventListener('click', function(e){
//   ingredientListToggle = !ingredientListToggle;
//   searchIngredientInputLabel.classList = 'hide';
//   searchIngredientInput.classList = 'block';
//   let list = document.querySelector('#ingredientList');
//   if(ingredientListToggle){
//     list.style.display = 'block';
//     tags = tagService.getIngredientForTags(recipes);
//     filterSelectedTagList(tags, inputValue);
//     tags.forEach(tag => {
//       list.insertAdjacentHTML('beforeend', `<li>${tag}</li>`)
//     })
//     list.addEventListener("click", function(e) {
//       // e.target is the clicked element!
//       if(e.target && e.target.nodeName == "LI") {
//         if(selectedIngredients.indexOf(e.target.innerHTML) === -1){
//           selectedIngredients.push(e.target.innerHTML)
//           recipes = launchSearch(RECIPES, selectedIngredients, selectedUstencils, selectedAppliance, searchValue);
//           displayRecipes(recipes);
//           displaySelectedTag(selectedIngredients, 'ingredient');
//         }
//       }
//       list.innerHTML = "";
//       list.style.display = 'none';
//       searchIngredientInputLabel.classList = 'block';
//       searchIngredientInput.classList = 'none';
//       ingredientListToggle = false;
//     });
//   }else{
//     list.style.display = 'none';
//     searchIngredientInputLabel.classList = 'block';
//     searchIngredientInput.classList = 'none';
//   }
// })

document.querySelector('#applianceInput').addEventListener('click', function(){
  applianceListToggle = !applianceListToggle;
  let list = document.querySelector('#applianceList');
  if(applianceListToggle){
    let tags = tagService.getApplianceForTags(recipes);
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
      recipes = launchSearch(recipes, selectedIngredients, selectedUstencils, selectedAppliance, searchValue);
      displayRecipes(recipes);
      displaySelectedTag([selectedAppliance], 'appliance')
      list.innerHTML = "";
      list.style.display = 'none';
      applianceListToggle = false;
    });
  }else{
    list.style.display = 'none';
  }
})

document.querySelector('#ustensilInput').addEventListener('click', function(){
  ustencilListToggle = !ustencilListToggle;
  let list = document.querySelector('#ustensilList');
  if(ustencilListToggle){
    let tags = tagService.getUstensilForTags(recipes);
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
      recipes = launchSearch(recipes, selectedIngredients, selectedUstencils, selectedAppliance, searchValue);
      displayRecipes(recipes);
      displaySelectedTag(selectedUstencils, 'ustensil');
      list.innerHTML = "";
      list.style.display = 'none';
      ustencilListToggle = false;
    });
  }else{
    list.style.display = 'none';
  }
})

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
            recipes = launchSearch(RECIPES, selectedIngredients, selectedUstencils, arr, searchValue);
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

document.querySelector('#resestSearch').addEventListener('click', () => {
  searchInput.value = ''
  recipes = launchSearch(RECIPES, selectedIngredients, selectedUstencils, selectedAppliance, '')
  displayRecipes(recipes);
})


