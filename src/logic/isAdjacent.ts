export function isAdjacent(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): boolean {
  return (
    Math.abs(x1 - x2) <= 1 &&
    Math.abs(y1 - y2) <= 1 &&
    !(x1 === x2 && y1 === y2)
  );
}
