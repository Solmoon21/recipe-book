import { getAllRecipes } from '../api/Api';
import Header from '../components/header/header';
import RecipesListing from '../components/recipes-layout/recipes-listing';

const main = async () => {
  const contentContainer = document.createElement('div');
  contentContainer.className = 'content';

  const allRecipesList = await getAllRecipes();

  const todayRecipesContainer = document.createElement('div');
  todayRecipesContainer.className = 'recipes-container popular';
  const todayTitle = document.createElement('div');
  todayTitle.innerText = 'Recipe of the day';
  todayTitle.classList.add('sub-title', 'title-l');
  const todayRecipes = RecipesListing(allRecipesList.filter((recipe) => recipe.isPopular));
  todayRecipesContainer.append(todayTitle, todayRecipes);

  const allRecipesContainer = document.createElement('div');
  allRecipesContainer.className = 'recipes-container';
  const allTitle = document.createElement('div');
  allTitle.innerText = 'Explore recipes';
  allTitle.classList.add('sub-title', 'title-l');
  const allRecipes = RecipesListing(allRecipesList);
  allRecipesContainer.append(allTitle);
  allRecipesContainer.append(allRecipes);

  const content = document.createElement('div');
  content.append(todayRecipesContainer, allRecipesContainer);

  const header = Header('Recipes', true);
  contentContainer.append(header, todayRecipesContainer, allRecipesContainer);
  return contentContainer;
};

export default main;
