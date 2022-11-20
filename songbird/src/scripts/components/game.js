import makeCategories from './categories';
import makeAnswers from './answers';
import makeButton from './button';
import data from '../data/data';
import makeResult from './result';
import makeScore from './score';
import makeSong from './song';

const makeGame = (query = '.game') => {
  const root = document.querySelector(query);
  const categories = makeCategories('.game__categories.categories', root);
  const answers = makeAnswers('.game__answers.answers', root);
  const button = makeButton('.game__continue-button', root);
  const result = makeResult('.result');
  const score = makeScore('.game__score');
  const songQuestion = makeSong('.game__song-question', root);
  const songDescription = makeSong('.game__song-description', root);

  const maxRound = data.length;
  let points = 0;
  let round = 1;
  let correctAnswer = 0;
  let isRoundOver = false;
  let isGameOver = false;

  const dataCategories = [
    'Practice',
    'Retro',
    'Playstation',
    'PC',
    'Nintendo',
    'XBOX',
  ];

  categories.setCategories(dataCategories);

  const getQuestionData = (answer) => {
    const {
      name,
      description,
      audio,
      image,
    } = data[round - 1][answer - 1];
    return {
      titleText: name,
      descriptionText: description,
      audioSrc: audio,
      coverSrc: image,
    };
  };

  const setupAnswers = () => {
    correctAnswer = Math.floor(Math.random() * maxRound + 1);
    answers.cleanAnswers();

    const currentAnswers = data[round - 1].reduce((acc, item) => {
      acc.push(item.name);
      return acc;
    }, []);

    for (let i = 0; i < currentAnswers.length; i += 1) {
      answers.getAnswers()[i].textContent = currentAnswers[i];
    }
  };

  const setupQuestion = () => {
    const { audioSrc } = getQuestionData(correctAnswer);
    songQuestion.reset(audioSrc);
  };
  const setupDescription = () => {
    songDescription.reset('');
  };

  const setupNewRound = () => {
    isRoundOver = false;

    button.toggleDisable();
    setupAnswers();
    setupQuestion();
    setupDescription();
  };

  const checkAnswer = (answer, answerElement) => {
    if (answer === correctAnswer && !isRoundOver) {
      points += 50;
      score.setValue(points);
      answers.toggleCorrectAnswer(answerElement);
      button.toggleActive();
      songQuestion.setData(getQuestionData(answer));
      songDescription.setData(getQuestionData(answer));

      isRoundOver = true;
    }

    if (answer !== correctAnswer && !isRoundOver) {
      points -= 10;
      answers.toggleWrongAnswer(answerElement);
    }

    if (round === maxRound) {
      isGameOver = true;
      button.changeText('Show results');
    }

    songDescription.setData(getQuestionData(answer));
  };

  const startGame = () => {
    setupNewRound();
  };

  const toggleGame = () => {
    root.classList.toggle('game--show');
  };

  const goToScreen = (cb) => {
    root.addEventListener('click', (e) => {
      if (e.target === button.getButton()) {
        root.classList.remove('game--show');
        cb();
      }
    });
  };

  root.addEventListener('click', (e) => {
    if ([...answers.getAnswers()].includes(e.target)) {
      const answerElement = e.target;
      const answer = Number(answerElement.dataset.answer);

      checkAnswer(answer, answerElement);
    }
  });

  button.getButton().addEventListener('click', () => {
    if (isGameOver) {
      toggleGame();
      result.setScore(points);
      result.toggleResult();
    }

    if (isRoundOver && !isGameOver) {
      round += 1;
      categories.toggleNextActive(round);
      setupNewRound();
    }
  });

  return {
    showGame: toggleGame,
    startGame,
    goToScreen,
  };
};

export default makeGame;
