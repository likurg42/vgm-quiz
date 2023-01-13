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

  result.bindGoToHome(screen.goToWelcome);
  result.bindGoToNewGame(() => {
    game.setupNewGame();
    screen.goToGame();
  });

  screen.goToWelcome();

  header.goToWelcome(() => {
    screen.goToWelcome();
  });

  welcome.goToGame(() => {
    nav.bindGoToGame(screen.goToGame);
    screen.goToGame();
    game.setupNewGame();
  });

  game.goToResult(() => {
    nav.bindGoToResult(screen.goToResult);
    result.setScore(game.getPoints(), game.checkIsWon());
    screen.goToResult();
  });
};

export default init;
