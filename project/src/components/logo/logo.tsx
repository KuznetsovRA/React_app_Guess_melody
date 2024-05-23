import {NavLink} from 'react-router-dom';

function Logo(): JSX.Element {
  return (
    <NavLink className="game__back" to="/">
      <span className="visually-hidden">Сыграть ещё раз</span>
      <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
    </NavLink>
  );
}

export default Logo;
