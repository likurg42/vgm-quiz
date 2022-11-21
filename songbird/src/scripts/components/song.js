import questionMark from '../../icons/question.png';

const makeSong = (query = '.song', parentElement = document) => {
  const root = parentElement.querySelector(query);
  const title = root.querySelector('.song__title');
  const player = root.querySelector('.song__player');
  const cover = root.querySelector('.song__cover');
  const description = root.querySelector('.song__description');

  const toggleDescription = () => {
    description.classList.toggle('song__description--show');
  };

  const setData = (
    {
      titleText,
      descriptionText,
      audioSrc,
      coverSrc,
    },
  ) => {
    title.textContent = titleText;
    player.src = audioSrc;
    cover.src = coverSrc;
    cover.classList.add('song__cover--with-border');
    cover.classList.remove('song__cover--question');

    if (description) description.textContent = descriptionText;
  };

  const reset = (audioSrc) => {
    title.textContent = '???';
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
