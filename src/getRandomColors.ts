function randomRGB(): `rgb(${number},${number},${number})` {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}

export default function generateColorMatrix(
  n: number
): `rgb(${number},${number},${number})`[][] {
  return Array.from({ length: n }, () =>
    Array.from({ length: n }, () => randomRGB())
  );
}
