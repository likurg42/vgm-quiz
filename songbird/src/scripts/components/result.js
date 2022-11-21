import makeScore from './score';

const makeResult = (query = '.result', parentElement = document) => {
  const root = parentElement.querySelector(query);
  const newGameBtn = root.querySelector('.result__new-game-btn');
  const homeBtn = root.querySelector('.result__home-btn');
  const score = makeScore('.result__score', root);
  const congratulations = root.querySelector('.result__congratulations');

  const setScore = (points, isWon) => {
    score.setValue(points);
    if (isWon) {
      congratulations.classList.add('result__congratulations--show');
      homeBtn.classList.add('result__home-btn--active');
      newGameBtn.classList.remove('result__new-game-btn--active');
    } else {
      congratulations.classList.remove('result__congratulations--show');
      homeBtn.classList.remove('result__home-btn--active');
      newGameBtn.classList.add('result__new-game-btn--active');
    }
  };

  const bindGoToNewGame = (cb) => {
    root.addEventListener('click', (e) => {
      if (e.target === newGameBtn) {
        cb();
      }
    });
  };

  const bindGoToHome = (cb) => {
    root.addEventListener('click', (e) => {
      if (e.target === homeBtn) {
        cb();
      }
    });
  };

  return {
    setScore,
    bindGoToNewGame,
    bindGoToHome,
  };
};

export default makeResult;
