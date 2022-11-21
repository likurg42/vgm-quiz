const makeNav = (query = '.nav', parentElement = document) => {
  const root = parentElement.querySelector(query);
  const navigationItems = [...root.querySelectorAll('.nav__item')];

  const enableNavigationItem = (navigationItem) => {
    navigationItem.classList.remove('nav__item--is-disabled');
  };

  const bindGoTo = (screenName) => (cb) => {
    const currentItem = navigationItems.find((el) => el.classList.contains(screenName));
    enableNavigationItem(currentItem);
    currentItem.addEventListener('click', () => {
      cb();
    });
  };

  const bindGoToWelcome = bindGoTo('nav__item--welcome');
  const bindGoToGame = bindGoTo('nav__item--game');
  const bindGoToResult = bindGoTo('nav__item--result');

  return {
    bindGoToWelcome,
    bindGoToGame,
    bindGoToResult,
  };
};

export default makeNav;
