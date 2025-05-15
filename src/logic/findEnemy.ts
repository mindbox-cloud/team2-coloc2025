import { IArmyParams, ISoldier } from "../game";

export function findNearestEnemy(
  state: (ISoldier | null)[][],
  x: number,
  y: number,
  visionLength: number,
  ownArmy: IArmyParams
): [number, number] | null {
  let closestEnemy: [number, number] | null = null;
  let shortestDistance = Infinity;

  for (let offsetY = -visionLength; offsetY <= visionLength; offsetY++) {
    for (let offsetX = -visionLength; offsetX <= visionLength; offsetX++) {
      const targetX = x + offsetX;
      const targetY = y + offsetY;

      const isCurrentCell = offsetX === 0 && offsetY === 0;

      const isInsideBounds =
        targetY >= 0 &&
        targetY < state.length &&
        targetX >= 0 &&
        targetX < state[targetY].length;

      const cell = isInsideBounds ? state[targetY][targetX] : null;
      const isEnemy = cell && cell.army !== ownArmy;

      if (!isCurrentCell && isEnemy) {
        const distance = Math.abs(offsetX) + Math.abs(offsetY);
        if (distance < shortestDistance) {
          shortestDistance = distance;
          closestEnemy = [targetX, targetY];
        }
      }
    }
  }

  return closestEnemy;
}
