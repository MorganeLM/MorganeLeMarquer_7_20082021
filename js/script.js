'use stric';
import { RECIPES } from "/js/recipes.js";
import * as tagService from "/js/tags.js";

console.log(RECIPES);

let resultListElement = document.querySelector('#result-list');
resultListElement.innerHTML = RECIPES[0]['name'];

let recipes = RECIPES;
let selectedTag = [];

document.querySelector('#ingredientInput').addEventListener('click', function(){
  let list = document.querySelector('#ingredientList');
  let tags = tagService.getIngredientForTags(RECIPES);
  tags.forEach(tag => {
    list.insertAdjacentHTML('beforeend', `<li>${tag}</li>`)
  })
  list.addEventListener("click", function(e) {
    // e.target is the clicked element!
    if(e.target && e.target.nodeName == "LI") {
      if(selectedTag.indexOf(e.target.innerHTML) === -1){
        selectedTag.push(e.target.innerHTML)
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
      if(selectedTag.indexOf(e.target.innerHTML) === -1){
        selectedTag.push(e.target.innerHTML)
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
      if(selectedTag.indexOf(e.target.innerHTML) === -1){
        selectedTag.push(e.target.innerHTML)
      }
    }
  });
})



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