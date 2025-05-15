import { createGame } from "./game.ts";
import renderGameField from "./renderGameField.ts";
import renderParamsForm from "./renderParamsForm.ts";

const root = document.getElementById("app")!;

let intervalId: number | undefined;

const form = renderParamsForm((gameSettings) => {
  clearInterval(intervalId);

  const game = createGame(gameSettings);
  renderGameField(root, game.state);

  intervalId = setInterval(() => {
    const prevState = game.state;
    game.makeTurn();
    renderGameField(root, game.state, prevState);
  }, gameSettings.intervalMs);
});

root.append(form);
