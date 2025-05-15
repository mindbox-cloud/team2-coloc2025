export interface IArmyParams {
  size: number;
  hp: number;
  strength: number;
  visionLength: number;
  criticalPercent: number;
  color: string
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
}
