import { IArmyParams, ISoldier } from "../game";

export function findNearestEnemy(
  state: (ISoldier | null)[][],
  x: number,
  y: number,
  visionLength: number,
  ownArmy: IArmyParams
): [number, number] | null {
  let minDist = Infinity;
  let target: [number, number] | null = null;

  for (let dy = -visionLength; dy <= visionLength; dy++) {
    for (let dx = -visionLength; dx <= visionLength; dx++) {
      const nx = x + dx;
      const ny = y + dy;
      if (
        (dx !== 0 || dy !== 0) &&
        ny >= 0 &&
        ny < state.length &&
        nx >= 0 &&
        nx < state[ny].length &&
        state[ny][nx] &&
        state[ny][nx]!.army !== ownArmy
      ) {
        const dist = Math.abs(dx) + Math.abs(dy);
        if (dist < minDist) {
          minDist = dist;
          target = [nx, ny];
        }
      }
    }
  }

  return target;
}
