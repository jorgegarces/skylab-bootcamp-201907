function RecipeDetails({ meal: { idMeal, strMeal, strInstructions, strYoutube, strMealThumb, favorite }, ingredients, onBack, onToggle }) {
    return <>
        <h3>{strMeal}</h3> 
        <FavButton active={favorite} onToggle={() => onToggle(idMeal)} />
        <img src={strMealThumb}/>
        <p>{strInstructions}</p>
        <p>{ingredients}</p>
        <a href={strYoutube} target="_blank" >VIDEO</a>

        <a href="#" onClick={ event => {
            event.preventDefault()
            onBack()
        }} >Go Back</a>
    </>
}