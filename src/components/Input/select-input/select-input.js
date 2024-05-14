import './select-input.css';
import '../../../fontello.css';

export const validateSelectInput = () => {
  return Array.from(document.querySelectorAll('.select-btn')).reduce(
    (acc, curr) => acc && curr.classList.contains('has-value'),
    true
  );
};

const refreshOptionVisual = (optionIndex, container) => {
  const optionElements = container.querySelectorAll('.option');
  optionElements.forEach((optionElement, idx) => {
    optionElement.classList.remove('selected');
    const markIcon = optionElement.querySelector('.icon-ok');
    markIcon?.remove();
    if (idx === optionIndex) {
      optionElement.classList.add('selected');
      const selectedOptionIcon = document.createElement('i');
      selectedOptionIcon.className = 'icon-ok';
      optionElement.append(selectedOptionIcon);
    }
  });
};

const setInputValue = (input, optionIndex, container) => {
  // eslint-disable-next-line no-param-reassign
  input.selectedIndex = optionIndex;
  const optionList = container.querySelector('options');
  optionList?.remove();
  refreshOptionVisual(optionIndex, container);
};

const createSelectMenu = (placeholder, options, value, input) => {
  const selectMenu = document.createElement('div');
  selectMenu.className = 'select-menu';

  const dropDownButton = document.createElement('button');
  dropDownButton.className = 'select-btn';
  if (value !== '') {
    dropDownButton.classList.add('has-value');
  }
  dropDownButton.onclick = (e) => {
    e.preventDefault();
    selectMenu.classList.toggle('active');
  };

  const selectPlaceholder = document.createElement('span');
  selectPlaceholder.className = 'select-placeholder';
  selectPlaceholder.innerText = value || placeholder;
  const dropDownButtonIcon = document.createElement('i');
  dropDownButtonIcon.className = 'icon-down-open';
  dropDownButton.append(selectPlaceholder, dropDownButtonIcon);
  selectMenu.append(dropDownButton);

  const dropDownList = document.createElement('ul');
  dropDownList.className = 'options';
  options.forEach((option, idx) => {
    const optionItem = document.createElement('li');
    optionItem.className = 'option';
    optionItem.innerText = `${option.display}`;
    optionItem.dataset.optionValue = option.value;
    if (option.display === value) {
      // eslint-disable-next-line no-param-reassign
      input.selectedIndex = idx;
      optionItem.classList.add('selected');
      const selectedOptionIcon = document.createElement('i');
      selectedOptionIcon.className = 'icon-ok';
      optionItem.append(selectedOptionIcon);
    }
    optionItem.onclick = () => {
      setInputValue(input, idx, dropDownList);
      selectPlaceholder.innerText = option.display;
      dropDownButton.classList.add('has-value');
      selectMenu.classList.remove('active');
    };
    dropDownList.append(optionItem);
  });
  selectMenu.append(dropDownList);

  return selectMenu;
};

const SelectInput = (id, placeholder, name, options, value = '') => {
  const container = document.createElement('div');
  container.className = 'select-control form-control';

  const inputControl = document.createElement('select');
  inputControl.className = 'visually-hidden';
  inputControl.name = name;
  inputControl.id = id;
  options.forEach((option) => {
    const optionElement = document.createElement('option');
    optionElement.className = 'visually-hidden';
    optionElement.value = option.value;
    inputControl.append(optionElement);
  });
  container.append(inputControl);

  const selectMenu = createSelectMenu(placeholder, options, value, inputControl);
  container.append(selectMenu);

  return container;
};

export default SelectInput;
