import { addNewRecipe, deleteRecipeByID, updateRecipeByID } from '../api/Api';

class Recipe {
  constructor(recipeData) {
    this.id = recipeData.id;
    this.name = recipeData.name;
    this.description = recipeData.description;
    this.label = recipeData.label;
    this.cookingTime = recipeData.cookingTime;
    this.isFavorite = recipeData.isFavorite || false;
    this.isPopular = recipeData.isPopular || false;
    this.ingredients = recipeData.ingredients || [];
  }

  addIngredient(ingredient) {
    this.ingredient.push(ingredient);
  }

  removeIngredient(ingredient) {
    this.ingredient = this.ingredient.filter((item) => item !== ingredient);
  }

  async create() {
    await addNewRecipe(this);
  }

  async save() {
    await updateRecipeByID(this.id, this);
  }

  delete() {
    deleteRecipeByID(this.id);
  }
}

export default Recipe;
