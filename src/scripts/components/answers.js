const makeAnswers = (query = '.answers', parentElement = document) => {
  const root = parentElement.querySelector(query);
  const answers = [...root.querySelectorAll('.answers__item')];

  const getAnswers = () => answers;

  const unCheckAnswers = () => {
    answers.forEach((item) => {
      const currentItem = item;
      currentItem.dataset.checked = 'false';
    });
  };

  const getAnswerNumber = (answerElement) => {
    const answerNumber = Number(answerElement.dataset.answer);
    return answerNumber;
  };

  const checkAnswer = (answerElement) => {
    const currentAnswer = answerElement;
    currentAnswer.dataset.checked = 'true';
  };

  const checkIsChecked = (answerElement) => JSON.parse(answerElement.dataset.checked);

  const toggleCorrectAnswer = (answer) => {
    answer.classList.toggle('answers__item--is-correct');
  };

  const toggleWrongAnswer = (answer) => {
    answer.classList.toggle('answers__item--is-wrong');
  };

  const cleanAnswers = () => {
    answers.forEach((answer) => {
      answer.classList.remove('answers__item--is-correct');
      answer.classList.remove('answers__item--is-wrong');
    });
    unCheckAnswers();
  };

  unCheckAnswers();

  return {
    getAnswers,
    toggleCorrectAnswer,
    toggleWrongAnswer,
    cleanAnswers,
    getAnswerNumber,
    checkAnswer,
    unCheckAnswers,
    checkIsChecked,
  };
};

export default makeAnswers;
