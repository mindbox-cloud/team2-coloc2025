import getRandomColors from "./getRandomColors.ts";
import renderField from "./renderField.ts";

export default function updateField(
  n: number,
  root: HTMLElement,
  fieldElementId: string
): void {
  const colors = getRandomColors(n);
  const field = renderField(n, colors);
  field.id = fieldElementId;
  document.getElementById(fieldElementId)?.remove();
  root.append(field);
}
