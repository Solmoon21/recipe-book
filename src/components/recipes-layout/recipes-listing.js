import './recipes-listing.css';

import RecipeCard from './recipe-card';

const RecipesListing = (data) => {
  const recipes = document.createElement('div');
  recipes.className = 'card-container';

  data.forEach((recipe) => {
    const card = RecipeCard(recipe);
    recipes.append(card);
  });

  return recipes;
};

export default RecipesListing;
