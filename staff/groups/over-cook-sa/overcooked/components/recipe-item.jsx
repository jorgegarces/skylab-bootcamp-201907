function RecipeItem ( { meal: { strMeal, strYoutube } } ) {
    return <>

        <h2>Random Recipe</h2>
        <h3>{strMeal}</h3>

        <h2 className="random-recipe">Random Recipe</h2>
        <h3 className="random-recipe recipe-title">{strMeal}</h3>
        <iframe className="random-recipe recipe-video" width="420" height="315" src={strYoutube}></iframe>    

    </>
}