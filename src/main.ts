import renderForm from './renderParamsForm.ts';
import renderField from './renderField.ts';
import getRandomColors from './getRandomColors.ts';

const root = document.getElementById('app')!;

renderForm({
  root,
  onSubmit(n) {
    renderField(n, getRandomColors(n));
  }
});
