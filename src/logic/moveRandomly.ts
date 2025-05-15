import { DIRECTIONS } from "../constants/availableDirections";
import { ISoldier } from "../game";

export function tryMoveRandomly(
  state: (ISoldier | null)[][],
  newState: (ISoldier | null)[][],
  x: number,
  y: number,
  soldier: ISoldier
): void {
  const [dx, dy] = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
  const nx = x + dx;
  const ny = y + dy;
  if (
    ny >= 0 &&
    ny < state.length &&
    nx >= 0 &&
    nx < state[ny].length &&
    !newState[ny][nx]
  ) {
    newState[ny][nx] = soldier;
    newState[y][x] = null;
  }
}
