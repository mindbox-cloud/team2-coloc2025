export default function (n: number, colors: string[][]): HTMLElement {
  const field = document.createElement("div");
  field.classList.add("field-root");
  field.style.setProperty("--n", n.toString());

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const cell = document.createElement("div");
      cell.classList.add("field-cell");
      cell.style.backgroundColor = colors[i][j];
      field.append(cell);
    }
  }

  return field;
}
