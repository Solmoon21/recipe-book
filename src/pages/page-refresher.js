import RecipeCard from '../components/recipes-layout/recipe-card';

const isOnFavoritePage = () => {
  return document.querySelector('.nav-link.active').getAttribute('link-name') === 'favorite';
};

const removeCardByName = (recipeName) => {
  document.querySelectorAll('.card .card-name').forEach((cardNameDiv) => {
    if (cardNameDiv.innerText === recipeName) cardNameDiv.closest('.card').remove();
  });
};

const modifyCardByName = (prevName, newRecipeData) => {
  document.querySelectorAll('.card .card-name').forEach((cardNameDiv) => {
    if (cardNameDiv.innerText === prevName) {
      const cardDivToModify = cardNameDiv.closest('.card');
      cardDivToModify.after(RecipeCard(newRecipeData));
      cardDivToModify.remove();
    }
  });
};

const addNewCard = (newRecipeData) => {
  document.querySelector('.recipes-container:not(.popular) .card-container').append(RecipeCard(newRecipeData));
};

export { isOnFavoritePage, removeCardByName, modifyCardByName, addNewCard };
