import makeScore from './score';

const makeResult = (query = '.result', parentElement = document) => {
  const root = parentElement.querySelector(query);
  const score = makeScore('.result__score', root);

  const setScore = (points) => {
    score.setValue(points);
  };

  return {
    setScore,
  };
};

export default makeResult;
