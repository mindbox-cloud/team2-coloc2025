export interface IControlHandlers {
  pause: () => void;
  play: () => void;
  reset: () => void;
}

function withPrevent(handle: () => void) {
  return (e: Event) => {
    e.preventDefault();
    handle();
  }
}

export default function (root: HTMLElement, handlers: IControlHandlers) {
  const group = document.createElement('div');
  group.classList.add('d-flex', 'my-3', 'justify-content-center');
  group.style.gap = '0.5em';

  const pauseBtn = document.createElement('button');
  pauseBtn.classList.add('btn', 'btn-secondary', 'game-btn-pause');
  pauseBtn.textContent = 'Пауза';
  pauseBtn.addEventListener('click', withPrevent(handlers.pause));

  const playBtn = document.createElement('button');
  playBtn.classList.add('btn', 'btn-primary', 'game-btn-play');
  playBtn.textContent = 'Продолжить';
  playBtn.addEventListener('click', withPrevent(handlers.play));

  const resetBtn = document.createElement('button');
  resetBtn.classList.add('btn', 'btn-warning');
  resetBtn.textContent = 'Новая игра';
  resetBtn.addEventListener('click', withPrevent(handlers.reset));

  group.append(pauseBtn, playBtn, resetBtn);

  root.append(group);
}
