import renderForm from "./renderParamsForm.ts";
import updateField from "./updateField.ts";

const root = document.getElementById("app")!;
const fieldElementId = "field";

let intervalId: number | null = null;

const form = renderForm((n, intervalMs) => {
  if (intervalId !== null) {
    clearInterval(intervalId);
  }
  updateField(n, root, fieldElementId);

  intervalId = setInterval(() => {
    updateField(n, root, fieldElementId);
  }, intervalMs);
});

root.append(form);
