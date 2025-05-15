import { IGameParams } from "./game";

export default function (
  onSubmit: (params: IGameParams) => void
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
  inputN.required = true;
  inputN.min = "1";
  inputN.max = "100";

  divN.append(labelN, inputN);

  const divInterval = document.createElement("div");
  divInterval.classList.add("mb-3");

  const labelIntervalMs = document.createElement("label");
  labelIntervalMs.textContent = "Интервал (мс):";
  labelIntervalMs.classList.add("form-label");

  const inputIntervalMs = document.createElement("input");
  inputIntervalMs.type = "number";
  inputIntervalMs.classList.add("form-control");
  inputIntervalMs.required = true;
  inputIntervalMs.min = "1";

  divInterval.append(labelIntervalMs, inputIntervalMs);

  const createFormButton = () => {
    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Отправить";
    button.classList.add("btn", "btn-primary");
    return button;
  };

  form.append(divN, divInterval, createFormButton());

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    onSubmit(Number(inputN.value), Number(inputIntervalMs.value));
  });

  return form;
}
