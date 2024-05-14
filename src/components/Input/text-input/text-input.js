const TextInput = (id, placeholder, name, value = '', pattern = '') => {
  const inputControl = document.createElement('input');
  inputControl.className = 'form-control';
  inputControl.name = name;
  inputControl.placeholder = placeholder;
  inputControl.id = id;
  inputControl.type = 'text';
  inputControl.value = value;
  inputControl.pattern = pattern;
  inputControl.required = true;

  return inputControl;
};

export default TextInput;
