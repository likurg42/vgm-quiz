const makeAnswers = (query = '.answers', parentElement = document) => {
  const root = parentElement.querySelector(query);
  const answers = root.querySelectorAll('.answers__item');

  const getAnswers = () => answers;

  const toggleCorrectAnswer = (answer) => {
    answer.classList.toggle('answers__item--is-correct');
  };

  const toggleWrongAnswer = (answer) => {
    answer.classList.toggle('answers__item--is-wrong');
  };

  const cleanAnswers = () => {
    [...answers].forEach((answer) => {
      answer.classList.remove('answers__item--is-correct');
      answer.classList.remove('answers__item--is-wrong');
    });
  };

  return {
    getAnswers,
    toggleCorrectAnswer,
    toggleWrongAnswer,
    cleanAnswers,
  };
};

export default makeAnswers;
