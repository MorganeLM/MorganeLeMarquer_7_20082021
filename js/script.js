'use stric';
import { RECIPES } from "/js/recipes.js";
import * as tagModule from "/js/tags.js";

console.log(RECIPES);

let resultListElement = document.querySelector('#result-list');
resultListElement.innerHTML = RECIPES[0]['name'];

let recipes = RECIPES;

