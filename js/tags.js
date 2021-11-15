
export function getIngredientForTags(array){
    let ingredients = [];
    array.forEach(element => {
        element.ingredients.forEach(ingredient => {
            if(!ingredients.includes(ingredient.ingredient)){
                ingredients.push(ingredient.ingredient)
            }
        })
    });
    if(ingredients.length > 30){
        ingredients = ingredients.slice(0, 30);
    }
    return ingredients;
}

export function getUstensilForTags(array){
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

export function getApplianceForTags(array){
    let appliances = [];
    array.forEach(element => {
        if(!appliances.includes(element.appliance)){
        appliances.push(element.appliance)
        }
    });
    return appliances.sort();
}

