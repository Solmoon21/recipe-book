import './recipe-details.css';

import background from '../../assets/background.png';
import { getIngredientByID, getRecipeByID } from '../../api/Api';
import PopUp from '../popup/popup';
import Recipe from '../../data-models/recipe';
import { showRecipeForm } from '../form/recipe-form';

import { isOnFavoritePage, modifyCardByName, removeCardByName } from '../../pages/page-refresher';

const baseClass = 'recipe-details';

export const closeRecipeDetails = () => {
  const recipeDrawer = document.querySelector(`.${baseClass}`);
  if (!recipeDrawer) return;

  const favButton = document.querySelector(`.${baseClass} .favorite-btn`);
  favButton.classList.remove('active');
  recipeDrawer.remove();
  document.querySelector(`.overlay`).style.display = 'none';
};

const RecipeDetails = () => {
  const container = document.createElement('div');
  container.className = baseClass;

  const image = document.createElement('img');
  image.className = `${baseClass}-image`;
  image.src = background;

  const closeBtn = document.createElement('button');
  closeBtn.classList.add('action-btn', 'close-details-btn');
  closeBtn.onclick = closeRecipeDetails;

  const name = document.createElement('div');
  name.className = `${baseClass}-name`;
  name.classList.add('sub-title', 'title-l');

  const time = document.createElement('div');
  time.className = `${baseClass}-cookingTime`;
  time.classList.add('sub-title', 'title-l');

  const description = document.createElement('p');
  description.className = `${baseClass}-description`;
  description.classList.add('text', 'text-m');

  const detailsContainer = document.createElement('div');
  detailsContainer.className = 'details-container';

  const div = document.createElement('div');
  div.append(name, time);

  const ingredients = document.createElement('div');
  ingredients.className = `${baseClass}-ingredients`;
  const title = document.createElement('div');
  title.innerText = 'Ingredients';
  title.classList.add('sub-title', 'title-m');
  const ingredientsList = document.createElement('ul');
  ingredientsList.className = `${baseClass}-ingredients-list`;
  ingredientsList.innerHTML = '';

  ingredients.append(title, ingredientsList);

  const actions = document.createElement('div');
  actions.className = 'actions';

  const favButton = document.createElement('button');
  favButton.classList.add('action-btn', 'favorite-btn');

  const editButton = document.createElement('button');
  editButton.classList.add('action-btn', 'edit-btn');

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('action-btn', 'delete-btn');
  deleteButton.onclick = PopUp;

  actions.append(favButton, editButton, deleteButton);

  detailsContainer.append(div, description, ingredients, actions);

  container.append(image, closeBtn, detailsContainer);
  container.onclick = (e) => {
    e.stopPropagation();
  };
  return container;
};

export const renderRecipeDetails = async (recipeID) => {
  const recipeDrawer = RecipeDetails();
  const overlay = document.querySelector('.overlay');
  overlay.append(recipeDrawer);

  const recipe = await getRecipeByID(recipeID);
  document.querySelector(`.${baseClass}-name`).innerText = recipe.name;
  document.querySelector(`.${baseClass}-cookingTime`).innerText = `${recipe.cookingTime} min`;
  document.querySelector(`.${baseClass}-description`).innerText = recipe.description;

  const ingredientsList = document.querySelector(`.${baseClass}-ingredients-list`);
  ingredientsList.innerHTML = '';
  recipe.ingredients.forEach(async (ingredient) => {
    const ingredientContainer = document.createElement('li');
    ingredientContainer.classList.add('text', 'text-s', `${baseClass}-ingredient`);

    const response = await getIngredientByID(ingredient.ingredientId);
    ingredientContainer.innerText = `${response.name} ${ingredient.amount} ${ingredient.amountType}`;

    ingredientsList.append(ingredientContainer);
  });

  const favButton = document.querySelector(`.${baseClass} .favorite-btn`);
  if (recipe.isFavorite) {
    favButton.classList.add('active');
  }
  favButton.onclick = async (e) => {
    e.stopPropagation();
    const recipeUpdated = await getRecipeByID(recipeID);
    const recipeObj = new Recipe(recipeUpdated);
    recipeObj.isFavorite = !recipeObj.isFavorite;
    await recipeObj.save();
    favButton.classList.toggle('active');
    if (isOnFavoritePage()) removeCardByName(recipe.name);
    else modifyCardByName(recipe.name, recipeObj);
  };

  const editButton = document.querySelector(`.${baseClass} .edit-btn`);
  editButton.onclick = async () => {
    recipeDrawer.remove();
    const recipeToEdit = await getRecipeByID(recipeID);
    showRecipeForm(true, recipeToEdit);
  };

  const deleteButton = document.querySelector(`.${baseClass} .delete-btn`);
  deleteButton.onclick = async () => {
    PopUp('CONFIRMATION', 'Are you sure you want to delete this recipe?', 'CANCEL', 'YES, DELETE', () => {
      const recipeToDelete = new Recipe(recipe);
      recipeToDelete.delete();
      removeCardByName(recipe.name);
    });
    recipeDrawer.remove();
  };

  overlay.style.display = 'block';
};

export default RecipeDetails;
