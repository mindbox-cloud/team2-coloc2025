import { ISoldier } from "../game";

export function moveToward(
  state: (ISoldier | null)[][],
  newState: (ISoldier | null)[][],
  x: number,
  y: number,
  targetX: number,
  targetY: number,
  soldier: ISoldier
) {
  const directions: [number, number][] = [];

  const deltaX = targetX - x;
  const deltaY = targetY - y;

  const stepX = deltaX === 0 ? 0 : deltaX > 0 ? 1 : -1;
  const stepY = deltaY === 0 ? 0 : deltaY > 0 ? 1 : -1;

  // приоритетные направления к цели
  if (Math.abs(deltaX) >= Math.abs(deltaY)) {
    directions.push(
      [stepX, 0],
      [stepX, stepY],
      [0, stepY],
      [0, -stepY],
      [-stepX, 0]
    );
  } else {
    directions.push(
      [0, stepY],
      [stepX, stepY],
      [stepX, 0],
      [-stepX, 0],
      [0, -stepY]
    );
  }

  for (const [offsetX, offsetY] of directions) {
    const newX = x + offsetX;
    const newY = y + offsetY;
    if (
      newY >= 0 &&
      newY < state.length &&
      newX >= 0 &&
      newX < state[newY].length &&
      !newState[newY][newX] &&
      (!state[newY][newX] || state[newY][newX]?.army !== soldier.army)
    ) {
      newState[newY][newX] = soldier;
      newState[y][x] = null;
      return;
    }
  }
}
