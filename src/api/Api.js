const BASE_URL = 'http://localhost:3000';
const PATHS = {
  recipes: 'recipes',
  ingredients: 'ingredients',
};

export const getAllRecipes = async () => {
  const response = await fetch(`${BASE_URL}/${PATHS.recipes}`).then((resp) => resp.json());
  return response;
};

export const getRecipeByID = async (id) => {
  const response = await fetch(`${BASE_URL}/${PATHS.recipes}/${id}`).then((resp) => resp.json());
  return response;
};

export const getAllIngredients = async () => {
  const response = await fetch(`${BASE_URL}/${PATHS.ingredients}`).then((resp) => resp.json());
  return response;
};

export const getIngredientByID = async (id) => {
  const response = await getAllIngredients();
  const result = response.find((item) => item.id === id);
  return result;
};

export const addNewRecipe = async (newRecipe) => {
  try {
    const response = await fetch(`${BASE_URL}/${PATHS.recipes}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newRecipe),
    });
    return response.ok;
  } catch (e) {
    return false;
  }
};

export const deleteRecipeByID = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${PATHS.recipes}/${id}`, {
      method: 'DELETE',
    });
    return response.ok;
  } catch (e) {
    return false;
  }
};

export const updateRecipeByID = async (id, newValues) => {
  try {
    const response = await fetch(`${BASE_URL}/${PATHS.recipes}/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newValues),
    });
    return response.ok;
  } catch (e) {
    return false;
  }
};
