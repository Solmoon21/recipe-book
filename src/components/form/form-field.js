import SelectInput from '../Input/select-input/select-input';
import TextInput from '../Input/text-input/text-input';
import NumberInput from '../Input/number-input/number-input';

const FormField = (id, label, placeholder, name, type, options = [], value = '', pattern = '[A-Za-z\\s]+') => {
  const container = document.createElement('div');
  container.className = 'form-field';

  const inputLabel = document.createElement('label');
  inputLabel.className = 'form-label';
  inputLabel.innerText = label;
  inputLabel.htmlFor = id;
  container.append(inputLabel);

  let inputControl = null;
  switch (type) {
    case 'number':
      inputControl = NumberInput(id, placeholder, name, value, pattern);
      break;
    case 'select':
      inputControl = SelectInput(id, placeholder, name, options, value);
      break;
    case 'text':
    default:
      inputControl = TextInput(id, placeholder, name, value, pattern);
      break;
  }

  container.append(inputControl);
  return container;
};

export default FormField;
