import {ThunkActionResult} from '../types/action';
import {loadQuestions, redirectToRoute, requireAuthorization, requireLogout} from './action';
import {saveToken, dropToken, Token} from '../services/token';
import {APIRoute, AppRoute, AuthorizationStatus} from '../const';
import {Question} from '../types/question';
import {AuthData} from '../types/auth-data';
import {toast} from 'react-toastify';

const AUTH_FAIL_MESSAGE = 'Не забудьте авторизоваться';

export const fetchQuestionAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    // eslint-disable-next-line no-console
    console.log(APIRoute.Questions);
    const {data} = await api.get<Question[]>(APIRoute.Questions);
    dispatch(loadQuestions(data));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      toast.info(AUTH_FAIL_MESSAGE);
    }
  };

export const loginAction = ({login: email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data: {token}} = await api.post<{token: Token}>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Result));
  };


export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
  };
