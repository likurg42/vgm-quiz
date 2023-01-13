const makeHeader = (query = '.header', parentElement = document) => {
  const root = parentElement.querySelector(query);
  const logo = root.querySelector('.header__logo');

  const goToWelcome = (cb) => {
    logo.addEventListener('click', () => {
      cb();
    });
  };

  return {
    goToWelcome,
  };
};

export default makeHeader;
