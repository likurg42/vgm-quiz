import data from './data/data';
import makeWelcome from './components/welcome';
import makeGame from './components/game';
import makeHeader from './components/header';
import makeScreen from './components/screen';
import makeResult from './components/result';
import makeNav from './components/nav';

const init = () => {
  const welcome = makeWelcome();
  const game = makeGame();
  const header = makeHeader();
  const screen = makeScreen();
  const result = makeResult();
  const nav = makeNav();

  nav.bindGoToWelcome(screen.goToWelcome);

  screen.goToWelcome();

  header.goToWelcome(() => {
    screen.goToWelcome();
  });

  welcome.goToGame(() => {
    nav.bindGoToGame(screen.goToGame);
    screen.goToGame();
    game.startGame(data);
  });

  game.goToResult(() => {
    nav.bindGoToResult(screen.goToResult);
    result.setScore(game.getPoints());
    screen.goToResult();
  });
};

export default init;
