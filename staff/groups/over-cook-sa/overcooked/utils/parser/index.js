function recipeFormater(rawRecipes){ //array
    let recipes = []
    let ingredients
    let recipeDetails

        recipeDetails=rawRecipes
        ingredients =[]
        const recipeKeys = Object.keys(recipeDetails)
        const ingredientindex = recipeKeys.indexOf('strIngredient1')
        const measuresindex = recipeKeys.indexOf('strMeasure1')
        for( let i=0;i < recipeKeys.length; i++){
            if(i >= ingredientindex && i < measuresindex)ingredients.push({
                ingredientName: recipeDetails[recipeKeys[i]],
                measure: recipeDetails[recipeKeys[(i-ingredientindex)+measuresindex]],
            })
        }

        recipes.push({
            ingredients
        })
       if(rawRecipes.length === 1) return recipes[0]
    debugger
    return recipes
}