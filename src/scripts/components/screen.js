const makeScreen = (query = '.screen') => {
  const screens = [...document.querySelectorAll(query)];

  const welcome = screens.find((el) => el.classList.contains('screen--welcome'));
  const game = screens.find((el) => el.classList.contains('screen--game'));
  const result = screens.find((el) => el.classList.contains('screen--result'));

  const hideEverything = () => {
    screens.forEach((el) => {
      el.classList.remove('screen--current');
    });
  };

  const goTo = (el) => () => {
    hideEverything();
    el.classList.add('screen--current');
  };

  const goToWelcome = goTo(welcome);
  const goToResult = goTo(result);
  const goToGame = goTo(game);

  return {
    goToWelcome,
    goToResult,
    goToGame,
  };
};

export default makeScreen;
