import { attackTarget } from "./logic/attackTarget";
import { findNearestEnemy } from "./logic/findEnemy";
import { tryMoveRandomly } from "./logic/moveRandomly";
import { placeArmy } from "./logic/placeArmy";

export interface IArmyParams {
  size: number;
  hp: number;
  strength: number;
  visionLength: number;
  criticalPercent: number;
  color: string;
}

export interface IGameParams {
  fieldSize: number;
  intervalMs: number;
  armies: IArmyParams[]; // 2, 3, 4
}

export interface ISoldier {
  army: IArmyParams; // 1, 2, 3, 4
  currentHp: number;
}

export interface IGame {
  state: (ISoldier | null)[][];
  makeTurn(): void;
}

export function createGame(params: IGameParams): IGame {
  const { fieldSize, armies } = params;
  const state: (ISoldier | null)[][] = Array.from({ length: fieldSize }, () =>
    Array.from({ length: fieldSize }, () => null)
  );

  armies.forEach((army, index) => {
    placeArmy(army, index, state, fieldSize);
  });
  function isAdjacent(x1: number, y1: number, x2: number, y2: number): boolean {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2) === 1;
  }
  function moveToward(
    state: (ISoldier | null)[][],
    newState: (ISoldier | null)[][],
    x: number,
    y: number,
    tx: number,
    ty: number,
    soldier: ISoldier
  ) {
    const dx = tx > x ? 1 : tx < x ? -1 : 0;
    const dy = ty > y ? 1 : ty < y ? -1 : 0;
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

  return {
    state,
    makeTurn() {
      const newState = this.state.map((row) => row.slice());

      for (let y = 0; y < this.state.length; y++) {
        for (let x = 0; x < this.state[y].length; x++) {
          const soldier = this.state[y][x];
          if (!soldier) continue;

          const target = findNearestEnemy(
            this.state,
            x,
            y,
            soldier.army.visionLength,
            soldier.army
          );

          if (target) {
            const [tx, ty] = target;
            if (isAdjacent(x, y, tx, ty)) {
              attackTarget(target, soldier, newState);
            } else {
              moveToward(this.state, newState, x, y, tx, ty, soldier);
            }
          } else {
            tryMoveRandomly(this.state, newState, x, y, soldier);
          }
        }
      }

      this.state = newState;
    },
  };
}
