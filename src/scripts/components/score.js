const makeScore = (query = '.score', parentElement = document) => {
  const root = parentElement.querySelector(query);
  const value = root.querySelector('.score__value');

  const setValue = (points) => {
    value.textContent = points;
  };

  const getElement = () => root;

  return {
    setValue,
    getElement,
  };
};

export default makeScore;
