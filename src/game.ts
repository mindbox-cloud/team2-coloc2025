import { placeArmy } from "./logic/placeArmy";
import { processSoldierTurn } from "./logic/processSoldierTurn";

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
  attacked?: {
    by: ISoldier;
    damage: number;
    isCritical: boolean;
  };
}

export interface IGame {
  state: (ISoldier | null)[][];
  makeTurn(): void;
  hasOnlyOneArmyLeft(): boolean;
}

export function createGame(params: IGameParams): IGame {
  const { fieldSize, armies } = params;
  const state: (ISoldier | null)[][] = Array.from({ length: fieldSize }, () =>
    Array.from({ length: fieldSize }, () => null)
  );

  armies.forEach((army, index) => {
    placeArmy(army, index, state, fieldSize);
  });

  return {
    state,
    makeTurn() {
      const newState = this.state.map((row) => row.slice());
      const knownEnemies = new Map<IArmyParams, [number, number]>();

      for (let y = 0; y < this.state.length; y++) {
        for (let x = 0; x < this.state[y].length; x++) {
          const soldier = this.state[y][x];
          if (!soldier) continue;
          delete soldier.attacked;
          processSoldierTurn(x, y, soldier, this.state, newState, knownEnemies);
        }
      }

      this.state = newState;
    },

    hasOnlyOneArmyLeft() {
      const uniqueArmies = new Set<IArmyParams>();

      for (let y = 0; y < this.state.length; y++) {
        for (let x = 0; x < this.state[y].length; x++) {
          const soldier = this.state[y][x];
          if (soldier) {
            uniqueArmies.add(soldier.army);
          }
        }
      }

      return Array.from(uniqueArmies).length === 1;
    },
  };
}
