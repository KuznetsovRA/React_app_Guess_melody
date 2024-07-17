import {RouteProps} from 'react-router-dom';
import {Dispatch} from 'redux';
import {connect, ConnectedProps} from 'react-redux';
import {resetGame} from '../../store/action';
import {Actions} from '../../types/action';

type GameOverScreenProps = RouteProps & {
  onReplayButtonClick: () => void;
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onResetGame() {
    dispatch(resetGame());
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & GameOverScreenProps;

function GameOverScreen({onReplayButtonClick, onResetGame}: ConnectedComponentProps): JSX.Element {
  return (
    <section className="result">
      <div className="result__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
      </div>
      <h2 className="result__title">Какая жалость!</h2>
      <p className="result__total result__total--fail">У вас закончились все попытки. Ничего, повезёт в следующий раз!</p>
      <button
        className="replay"
        type="button"
        onClick={() => {
          onResetGame();
          onReplayButtonClick();
        }}
      >
        Попробовать ещё раз
      </button>
    </section>
  );
}

export {GameOverScreen};
export default connector(GameOverScreen);
