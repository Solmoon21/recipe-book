import { getAllRecipes } from '../api/Api';
import Header from '../components/header/header';
import RecipesListing from '../components/recipes-layout/recipes-listing';

const favorite = async () => {
  const contentContainer = document.createElement('div');
  contentContainer.className = 'content';

  const data = await getAllRecipes();

  const favRecipesContainer = document.createElement('div');
  const favRecipes = RecipesListing(data.filter((recipe) => recipe.isFavorite));
  favRecipesContainer.append(favRecipes);

  const content = document.createElement('div');
  content.append(favRecipesContainer);

  const header = Header('Favorite Recipes', false);
  contentContainer.append(header, content);
  return contentContainer;
};

export default favorite;
