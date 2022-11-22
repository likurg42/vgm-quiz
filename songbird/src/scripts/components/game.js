import makeCategories from './categories';
import makeAnswers from './answers';
import makeButton from './button';
import data from '../data/data';
import makeScore from './score';
import makeSong from './song';
import correctSoundSrc from '../../audio/correct.wav';
import wrongSoundSrc from '../../audio/wrong.wav';

const makeGame = (query = '.game') => {
  const root = document.querySelector(query);
  const categories = makeCategories('.game__categories.categories', root);
  const answers = makeAnswers('.game__answers.answers', root);
  const button = makeButton('.game__continue-button', root);
  const score = makeScore('.game__score');
  const songQuestion = makeSong('.game__song-question', root);
  const songDescription = makeSong('.game__song-description', root);
  const correctSound = new Audio(correctSoundSrc);
  const wrongSound = new Audio(wrongSoundSrc);

  const maxRound = data.length;
  const maxPoints = data.length * 50;
  let points = 0;
  let round = 1;
  let correctAnswer = 0;
  let isRoundOver = false;
  let isGameOver = false;

  correctSound.volume = 0.2;
  wrongSound.volume = 0.2;

  const dataCategories = [
    'Practice',
    'Retro',
    'Playstation',
    'PC',
    'Nintendo',
    'XBOX',
  ];

  categories.setCategories(dataCategories);

  const getPoints = () => points;

  const checkIsWon = () => points === maxPoints;

  const getQuestionData = (answer) => {
    const {
      gameTitle,
      songTitle,
      description,
      audio,
      image,
    } = data[round - 1][answer - 1];
    return {
      gameTitleText: gameTitle,
      songTitleText: songTitle,
      descriptionText: description,
      audioSrc: audio,
      coverSrc: image,
    };
  };

  const setupAnswers = () => {
    correctAnswer = Math.floor(Math.random() * maxRound + 1);
    answers.cleanAnswers();

    const currentAnswers = data[round - 1].reduce((acc, item) => {
      acc.push(item.gameTitle);
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

  const setupNewGame = () => {
    isGameOver = false;
    isRoundOver = false;
    points = 0;
    round = 1;
    correctAnswer = 0;
    score.setValue(points);
    categories.reset();
    setupNewRound();
  };

  const verifyAnswer = async (answerNumber, answerElement) => {
    const isChecked = answers.checkIsChecked(answerElement);
    if (answerNumber === correctAnswer && !isRoundOver && !isChecked) {
      answers.checkAnswer(answerElement);
      points += 50;
      score.setValue(points);
      answers.toggleCorrectAnswer(answerElement);
      button.toggleActive();
      songQuestion.setData({ ...getQuestionData(answerNumber), audioSrc: '' });
      songDescription.setData(getQuestionData(answerNumber));
      await correctSound.play();

      isRoundOver = true;
    }

    if (answerNumber !== correctAnswer && !isRoundOver && !isChecked) {
      answers.checkAnswer(answerElement);
      points -= 10;
      answers.toggleWrongAnswer(answerElement);
      await wrongSound.play();
    }

    if (round === maxRound) {
      isGameOver = true;
      button.changeText('Show results');
    }

    songDescription.setData(getQuestionData(answerNumber));
  };

  root.addEventListener('click', (e) => {
    if ([...answers.getAnswers()].includes(e.target)) {
      const answerElement = e.target;
      const answerNumber = answers.getAnswerNumber(answerElement);

      verifyAnswer(answerNumber, answerElement);
    }
  });

  button.getButton().addEventListener('click', () => {
    if (isRoundOver && !isGameOver) {
      round += 1;
      categories.toggleNextActive(round);
      setupNewRound();
    }
  });

  const goToResult = (cb) => {
    button.getButton().addEventListener('click', () => {
      if (isGameOver) {
        cb();
      }
    });
  };

  return {
    setupNewGame,
    goToResult,
    getPoints,
    checkIsWon,
  };
};

export default makeGame;
