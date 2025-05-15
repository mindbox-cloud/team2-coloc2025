import { createGame } from "./game.ts";
import renderGameField from "./renderGameField.ts";

const root = document.getElementById("app")!;

// let intervalId: number | null = null;

// const form = renderForm(({ fieldSize, intervalMs }) => {
//   if (intervalId !== null) {
//     clearInterval(intervalId);
//   }
//   updateField(fieldSize, root, fieldElementId);

//   intervalId = setInterval(() => {
//     updateField(fieldSize, root, fieldElementId);
//   }, intervalMs);
// });

// root.append(form);

const game = createGame({
  fieldSize: 10,
  intervalMs: 500,
  armies: [
    {
      size: 4,
      hp: 50,
      strength: 1,
      visionLength: 3,
      criticalPercent: 10,
      color: 'blue',
    },
    {
      size: 7,
      hp: 50,
      strength: 1,
      visionLength: 3,
      criticalPercent: 10,
      color: 'red',
    }
  ],
});

renderGameField(game.state, root);

setInterval(() => {
  game.makeTurn();
  renderGameField(game.state, root);
}, 500);
