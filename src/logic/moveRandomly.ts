import { DIRECTIONS } from "../constants/availableDirections";
import { ISoldier } from "../game";

function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function tryMoveRandomly(
  state: (ISoldier | null)[][],
  newState: (ISoldier | null)[][],
  x: number,
  y: number,
  soldier: ISoldier
): void {
  const shuffledDirections = shuffle(DIRECTIONS);

  for (const [dx, dy] of shuffledDirections) {
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
      break;
    }
  }
}
