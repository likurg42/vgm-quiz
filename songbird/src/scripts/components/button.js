const makeButton = (query = '.button', parentElement = document) => {
  const root = parentElement.querySelector(query);

  const toggleDisabled = () => {
    root.classList.remove('button--is-active');
    root.classList.add('button--is-disabled');
    root.disabled = true;
  };

  const toggleActive = () => {
    root.classList.remove('button--is-disabled');
    root.classList.add('button--is-active');
    root.disabled = false;
  };

  const getButton = () => root;

  const changeText = (text) => {
    root.textContent = text;
  };

  return {
    getButton,
    toggleDisable: toggleDisabled,
    toggleActive,
    changeText,
  };
};

export default makeButton;
