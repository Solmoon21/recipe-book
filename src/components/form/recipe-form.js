/* eslint-disable no-use-before-define */
import './recipe-form.css';

import FormField from './form-field';
import SelectInput, { validateSelectInput } from '../Input/select-input/select-input';
import AmountInput from '../Input/amount-input/amount-input';

import Recipe from '../../data-models/recipe';
import { getAllIngredients, getRecipeByID } from '../../api/Api';
import { addNewCard, modifyCardByName } from '../../pages/page-refresher';

const inputTypes = {
  text: 'text',
  number: 'number',
  select: 'select',
  amount: 'amount',
};

const allIngredients = await getAllIngredients();

const addIngredientField = (baseClass, container, index, values, editMode) => {
  const ingredientOptions = allIngredients.map((ingredient) => ({ display: ingredient.name, value: ingredient.id }));
  const ingredientInput = SelectInput(
    `${baseClass}-ingredient-${index}`,
    `Ingredient #${index}`,
    `ingredient-${index}`,
    ingredientOptions,
    values ? allIngredients[values.ingredientId - 1].name : ''
  );

  const ammountInput = AmountInput(
    [`ingredient-amount-${index}`, `ingredient-unit-${index}`],
    ['15', 'pc'],
    [`amount-${index}`, `unit-${index}`],
    values ? [values.amount, values.amountType] : ['', '']
  );

  const ingredientField = document.createElement('div');
  ingredientField.classList.add(`${baseClass}-row`, 'gapped');
  ingredientField.append(ingredientInput, ammountInput);

  if (editMode) {
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('action-btn', 'delete-btn');
    deleteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      ingredientField.remove();
    });
    ingredientField.append(deleteBtn);
  }

  container.append(ingredientField);
};

const handleSubmit = async (formData, editMode, prevName) => {
  const formDataJson = {};
  const ingredientKeys = [];

  formData.forEach((value, key) => {
    formDataJson[key] = value;
    if (key.includes('ingredient')) {
      ingredientKeys.push(Number(key.split('-')[1]));
    }
  });

  const recipeToEdit = await getRecipeByID(formDataJson.id);
  const { name, cookingTime, description } = { ...formDataJson };

  recipeToEdit.name = name;
  recipeToEdit.cookingTime = cookingTime;
  recipeToEdit.description = description;
  const ingredients = ingredientKeys.map((key) => {
    return {
      ingredientId: Number(formDataJson[`ingredient-${key}`]),
      amount: Number(formDataJson[`amount-${key}`]),
      amountType: formDataJson[`unit-${key}`],
    };
  });
  recipeToEdit.ingredients = ingredients;
  const newRecipe = new Recipe(recipeToEdit);
  if (editMode) {
    newRecipe.id = formDataJson.id;
    await newRecipe.save();
  } else {
    await newRecipe.create();
  }
  if (editMode) modifyCardByName(prevName, newRecipe);
  else addNewCard(newRecipe);
  closeRecipeForm();
};

const RecipeForm = (editMode, values) => {
  const baseClass = 'recipe-form';
  const form = document.createElement('form');
  form.className = baseClass;

  const title = document.createElement('h1');
  title.innerText = editMode ? 'EDITING YOUR RECIPE' : 'ADDING NEW RECIPE';
  title.classList.add('sub-title', 'title-l', `${baseClass}-title`);
  form.append(title);

  const closeBtn = document.createElement('button');
  closeBtn.classList.add('close-btn');
  closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    closeRecipeForm();
  });
  form.append(closeBtn);

  const nameAndTimeInputRow = document.createElement('div');
  nameAndTimeInputRow.classList.add(`${baseClass}-row`, 'gapped');
  const nameField = FormField(
    `${baseClass}-name`,
    'Name of recipe',
    'Name',
    'name',
    inputTypes.text,
    [],
    values?.name,
    '.+'
  );
  nameField.id = `${baseClass}-name-field`;

  const timeField = FormField(
    `${baseClass}-time`,
    'Cooking time',
    '15',
    'cookingTime',
    inputTypes.number,
    [],
    values?.cookingTime,
    '^(?=.*[1-9])\\d*(\\.\\d+)?$'
  );
  timeField.id = `${baseClass}-time-field`;
  nameAndTimeInputRow.append(nameField, timeField);
  form.append(nameAndTimeInputRow);

  const descriptionInputRow = document.createElement('div');
  descriptionInputRow.classList.add(`${baseClass}-row`);
  const descField = FormField(
    `${baseClass}-desc`,
    'Description',
    'Description',
    'description',
    inputTypes.text,
    [],
    values?.description,
    '.+'
  );
  descField.id = `${baseClass}-desc-field`;
  descriptionInputRow.append(descField);
  form.append(descriptionInputRow);

  const ingredientsContainer = document.createElement('div');
  ingredientsContainer.classList.add(`${baseClass}-ingredients`);

  const labelRow = document.createElement('div');
  labelRow.classList.add(`${baseClass}-row`, 'gapped');
  const ingredientsLabel = document.createElement('label');
  ingredientsLabel.innerText = 'Ingredients';
  ingredientsLabel.className = 'form-label';
  const quantityLabel = document.createElement('label');
  quantityLabel.innerText = 'Quantity';
  quantityLabel.className = 'form-label';
  labelRow.append(ingredientsLabel, quantityLabel);

  ingredientsContainer.append(labelRow);

  if (editMode) {
    values?.ingredients?.forEach((ingredientValue, ind) => {
      addIngredientField(baseClass, ingredientsContainer, ind + 1, ingredientValue, editMode);
    });
  } else {
    addIngredientField(baseClass, ingredientsContainer, 1, null, editMode);
  }

  form.append(ingredientsContainer);

  const addNewIngredientBtn = document.createElement('button');
  addNewIngredientBtn.classList.add('button', 'add', 'flipped-color');
  addNewIngredientBtn.innerText = 'Add ingredient';
  addNewIngredientBtn.onclick = (e) => {
    e.preventDefault();
    const previousInputs = document.querySelectorAll(`.${baseClass} .amount-input`);
    const index = previousInputs.length + 1;
    addIngredientField(baseClass, ingredientsContainer, index, null, editMode);
  };
  form.append(addNewIngredientBtn);

  const submit = document.createElement('button');
  submit.className = 'button';
  submit.innerText = editMode ? 'EDIT RECIPE' : 'ADD NEW RECIPE';
  submit.onclick = (e) => {
    if (!validateSelectInput()) {
      e.preventDefault();
      return;
    }

    const valid = form.checkValidity();
    if (!valid) {
      return;
    }
    e.preventDefault();
    const formData = new FormData(form);
    if (editMode) formData.append('id', values?.id);
    handleSubmit(formData, editMode, values?.name);
  };
  form.append(submit);
  form.onclick = (e) => e.stopPropagation();

  return form;
};

export const showRecipeForm = (editMode = false, values = null) => {
  const form = RecipeForm(editMode, values);
  const overlay = document.querySelector('.overlay');
  overlay.append(form);
  overlay.style.display = 'flex';
};

export const closeRecipeForm = () => {
  document.querySelector('.recipe-form')?.remove();
  document.querySelector('.overlay').style.display = 'none';
};

export default RecipeForm;
