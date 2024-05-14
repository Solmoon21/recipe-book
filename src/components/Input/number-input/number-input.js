const NumberInput = (id, placeholder, name, value = '', pattern = '') => {
  const inputControl = document.createElement('input');
  inputControl.classList.add('form-control', 'time-control');
  inputControl.name = name;
  inputControl.type = 'number';
  inputControl.step = 0.01;
  inputControl.placeholder = placeholder;
  inputControl.id = id;
  inputControl.value = value;
  inputControl.pattern = pattern;
  inputControl.required = true;
  inputControl.min = 0.01;

  return inputControl;
};

export default NumberInput;
