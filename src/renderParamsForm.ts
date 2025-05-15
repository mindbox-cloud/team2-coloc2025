import { IArmyParams, IGameParams } from "./game";

const armyFields = [
  { id: "size", label: "Размер армии:", min: 1, max: 100, default: 10 },
  {
    id: "hp",
    label: "Здоровье солдата:",
    min: 1,
    max: 100,
    default: 10,
  },
  { id: "strength", label: "Сила удара:", min: 1, max: 10, default: 1 },
  {
    id: "visionLength",
    label: "Дальность обзора:",
    min: 1,
    max: 10,
    default: 3,
  },
  {
    id: "criticalPercent",
    label: "Шанс критического удара:",
    min: 0,
    max: 100,
    default: 10,
  },
];

export default function (
  onSubmit: (params: IGameParams) => void
): HTMLFormElement {
  const form = document.createElement("form");
  const armies: IArmyParams[] = [];

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
  inputN.value = "10";

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
  inputIntervalMs.value = "1000";

  divInterval.append(labelIntervalMs, inputIntervalMs);

  const createFormButton = () => {
    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Запустить";
    button.classList.add("btn", "btn-primary");
    return button;
  };

  const createArmyButton = () => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Добавить армию";
    button.classList.add("btn", "btn-secondary");

    button.addEventListener("click", () => {
      const armyIndex = armies.length;
      if (armyIndex <= 3) {
        const armyContainer = document.createElement("div");
        armyContainer.classList.add("card", "mb-3", "p-3");

        const armyTitle = document.createElement("h5");
        armyTitle.textContent = `Армия #${armyIndex + 1}`;
        armyTitle.classList.add("card-title", "mb-3");

        armyContainer.appendChild(armyTitle);

        const armyParams: Partial<IArmyParams> = {
          color: "#9c4f4f",
        };

        armyFields.forEach((field) => {
          const fieldContainer = document.createElement("div");
          fieldContainer.classList.add("mb-3");

          const label = document.createElement("label");
          label.textContent = field.label;
          label.classList.add("form-label");
          label.htmlFor = `army-${armyIndex}-${field.id}`;

          const input = document.createElement("input");
          input.type = "number";
          input.id = `army-${armyIndex}-${field.id}`;
          input.classList.add("form-control");
          input.required = true;
          input.min = field.min.toString();
          input.max = field.max.toString();
          input.value = field.default.toString();

          input.addEventListener("change", () => {
            armyParams[field.id] = Number(input.value);
          });

          armyParams[field.id] = field.default;

          fieldContainer.append(label, input);
          armyContainer.appendChild(fieldContainer);
        });

        const colorInput = document.createElement("input");
        colorInput.type = "color";
        colorInput.value = armyParams.color as string;

        const label = document.createElement("label");
        label.textContent = "Цвет армии:";
        label.classList.add("form-label");

        colorInput.addEventListener("change", () => {
          armyParams.color = colorInput.value;
        });

        armyContainer.appendChild(label);
        armyContainer.appendChild(colorInput);

        armies.push(armyParams as IArmyParams);

        form.insertBefore(armyContainer, buttonGroup);
      } else {
        alert("Максимальное количество армий - 4");
      }
    });

    return button;
  };

  const buttonGroup = document.createElement("div");
  buttonGroup.append(createArmyButton(), createFormButton());
  buttonGroup.classList.add("btn-group", "gap-2");

  form.append(divN, divInterval, buttonGroup);

  form.addEventListener("submit", (e) => {
    console.log(armies);

    e.preventDefault();

    if (armies.length > 1) {
      onSubmit({
        fieldSize: Number(inputN.value),
        intervalMs: Number(inputIntervalMs.value),
        armies: armies,
      });
    }
    else {
      alert('Армий должно быть больше одной')
    }
  });

  return form;
}
