const makeCategories = (query = '.categories', parentElement = document) => {
  const root = parentElement.querySelector(query);
  const items = root.querySelectorAll('.categories__item');

  const setCategories = (data) => {
    for (let i = 0; i < items.length; i += 1) {
      items[i].textContent = data[i];
    }
  };

  const toggleNextActive = (round) => {
    items[round - 2].classList.remove('categories__item--is-current');
    items[round - 1].classList.add('categories__item--is-current');
  };

  return {
    root,
    items,
    setCategories,
    toggleNextActive,
  };
};

export default makeCategories;
