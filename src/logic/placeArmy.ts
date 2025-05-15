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
  for (let i = 0; i < fieldSize && count < army.size; i++) {
    for (let j = 0; j < fieldSize && count < army.size; j++) {
      const x = zone.xStart + (index % 2 === 0 ? i : -i); // армии с чётным индексом 0,2 заполняют вправо, нечётные 1,3 - влево
      const y = zone.yStart + (index < 2 ? j : -j); // верхние армии 0, 1 заполняют вниз, нижние 2, 3 - вверх
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
