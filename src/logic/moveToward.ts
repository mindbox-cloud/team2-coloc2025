import { ISoldier } from "../game";

export function moveToward(
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
