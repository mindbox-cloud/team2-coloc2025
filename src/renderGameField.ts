import { IGame, ISoldier } from './game';

const FIELD_ELEMENT_ID = 'game-field';

function createNewField(size: number) {
  const newField = document.createElement('div');
  newField.classList.add('field-root');
  newField.style.setProperty('--n', size.toString());
  newField.id = FIELD_ELEMENT_ID;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const cell = document.createElement('div');
      cell.classList.add('field-cell');
      newField.append(cell);
    }
  }

  return newField;
}

function getOrCreateFieldElement(size: number, root: HTMLElement) {
  const existingField = document.getElementById(FIELD_ELEMENT_ID);

  if (existingField && existingField.style.getPropertyValue('--n') === size.toString()) {
    return existingField;
  }

  existingField?.remove();
  const newField = createNewField(size);
  root.append(newField);
  return newField;
}

function createSoldierIcon() {
  const icon = document.createElement('div');
  icon.classList.add('game-soldier-icon')
  icon.innerHTML = '<svg><use href="#icon-soldier" /></svg>';
  return icon;
}

export default function (root: HTMLElement, state: IGame['state'], prevState: IGame['state'] | null = null) {
  const field = getOrCreateFieldElement(state.length, root);

  for (let i = 0; i < state.length; i++) {
    for (let j = 0; j < state[i].length; j++) {
      const cellEl = field.children[i * state.length + j] as HTMLDivElement;
      const cellSoldier = state[i][j];
      cellEl.removeAttribute('style');
      cellEl.innerHTML = '';
      if (cellSoldier) {
        cellEl.style.setProperty('--color', cellSoldier.army.color);
        cellEl.style.setProperty('--hp-percent', `${cellSoldier.currentHp / cellSoldier.army.hp * 100}%`);
        cellEl.append(createSoldierIcon());
      }
    }
  }
}
