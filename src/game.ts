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
