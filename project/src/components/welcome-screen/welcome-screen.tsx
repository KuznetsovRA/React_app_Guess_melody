import {useNavigate} from 'react-router-dom';
import {AppRoute} from '../../const';
import {bindActionCreators, Dispatch} from '@reduxjs/toolkit';
import {Actions} from '../../types/action';
import {resetGame as resetGameState} from '../../store/action';
import {connect, ConnectedProps} from 'react-redux';

type WelcomeScreenProps = {
  errorsCount: number;
}

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => bindActionCreators({
  onResetGame: resetGameState,
}, dispatch);

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & WelcomeScreenProps;

function WelcomeScreen(props: ConnectedComponentProps): JSX.Element {
  const {errorsCount, onResetGame} = props;
  const navigate = useNavigate();
  return (
    <section className="welcome">
      <div className="welcome__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/>
      </div>
      <button
        className="welcome__button"
        onClick={() => {
          onResetGame();
          navigate(AppRoute.Game);
        }}
      >
        <span className="visually-hidden">
          Начать игру
        </span>
      </button>
      <h2 className="welcome__rules-title">Правила игры</h2>
      <p className="welcome__text">Правила просты:</p>
      <ul className="welcome__rules-list">
        <li>Нужно ответить на все вопросы.</li>
        <li>Можно допустить {errorsCount} ошибки.</li>
      </ul>
      <p className="welcome__text">Удачи!</p>
    </section>
  );
}

export {WelcomeScreen};
export default connector(WelcomeScreen);
