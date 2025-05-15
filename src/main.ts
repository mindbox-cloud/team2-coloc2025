import { createGame } from "./game.ts";
import renderParamsForm from "./renderParamsForm.ts";
import renderGameField from "./renderGameField.ts";

const root = document.getElementById("app")!;

let intervalId: number | undefined;

const form = renderParamsForm((gameSettings) => {
  clearInterval(intervalId);

  const game = createGame(gameSettings);
  renderGameField(game.state, root);

  intervalId = setInterval(() => {
    game.makeTurn();
    renderGameField(game.state, root);
  }, gameSettings.intervalMs);
});

root.append(form);
