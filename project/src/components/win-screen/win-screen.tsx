import {NavLink} from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';
import {State} from '../../types/state';
import {resetGame} from '../../store/action';
import {ThunkAppDispatch} from '../../types/action';
import {logoutAction} from '../../store/api-actions';

type WinScreenProps = {
  onReplayButtonClick: () => void;
};
const mapStateToProps = ({step, mistakes}: State) => ({
  questionsCount: step,
  mistakesCount: mistakes,
});


const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onResetGame() {
    dispatch(resetGame());
  },
  logoutGame() {
    dispatch(logoutAction());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & WinScreenProps;

function WinScreen({questionsCount, mistakesCount, onReplayButtonClick, onResetGame, logoutGame}: ConnectedComponentProps): JSX.Element {
  const correctlyQuestionsCount = questionsCount - mistakesCount;


  return (
    <section className="result">
      <div className="result-logout__wrapper">
        <NavLink
          className="result-logout__link"
          to="/"
          onClick={(evt) => {
            evt.preventDefault();

            logoutGame();
          }}
        >
          Выход
        </NavLink>
      </div>
      <div className="result__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
      </div>
      <h2 className="result__title">Вы настоящий меломан!</h2>
      <p className="result__total">Вы ответили правильно на {correctlyQuestionsCount} вопросов и совершили {mistakesCount} ошибки</p>
      <button
        className="replay"
        type="button"
        onClick={() => {
          onResetGame();
          onReplayButtonClick();
        }}
      >
        Сыграть ещё раз
      </button>
    </section>
  );
}


export {WinScreen};
export default connector(WinScreen);
