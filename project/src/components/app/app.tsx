import { Routes, Route, BrowserRouter } from 'react-router-dom';
import {AppRoute, AuthorizationStatus, MAX_MISTAKE_COUNT} from '../../const';

import AuthScreen from '../auth-screen/auth-screen';
import GameOverScreen from '../game-over-screen/game-over-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import WelcomeScreen from '../welcome-screen/welcome-screen';
import WinScreen from '../win-screen/win-screen';
import PrivateRoute from '../private-route/private-route';
import GameScreen from '../game-screen/game-screen';


function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<WelcomeScreen errorsCount={MAX_MISTAKE_COUNT} />} />
        <Route path={AppRoute.Login} element={<AuthScreen />} />
        <Route path={AppRoute.Result} element={
          <PrivateRoute
            authorizationStatus={AuthorizationStatus.NoAuth}
          >
            <WinScreen />
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.Lose} element={<GameOverScreen />} />
        <Route path={AppRoute.Game} element={
          <GameScreen />
        }
        />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
