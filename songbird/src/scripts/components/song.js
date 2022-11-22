import questionMark from '../../icons/question.png';

const makeSong = (query = '.song', parentElement = document) => {
  const root = parentElement.querySelector(query);
  const gameTitle = root.querySelector('.song__game-title');
  const songTitle = root.querySelector('.song__song-title');
  const player = root.querySelector('.song__player');
  const cover = root.querySelector('.song__cover');
  const description = root.querySelector('.song__description');

  const toggleDescription = () => {
    description.classList.toggle('song__description--show');
  };

  const setData = (
    {
      songTitleText,
      gameTitleText,
      descriptionText,
      audioSrc,
      coverSrc,
    },
  ) => {
    gameTitle.textContent = gameTitleText;
    songTitle.textContent = songTitleText;
    player.src = audioSrc;
    cover.src = coverSrc;
    cover.classList.add('song__cover--with-border');
    cover.classList.remove('song__cover--question');

    if (description) description.textContent = descriptionText;
  };

  const reset = (audioSrc) => {
    gameTitle.textContent = '???';
    songTitle.textContent = '';
    cover.src = questionMark;
    cover.classList.add('song__cover--question');
    cover.classList.remove('song__cover--with-border');
    player.src = audioSrc;
    if (description) description.textContent = 'Choose answer';
  };

  return {
    setData,
    reset,
    toggleDescription,
  };
};

export default makeSong;
