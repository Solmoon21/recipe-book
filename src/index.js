import './index.css';

import SideBar from './components/sidebar/sidebar';

import main from './pages/main';

const root = document.querySelector('#root');
const element = document.createElement('div');

function closeOverlay() {
  const child = this.querySelector('.recipe-details') || this.querySelector('.recipe-form');
  if (child !== null) {
    child.remove();
    this.style.display = 'none';
  }
}

const createBaseLayout = async () => {
  const sidebar = SideBar();
  const content = await main();
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.onclick = closeOverlay;

  element.append(sidebar, content, overlay);
  element.className = 'main-layout';
};

createBaseLayout();

root.append(element);
