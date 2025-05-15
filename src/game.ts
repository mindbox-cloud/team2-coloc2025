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

  return {
    state,
    makeTurn() {
      console.log("сделали шаг");
    },
  };
}
