import { IArmyParams, ISoldier } from "../game";

export function placeArmy(
  army: IArmyParams,
  index: number,
  state: (ISoldier | null)[][],
  fieldSize: number
): void {
  const initialArmyPosition = [
    { xStart: 0, yStart: 0 }, // top left
    { xStart: fieldSize - 1, yStart: 0 }, // top right
    { xStart: 0, yStart: fieldSize - 1 }, // bottom left
    { xStart: fieldSize - 1, yStart: fieldSize - 1 }, // bottom right
  ];

  const zone = initialArmyPosition[index];
  let count = 0;
  const squareSize = Math.ceil(Math.sqrt(army.size));
  for (let dy = 0; dy < squareSize && count < army.size; dy++) {
    for (let dx = 0; dx < squareSize && count < army.size; dx++) {
      const x = zone.xStart + (index % 2 === 0 ? dx : -dx);
      const y = zone.yStart + (index < 2 ? dy : -dy);
      if (x >= 0 && x < fieldSize && y >= 0 && y < fieldSize && !state[y][x]) {
        state[y][x] = {
          army,
          currentHp: army.hp,
        };
        count++;
      }
    }
  }
}
