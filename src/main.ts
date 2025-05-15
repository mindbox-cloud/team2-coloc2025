import renderForm from './renderParamsForm.ts';
import renderField from './renderField.ts';
import getRandomColors from './getRandomColors.ts';

const root = document.getElementById('app')!;
const fieldElementId = 'field';

const form = renderForm(
  (n) => {
    const field = renderField(n, getRandomColors(n));
    field.id = fieldElementId;
    document.getElementById(fieldElementId)?.remove();
    root.append(field);
  }
);

root.append(form);
