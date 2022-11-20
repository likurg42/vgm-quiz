import makeScore from './score';

const makeResult = (query = '.result', parentElement = document) => {
  const root = parentElement.querySelector(query);
  const score = makeScore('.result__score', root);

  const setScore = (points) => {
    score.setValue(points);
  };

  const toggleResult = () => {
    root.classList.toggle('result--show');
  };

  return {
    toggleResult,
    setScore,
  };
};

export default makeResult;
