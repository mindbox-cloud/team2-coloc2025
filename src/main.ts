import { createGame, IGameParams } from "./game.ts";
import renderGameField from "./renderGameField.ts";
import renderParamsForm from "./renderParamsForm.ts";
import renderGameControls from "./renderGameControls.ts";

const root = document.getElementById("app")!;

let intervalId: number | undefined;

function startNewGame(gameParams: IGameParams) {
  root.innerHTML = "";
  clearInterval(intervalId);

  const game = createGame(gameParams);

  function play() {
    root.classList.add("game-playing");
    root.classList.remove("game-paused");
    intervalId = setInterval(() => {
      const prevState = game.state;
      if (game.hasOnlyOneArmyLeft()) {
        finalScreen();
        return;
      }
      game.makeTurn();
      renderGameField(root, game.state, prevState);
    }, gameParams.intervalMs);
  }

  function finalScreen() {
    const gameField = document.getElementById("game-field")!;
    gameField.classList.add("game-finished");
    root.classList.add("game-finished");
    clearInterval(intervalId);
  }

  function pause() {
    root.classList.add("game-paused");
    root.classList.remove("game-playing");
    clearInterval(intervalId);
  }

  renderGameField(root, game.state);
  renderGameControls(root, { pause, play, reset });

  play();
}

function reset() {
  clearInterval(intervalId);
  root.innerHTML = "";
  const form = renderParamsForm(startNewGame);
  root.append(form);
}

reset();
