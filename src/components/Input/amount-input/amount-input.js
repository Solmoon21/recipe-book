import './amount-input.css';
import NumberInput from '../number-input/number-input';
import SelectInput from '../select-input/select-input';

const AmountInput = (ids, placeholders, names, values) => {
  const container = document.createElement('div');
  container.className = 'amount-input';

  const numberInput = NumberInput(ids[0], placeholders[0], names[0], values[0], '^(?=.*[1-9])\\[1-9]*(\\.d+)?$');
  numberInput.classList.add('form-control', 'amount-control');
  const units = [
    { display: 'cup', value: 'cup' },
    { display: 'pc', value: 'piece' },
    { display: 'oz', value: 'ounces' },
    { display: 'lb', value: 'pound' },
    { display: 'tbsp', value: 'tablespoon' },
    { display: 'clv', value: 'cloves' },
  ];
  const convertToDisplayUnit = (amountTypeValue) => {
    return units.find((pair) => pair.value === amountTypeValue)?.display;
  };
  const typeInput = SelectInput(ids[1], placeholders[1], names[1], units, convertToDisplayUnit(values[1]));
  typeInput.classList.add('form-control', 'unit-control');

  container.append(numberInput, typeInput);
  return container;
};

export default AmountInput;
