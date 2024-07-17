import {Routes, Route, unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import {AppRoute, MAX_MISTAKE_COUNT} from '../../const';

import AuthScreen from '../auth-screen/auth-screen';
import GameOverScreen from '../game-over-screen/game-over-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import WelcomeScreen from '../welcome-screen/welcome-screen';
import WinScreen from '../win-screen/win-screen';
import PrivateRoute from '../private-route/private-route';
import GameScreen from '../game-screen/game-screen';
import {connect, ConnectedProps} from 'react-redux';
import {State} from '../../types/state';
import {isCheckedAuth} from '../../game';
import LoadingScreen from '../loading-screen/loading-screen';
import browserHistory from '../../browser-history';


const mapStateToProps = (state: State) => ({
  authorizationStatus: state.authorizationStatus,
  isDataLoaded: state.isDataLoaded,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;


function App({authorizationStatus, isDataLoaded}: PropsFromRedux): JSX.Element {

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Root} element={<WelcomeScreen errorsCount={MAX_MISTAKE_COUNT} />} />
        <Route path={AppRoute.Login} element={<AuthScreen />} />
        <Route path={AppRoute.Result} element={
          <PrivateRoute>
            <WinScreen
              onReplayButtonClick={() => browserHistory.push(AppRoute.Game)}
            />
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.Lose} element={
          <GameOverScreen
            onReplayButtonClick={() => browserHistory.push(AppRoute.Game)}
          />
        }
        />
        <Route path={AppRoute.Game} element={
          <GameScreen />
        }
        />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </HistoryRouter>
  );
}

export {App};
export default connector(App);
