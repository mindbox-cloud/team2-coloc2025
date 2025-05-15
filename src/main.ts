import renderForm from './renderParamsForm.ts';
import renderField from './renderField.ts';
import getRandomColors from './getRandomColors.ts';

const root = document.getElementById('app')!;

const form = renderForm(
  (n) => {
    renderField(n, getRandomColors(n));
  }
);

root.append(form);
