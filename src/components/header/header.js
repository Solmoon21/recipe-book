import { showRecipeForm } from '../form/recipe-form';
import './header.css';

const Header = (titleText, isMain) => {
  const header = document.createElement('div');
  header.className = 'content-header';

  const title = document.createElement('div');
  title.classList.add('title', 'title-xl');
  title.innerText = titleText;
  header.append(title);

  if (isMain) {
    const addNewRecipeButton = document.createElement('button');
    addNewRecipeButton.classList.add('button', 'add');
    addNewRecipeButton.innerText = 'Add New Recipes';
    addNewRecipeButton.onclick = () => showRecipeForm(false, null);
    header.append(addNewRecipeButton);
  }

  return header;
};

export default Header;
