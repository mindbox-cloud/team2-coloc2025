import renderForm from "./renderParamsForm.ts";
import updateField from "./updateField.ts";

const root = document.getElementById("app")!;
const fieldElementId = "field";

let intervalId: number | null = null;

const form = renderForm(({ fieldSize, intervalMs }) => {
  if (intervalId !== null) {
    clearInterval(intervalId);
  }
  updateField(fieldSize, root, fieldElementId);

  intervalId = setInterval(() => {
    updateField(fieldSize, root, fieldElementId);
  }, intervalMs);
});

root.append(form);
