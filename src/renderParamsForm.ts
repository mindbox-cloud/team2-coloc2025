export default function (
  onSubmit: (n: number, intervalMs: number) => void
): HTMLFormElement {
  const form = document.createElement("form");
  form.classList.add("p-3");

  const divN = document.createElement("div");
  divN.classList.add("mb-3");

  const labelN = document.createElement("label");
  labelN.textContent = "Размер поля (N):";
  labelN.classList.add("form-label");

  const inputN = document.createElement("input");
  inputN.type = "number";
  inputN.classList.add("form-control");

  divN.append(labelN, inputN);

  const divInterval = document.createElement("div");
  divInterval.classList.add("mb-3");

  const labelIntervalMs = document.createElement("label");
  labelIntervalMs.textContent = "Интервал (мс):";
  labelIntervalMs.classList.add("form-label");

  const inputIntervalMs = document.createElement("input");
  inputIntervalMs.type = "number";
  inputIntervalMs.classList.add("form-control");

  divInterval.append(labelIntervalMs, inputIntervalMs);

  const button = document.createElement("button");
  button.type = "submit";
  button.textContent = "Отправить";
  button.classList.add("btn", "btn-primary");

  form.append(divN, divInterval, button);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    onSubmit(Number(inputN.value), Number(inputIntervalMs.value));
  });

  return form;
}
