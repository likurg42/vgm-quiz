const makeWelcome = (query = '.welcome') => {
  const root = document.querySelector(query);
  const startButton = root.querySelector('.welcome__button');

  const goToGame = (cb) => {
    root.addEventListener('click', (e) => {
      if (e.target === startButton) {
        root.classList.remove('welcome--show');
        cb();
      }
    });
  };

  return {
    goToGame,
  };
};

export default makeWelcome;
