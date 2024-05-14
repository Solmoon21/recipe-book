import './sidebar.css';

import favoriteRecipeIcon from '../../assets/icons/favorite-recipe.svg';
import recipeIcon from '../../assets/icons/recipe.svg';
import favorite from '../../pages/favorite';
import main from '../../pages/main';

import { closeRecipeDetails } from '../recipe-details/recipe-details';

const PAGE_LINKS = [
  { name: 'main', createPage: main, icon: recipeIcon },
  { name: 'favorite', createPage: favorite, icon: favoriteRecipeIcon },
];

const clearPage = () => {
  document.querySelector('.content').remove();
  closeRecipeDetails();
};

const setActiveLink = (activeLink) => {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute('link-name') === activeLink) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
};

const createLink = (linkName, url, createPage, isActive = false) => {
  const link = document.createElement('li');
  link.className = 'nav-link';
  link.setAttribute('link-name', linkName);

  const img = document.createElement('img');
  img.className = 'nav-link-image';
  img.src = url;

  link.append(img);
  if (isActive) link.classList.add('active');

  link.addEventListener('click', async () => {
    clearPage();
    const activePage = await createPage();
    document.querySelector('.main-layout').append(activePage);
    setActiveLink(linkName);
  });

  return link;
};

const SideBar = (currPage = 'main') => {
  const sidebar = document.createElement('div');
  sidebar.className = 'sidebar';

  const list = document.createElement('ul');
  list.className = 'nav-links';

  PAGE_LINKS.forEach((link) => {
    list.append(createLink(link.name, link.icon, link.createPage, currPage === link.name));
  });
  sidebar.append(list);

  return sidebar;
};

export default SideBar;
