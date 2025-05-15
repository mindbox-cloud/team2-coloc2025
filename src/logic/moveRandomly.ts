import { DIRECTIONS } from "../constants/availableDirections";
import { ISoldier } from "../game";

function shuffleArray<T>(inputArray: T[]): T[] {
  const arrayCopy = [...inputArray];
  for (
    let currentIndex = arrayCopy.length - 1;
    currentIndex > 0;
    currentIndex--
  ) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    [arrayCopy[currentIndex], arrayCopy[randomIndex]] = [
      arrayCopy[randomIndex],
      arrayCopy[currentIndex],
    ];
  }
  return arrayCopy;
}

export function tryMoveRandomly(
  currentState: (ISoldier | null)[][],
  nextState: (ISoldier | null)[][],
  currentX: number,
  currentY: number,
  soldier: ISoldier
): void {
  const directionsToTry = shuffleArray(DIRECTIONS);

  for (const [offsetX, offsetY] of directionsToTry) {
    const newX = currentX + offsetX;
    const newY = currentY + offsetY;

    const isInsideField =
      newY >= 0 &&
      newY < currentState.length &&
      newX >= 0 &&
      newX < currentState[newY].length;

    const isCellFree = isInsideField && !nextState[newY][newX];

    if (isCellFree) {
      nextState[newY][newX] = soldier;
      nextState[currentY][currentX] = null;
      break;
    }
  }
}
