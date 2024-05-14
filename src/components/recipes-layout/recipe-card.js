import * as RecipeDrawer from '../recipe-details/recipe-details';
import PopUp from '../popup/popup';

import './recipe-card.css';
import Recipe from '../../data-models/recipe';
import { getRecipeByID } from '../../api/Api';
import { showRecipeForm } from '../form/recipe-form';
import { isOnFavoritePage, modifyCardByName, removeCardByName } from '../../pages/page-refresher';

const RecipeCard = (recipe) => {
  const div = document.createElement('div');
  div.className = 'card';

  const actions = document.createElement('div');
  actions.className = 'actions';
  const favButton = document.createElement('button');
  if (recipe.isFavorite) {
    favButton.classList.add('active');
  }
  favButton.classList.add('action-btn', 'favorite-btn');
  favButton.addEventListener('click', async (e) => {
    e.stopPropagation();
    const recipeUpdated = await getRecipeByID(recipe.id);
    const recipeObj = new Recipe(recipeUpdated);
    recipeObj.isFavorite = !recipeObj.isFavorite;
    recipeObj.save();
    if (isOnFavoritePage()) removeCardByName(recipe.name);
    else modifyCardByName(recipe.name, recipeObj);
  });

  const editButton = document.createElement('button');
  editButton.className = 'action-btn';
  editButton.classList.add('action-btn', 'edit-btn');
  editButton.addEventListener('click', (e) => {
    e.stopPropagation();
    showRecipeForm(true, recipe);
  });

  const deleteButton = document.createElement('button');
  deleteButton.className = 'action-btn';
  deleteButton.classList.add('action-btn', 'delete-btn');
  deleteButton.addEventListener('click', (e) => {
    e.stopPropagation();
    PopUp('CONFIRMATION', 'Are you sure you want to delete this recipe?', 'CANCEL', 'YES, DELETE', () => {
      const recipeToDelete = new Recipe(recipe);
      recipeToDelete.delete();
      removeCardByName(recipe.name);
    });
  });

  actions.append(favButton, editButton, deleteButton);

  const title = document.createElement('div');
  title.classList.add('card-name', 'title-m');
  title.innerText = recipe.name;
  const ingredients = document.createElement('div');
  ingredients.classList.add('text', 'text-s', 'card-ingredients');
  ingredients.innerText = `${recipe.ingredients.length} Ingredients`;
  const time = document.createElement('div');
  time.classList.add('text', 'text-s', 'card-time');
  time.innerText = `${recipe.cookingTime} min`;
  const description = document.createElement('div');
  description.append(title, ingredients, time);

  div.append(actions, description);
  div.onclick = () => RecipeDrawer.renderRecipeDetails(recipe.id);
  return div;
};

export default RecipeCard;
