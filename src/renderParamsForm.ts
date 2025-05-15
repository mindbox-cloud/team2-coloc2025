import { DEFAULT_ARMY_FIELDS, DEFAULT_COLORS } from "./constants/form";
import { IArmyParams, IGameParams } from "./game";

export default function (
  onSubmit: (params: IGameParams) => void
): HTMLFormElement {
  const form = document.createElement("form");
  const armies: IArmyParams[] = [];

  form.classList.add("p-3");

  const divN = document.createElement("div");
  divN.classList.add("mb-3", "col-3");

  const labelN = document.createElement("label");
  labelN.textContent = "Размер поля (N):";
  labelN.classList.add("form-label");

  const inputN = document.createElement("input");
  inputN.type = "number";
  inputN.classList.add("form-control");
  inputN.required = true;
  inputN.min = "1";
  inputN.max = "100";
  inputN.value = "15";

  divN.append(labelN, inputN);

  const divInterval = document.createElement("div");
  divInterval.classList.add("mb-3", "col-3");

  const labelIntervalMs = document.createElement("label");
  labelIntervalMs.textContent = "Интервал (мс):";
  labelIntervalMs.classList.add("form-label");

  const inputIntervalMs = document.createElement("input");
  inputIntervalMs.type = "number";
  inputIntervalMs.classList.add("form-control");
  inputIntervalMs.required = true;
  inputIntervalMs.min = "1";
  inputIntervalMs.value = "500";

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

    const armiesWrapper = document.createElement("div");
    armiesWrapper.classList.add("mb-3", "row", "flex-nowrap", "gap-3");

    button.addEventListener("click", () => {
      const armyIndex = armies.length;
      if (armyIndex <= 3) {
        const armyContainer = document.createElement("div");
        armyContainer.classList.add("card", "mb-3", "p-3", "col-2");

        const armyTitle = document.createElement("h6");
        armyTitle.textContent = `Армия #${armyIndex + 1}`;
        armyTitle.classList.add("card-title", "mb-2");

        armyContainer.appendChild(armyTitle);

        const armyParams: Partial<IArmyParams> = {
          color: DEFAULT_COLORS[armyIndex],
        };

        DEFAULT_ARMY_FIELDS.forEach((field) => {
          const fieldContainer = document.createElement("div");
          fieldContainer.classList.add("mb-2");

          const label = document.createElement("label");
          label.textContent = field.label;
          label.classList.add("form-label", "col-form-label-sm");
          label.htmlFor = `army-${armyIndex}-${field.id}`;

          const input = document.createElement("input");
          input.type = "number";
          input.id = `army-${armyIndex}-${field.id}`;
          input.classList.add("form-control", "form-control-sm");
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
        label.classList.add("form-label", "col-form-label-sm");

        colorInput.addEventListener("change", () => {
          armyParams.color = colorInput.value;
        });

        armyContainer.appendChild(label);
        armyContainer.appendChild(colorInput);

        armies.push(armyParams as IArmyParams);

        armiesWrapper.appendChild(armyContainer);
        form.insertAdjacentElement("beforeend", armiesWrapper);
      } else {
        alert("Максимальное количество армий - 4");
      }
    });

    return button;
  };

  const buttonGroup = document.createElement("div");
  buttonGroup.append(createArmyButton(), createFormButton());
  buttonGroup.classList.add("btn-group");

  const intervalWrapper = document.createElement("div");
  intervalWrapper.append(divInterval, divN);
  intervalWrapper.classList.add("row", "mt-2");

  form.append(buttonGroup, intervalWrapper);

  form.addEventListener("submit", (e) => {
    console.log(armies);

    e.preventDefault();

    if (armies.length > 1) {
      onSubmit({
        fieldSize: Number(inputN.value),
        intervalMs: Number(inputIntervalMs.value),
        armies: armies,
      });
    } else {
      alert("Армий должно быть больше одной");
    }
  });

  return form;
}
