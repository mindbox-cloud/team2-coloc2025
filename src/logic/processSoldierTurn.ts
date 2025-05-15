import { IArmyParams, ISoldier } from "../game";
import { attackTarget } from "./attackTarget";
import { findNearestEnemy } from "./findEnemy";
import { isAdjacent } from "./isAdjacent";
import { tryMoveRandomly } from "./moveRandomly";
import { moveToward } from "./moveToward";

export function processSoldierTurn(
  x: number,
  y: number,
  soldier: ISoldier,
  state: (ISoldier | null)[][],
  newState: (ISoldier | null)[][],
  knownEnemies: Map<IArmyParams, [number, number]>
): void {
  const personalTarget = findNearestEnemy(
    state,
    x,
    y,
    soldier.army.visionLength,
    soldier.army
  );

  if (personalTarget) {
    const existingTarget = knownEnemies.get(soldier.army);
    const currentDistance =
      Math.abs(x - personalTarget[0]) + Math.abs(y - personalTarget[1]);

    if (
      !existingTarget ||
      currentDistance <
        Math.abs(x - existingTarget[0]) + Math.abs(y - existingTarget[1])
    ) {
      knownEnemies.set(soldier.army, personalTarget);
    }

    if (isAdjacent(x, y, personalTarget[0], personalTarget[1])) {
      attackTarget(personalTarget, soldier, newState);
      return;
    }

    moveToward(
      state,
      newState,
      x,
      y,
      personalTarget[0],
      personalTarget[1],
      soldier
    );
    return;
  }

  const sharedTarget = knownEnemies.get(soldier.army);
  if (sharedTarget) {
    if (isAdjacent(x, y, sharedTarget[0], sharedTarget[1])) {
      attackTarget(sharedTarget, soldier, newState);
    } else {
      moveToward(
        state,
        newState,
        x,
        y,
        sharedTarget[0],
        sharedTarget[1],
        soldier
      );
    }
  } else {
    tryMoveRandomly(state, newState, x, y, soldier);
  }
}
