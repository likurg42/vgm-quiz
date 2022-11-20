import data from './data/data';
import makeWelcome from './components/welcome';
import makeGame from './components/game';

const init = () => {
  const welcome = makeWelcome('.welcome');
  const game = makeGame('.game');

  welcome.goToScreen(() => {
    game.showGame();
    game.startGame(data);
  });
};

export default init;
